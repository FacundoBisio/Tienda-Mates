// src/components/Icons.jsx
import React from 'react';

// ─── Parámetros SVG comunes ────────────────────────────────────────────
const SVG_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// ─── Iconos de categorías ──────────────────────────────────────────────

/** 🧉 Mate — calabaza estilizada con bombilla */
export const MateIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    {/* bombilla */}
    <line x1="13" y1="2" x2="11.5" y2="8"/>
    {/* borde superior */}
    <line x1="7" y1="8" x2="17" y2="8"/>
    {/* cuerpo gourd */}
    <path d="M7.5 8C6.5 10.5 6 14.5 7.5 17.5C9 20 15 20 16.5 17.5C18 14.5 17.5 10.5 16.5 8"/>
  </svg>
);

/** ♨️ Termo — frasco térmico */
export const ThermoIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <rect x="10" y="2" width="4" height="2.5" rx="0.5"/>
    <path d="M9 4.5C8 4.5 7 5.5 7 6.5V20a1.5 1.5 0 001.5 1.5h7A1.5 1.5 0 0017 20V6.5c0-1-.9-2-2-2"/>
    <line x1="7" y1="13" x2="17" y2="13"/>
    <line x1="9" y1="9.5" x2="15" y2="9.5"/>
  </svg>
);

/** 🌿 Yerba — hoja */
export const LeafIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M11 20A7 7 0 014 13V6l7 1 7-1v7a7 7 0 01-7 7z"/>
    <line x1="11" y1="20" x2="11" y2="7"/>
  </svg>
);

/** ✨ Bombilla — straw con filtro */
export const BombillaIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <line x1="12" y1="3" x2="12" y2="13"/>
    <ellipse cx="12" cy="17" rx="4" ry="3"/>
    <line x1="8.5" y1="15.5" x2="15.5" y2="15.5"/>
    <line x1="8.5" y1="17" x2="15.5" y2="17"/>
    <line x1="8.5" y1="18.5" x2="15.5" y2="18.5"/>
  </svg>
);

/** 🎒 Accesorios — bolso/mochila */
export const BagIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

/** 📦 Combo — caja */
export const BoxIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
);

// ─── Iconos de features / beneficios ──────────────────────────────────

/** 🚚 Envío — camión de entrega */
export const TruckIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

/** 💬 Chat / WhatsApp — burbuja de mensaje */
export const ChatIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

/** 🔒 Seguridad — candado */
export const LockIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

/** 🎨 Artesanal — pincel/pluma */
export const CraftIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

/** 🛡️ Garantía — escudo con check */
export const ShieldIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

/** ⭐ Estrella — calificación */
export const StarIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/** ⏱ Reloj / tiempo de respuesta */
export const ClockIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

/** 📍 Ubicación */
export const MapPinIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/** 👥 Clientes / personas */
export const UsersIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} {...SVG_PROPS}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

// ─── Helper: ícono por slug de categoría ──────────────────────────────
/**
 * Devuelve el componente de ícono correcto para cada categoría.
 * Uso: <CategoryIcon slug="mates" className="w-5 h-5 text-[#4C674A]" />
 */
export const CategoryIcon = ({ slug, className }) => {
  const map = {
    mates:      MateIcon,
    termos:     ThermoIcon,
    yerbas:     LeafIcon,
    bombillas:  BombillaIcon,
    accesorios: BagIcon,
    combos:     BoxIcon,
  };
  const Icon = map[slug?.toLowerCase()] || BoxIcon;
  return <Icon className={className} />;
};

// ─── Iconos sociales (legacy, mantener compatibilidad) ────────────────
export function RedesSociales() {
  return (
    <div className="flex justify-center space-x-6 mt-6 text-brand-dark text-2xl">
      <a href="https://www.instagram.com/ff.mates/?hl=es" className="hover:scale-110 transition" aria-label="Instagram">
        <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-brand-light hover:text-white transition">
          <path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/>
          <path d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"/>
          <path d="M17.5 6.51L17.51 6.499" strokeLinecap="round"/>
        </svg>
      </a>
      <a href="https://wa.me/5493513662570" className="hover:scale-110 transition" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-brand-light hover:text-white transition">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

// Carrito (legacy)
export function AddToCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M17 17h-11v-14h-2"/>
      <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13"/>
      <path d="M15 6h6m-3 -3v6"/>
    </svg>
  );
}

export function RemoveFromCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
      <path d="M17 17h-11v-14h-2"/>
      <path d="M6 5l8 .571m5.43 4.43l-.429 3h-13"/>
      <path d="M17 3l4 4"/>
      <path d="M21 3l-4 4"/>
    </svg>
  );
}
