import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = req.ip || '127.0.0.1';

  // Rate Limiting para rutas API
  if (pathname.startsWith('/api/')) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    let requestData = rateLimit.get(ip);
    if (!requestData || requestData.lastReset < windowStart) {
      requestData = { count: 1, lastReset: now };
    } else {
      requestData.count++;
    }
    rateLimit.set(ip, requestData);

    if (requestData.count > MAX_REQUESTS) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  // Auth for Admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verifyToken(token))) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
