import productsData from '../data/productsData';

export const findProductByHref = (href) => {
  for (const categoria in productsData) {
    if (Array.isArray(productsData[categoria])) {
      const prod = productsData[categoria].find((p) => p.href === href);
      if (prod) return prod;
    } else {
      for (const subcat in productsData[categoria]) {
        const prod = productsData[categoria][subcat].find((p) => p.href === href);
        if (prod) return prod;
      }
    }
  }
  return null;
};
