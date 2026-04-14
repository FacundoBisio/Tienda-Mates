import productsData from '../data/productsData';
import type { Product, ProductMeta } from '@/types';

export const findProductByHref = (href: string): Product | null => {
  for (const categoria in productsData) {
    const cat = (productsData as Record<string, unknown>)[categoria];
    if (Array.isArray(cat)) {
      const prod = cat.find((p: Product) => p.href === href);
      if (prod) return prod;
    } else if (cat && typeof cat === 'object') {
      for (const subcat in cat as Record<string, Product[]>) {
        const sub = (cat as Record<string, Product[]>)[subcat];
        const prod = sub.find((p: Product) => p.href === href);
        if (prod) return prod;
      }
    }
  }
  return null;
};

export const findProductWithMeta = (data: Record<string, unknown>, key: string): ProductMeta => {
  if (!data) return { product: null, categorySlug: null, categoryLabel: null };

  for (const catKey in data) {
    const cat = data[catKey];
    if (Array.isArray(cat)) {
      const found = cat.find((p: Product) => p.href === key || String(p.id) === String(key));
      if (found) return {
        product: found,
        categorySlug: catKey.toLowerCase(),
        categoryLabel: catKey.charAt(0).toUpperCase() + catKey.slice(1).toLowerCase(),
      };
    } else if (typeof cat === 'object' && cat !== null) {
      for (const subKey in cat as Record<string, Product[]>) {
        const sub = (cat as Record<string, Product[]>)[subKey];
        if (Array.isArray(sub)) {
          const found = sub.find((p: Product) => p.href === key || String(p.id) === String(key));
          if (found) return {
            product: found,
            categorySlug: catKey.toLowerCase(),
            categoryLabel: catKey.charAt(0).toUpperCase() + catKey.slice(1).toLowerCase(),
            subCategory: subKey,
          };
        }
      }
    }
  }
  return { product: null, categorySlug: null, categoryLabel: null };
};
