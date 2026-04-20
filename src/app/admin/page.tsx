'use client';

import { useState, useEffect, useOptimistic, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FlatProduct {
  id: string;
  name: string;
  price: string;
  stock: number;
  description?: string;
  image: string;
  _topKey: string;
  _subKey?: string;
}

interface EditForm {
  price: string;
  stock: string;
  description: string;
  image: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  MATES: 'Mates',
  TERMOS: 'Termos',
  YERBAS: 'Yerbas',
  BOMBILLAS: 'Bombillas',
  ACCESORIOS: 'Accesorios',
  COMBOS: 'Combos',
};

function formatPrice(p: string) {
  return `$${Number(p).toLocaleString('es-AR')}`;
}

export default function AdminPage() {
  const [products, setProducts]     = useState<FlatProduct[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState('ALL');
  const [editing, setEditing]       = useState<FlatProduct | null>(null);
  const [form, setForm]             = useState<EditForm>({ price: '', stock: '', description: '', image: '' });
  const [saveError, setSaveError]   = useState('');
  const [saveOk, setSaveOk]         = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [optimisticProducts, updateOptimistic] = useOptimistic(
    products,
    (state: FlatProduct[], updated: FlatProduct) =>
      state.map((p) => (p.id === updated.id ? updated : p))
  );

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((data: FlatProduct[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function openEdit(p: FlatProduct) {
    setEditing(p);
    setForm({
      price: p.price,
      stock: String(p.stock),
      description: p.description ?? '',
      image: p.image,
    });
    setSaveError('');
    setSaveOk(false);
  }

  function validate(): string | null {
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) < 0)
      return 'El precio debe ser un número positivo.';
    if (!form.stock.trim() || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      return 'El stock debe ser un número positivo.';
    if (!form.description.trim())
      return 'La descripción no puede estar vacía.';
    if (!form.image.trim())
      return 'La imagen no puede estar vacía.';
    return null;
  }

  async function handleSave() {
    if (!editing) return;
    const err = validate();
    if (err) { setSaveError(err); return; }
    setSaveError('');

    const updated: FlatProduct = {
      ...editing,
      price: form.price,
      stock: Number(form.stock),
      description: form.description,
      image: form.image,
    };

    startTransition(async () => {
      updateOptimistic(updated);

      const res = await fetch(`/api/admin/products/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: form.price,
          stock: Number(form.stock),
          description: form.description,
          image: form.image,
        }),
      });

      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSaveOk(true);
        setTimeout(() => setEditing(null), 900);
      } else {
        const data = await res.json();
        setSaveError(data.error ?? 'Error al guardar');
      }
    });
  }

  const categories = ['ALL', ...Object.keys(CATEGORY_LABELS)];
  const filtered = optimisticProducts.filter((p) => {
    const matchCat = filterCat === 'ALL' || p._topKey === filterCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F0EA]">

      {/* Header Admin */}
      <header className="bg-[#3C503A] text-white px-6 md:px-12 h-14 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg tracking-widest">
            FF.Mates
          </span>
          <span className="text-white/40 text-xs hidden sm:block">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/60 hover:text-white text-[11px] tracking-widest uppercase transition">
            Ver tienda
          </a>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white text-[11px] tracking-widest uppercase transition"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="mb-8">
          <h2 className="text-2xl text-[#1C1C1C] mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Inventario
          </h2>
          <p className="text-[#888] text-sm">{optimisticProducts.length} productos en total</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-[#E8E3DC] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-widest font-semibold transition ${
                  filterCat === cat
                    ? 'bg-[#3C503A] text-white'
                    : 'bg-white border border-[#E8E3DC] text-[#555] hover:border-[#3C503A]'
                }`}
              >
                {cat === 'ALL' ? 'Todos' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="text-center py-20 text-[#aaa] text-sm">Cargando productos...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8E3DC] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8E3DC] bg-[#FAFAF8]">
                    <th className="text-left px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold w-14"></th>
                    <th className="text-left px-4 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold">Producto</th>
                    <th className="text-left px-4 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold">Categoría</th>
                    <th className="text-right px-4 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold">Precio</th>
                    <th className="text-center px-4 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#888] font-semibold">Stock</th>
                    <th className="px-4 py-3.5 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={`${p.id}-${i}`}
                      className="border-b border-[#F0EBE3] last:border-0 hover:bg-[#FAFAF8] transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F0EBE3] flex-shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            onError={() => {}}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1C1C1C] leading-tight">{p.name}</p>
                        {p.description && (
                          <p className="text-[#aaa] text-xs mt-0.5 line-clamp-1">{p.description}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[#F0EBE3] text-[#5a4a3a] px-2.5 py-1 rounded-full font-medium">
                          {CATEGORY_LABELS[p._topKey] ?? p._topKey}
                          {p._subKey ? ` · ${p._subKey}` : ''}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#3C503A]">
                        {formatPrice(p.price)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          p.stock === 0
                            ? 'bg-red-100 text-red-600'
                            : p.stock <= 2
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEdit(p)}
                          className="text-[11px] uppercase tracking-widest text-[#4C674A] hover:text-[#3C503A] font-semibold transition"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#bbb] text-sm">
                        Sin resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal de edición */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          />
          <div className="relative bg-white rounded-2xl border border-[#E8E3DC] shadow-2xl w-full max-w-md p-8 z-10">

            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F0EBE3] flex-shrink-0">
                <Image
                  src={form.image || editing.image}
                  alt={editing.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1C1C] leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  {editing.name}
                </h3>
                <p className="text-[#aaa] text-xs mt-0.5">
                  {CATEGORY_LABELS[editing._topKey]}{editing._subKey ? ` · ${editing._subKey}` : ''}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] font-semibold mb-1.5">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full border border-[#E8E3DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] font-semibold mb-1.5">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    className="w-full border border-[#E8E3DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] font-semibold mb-1.5">
                  Imagen (URL o path)
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  className="w-full border border-[#E8E3DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[#888] font-semibold mb-1.5">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border border-[#E8E3DC] rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
                />
              </div>
            </div>

            {saveError && (
              <p className="mt-3 text-red-500 text-xs">{saveError}</p>
            )}
            {saveOk && (
              <p className="mt-3 text-green-600 text-xs font-medium">Guardado correctamente ✓</p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border border-[#E8E3DC] text-[#555] text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 hover:bg-[#F5F0EA] transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex-1 bg-[#3C503A] hover:bg-[#2d4a2b] text-white text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 transition disabled:opacity-60"
              >
                {isPending ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
