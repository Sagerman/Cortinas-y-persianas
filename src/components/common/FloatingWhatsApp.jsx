import { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, MapPin } from 'lucide-react';

const PHONE_1 = import.meta.env.VITE_WHATSAPP_PHONE_1 || '573123558218';
const PHONE_2 = import.meta.env.VITE_WHATSAPP_PHONE_2 || '573118119520';
const DEFAULT_MSG = import.meta.env.VITE_WHATSAPP_DEFAULT_MSG || 'Hola Persianas y Cortinas Dany, quiero cotizar y conocer más sobre sus productos.';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const encodedMsg = encodeURIComponent(DEFAULT_MSG);
  const link1 = `https://wa.me/${PHONE_1}?text=${encodedMsg}`;
  const link2 = `https://wa.me/${PHONE_2}?text=${encodedMsg}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        fontFamily: 'var(--font-primary, sans-serif)',
      }}
      id="floating-whatsapp-widget"
    >
      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Opciones de contacto por WhatsApp"
          style={{
            position: 'absolute',
            bottom: '70px',
            right: '0',
            width: '320px',
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.22), 0 2px 10px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.25s ease-out',
            border: '1px solid rgba(45, 106, 79, 0.15)',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              color: '#FFFFFF',
              padding: '16px 18px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Cerrar ventana de WhatsApp"
            >
              <X size={16} />
            </button>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D8F3DC', fontWeight: 600 }}>
              Persianas &amp; Cortinas Dany
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '2px' }}>
              ¿En qué podemos asesorarte?
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> Barrio Montoya &bull; Granada, Meta
            </div>
          </div>

          {/* Body with direct contact lines */}
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '0.8rem', color: '#555', margin: 0, lineHeight: 1.35 }}>
              Escríbenos directamente para cotizaciones, visitas de asesoría o catálogo personalizado:
            </p>

            {/* Line 1 */}
            <a
              href={link1}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: '#F4FBF7',
                border: '1px solid #C7E8D8',
                color: '#1B4332',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E3F6ED';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F4FBF7';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                  }}
                >
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>WhatsApp Línea 1</div>
                  <div style={{ fontSize: '0.75rem', color: '#2D6A4F', fontWeight: 600 }}>312 355 8218</div>
                </div>
              </div>
              <ChevronRight size={18} color="#2D6A4F" />
            </a>

            {/* Line 2 */}
            <a
              href={link2}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: '#F4FBF7',
                border: '1px solid #C7E8D8',
                color: '#1B4332',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E3F6ED';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F4FBF7';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                  }}
                >
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>WhatsApp Línea 2</div>
                  <div style={{ fontSize: '0.75rem', color: '#2D6A4F', fontWeight: 600 }}>311 811 9520</div>
                </div>
              </div>
              <ChevronRight size={18} color="#2D6A4F" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 10px 28px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.45)';
        }}
        aria-label={isOpen ? 'Cerrar opciones de WhatsApp' : 'Abrir opciones de WhatsApp de Persianas y Cortinas Dany'}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
