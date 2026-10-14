import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation if open
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname, mobileOpen]);

  const isHome = location.pathname === '/';
  const navClass = `navbar ${scrolled || !isHome ? 'scrolled' : ''}`;

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/galeria', label: 'Galería' },
    { to: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <nav className={navClass} id="main-navbar">
        <div className="container">
          <Link to="/" className="navbar-logo" aria-label="Inicio Persianas & Cortinas Dany">
            <BrandLogo scrolled={scrolled} isHome={isHome} />
          </Link>

          <div className="navbar-links">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="navbar-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
