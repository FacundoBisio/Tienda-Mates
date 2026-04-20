import { NextResponse } from 'next/server';
import { getAllNested, seedIfEmpty, flattenNested } from '@/lib/productsDb';
import seedData from '@/data/productsData.json';
import type { ProductsData } from '@/types';

export async function GET() {
  await seedIfEmpty(flattenNested(seedData as unknown as ProductsData));
  const data = await getAllNested();
  return NextResponse.json(data);
}
