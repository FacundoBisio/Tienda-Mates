import clientPromise from './mongodb';
import type { Product, ProductsData } from '@/types';

export interface FlatProduct extends Product {
  _topKey: string;
  _subKey?: string;
}

const DB   = 'ffmates';
const COL  = 'products';

async function col() {
  const client = await clientPromise;
  return client.db(DB).collection<FlatProduct>(COL);
}

export async function getAllFlat(): Promise<FlatProduct[]> {
  return (await col()).find({}, { projection: { _id: 0 } }).toArray();
}

export async function getAllFlatPaginated(page: number, limit: number): Promise<{ products: FlatProduct[]; total: number }> {
  const c = await col();
  const [products, total] = await Promise.all([
    c.find({}, { projection: { _id: 0 } }).skip((page - 1) * limit).limit(limit).toArray(),
    c.countDocuments(),
  ]);
  return { products, total };
}

export async function getAllNested(): Promise<ProductsData> {
  const flat = await getAllFlat();
  return toNested(flat);
}

export function toNested(flat: FlatProduct[]): ProductsData {
  const data: ProductsData = {
    MATES: {},
    TERMOS: [],
    YERBAS: [],
    BOMBILLAS: [],
    ACCESORIOS: [],
    COMBOS: [],
  };

  for (const { _topKey, _subKey, ...product } of flat) {
    if (_topKey === 'MATES' && _subKey) {
      if (!data.MATES[_subKey]) data.MATES[_subKey] = [];
      data.MATES[_subKey].push(product as Product);
    } else {
      const key = _topKey as keyof Omit<ProductsData, 'MATES'>;
      (data[key] as Product[]).push(product as Product);
    }
  }

  return data;
}

export async function insertProduct(product: FlatProduct): Promise<void> {
  await (await col()).replaceOne({ id: product.id }, product, { upsert: true });
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await (await col()).deleteOne({ id });
  return result.deletedCount > 0;
}

export async function updateProduct(
  id: string,
  fields: Partial<Pick<Product, 'price' | 'stock' | 'description' | 'image'>>
): Promise<boolean> {
  const result = await (await col()).updateOne({ id }, { $set: fields });
  return result.matchedCount > 0;
}

export function flattenNested(data: ProductsData): FlatProduct[] {
  const result: FlatProduct[] = [];
  for (const [subKey, products] of Object.entries(data.MATES)) {
    for (const p of products) result.push({ ...p, _topKey: 'MATES', _subKey: subKey });
  }
  for (const key of ['TERMOS', 'YERBAS', 'BOMBILLAS', 'ACCESORIOS', 'COMBOS'] as const) {
    for (const p of data[key]) result.push({ ...p, _topKey: key });
  }
  return result;
}

export async function seedIfEmpty(flat: FlatProduct[]): Promise<void> {
  const c = await col();
  await c.createIndex({ id: 1 }).catch(() => {});
  const count = await c.countDocuments();
  if (count > 0) return;

  // Deduplicate by id (keep first occurrence, same as Cart context)
  const seen = new Set<string>();
  const unique = flat.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  await c.insertMany(unique);
}
