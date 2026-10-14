import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'pdc_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!consent) {
      // Delay display slightly to avoid jarring layout on first paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ choice: 'all', timestamp: new Date().toISOString() }));
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ choice: 'essential', timestamp: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Consentimiento de cookies"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '540px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        color: '#222222',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid rgba(45, 106, 79, 0.2)',
        zIndex: 998,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        animation: 'fadeInUp 0.3s ease-out',
        fontFamily: 'var(--font-primary, sans-serif)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(45, 106, 79, 0.1)',
            color: '#2D6A4F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Cookie size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B4332' }}>
            Valoramos tu privacidad
          </div>
          <p style={{ fontSize: '0.78rem', color: '#555', margin: '4px 0 0 0', lineHeight: 1.45 }}>
            Utilizamos cookies esenciales para garantizar el correcto funcionamiento del sitio y almacenamiento local para una carga veloz. 
            Consulta nuestra <Link to="/cookies" style={{ color: '#2D6A4F', fontWeight: 600, textDecoration: 'underline' }}>Política de Cookies</Link>.
          </p>
        </div>
        <button
          onClick={handleEssentialOnly}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: '2px',
          }}
          aria-label="Cerrar aviso de cookies"
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          onClick={handleEssentialOnly}
          className="btn btn-outline btn-sm"
          style={{ padding: '6px 14px', fontSize: '0.78rem', borderColor: '#ccc' }}
        >
          Solo necesarias
        </button>
        <button
          onClick={handleAcceptAll}
          className="btn btn-primary btn-sm"
          style={{ padding: '6px 16px', fontSize: '0.78rem' }}
        >
          Aceptar todas
        </button>
      </div>
    </aside>
  );
}
