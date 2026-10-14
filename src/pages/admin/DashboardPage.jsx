import { Link } from 'react-router-dom';
import { Package, PlusCircle, TrendingUp, Archive, Layers, ArrowRight, Film } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../utils/sampleData';

export default function DashboardPage() {
  const { stats, products } = useProducts();

  const statCards = [
    { label: 'Total Productos', value: stats.total, icon: <Package size={22} /> },
    { label: 'Activos', value: stats.active, icon: <TrendingUp size={22} /> },
    { label: 'Categorías', value: stats.categories, icon: <Layers size={22} /> },
    { label: 'Inactivos', value: stats.inactive, icon: <Archive size={22} /> },
  ];

  // Recent products (last 5)
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="animate-fade-in" id="admin-dashboard">
      <div className="stats-grid">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div className="stat-card-icon">{stat.icon}</div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-8)',
      }}>
        <Link
          to="/portal-privado-dani/productos/nuevo"
          className="stat-card"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
            }}>
              <PlusCircle size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary-darker)', marginBottom: 4 }}>
                Agregar Producto
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                Crear un nuevo producto con foto
              </div>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto', color: 'var(--color-gray-400)' }} />
          </div>
        </Link>

        <Link
          to="/portal-privado-dani/productos"
          className="stat-card"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-darker)',
            }}>
              <Package size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary-darker)', marginBottom: 4 }}>
                Gestionar Productos
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                Editar, activar o desactivar
              </div>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto', color: 'var(--color-gray-400)' }} />
          </div>
        </Link>

        <Link
          to="/portal-privado-dani/galeria"
          className="stat-card"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-white)',
            }}>
              <Film size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary-darker)', marginBottom: 4 }}>
                Galería y Videos
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)' }}>
                Crear carpetas y subir fotos/videos
              </div>
            </div>
            <ArrowRight size={18} style={{ marginLeft: 'auto', color: 'var(--color-gray-400)' }} />
          </div>
        </Link>
      </div>

      {/* Recent Products */}
      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 className="admin-table-title">Productos Recientes</h3>
          <Link to="/portal-privado-dani/productos" className="btn btn-ghost btn-sm">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="admin-table-product">
                    {product.image ? (
                      <img src={product.image} alt="" className="admin-table-image" />
                    ) : (
                      <div className="admin-table-image" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--color-gray-100)',
                        fontSize: '1.2rem',
                      }}>
                        🪟
                      </div>
                    )}
                    <div>
                      <div className="admin-table-product-name">{product.name}</div>
                      <div className="admin-table-product-id">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(product.price)}</td>
                <td>
                  <span className={`badge ${product.active ? 'badge-success' : 'badge-error'}`}>
                    {product.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
