import { useState } from 'react';
import { MapPin, Phone, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    // Honeypot field for anti-spam (invisible to humans)
    website_hp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check: If bot filled this hidden field, pretend success silently
    if (formData.website_hp) {
      console.warn('Bot detected by honeypot.');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      return;
    }

    // Validation
    const cleanEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (formData.phone && formData.phone.replace(/\D/g, '').length < 7) {
      setErrorMessage('Por favor ingresa un número de teléfono válido (al menos 7 dígitos).');
      return;
    }

    setIsSubmitting(true);

    // Simulate async submission (ready for API integration)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', website_hp: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setErrorMessage('Ocurrió un error al enviar el mensaje. Por favor contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: <MessageCircle size={22} />,
      label: 'WhatsApp y Línea 1',
      value: (
        <a href="https://wa.me/573123558218" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
          312 355 8218
        </a>
      ),
    },
    {
      icon: <Phone size={22} />,
      label: 'WhatsApp y Línea 2',
      value: (
        <a href="https://wa.me/573118119520" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
          311 811 9520
        </a>
      ),
    },
    {
      icon: <MapPin size={22} />,
      label: 'Nuestra Sede (Barrio Montoya)',
      value: 'Carrera 13 #20-52 — Granada, Meta',
    },
    {
      icon: <Clock size={22} />,
      label: 'Horario de Atención',
      value: 'Lunes a Sábado: 8:00 AM – 6:00 PM',
    },
  ];

  return (
    <div className="page-enter" id="contact-page">
      <SEO
        title="Contacto y Cotizaciones"
        description="Ponte en contacto con Persianas & Cortinas Dany en Granada, Meta. Cotizaciones personalizadas y visitas de asesoría en el Barrio Montoya."
      />

      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Contáctanos</h1>
          <p className="page-header-subtitle">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form animate-fade-in-up">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                marginBottom: 'var(--space-6)',
                color: 'var(--color-primary-darker)',
              }}>
                Envíanos un Mensaje
              </h2>

              {submitted && (
                <div style={{
                  padding: 'var(--space-4)',
                  background: 'rgba(64, 145, 108, 0.1)',
                  border: '1px solid rgba(64, 145, 108, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--space-5)',
                }}>
                  ✅ ¡Mensaje enviado con éxito! Te contactaremos a la brevedad.
                </div>
              )}

              {errorMessage && (
                <div style={{
                  padding: 'var(--space-4)',
                  background: 'rgba(230, 57, 70, 0.1)',
                  border: '1px solid rgba(230, 57, 70, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  color: '#D90429',
                  fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--space-5)',
                }}>
                  ⚠️ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot hidden field for anti-spam */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website_hp">No llenar si eres humano</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Nombre completo *</label>
                  <input
                    id="contact-name"
                    name="name"
                    className="form-input"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      className="form-input"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">Teléfono / WhatsApp</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      className="form-input"
                      type="tel"
                      placeholder="(312) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Mensaje o Medidas *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Cuéntanos qué producto te interesa, tipo de ventana o medidas aproximadas..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-cards animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="contact-info-card"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <div className="contact-info-icon">{info.icon}</div>
                  <div>
                    <div className="contact-info-label">{info.label}</div>
                    <div className="contact-info-value">{info.value}</div>
                  </div>
                </div>
              ))}

              {/* Social Networks card */}
              <div
                className="contact-info-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.08), rgba(201, 169, 110, 0.08))',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                }}
              >
                <div className="contact-info-icon" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="contact-info-label">Redes Sociales</div>
                  <div className="contact-info-value" style={{ fontWeight: 600 }}>
                    @persianas_cortinas_dany
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                    <a
                      href="https://instagram.com/persianas_cortinas_dany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
                    >
                      Instagram
                    </a>
                    <a
                      href="https://facebook.com/persianas_cortinas_dany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ padding: '4px 10px', fontSize: 'var(--text-xs)' }}
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
