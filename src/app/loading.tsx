// src/app/loading.tsx — shown while any page segment streams
export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1a2e19 0%, #2d4a2b 40%, #3C503A 100%)' }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#a8c5a5] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase">Cargando</p>
      </div>
    </div>
  );
}
