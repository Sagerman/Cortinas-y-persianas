import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles (memoized to keep render pure)
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${4 + Math.random() * 4}s`,
    size: `${2 + Math.random() * 4}px`,
  })), []);

  return (
    <section className="hero" ref={heroRef} id="hero-banner">
      <div
        className="hero-bg"
        ref={bgRef}
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(45, 106, 79, 0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(201, 169, 110, 0.2) 0%, transparent 60%)',
        }}
      />
      <div className="hero-overlay" />

      {/* Floating Particles */}
      <div className="hero-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          Decoración con Estilo &bull; Granada, Meta
        </div>

        <h1 className="hero-title">
          Persianas y Cortinas
          <span className="hero-title-accent">Dany</span>
        </h1>

        <p className="hero-description">
          Transformamos tus espacios con cortinas y persianas a tu medida. 
          Elegancia, calidad y la mejor asesoría en Granada, Meta.
        </p>

        <div className="hero-actions">
          <Link to="/catalogo" className="hero-btn-primary">
            Ver Catálogo
            <ArrowRight size={20} />
          </Link>
          <Link to="/contacto" className="hero-btn-secondary">
            Contáctanos
          </Link>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Desplázate</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
