import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, deleteProduct } from '@/lib/productsDb';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { price, stock, description, image } = await req.json() as {
    price?: string;
    stock?: number;
    description?: string;
    image?: string;
  };

  if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0))
    return NextResponse.json({ error: 'Precio inválido' }, { status: 400 });
  if (stock !== undefined && (typeof stock !== 'number' || stock < 0))
    return NextResponse.json({ error: 'Stock inválido' }, { status: 400 });

  const updated = await updateProduct(id, { price, stock, description, image });
  if (!updated) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteProduct(id);
  if (!deleted) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
