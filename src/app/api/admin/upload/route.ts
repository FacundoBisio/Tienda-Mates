import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

  const topKey = formData.get('topKey') as string | null;
  const subKey = formData.get('subKey') as string | null;
  const productName = formData.get('productName') as string | null;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'El archivo supera 5MB' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'jpg';
  
  let baseName = `img-${Date.now()}`;
  if (productName && productName.trim()) {
    baseName = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  const filename = `${baseName}.${ext}`;

  let subFolder = '';
  if (topKey) {
    subFolder = topKey.toLowerCase();
    if (topKey === 'MATES' && subKey) {
      subFolder = `${subFolder}/${subKey.toLowerCase().replace(/\s+/g, '-')}`;
    }
  }

  const uploadDir = path.join(process.cwd(), 'public', 'imagenes', ...subFolder.split('/'));
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  const finalPath = subFolder ? `/imagenes/${subFolder}/${filename}` : `/imagenes/${filename}`;
  return NextResponse.json({ path: finalPath }, { status: 201 });
}
