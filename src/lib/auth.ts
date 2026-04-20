export const COOKIE_NAME = 'admin_session';

// To invalidate all active sessions, change ADMIN_SECRET in .env.local
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 h

const enc = new TextEncoder();

function signingKey(): string {
  return process.env.ADMIN_SECRET ?? 'fallback';
}

async function hmacKey(): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(signingKey()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): ArrayBuffer {
  const pairs = hex.match(/.{2}/g) ?? [];
  return new Uint8Array(pairs.map((h) => parseInt(h, 16))).buffer as ArrayBuffer;
}

// Token format: "<issuedAt>.<signature>"
export async function signToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const key = await hmacKey();
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(issuedAt));
  return `${issuedAt}.${toHex(sig)}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  const dot = token.lastIndexOf('.');
  if (dot === -1) return false;

  const issuedAt = token.slice(0, dot);
  const sigHex   = token.slice(dot + 1);

  // Check expiry before hitting crypto
  const age = Date.now() - parseInt(issuedAt, 10);
  if (isNaN(age) || age < 0 || age > SESSION_MS) return false;

  try {
    const key = await hmacKey();
    return await globalThis.crypto.subtle.verify(
      'HMAC', key, fromHex(sigHex), enc.encode(issuedAt)
    );
  } catch {
    return false;
  }
}
