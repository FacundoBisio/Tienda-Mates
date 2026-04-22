# FFMATES — Tienda de Mates Artesanales

E-commerce full-stack de mates artesanales, termos, bombillas y yerbas. Construido con Next.js 15 (App Router), TypeScript, Tailwind y MongoDB Atlas. En producción en **[tienda-mates.vercel.app](https://tienda-mates.vercel.app/)**.

<!-- SCREENSHOT: Home / Hero -->
![Home](docs/screenshots/01-home.png)

---

## Features

### Tienda
- Catálogo dinámico por categorías (mates, termos, bombillas, yerbas, accesorios, combos).
- Página de detalle por producto con galería, variantes y CTA a WhatsApp.
- Buscador con filtrado en tiempo real.
- Carrito persistente (Context API + `localStorage`).
- Favoritos / wishlist persistidos localmente.
- Checkout directo por WhatsApp con mensaje pre-armado del pedido.
- Newsletter vía EmailJS.

### Panel de administración (`/admin`)
- Login con JWT en cookie `httpOnly` + middleware que protege `/admin/**` y `/api/admin/**`.
- CRUD de productos (crear, editar, borrar, cambiar stock y precio).
- Subida de imágenes.
- Listado y detalle de órdenes.

### SEO y performance
- Metadata dinámica por página, sitemap.xml y robots.txt generados por Next.
- JSON-LD (`Store` + `FAQPage`) para rich results.
- Google Analytics + Google AdSense integrados vía `@next/third-parties`.
- Imágenes optimizadas con `next/image` (AVIF/WebP automáticos).
- Verificación Google Search Console.

<!-- SCREENSHOT: Catálogo por categoría -->
![Categoría](docs/screenshots/02-categoria.png)

<!-- SCREENSHOT: Detalle de producto -->
![Producto](docs/screenshots/03-producto.png)

<!-- SCREENSHOT: Carrito -->
![Carrito](docs/screenshots/04-carrito.png)

<!-- SCREENSHOT: Admin panel -->
![Admin](docs/screenshots/05-admin.png)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router, Server Components) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 3 |
| Base de datos | MongoDB Atlas |
| Auth | JWT en cookie httpOnly + middleware |
| Email | EmailJS |
| Iconos | lucide-react |
| Notificaciones | react-toastify |
| Deploy | Vercel |

---

## Arquitectura

```
src/
├── app/
│   ├── admin/              # Panel admin (protegido por middleware)
│   ├── api/                # Route handlers (products, orders, auth)
│   ├── buscar/             # Buscador
│   ├── categoria/[slug]/   # Páginas de categoría
│   ├── favoritos/
│   ├── producto/[id]/      # Detalle de producto
│   ├── politica-de-privacidad/
│   ├── layout.tsx          # Metadata global, GA, AdSense
│   ├── sitemap.ts
│   └── robots.ts
├── components/             # Header, Footer, Cart, ProductCard, etc.
├── context/Cart.tsx        # Estado global del carrito
├── hooks/                  # useCart, useWishlist
├── lib/                    # mongodb, auth, productsDb, ordersDb
├── middleware.ts           # Guard de /admin y /api/admin
└── types/index.ts
```

---

## Setup local

### Requisitos
- Node.js 18+
- Cuenta en MongoDB Atlas (o instancia local)

### Variables de entorno
Crear `.env.local` en la raíz:

```env
MONGODB_URI=mongodb+srv://usuario:pass@cluster.mongodb.net/tienda-mates
JWT_SECRET=tu-secret-largo-y-random
ADMIN_USER=admin
ADMIN_PASSWORD_HASH=$2b$10$...        # bcrypt hash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

### Correr

```bash
git clone https://github.com/FacundoBisio/Tienda-Mates.git
cd Tienda-Mates
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Scripts
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm start` — servir el build
- `npm run lint` — ESLint

---

## Screenshots

> **Nota**: subí tus screenshots a `docs/screenshots/` con estos nombres y se renderizan automáticamente arriba. Alternativa rápida: arrastrá la imagen a un issue/PR de GitHub y reemplazá la URL del `![...]` por la que te da GitHub (ej. `https://github.com/user-attachments/assets/xxxxx`).

Capturas sugeridas:
1. `01-home.png` — Hero + "El mate que te define"
2. `02-categoria.png` — Grid de productos (ej. `/categoria/mates`)
3. `03-producto.png` — Detalle con galería y CTA WhatsApp
4. `04-carrito.png` — Sidebar del carrito abierto
5. `05-admin.png` — Panel admin (lista de productos)

---

## Contacto

- **Facundo Matías Bisio Griffa** — facubisio433@gmail.com
- [LinkedIn](https://www.linkedin.com/in/facundo-bisio-25a104247/)

---

## Licencia

MIT — ver [LICENSE](./LICENSE).
