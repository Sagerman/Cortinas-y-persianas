import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Palette, Truck, Star } from 'lucide-react';
import HeroBanner from '../../components/common/HeroBanner';
import ProductCard from '../../components/common/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { CATEGORIES } from '../../utils/sampleData';
import GalleryGrid from '../../components/common/GalleryGrid';
import { useGallery } from '../../hooks/useGallery';

import SEO from '../../components/common/SEO';

export default function HomePage() {
  const { featuredProducts, loading } = useProducts();
  const { items: galleryItems } = useGallery();
  const observerRef = useRef(null);

  // Scroll-triggered animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [loading]);

  const features = [
    { icon: <Palette size={28} />, title: 'Diseños Exclusivos', text: 'Amplia variedad de estilos, colores y texturas para todos los gustos y necesidades.' },
    { icon: <Shield size={28} />, title: 'Calidad Garantizada', text: 'Materiales de primera calidad con garantía de durabilidad y resistencia.' },
    { icon: <Truck size={28} />, title: 'Instalación Profesional', text: 'Servicio de instalación incluido con técnicos experimentados.' },
    { icon: <Star size={28} />, title: 'Atención Personalizada', text: 'Asesoramiento experto para encontrar la solución perfecta para tus espacios.' },
  ];

  return (
    <div className="page-enter" id="home-page">
      <SEO
        title="Persianas & Cortinas Dany — Decoración con Estilo | Granada, Meta"
        description="Cortinas y persianas a medida en Granada, Meta. Diseño, elegancia y calidad garantizada en Barrio Montoya. ¡Cotiza hoy mismo!"
      />
      {/* Hero */}
      <HeroBanner />

      {/* Categories Preview */}
      <section className="section" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <h2 className="section-title animate-on-scroll">Nuestras Categorías</h2>
          <span className="accent-line animate-on-scroll"></span>
          <p className="section-subtitle animate-on-scroll">
            Encuentra la solución perfecta para cada ventana de tu hogar
          </p>

          <div className="features-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/catalogo?cat=${cat.id}`}
                className="feature-card animate-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="feature-icon">
                  <span style={{ fontSize: '1.75rem' }}>{cat.icon}</span>
                </div>
                <h3 className="feature-title">{cat.name}</h3>
                <p className="feature-text">Explora nuestra colección de {cat.name.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Productos Destacados</h2>
          <span className="accent-line animate-on-scroll"></span>
          <p className="section-subtitle animate-on-scroll">
            Los favoritos de nuestros clientes, seleccionados por su calidad y diseño
          </p>

          {!loading && (
            <div className="product-grid">
              {featuredProducts.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/catalogo" className="btn btn-primary btn-lg">
              Ver Todo el Catálogo
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      {galleryItems.length > 0 && (
        <section className="section" style={{ background: 'var(--color-white)' }}>
          <div className="container">
            <h2 className="section-title animate-on-scroll">Nuestros Trabajos</h2>
            <span className="accent-line animate-on-scroll"></span>
            <p className="section-subtitle animate-on-scroll">
              Fotos y videos reales de cortinas y persianas que hemos instalado
            </p>

            <GalleryGrid items={galleryItems} limit={6} />

            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
              <Link to="/galeria" className="btn btn-outline btn-lg" id="home-gallery-cta">
                Ver Galería Completa
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section
        className="section"
        style={galleryItems.length > 0 ? undefined : { background: 'var(--color-white)' }}
      >
        <div className="container">
          <h2 className="section-title animate-on-scroll">¿Por Qué Elegirnos?</h2>
          <span className="accent-line animate-on-scroll"></span>
          <p className="section-subtitle animate-on-scroll">
            Más que cortinas, ofrecemos una experiencia completa de transformación de espacios
          </p>

          <div className="features-grid">
            {features.map((feat, i) => (
              <div
                key={i}
                className="feature-card animate-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-text">{feat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="section"
        style={{
          background: 'var(--gradient-hero)',
          textAlign: 'center',
          color: 'var(--color-white)',
        }}
      >
        <div className="container animate-on-scroll">
          <h2
            className="section-title"
            style={{ color: 'var(--color-white)' }}
          >
            ¿Listo para Transformar tus Espacios?
          </h2>
          <span className="accent-line"></span>
          <p
            className="section-subtitle"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Contáctanos hoy y recibe asesoría personalizada sin compromiso
          </p>
          <Link to="/contacto" className="hero-btn-primary" style={{ marginTop: 'var(--space-4)' }}>
            Solicitar Cotización
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
