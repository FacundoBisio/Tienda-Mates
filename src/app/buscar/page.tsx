import { getAllFlat } from '@/lib/productsDb';
import Link from 'next/link';
import Image from 'next/image';

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? '';

  const allProducts = query ? await getAllFlat() : [];
  const results = allProducts.filter(p => p.name.toLowerCase().includes(query));

  return (
    <div className="min-h-screen bg-[#F5F0EA] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-2xl text-[#1C1C1C] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
          Resultados para &quot;{q}&quot;
        </h1>
        <p className="text-[#888] text-sm mb-8">{results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>

        {results.length === 0 ? (
          <p className="text-[#aaa] text-center py-20">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map(p => (
              <Link key={p.id} href={`/producto/${p.id}`} className="bg-white rounded-2xl border border-[#E8E3DC] overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative aspect-square bg-[#4C674A]">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-4" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-[#1C1C1C] leading-snug group-hover:text-[#4C674A] transition-colors">{p.name}</p>
                  <p className="text-[#4C674A] font-semibold text-sm mt-1">${Number(p.price).toLocaleString('es-AR')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href="/" className="inline-block mt-8 text-xs tracking-widest uppercase text-[#4C674A] hover:underline">← Volver a la tienda</Link>
      </div>
    </div>
  );
}
