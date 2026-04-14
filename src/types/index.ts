export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  href: string;
  description?: string;
  stock: number;
  category?: string;
  catKey?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface MatesSubcategories {
  [subcat: string]: Product[];
}

export interface ProductsData {
  MATES: MatesSubcategories;
  TERMOS: Product[];
  YERBAS: Product[];
  BOMBILLAS: Product[];
  ACCESORIOS: Product[];
  COMBOS: Product[];
}

export interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  allProducts: ProductsData | Record<string, never>;
  isLoading: boolean;
}

export interface ProductMeta {
  product: Product | null;
  categorySlug: string | null;
  categoryLabel: string | null;
  subCategory?: string;
}
