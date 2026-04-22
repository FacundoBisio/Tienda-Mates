import { NextRequest, NextResponse } from 'next/server';
import { insertOrder } from '@/lib/ordersDb';
import { sendOrderEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, total } = body;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
  }
  const id = await insertOrder({ items, total });
  sendOrderEmail({ id, items, total }).catch(() => {});
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
