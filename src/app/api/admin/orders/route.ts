import { NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/ordersDb';

export async function GET() {
  const orders = await getAllOrders();
  return NextResponse.json(orders);
}
