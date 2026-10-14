import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/common/ProductCard';
import { formatPrice, getPlaceholderGradient, getPlaceholderIcon } from '../../utils/sampleData';
import SEO from '../../components/common/SEO';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getById, activeProducts } = useProducts();
  const product = getById(id);

  if (!product) {
    return (
      <div className="page-enter">
        <SEO title="Producto No Encontrado" description="El producto solicitado no existe en el catálogo." />
        <div className="product-detail">
          <div className="container">
            <Link to="/catalogo" className="back-link">
              <ArrowLeft size={18} />
              Volver al catálogo
            </Link>
            <div className="empty-state">
              <h3 className="empty-state-title">Producto no encontrado</h3>
              <p className="empty-state-text">
                El producto que buscas no existe o ha sido retirado.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasImage = product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.startsWith('/'));
  const relatedProducts = activeProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const features = [
    'Material de alta calidad',
    'Fácil instalación',
    'Garantía incluida',
    'Mantenimiento sencillo',
  ];

  // WhatsApp link (configured with real business WhatsApp)
  const whatsappMsg = encodeURIComponent(
    `Hola Persianas & Cortinas Dany, me interesa el producto: "${product.name}" (${formatPrice(product.price)}). ¿Podrían darme más información o asesoría?`
  );
  const whatsappLink = `https://wa.me/573123558218?text=${whatsappMsg}`;

  return (
    <div className="page-enter" id="product-detail-page">
      <SEO
        title={`${product.name} — Precio: ${formatPrice(product.price)}`}
        description={product.description || `Adquiere ${product.name} a medida en Persianas & Cortinas Dany. Asesoría e instalación profesional en Granada, Meta.`}
        image={hasImage ? product.image : undefined}
      />
      <div className="product-detail">
        <div className="container">
          <Link to="/catalogo" className="back-link">
            <ArrowLeft size={18} />
            Volver al catálogo
          </Link>

          <div className="product-detail-grid">
            {/* Image */}
            <div className="product-detail-image">
              {hasImage ? (
                <img src={product.image} alt={`Fotografía de ${product.name}`} fetchPriority="high" decoding="async" />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: getPlaceholderGradient(product.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                  }}
                >
                  {getPlaceholderIcon(product.category)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="product-detail-info animate-fade-in-up">
              <span className="product-detail-category">{product.category}</span>
              <h1 className="product-detail-title">{product.name}</h1>
              <p className="product-detail-price">{formatPrice(product.price)}</p>
              <p className="product-detail-desc">{product.description}</p>

              <div className="product-detail-features">
                {features.map((feat, i) => (
                  <div key={i} className="product-detail-feature">
                    <span className="product-detail-feature-icon">
                      <Check size={14} />
                    </span>
                    {feat}
                  </div>
                ))}
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={20} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="related-section">
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: 'var(--text-2xl)' }}>
                Productos Relacionados
              </h2>
              <span
                className="accent-line"
                style={{ margin: 'var(--space-3) 0 var(--space-6)' }}
              ></span>
              <div className="related-scroll">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
