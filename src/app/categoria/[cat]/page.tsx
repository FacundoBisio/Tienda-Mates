// src/app/categoria/[cat]/page.tsx — Server Component shell
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

const categoryMeta: Record<string, { label: string; desc: string; keywords: string[] }> = {
  mates:      {
    label: 'Mates Artesanales',
    desc: 'Mates artesanales únicos, trabajados a mano con calabaza seleccionada y cuero vacuno legítimo.',
    keywords: ['mates artesanales', 'mate imperial', 'mate camionero', 'mate torpedo', 'mates córdoba'],
  },
  termos:     {
    label: 'Termos para Mate',
    desc: 'Termos de alta calidad que mantienen el agua caliente por 24 horas. Ideales para tomar mate en cualquier lugar.',
    keywords: ['termos para mate', 'termo mate', 'termo acero inoxidable', 'comprar termo'],
  },
  yerbas:     {
    label: 'Yerbas Seleccionadas',
    desc: 'Las mejores yerbas uruguayas y argentinas, seleccionadas por su sabor y calidad.',
    keywords: ['yerba mate', 'yerba uruguaya', 'yerba argentina', 'comprar yerba'],
  },
  bombillas:  {
    label: 'Bombillas para Mate',
    desc: 'Bombillas desde las más simples hasta las más trabajadas en alpaca cincelada. Para todos los estilos.',
    keywords: ['bombillas mate', 'bombilla alpaca', 'bombilla cincelada', 'comprar bombilla'],
  },
  accesorios: {
    label: 'Accesorios para Mate',
    desc: 'Materas, mochilas y sets completos para llevar tu ritual a donde vayas.',
    keywords: ['accesorios mate', 'matera', 'set de mate', 'regalo mate'],
  },
  combos:     {
    label: 'Combos y Sets de Mate',
    desc: 'Combos completos pensados para regalar o para empezar con todo lo necesario para tomar mate.',
    keywords: ['combos mate', 'set de mate regalo', 'pack mate', 'regalo mate argentina'],
  },
};

const SITE_URL = 'https://tienda-mates.vercel.app';

export async function generateMetadata(
  { params }: { params: Promise<{ cat: string }> }
): Promise<Metadata> {
  const { cat } = await params;
  const meta = categoryMeta[cat?.toLowerCase()];
  if (!meta) return {};
  return {
    title: meta.label,
    description: `${meta.desc} Comprá online en FFMATES con envío a todo el país.`,
    keywords: meta.keywords,
    alternates: { canonical: `${SITE_URL}/categoria/${cat}` },
    openGraph: {
      title: `${meta.label} | FFMATES`,
      description: `${meta.desc} Comprá online en FFMATES con envío a todo el país.`,
      url: `${SITE_URL}/categoria/${cat}`,
      type: 'website',
    },
  };
}

export default async function CategoriaPage(
  { params }: { params: Promise<{ cat: string }> }
) {
  const { cat } = await params;
  const meta = categoryMeta[cat?.toLowerCase()];
  if (!meta) redirect('/');
  return <CategoryPage />;
}
