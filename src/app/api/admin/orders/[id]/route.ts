import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/ordersDb';
import type { Order } from '@/lib/ordersDb';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json() as { status: Order['status'] };
  const ok = await updateOrderStatus(id, status);
  if (!ok) return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
