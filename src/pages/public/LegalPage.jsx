import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function LegalPage() {
  const location = useLocation();

  // Determine active tab directly from pathname (synchronous, zero cascading re-renders)
  const activeTab = location.pathname.includes('/privacidad')
    ? 'privacidad'
    : location.pathname.includes('/cookies')
    ? 'cookies'
    : 'terminos';

  const seoData = {
    terminos: {
      title: 'Términos y Condiciones',
      desc: 'Términos y condiciones de uso y contratación de servicios de Persianas & Cortinas Dany en Granada, Meta.',
    },
    privacidad: {
      title: 'Política de Privacidad y Tratamiento de Datos',
      desc: 'Política de tratamiento de datos personales conforme a la Ley 1581 de 2012 de Colombia - Persianas & Cortinas Dany.',
    },
    cookies: {
      title: 'Política de Cookies',
      desc: 'Información sobre el uso de cookies y almacenamiento local en Persianas & Cortinas Dany.',
    },
  };

  return (
    <div className="page-enter" id="legal-page">
      <SEO
        title={seoData[activeTab]?.title}
        description={seoData[activeTab]?.desc}
      />

      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Información Legal</h1>
          <p className="page-header-subtitle">
            Transparencia, cumplimiento normativo y protección de tu privacidad
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-10) var(--space-4)' }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            justifyContent: 'center',
            marginBottom: 'var(--space-8)',
          }}
        >
          <Link
            to="/terminos"
            className={`btn ${activeTab === 'terminos' ? 'btn-primary' : 'btn-outline'}`}
            style={{ gap: 8 }}
          >
            <FileText size={16} /> Términos y Condiciones
          </Link>
          <Link
            to="/privacidad"
            className={`btn ${activeTab === 'privacidad' ? 'btn-primary' : 'btn-outline'}`}
            style={{ gap: 8 }}
          >
            <ShieldCheck size={16} /> Política de Privacidad
          </Link>
          <Link
            to="/cookies"
            className={`btn ${activeTab === 'cookies' ? 'btn-primary' : 'btn-outline'}`}
            style={{ gap: 8 }}
          >
            <Cookie size={16} /> Política de Cookies
          </Link>
        </div>

        {/* Content Container */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            backgroundColor: 'var(--color-bg-card, #FFFFFF)',
            padding: 'var(--space-8) var(--space-8)',
            borderRadius: 'var(--radius-lg, 16px)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(45, 106, 79, 0.1)',
            lineHeight: 1.7,
            color: 'var(--color-text-primary, #222)',
          }}
        >
          {/* TAB 1: TÉRMINOS Y CONDICIONES */}
          {activeTab === 'terminos' && (
            <article>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-darker)', marginBottom: 'var(--space-4)' }}>
                Términos y Condiciones de Uso
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 'var(--space-4)' }}>
                Última actualización: 13 de Octubre de 2026
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>1. Información General</h3>
              <p>
                El presente sitio web es propiedad y está operado por <strong>Persianas &amp; Cortinas Dany</strong>, 
                con sede comercial en la <strong>Carrera 13 #20-52 Barrio Montoya, Granada, Meta, Colombia</strong>. 
                Líneas de atención: (+57) 312 355 8218 / (+57) 311 811 9520.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>2. Objeto y Alcance</h3>
              <p>
                Este portal tiene como finalidad dar a conocer nuestro catálogo de cortinas, persianas, estores y accesorios para el hogar u oficina, 
                así como facilitar el contacto directo para cotizaciones personalizadas, toma de medidas e instalación en Granada y municipios aledaños del Meta.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>3. Cotizaciones y Precios</h3>
              <p>
                Las cotizaciones y precios expresados en este sitio o suministrados por canales de WhatsApp son informativos y orientativos, 
                sujetos a la verificación final de medidas, selección de telas, texturas y mecanismos en el sitio de instalación.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>4. Propiedad Intelectual</h3>
              <p>
                Las marcas, fotografías, videos de proyectos y logotipos mostrados en este sitio web son propiedad exclusiva de Persianas &amp; Cortinas Dany. 
                Queda prohibida su reproducción o distribución sin autorización previa por escrito.
              </p>
            </article>
          )}

          {/* TAB 2: POLÍTICA DE PRIVACIDAD */}
          {activeTab === 'privacidad' && (
            <article>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-darker)', marginBottom: 'var(--space-4)' }}>
                Política de Privacidad y Tratamiento de Datos Personales
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 'var(--space-4)' }}>
                Conforme a la Ley 1581 de 2012 y Decreto 1377 de 2013 de la República de Colombia
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>1. Responsable del Tratamiento</h3>
              <p>
                <strong>Persianas &amp; Cortinas Dany</strong>, domiciliada en la Carrera 13 #20-52 Barrio Montoya, Granada, Meta, Colombia. 
                Contacto: (+57) 312 355 8218 y redes oficiales <code>@persianas_cortinas_dany</code>.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>2. Datos que Recolectamos</h3>
              <p>
                A través de nuestros formularios de contacto y enlaces de WhatsApp, recolectamos datos básicos como: 
                nombre completo, número de teléfono, dirección de correo electrónico y detalles sobre su solicitud o medidas de cortinas.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>3. Finalidad del Tratamiento</h3>
              <p>
                Sus datos son utilizados exclusivamente para:
              </p>
              <ul style={{ paddingLeft: 'var(--space-5)', margin: 'var(--space-2) 0' }}>
                <li>Responder a consultas, brindar asesoría y elaborar cotizaciones a la medida.</li>
                <li>Coordinar visitas técnicas de toma de medidas e instalación.</li>
                <li>Hacer seguimiento de garantía y servicio postventa.</li>
              </ul>
              <p>
                <strong>No vendemos, cedemos ni compartimos sus datos con terceras partes ajenas a nuestro servicio comercial.</strong>
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>4. Derechos del Titular (Habeas Data)</h3>
              <p>
                Usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales en cualquier momento comunicándose directamente 
                a nuestras líneas de atención de WhatsApp o en nuestra sede física.
              </p>
            </article>
          )}

          {/* TAB 3: POLÍTICA DE COOKIES */}
          {activeTab === 'cookies' && (
            <article>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-darker)', marginBottom: 'var(--space-4)' }}>
                Política de Cookies y Almacenamiento Local
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 'var(--space-4)' }}>
                Transparencia sobre la tecnología utilizada para garantizar una navegación óptima
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>1. ¿Qué son las Cookies?</h3>
              <p>
                Las cookies y tecnologías de almacenamiento local (como <code>localStorage</code> e <code>IndexedDB</code>) son pequeños archivos 
                que se guardan temporalmente en tu navegador para recordar tus preferencias y hacer que la página cargue más rápido.
              </p>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>2. Cookies y Tecnologías que Empleamos</h3>
              <ul style={{ paddingLeft: 'var(--space-5)', margin: 'var(--space-2) 0' }}>
                <li>
                  <strong>Técnicas y Funcionales (Esenciales):</strong> Necesarias para recordar tus preferencias de cookies, filtros de catálogo 
                  y caché local de imágenes y videos para una navegación inmediata y fluida.
                </li>
                <li>
                  <strong>Analíticas (Opcionales):</strong> Utilizadas únicamente con tu consentimiento para medir visitas anónimas y mejorar la experiencia de usuario.
                </li>
              </ul>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginTop: 'var(--space-4)' }}>3. ¿Cómo Gestionarlas?</h3>
              <p>
                Puedes aceptar o rechazar las cookies no esenciales desde el banner de consentimiento que aparece en la parte inferior, 
                o configurarlas directamente en las opciones de privacidad de tu navegador.
              </p>
            </article>
          )}

          <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-4)', borderTop: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" className="btn btn-outline btn-sm" style={{ gap: 6 }}>
              Volver al Inicio
            </Link>
            <Link to="/contacto" className="btn btn-primary btn-sm" style={{ gap: 6 }}>
              Contactar Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
