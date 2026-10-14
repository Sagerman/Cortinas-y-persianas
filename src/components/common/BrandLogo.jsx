/**
 * Monogram Logo "PDC" (Persianas y Cortinas Dany)
 * Based directly on the physical business card logo.
 */
export function PdcMonogram({ size = 42, light = false }) {
  const strokeColor = light ? '#2D6A4F' : '#2D6A4F';
  const bgColor = light ? '#FFFFFF' : '#FFFFFF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Logo Persianas & Cortinas Dany"
    >
      {/* Circle container matching the card's circular white badge */}
      <circle cx="50" cy="50" r="48" fill={bgColor} stroke="#E0DDD5" strokeWidth="1.5" />

      {/* Monogram P - D - C overlapping letters */}
      <g stroke={strokeColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Letter P */}
        <line x1="28" y1="26" x2="28" y2="72" />
        <path d="M 28 26 C 45 26, 45 50, 28 50" />

        {/* Letter D (descending loop) */}
        <line x1="42" y1="34" x2="42" y2="74" />
        <path d="M 42 34 C 68 34, 68 74, 42 74" />

        {/* Letter C (upper & outer right curve) */}
        <path d="M 72 35 C 56 22, 40 38, 54 58 C 64 72, 74 65, 74 65" />
      </g>
    </svg>
  );
}

export default function BrandLogo({
  variant = 'navbar', // 'navbar' | 'footer' | 'admin'
  scrolled = false,
  isHome = false,
}) {
  const isWhiteHeader = !isHome || scrolled;
  const primaryColor = isWhiteHeader ? 'var(--color-primary-darker)' : 'var(--color-white)';
  const subtitleColor = isWhiteHeader ? 'var(--color-primary)' : 'var(--color-mint-light)';
  const sloganColor = isWhiteHeader ? 'var(--color-accent-dark)' : 'var(--color-accent-light)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <PdcMonogram size={variant === 'footer' ? 48 : 42} light />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.14em',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: subtitleColor,
            fontFamily: 'var(--font-primary)',
          }}
        >
          Persianas &amp; Cortinas
        </span>
        <span
          style={{
            fontSize: variant === 'footer' ? '1.45rem' : '1.3rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: primaryColor,
            fontFamily: 'var(--font-primary)',
            textTransform: 'uppercase',
          }}
        >
          Dany
        </span>
        <span
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: sloganColor,
            fontFamily: 'var(--font-primary)',
            marginTop: 1,
          }}
        >
          Decoración con estilo
        </span>
      </div>
    </div>
  );
}
