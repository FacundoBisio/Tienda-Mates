import { NextResponse } from 'next/server';
import { getAllNested, seedIfEmpty, flattenNested } from '@/lib/productsDb';
import seedData from '@/data/productsData.json';
import type { ProductsData } from '@/types';

export async function GET() {
  try {
    await seedIfEmpty(flattenNested(seedData as unknown as ProductsData));
    const data = await getAllNested();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}
