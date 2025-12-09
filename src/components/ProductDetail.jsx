import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Add } from "./Icons";
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const ProductDetail = () => {
  const { id } = useParams(); 
  const { allProducts, addToCart } = useCart();

  // Función auxiliar para buscar recursivamente en tu estructura de datos
  const findProductInContext = (data, searchKey) => {
    if (!data) return null;
    
    for (const categoryKey in data) {
      const category = data[categoryKey];
      
      if (Array.isArray(category)) {
        // Búsqueda en categorías directas (ej: Termos)
        const found = category.find(p => p.href === searchKey || String(p.id) === String(searchKey));
        if (found) return found;
      } 
      else if (typeof category === 'object') {
        // Búsqueda en subcategorías (ej: Mates -> Imperiales)
        for (const subKey in category) {
          const subCategory = category[subKey];
          if (Array.isArray(subCategory)) {
            const found = subCategory.find(p => p.href === searchKey || String(p.id) === String(searchKey));
            if (found) return found;
          }
        }
      }
    }
    return null;
  };

  const product = findProductInContext(allProducts, id);

  // Scroll al inicio al cambiar de producto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, category: product.category || 'Varios' });
    toast(
      <div className="flex items-center gap-2 text-white font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        {product.name} agregado al carrito
      </div>,
      {
        className: "rounded bg-yellow-600 text-xs text-[#2ec946]",
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      }
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h2 className="text-2xl font-bold text-[#692904] mb-4">Producto no encontrado</h2>
        <Link to="/#productos" className="text-orange-600 hover:underline font-medium">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? "$0" : `$${Number.isInteger(price) ? price : price.toFixed(2)}`;

  // JSON-LD para Google (Datos Estructurados)
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": `https://tienda-mates.vercel.app${product.image}`,
    "description": product.description || "Producto artesanal de FFMates",
    "brand": { "@type": "Brand", "name": "FFMates" },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "ARS",
      "price": product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-6">
      
      {/* 1. SEO DINÁMICO CON HELMET */}
      <Helmet>
        <title>FFMATES | {product.name}</title>
        <meta name="description" content={product.description || `Comprá ${product.name} al mejor precio en FFMates. Calidad asegurada.`} />
        
        {/* Open Graph (WhatsApp / Facebook) */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content="¡Mirá este producto increíble! Hacé clic para ver el precio y detalles." />
        <meta property="og:image" content={`https://tienda-mates.vercel.app${product.image}`} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
      </Helmet>

      {/* 2. DATOS ESTRUCTURADOS (JSON-LD) */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="max-w-6xl mx-auto">
        <Link to="/#productos" className="inline-flex items-center text-[#692904] font-semibold hover:text-orange-600 mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Imagen del Producto */}
            <div className="h-[400px] md:h-[600px] bg-gray-100 relative group overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>

            {/* Detalles del Producto */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#2E1300] mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="text-3xl font-bold text-[#692904]">{formattedPrice}</span>
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                    En Stock: {product.stock}
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                    Sin Stock
                  </span>
                )}
              </div>

              <div className="prose text-gray-600 mb-8 leading-relaxed text-lg">
                <p>{product.description || "Producto de excelente calidad seleccionado especialmente para vos."}</p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all transform active:scale-[0.98] ${
                    product.stock > 0 
                      ? 'bg-[#692904] text-white hover:bg-[#8B4513] shadow-lg hover:shadow-orange-900/20' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Add size={24} color={product.stock > 0 ? "#fff" : "#9ca3af"} />
                  {product.stock > 0 ? "AGREGAR AL CARRITO" : "SIN STOCK DISPONIBLE"}
                </button>
                <p className="text-center text-gray-400 text-sm mt-4">Envío seguro a todo el país 🇦🇷</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;