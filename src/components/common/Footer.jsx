import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import BrandLogo from './BrandLogo';

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <BrandLogo variant="footer" scrolled={false} isHome={false} />
            <p className="footer-brand-text" style={{ marginTop: 'var(--space-4)' }}>
              Transformamos tus espacios con cortinas y persianas de la más alta calidad en Granada, Meta. 
              Elegancia, diseño y funcionalidad para tu hogar u oficina.
            </p>
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
              <a
                href="https://wa.me/573123558218"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ gap: 6 }}
              >
                <MessageCircle size={15} /> WhatsApp 1
              </a>
              <a
                href="https://wa.me/573118119520"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ gap: 6, color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <MessageCircle size={15} /> WhatsApp 2
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Navegación</h4>
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/catalogo" className="footer-link">Catálogo</Link>
            <Link to="/galeria" className="footer-link">Galería</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-heading">Productos</h4>
            <Link to="/catalogo?cat=cortinas" className="footer-link">Cortinas</Link>
            <Link to="/catalogo?cat=persianas" className="footer-link">Persianas</Link>
            <Link to="/catalogo?cat=estores" className="footer-link">Estores</Link>
            <Link to="/catalogo?cat=accesorios" className="footer-link">Accesorios</Link>
          </div>

          {/* Contact & Branch */}
          <div>
            <h4 className="footer-heading">Nuestra Sede</h4>

            <div className="footer-contact-item">
              <div className="footer-contact-icon"><MapPin size={16} /></div>
              <span><strong>Barrio Montoya:</strong><br />Carrera 13 #20-52, Granada | Meta</span>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon"><Phone size={16} /></div>
              <span>
                <a href="tel:3123558218" style={{ color: 'inherit' }}>312 355 8218</a> &bull;{' '}
                <a href="tel:3118119520" style={{ color: 'inherit' }}>311 811 9520</a>
              </span>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon"><Clock size={16} /></div>
              <span>Granada, Meta &bull; Lun - Sáb: 8:00 - 18:00</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: 'var(--space-4)',
          marginTop: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
          fontSize: 'var(--text-xs)',
          color: 'rgba(255, 255, 255, 0.65)',
        }}>
          <Link to="/terminos" style={{ color: 'inherit', textDecoration: 'none' }}>
            Términos y Condiciones
          </Link>
          <span>&bull;</span>
          <Link to="/privacidad" style={{ color: 'inherit', textDecoration: 'none' }}>
            Política de Privacidad
          </Link>
          <span>&bull;</span>
          <Link to="/cookies" style={{ color: 'inherit', textDecoration: 'none' }}>
            Política de Cookies
          </Link>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Persianas &amp; Cortinas Dany. Decoración con Estilo.</p>
          <div className="footer-socials">
            <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', marginRight: 4 }}>
              @persianas_cortinas_dany
            </span>
            <a
              href="https://facebook.com/persianas_cortinas_dany"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook @persianas_cortinas_dany"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://instagram.com/persianas_cortinas_dany"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram @persianas_cortinas_dany"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
