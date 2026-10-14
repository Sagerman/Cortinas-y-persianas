import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatPrice, getPlaceholderGradient, getPlaceholderIcon } from '../../utils/sampleData';

export default function ProductCard({ product, index = 0 }) {
  const hasImage = product.image && (product.image.startsWith('data:') || product.image.startsWith('http') || product.image.startsWith('/'));

  return (
    <Link
      to={`/producto/${product.id}`}
      className="product-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
      id={`product-card-${product.id}`}
    >
      <div className="product-card-image">
        {hasImage ? (
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: getPlaceholderGradient(product.category),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
            }}
          >
            {getPlaceholderIcon(product.category)}
          </div>
        )}
        {product.featured && (
          <span className="product-card-badge">Destacado</span>
        )}
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          <span className="product-card-action">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
