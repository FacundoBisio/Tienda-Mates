import { NextRequest, NextResponse } from 'next/server';
import { getAllFlat, insertProduct } from '@/lib/productsDb';
import type { FlatProduct } from '@/lib/productsDb';

export async function GET() {
  const products = await getAllFlat();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as FlatProduct;

  const { id, name, price, stock, description, image, _topKey, _subKey } = body;

  if (!id?.trim())          return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  if (!name?.trim())        return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });
  if (!_topKey?.trim())     return NextResponse.json({ error: 'Categoría requerida' }, { status: 400 });
  if (isNaN(Number(price)) || Number(price) < 0)
                            return NextResponse.json({ error: 'Precio inválido' }, { status: 400 });
  if (typeof stock !== 'number' || stock < 0)
                            return NextResponse.json({ error: 'Stock inválido' }, { status: 400 });

  const product: FlatProduct = {
    id, name, price: String(price), stock, description, image,
    href: id,
    _topKey,
    ...(_topKey === 'MATES' && _subKey ? { _subKey } : {}),
  };

  await insertProduct(product);
  return NextResponse.json({ ok: true }, { status: 201 });
}
