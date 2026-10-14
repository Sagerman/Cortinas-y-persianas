import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { PdcMonogram } from '../../components/common/BrandLogo';

export default function NotFoundPage() {
  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)' }}>
      <SEO
        title="Página No Encontrada (404)"
        description="La página que estás buscando no existe o fue trasladada. Vuelve al inicio o explora nuestro catálogo de cortinas y persianas."
      />
      <div
        className="container"
        style={{
          maxWidth: '560px',
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-card, #FFFFFF)',
          padding: 'var(--space-10) var(--space-8)',
          borderRadius: 'var(--radius-xl, 24px)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid rgba(45, 106, 79, 0.1)',
        }}
      >
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
          <PdcMonogram size={72} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-6xl)',
            fontWeight: 800,
            color: 'var(--color-primary-darker)',
            lineHeight: 1,
            marginBottom: 'var(--space-2)',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: 'var(--text-2xl)',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-primary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          Página No Encontrada
        </h1>

        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-base)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-8)',
          }}
        >
          Lo sentimos, la página que buscas no existe, cambió de dirección o se encuentra temporalmente fuera de servicio.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            justifyContent: 'center',
          }}
        >
          <Link to="/" className="btn btn-primary btn-md" style={{ gap: 8 }}>
            <Home size={18} />
            Volver al Inicio
          </Link>
          <Link to="/catalogo" className="btn btn-outline btn-md" style={{ gap: 8 }}>
            <Search size={18} />
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
