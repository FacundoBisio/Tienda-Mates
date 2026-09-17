import { NextResponse } from 'next/server';
import { getAllNested, seedIfEmpty, flattenNested } from '@/lib/productsDb';
import seedData from '@/data/productsData.json';
import type { ProductsData } from '@/types';

export async function GET() {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(seedData as unknown as ProductsData, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }

  try {
    await seedIfEmpty(flattenNested(seedData as unknown as ProductsData));
    const data = await getAllNested();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (err) {
    console.warn('DB Fetch failed, falling back to local JSON data');
    return NextResponse.json(seedData as unknown as ProductsData, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }
}
