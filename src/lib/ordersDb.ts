import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export interface Order {
  items: { id: string; name: string; quantity: number; price: string }[];
  total: number;
  createdAt: Date;
  status: 'pendiente' | 'confirmado';
}

const DB = 'ffmates';
const COL = 'orders';

async function col() {
  const client = await clientPromise;
  return client.db(DB).collection<Order>(COL);
}

export async function insertOrder(order: Omit<Order, 'createdAt' | 'status'>): Promise<string> {
  const c = await col();
  const result = await c.insertOne({ ...order, createdAt: new Date(), status: 'pendiente' });
  return result.insertedId.toString();
}

export async function getAllOrders(): Promise<(Order & { _id: string })[]> {
  const c = await col();
  const orders = await c.find({}).sort({ createdAt: -1 }).limit(100).toArray();
  return orders.map(o => ({ ...o, _id: o._id.toString() }));
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<boolean> {
  const c = await col();
  const result = await c.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return result.matchedCount > 0;
}
