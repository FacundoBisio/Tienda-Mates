'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error al iniciar sesión');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <p className="text-[#3C503A] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
            Panel de Administración
          </p>
          <h1
            className="text-4xl text-[#1C1C1C]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            FF.Mates
          </h1>
          <div className="mt-4 mx-auto w-12 h-px bg-[#C8A882]" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#E8E3DC] shadow-sm px-8 py-10 space-y-6"
        >
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#888] font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#E8E3DC] rounded-xl px-4 py-3 text-sm text-[#1C1C1C] bg-[#FAFAF8] focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3C503A] hover:bg-[#2d4a2b] text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-xl py-3.5 transition-colors disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-[#bbb] text-[10px] mt-6 tracking-widest uppercase">
          Área restringida
        </p>
      </div>
    </div>
  );
}
