import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Images, ArrowRight, Image as ImageIcon, Video } from 'lucide-react';
import GalleryGrid from '../../components/common/GalleryGrid';
import { useGallery } from '../../hooks/useGallery';
import SEO from '../../components/common/SEO';

export default function GalleryPage() {
  const { items, categories, loading } = useGallery();
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');

  const filtered = useMemo(
    () =>
      items.filter(
        (i) => (category === 'all' || i.category === category) && (type === 'all' || i.type === type)
      ),
    [items, category, type]
  );

  const photoCount = items.filter((i) => i.type === 'image').length;
  const videoCount = items.filter((i) => i.type === 'video').length;

  return (
    <div className="page-enter" id="gallery-page">
      <SEO
        title="Galería de Proyectos y Videos"
        description="Fotos y videos de cortinas y persianas instaladas por Persianas & Cortinas Dany en Granada, Meta. Inspírate con nuestros trabajos reales."
      />

      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Galería de Proyectos</h1>
          <p className="page-header-subtitle">
            Trabajos reales de cortinas y persianas instaladas en hogares y oficinas
          </p>
          {items.length > 0 && (
            <div className="gallery-stats">
              <span><ImageIcon size={16} /> {photoCount} fotos</span>
              <span><Video size={16} /> {videoCount} videos</span>
            </div>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
              <p>Cargando galería...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Images size={32} />
              </div>
              <h2 className="empty-state-title">Muy pronto verás nuestros trabajos aquí</h2>
              <p className="empty-state-text">Estamos preparando fotos y videos de nuestros proyectos.</p>
            </div>
          ) : (
            <>
              <div className="gallery-toolbar">
                <div className="category-filter" style={{ marginBottom: 0 }}>
                  <button
                    className={`category-pill ${category === 'all' ? 'active' : ''}`}
                    onClick={() => setCategory('all')}
                    id="gallery-cat-all"
                  >
                    <span style={{ marginRight: 6 }}>✨</span>Todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-pill ${category === cat.id ? 'active' : ''}`}
                      onClick={() => setCategory(cat.id)}
                      id={`gallery-cat-${cat.id}`}
                    >
                      <span style={{ marginRight: 6 }}>{cat.icon || '📁'}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {photoCount > 0 && videoCount > 0 && (
                  <div className="gallery-type-switch" role="group" aria-label="Tipo de contenido">
                    {[
                      { id: 'all', label: 'Todo' },
                      { id: 'image', label: 'Fotos' },
                      { id: 'video', label: 'Videos' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        className={type === opt.id ? 'active' : ''}
                        aria-pressed={type === opt.id}
                        onClick={() => setType(opt.id)}
                        id={`gallery-type-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {filtered.length > 0 ? (
                <GalleryGrid key={`${category}-${type}-${filtered.length}`} items={filtered} />
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <Images size={32} />
                  </div>
                  <h2 className="empty-state-title">No hay contenido en este filtro</h2>
                  <p className="empty-state-text">Prueba con otra categoría o tipo.</p>
                </div>
              )}
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link to="/contacto" className="btn btn-primary btn-lg">
              ¿Te gusta lo que ves? Cotiza el tuyo
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
