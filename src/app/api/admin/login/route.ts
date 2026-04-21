import { NextRequest, NextResponse } from 'next/server';
import { signToken, COOKIE_NAME } from '@/lib/auth';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; firstAttempt: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && now - entry.firstAttempt < WINDOW_MS && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: 'Demasiados intentos. Intentá en 15 minutos.' }, { status: 429 });
  }

  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
      attempts.set(ip, { count: 1, firstAttempt: now });
    } else {
      entry.count += 1;
      attempts.set(ip, entry);
    }
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  attempts.delete(ip);

  const token = await signToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 horas
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}
