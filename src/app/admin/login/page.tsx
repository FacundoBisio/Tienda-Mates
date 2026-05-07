'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: 'Contraseña correcta' });
        toast.success('Contraseña correcta');
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('admin_just_logged_in', '1');
        }
        setTimeout(() => router.push('/admin'), 600);
        return;
      }

      const data = await res.json().catch(() => ({}));
      const msg = data.error ?? 'Contraseña incorrecta';
      setFeedback({ type: 'error', msg });
      toast.error(msg);
    } catch {
      const msg = 'Error de conexión. Intentá de nuevo.';
      setFeedback({ type: 'error', msg });
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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

          {feedback && (
            <div
              role="alert"
              className={`text-sm rounded-xl px-4 py-3 border ${
                feedback.type === 'success'
                  ? 'bg-[#EAF3E8] border-[#4C674A] text-[#2d4a2b]'
                  : 'bg-[#FBEAEA] border-[#C44] text-[#8B1E1E]'
              }`}
            >
              {feedback.msg}
            </div>
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
