'use client';

import { useState, useEffect, useOptimistic, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface FlatProduct {
  id: string;
  name: string;
  price: string;
  stock: number;
  description?: string;
  image: string;
  href?: string;
  _topKey: string;
  _subKey?: string;
}

interface EditForm {
  price: string;
  stock: string;
  description: string;
  image: string;
}

interface CreateForm {
  id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  _topKey: string;
  _subKey: string;
}

interface AdminOrder {
  _id: string;
  items: { id: string; name: string; quantity: number; price: string }[];
  total: number;
  createdAt: string;
  status: 'pendiente' | 'confirmado';
}

const CATEGORY_LABELS: Record<string, string> = {
  MATES: 'Mates', TERMOS: 'Termos', YERBAS: 'Yerbas',
  BOMBILLAS: 'Bombillas', ACCESORIOS: 'Accesorios', COMBOS: 'Combos',
};

const MATES_SUBS = ['Camioneros', 'Imperiales', 'Torpedos'];

function formatPrice(p: string) {
  return `$${Number(p).toLocaleString('es-AR')}`;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36);
}

const EMPTY_CREATE: CreateForm = {
  id: '', name: '', price: '', stock: '', description: '', image: '', _topKey: 'MATES', _subKey: 'Camioneros',
};

/* ─── Input / Textarea helpers ─────────────────────────── */
const inputCls = 'w-full border border-[#E8E3DC] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition bg-white';
const labelCls = 'block text-[10px] tracking-[0.15em] uppercase text-[#888] font-semibold mb-1.5';

export default function AdminPage() {
  const [products, setProducts]       = useState<FlatProduct[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterCat, setFilterCat]     = useState('ALL');

  // Edit modal
  const [editing, setEditing]         = useState<FlatProduct | null>(null);
  const [form, setForm]               = useState<EditForm>({ price: '', stock: '', description: '', image: '' });
  const [isPending, startTransition]  = useTransition();

  // Create modal
  const [creating, setCreating]       = useState(false);
  const [createForm, setCreateForm]   = useState<CreateForm>(EMPTY_CREATE);
  const [createPending, startCreate]  = useTransition();

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Tabs + Orders
  const [activeTab, setActiveTab] = useState<'inventario' | 'pedidos'>('inventario');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const router = useRouter();

  const [optimisticProducts, updateOptimistic] = useOptimistic(
    products,
    (state: FlatProduct[], updated: FlatProduct) =>
      state.map((p) => (p.id === updated.id ? updated : p)),
  );

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/products?page=${page}&limit=20`)
      .then((r) => r.json())
      .then((data: { products: FlatProduct[]; total: number }) => {
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    if (activeTab !== 'pedidos') return;
    setOrdersLoading(true);
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then((data: AdminOrder[]) => { setOrders(data); setOrdersLoading(false); });
  }, [activeTab]);

  async function handleConfirmOrder(id: string) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmado' }),
    });
    if (res.ok) {
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: 'confirmado' } : o));
      toast.success('Pedido confirmado');
    } else {
      toast.error('Error al confirmar pedido');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, onSuccess: (path: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const data = await res.json();
      onSuccess(data.path);
    } else {
      const data = await res.json();
      alert(data.error ?? 'Error al subir imagen');
    }
  }

  /* ── Edit ── */
  function openEdit(p: FlatProduct) {
    setEditing(p);
    setForm({ price: p.price, stock: String(p.stock), description: p.description ?? '', image: p.image });
  }

  function validateEdit(): string | null {
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) < 0) return 'Precio inválido.';
    if (!form.stock.trim() || isNaN(Number(form.stock)) || Number(form.stock) < 0) return 'Stock inválido.';
    if (!form.description.trim()) return 'La descripción no puede estar vacía.';
    if (!form.image.trim()) return 'La imagen no puede estar vacía.';
    return null;
  }

  async function handleSave() {
    if (!editing) return;
    const err = validateEdit();
    if (err) { toast.error(err); return; }

    const updated: FlatProduct = { ...editing, price: form.price, stock: Number(form.stock), description: form.description, image: form.image };

    startTransition(async () => {
      updateOptimistic(updated);
      const res = await fetch(`/api/admin/products/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: form.price, stock: Number(form.stock), description: form.description, image: form.image }),
      });
      if (res.ok) {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success(`${updated.name} guardado`);
        setEditing(null);
      } else {
        const data = await res.json();
        toast.error(data.error ?? 'Error al guardar');
      }
    });
  }

  /* ── Create ── */
  function openCreate() {
    setCreateForm(EMPTY_CREATE);
    setCreating(true);
  }

  function validateCreate(): string | null {
    if (!createForm.name.trim())        return 'El nombre es requerido.';
    if (!createForm.id.trim())          return 'El ID es requerido.';
    if (!createForm.image.trim())       return 'La imagen es requerida.';
    if (!createForm.description.trim()) return 'La descripción es requerida.';
    if (isNaN(Number(createForm.price)) || Number(createForm.price) < 0) return 'Precio inválido.';
    if (isNaN(Number(createForm.stock)) || Number(createForm.stock) < 0) return 'Stock inválido.';
    if (createForm._topKey === 'MATES' && !createForm._subKey.trim()) return 'La subcategoría es requerida para Mates.';
    return null;
  }

  function handleNameChange(name: string) {
    setCreateForm((f) => ({ ...f, name, id: f.id || slugify(name) }));
  }

  async function handleCreate() {
    const err = validateCreate();
    if (err) { toast.error(err); return; }

    startCreate(async () => {
      const body = {
        ...createForm,
        stock: Number(createForm.stock),
        _subKey: createForm._topKey === 'MATES' ? createForm._subKey : undefined,
      };
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const newProduct: FlatProduct = { ...body, price: String(body.price) };
        setProducts((prev) => [newProduct, ...prev]);
        toast.success(`${createForm.name} creado`);
        setCreating(false);
      } else {
        const data = await res.json();
        toast.error(data.error ?? 'Error al crear');
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

      {/* Header */}
      <header className="bg-[#3C503A] text-white px-6 md:px-12 h-14 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg tracking-widest">FF.Mates</span>
          <span className="text-white/40 text-xs hidden sm:block">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-white/60 hover:text-white text-[11px] tracking-widest uppercase transition">Ver tienda</a>
          <button onClick={handleLogout} className="text-white/60 hover:text-white text-[11px] tracking-widest uppercase transition">Salir</button>
        </div>
      </header>

      <div className="bg-white border-b border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-6">
          {(['inventario', 'pedidos'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3.5 text-[11px] uppercase tracking-widest font-semibold border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-[#3C503A] text-[#3C503A]'
                  : 'border-transparent text-[#888] hover:text-[#555]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'inventario' && (
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl text-[#1C1C1C] mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>Inventario</h2>
            <p className="text-[#888] text-sm">{total} productos en total</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#3C503A] hover:bg-[#2d4a2b] text-white text-[11px] tracking-widest uppercase font-semibold rounded-xl px-5 py-2.5 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nuevo producto
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text" placeholder="Buscar producto..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-[#E8E3DC] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#4C674A] focus:ring-1 focus:ring-[#4C674A] transition"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 rounded-xl text-[11px] uppercase tracking-widest font-semibold transition ${filterCat === cat ? 'bg-[#3C503A] text-white' : 'bg-white border border-[#E8E3DC] text-[#555] hover:border-[#3C503A]'}`}
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
          <>
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
                    <tr key={`${p.id}-${i}`} className="border-b border-[#F0EBE3] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                      <td className="px-5 py-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F0EBE3] flex-shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" onError={() => {}} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1C1C1C] leading-tight">{p.name}</p>
                        {p.description && <p className="text-[#aaa] text-xs mt-0.5 line-clamp-1">{p.description}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[#F0EBE3] text-[#5a4a3a] px-2.5 py-1 rounded-full font-medium">
                          {CATEGORY_LABELS[p._topKey] ?? p._topKey}{p._subKey ? ` · ${p._subKey}` : ''}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#3C503A]">{formatPrice(p.price)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${p.stock === 0 ? 'bg-red-100 text-red-600' : p.stock <= 2 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => openEdit(p)} className="text-[11px] uppercase tracking-widest text-[#4C674A] hover:text-[#3C503A] font-semibold transition">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-12 text-[#bbb] text-sm">Sin resultados</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {total > 20 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-[#888]">
                Mostrando {Math.min((page - 1) * 20 + 1, total)}–{Math.min(page * 20, total)} de {total}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-[11px] uppercase tracking-widest font-semibold rounded-xl border border-[#E8E3DC] disabled:opacity-40 hover:border-[#3C503A] transition"
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page * 20 >= total}
                  className="px-4 py-2 text-[11px] uppercase tracking-widest font-semibold rounded-xl border border-[#E8E3DC] disabled:opacity-40 hover:border-[#3C503A] transition"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
          </>
        )}
      </main>
      )}

      {activeTab === 'pedidos' && (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <h2 className="text-2xl text-[#1C1C1C] mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>Pedidos</h2>
          {ordersLoading ? (
            <div className="text-center py-20 text-[#aaa] text-sm">Cargando pedidos...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-[#aaa] text-sm">No hay pedidos todavía.</div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-2xl border border-[#E8E3DC] p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#888] font-mono">{order._id}</p>
                      <p className="text-xs text-[#aaa] mt-0.5">{new Date(order.createdAt).toLocaleString('es-AR')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${order.status === 'confirmado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {order.status}
                      </span>
                      {order.status === 'pendiente' && (
                        <button
                          onClick={() => handleConfirmOrder(order._id)}
                          className="text-[11px] uppercase tracking-widest text-[#4C674A] hover:text-[#3C503A] font-semibold transition"
                        >
                          Confirmar
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#555]">{item.name} <span className="text-[#aaa]">x{item.quantity}</span></span>
                        <span className="text-[#3C503A] font-medium">${(parseFloat(item.price) * item.quantity).toLocaleString('es-AR')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#F0EBE3] pt-3 flex justify-between">
                    <span className="text-xs text-[#888]">Total</span>
                    <span className="font-semibold text-[#1C1C1C]">${order.total.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ── Modal Editar ── */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl border border-[#E8E3DC] shadow-2xl w-full max-w-md p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F0EBE3] flex-shrink-0">
                <Image src={form.image || editing.image} alt={editing.name} fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1C1C] leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>{editing.name}</h3>
                <p className="text-[#aaa] text-xs mt-0.5">{CATEGORY_LABELS[editing._topKey]}{editing._subKey ? ` · ${editing._subKey}` : ''}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Precio ($)</label>
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Stock</label>
                  <input type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Imagen</label>
                <input type="text" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className={inputCls} placeholder="URL o path" />
                <label className="mt-2 flex items-center gap-2 cursor-pointer text-[11px] text-[#4C674A] hover:underline tracking-widest uppercase">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (path) => setForm((f) => ({ ...f, image: path })))} />
                  Subir imagen desde archivo
                </label>
              </div>
              <div>
                <label className={labelCls}>Descripción</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 border border-[#E8E3DC] text-[#555] text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 hover:bg-[#F5F0EA] transition">Cancelar</button>
              <button onClick={handleSave} disabled={isPending} className="flex-1 bg-[#3C503A] hover:bg-[#2d4a2b] text-white text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 transition disabled:opacity-60">
                {isPending ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Nuevo Producto ── */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCreating(false)} />
          <div className="relative bg-white rounded-2xl border border-[#E8E3DC] shadow-2xl w-full max-w-md p-8 z-10 max-h-[90vh] overflow-y-auto">

            <h3 className="text-xl text-[#1C1C1C] mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>Nuevo producto</h3>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>Nombre</label>
                <input
                  type="text" placeholder="Ej: Torpedo Cincelado Negro"
                  value={createForm.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputCls} autoFocus
                />
              </div>

              <div>
                <label className={labelCls}>ID único</label>
                <input
                  type="text" placeholder="torpedo-cincelado-negro"
                  value={createForm.id}
                  onChange={(e) => setCreateForm((f) => ({ ...f, id: e.target.value }))}
                  className={inputCls}
                />
                <p className="text-[10px] text-[#bbb] mt-1">Se genera automático desde el nombre. Podés editarlo.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Categoría</label>
                  <select
                    value={createForm._topKey}
                    onChange={(e) => setCreateForm((f) => ({ ...f, _topKey: e.target.value, _subKey: e.target.value === 'MATES' ? 'Camioneros' : '' }))}
                    className={inputCls}
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                {createForm._topKey === 'MATES' && (
                  <div>
                    <label className={labelCls}>Subcategoría</label>
                    <select
                      value={createForm._subKey}
                      onChange={(e) => setCreateForm((f) => ({ ...f, _subKey: e.target.value }))}
                      className={inputCls}
                    >
                      {MATES_SUBS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Precio ($)</label>
                  <input type="number" min="0" placeholder="35000" value={createForm.price} onChange={(e) => setCreateForm((f) => ({ ...f, price: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Stock</label>
                  <input type="number" min="0" placeholder="2" value={createForm.stock} onChange={(e) => setCreateForm((f) => ({ ...f, stock: e.target.value }))} className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Imagen</label>
                <input
                  type="text" placeholder="URL o path"
                  value={createForm.image}
                  onChange={(e) => setCreateForm((f) => ({ ...f, image: e.target.value }))}
                  className={inputCls}
                />
                <label className="mt-2 flex items-center gap-2 cursor-pointer text-[11px] text-[#4C674A] hover:underline tracking-widest uppercase">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (path) => setCreateForm((f) => ({ ...f, image: path })))} />
                  Subir imagen desde archivo
                </label>
              </div>

              <div>
                <label className={labelCls}>Descripción</label>
                <textarea
                  rows={3} placeholder="Describí el producto..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setCreating(false)} className="flex-1 border border-[#E8E3DC] text-[#555] text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 hover:bg-[#F5F0EA] transition">Cancelar</button>
              <button onClick={handleCreate} disabled={createPending} className="flex-1 bg-[#3C503A] hover:bg-[#2d4a2b] text-white text-[11px] tracking-widest uppercase font-semibold rounded-xl py-3 transition disabled:opacity-60">
                {createPending ? 'Creando...' : 'Crear producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
