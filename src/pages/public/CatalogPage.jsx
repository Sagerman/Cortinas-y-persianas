import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import CategoryFilter from '../../components/common/CategoryFilter';
import { useProducts } from '../../hooks/useProducts';
import SEO from '../../components/common/SEO';

export default function CatalogPage() {
  const { getByCategory, searchProducts, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronously and memoized derived list - zero cascading effects or re-renders
  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return searchProducts(searchQuery);
    }
    return getByCategory(category);
  }, [category, searchQuery, getByCategory, searchProducts]);

  const handleCategoryChange = (cat) => {
    setSearchQuery('');
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const catNames = {
    cortinas: 'Cortinas',
    persianas: 'Persianas',
    estores: 'Estores',
    accesorios: 'Accesorios',
  };
  const pageTitle = category !== 'all' && catNames[category] ? `Catálogo de ${catNames[category]}` : 'Catálogo Completo';

  return (
    <div className="page-enter" id="catalog-page">
      <SEO
        title={pageTitle}
        description="Explora nuestro catálogo de cortinas modernas, persianas enrollables, verticales y romanas en Granada, Meta. Diseños personalizados con telas premium."
      />
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Nuestro Catálogo</h1>
          <p className="page-header-subtitle">
            Explora nuestra colección completa de cortinas, persianas y accesorios
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          {/* Search */}
          <div className="search-bar">
            <Search size={18} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="product-search"
            />
          </div>

          {/* Category Filter */}
          <CategoryFilter active={category} onChange={handleCategoryChange} />

          {/* Products Grid */}
          {loading ? (
            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="product-card" style={{ opacity: 0.5 }}>
                  <div className="skeleton skeleton-image" />
                  <div style={{ padding: '20px' }}>
                    <div className="skeleton skeleton-text" style={{ width: '40%' }} />
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" style={{ width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : displayedProducts.length > 0 ? (
            <div className="product-grid">
              {displayedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Search size={32} />
              </div>
              <h3 className="empty-state-title">No se encontraron productos</h3>
              <p className="empty-state-text">
                Intenta con otro término de búsqueda o categoría diferente.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
