type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 48 48" className="size-10 shrink-0" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="21" fill="#fffdfa" stroke="#c39a89" strokeWidth="1.25" />
        <path d="M10 15.5h28M10 32.5h28" stroke="#dcc7bb" strokeWidth="0.8" />
        <text
          x="24"
          y="29.5"
          textAnchor="middle"
          fill="#7c5548"
          fontFamily="Georgia, serif"
          fontSize="18"
          letterSpacing="-1.5"
        >
          NB
        </text>
      </svg>

      {!compact && (
        <span className="font-serif text-2xl tracking-[0.12em] text-stone-800">NAILBOOK</span>
      )}
    </span>
  );
}
