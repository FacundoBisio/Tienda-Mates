import { NextRequest, NextResponse } from 'next/server';
import { getAllFlatPaginated, insertProduct } from '@/lib/productsDb';
import type { FlatProduct } from '@/lib/productsDb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
    const result = await getAllFlatPaginated(page, limit);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
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

  try {
    await insertProduct(product);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error al guardar producto' }, { status: 500 });
  }
}
