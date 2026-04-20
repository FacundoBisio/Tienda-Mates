import { NextResponse } from 'next/server';
import { getAllFlat } from '@/lib/productsDb';

export async function GET() {
  const products = await getAllFlat();
  return NextResponse.json(products);
}
