import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, ToggleLeft, ToggleRight, Trash2, Search, PlusCircle, AlertTriangle } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../utils/sampleData';
import { ToastContainer, useToast } from '../../components/admin/Toast';

export default function ManageProductsPage() {
  const { products, toggleStatus, deleteProduct } = useProducts();
  const { toasts, addToast, removeToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleToggle = (product) => {
    toggleStatus(product.id);
    addToast(
      `${product.name} ${product.active ? 'desactivado' : 'activado'} correctamente`,
      'success'
    );
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
    addToast('Producto eliminado correctamente', 'success');
  };

  return (
    <div className="animate-fade-in" id="manage-products-page">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Confirm Delete Dialog */}
      {confirmDelete && (
        <div className="dialog-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="dialog" onClick={e => e.stopPropagation()}>
            <div className="dialog-icon warning">
              <AlertTriangle size={28} />
            </div>
            <h3 className="dialog-title">¿Eliminar Producto?</h3>
            <p className="dialog-text">
              Esta acción no se puede deshacer. El producto 
              <strong> {confirmDelete.name}</strong> será eliminado permanentemente.
            </p>
            <div className="dialog-actions">
              <button
                className="btn btn-outline"
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(confirmDelete.id)}
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            color: 'var(--color-primary-darker)',
          }}>
            Gestión de Productos
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginTop: 4 }}>
            {products.length} productos en total
          </p>
        </div>
        <Link to="/portal-privado-dani/productos/nuevo" className="btn btn-primary">
          <PlusCircle size={18} />
          Nuevo Producto
        </Link>
      </div>

      {/* Search */}
      <div className="search-bar" style={{ maxWidth: '100%', marginBottom: 'var(--space-5)' }}>
        <Search size={18} className="search-bar-icon" />
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="admin-product-search"
        />
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="admin-table-empty">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              filteredProducts.map(product => (
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
                  <td>
                    <div className="admin-table-actions">
                      <Link
                        to={`/portal-privado-dani/productos/editar/${product.id}`}
                        className="btn btn-ghost btn-icon"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        className="btn btn-ghost btn-icon"
                        onClick={() => handleToggle(product)}
                        title={product.active ? 'Desactivar' : 'Activar'}
                        style={{ color: product.active ? 'var(--color-success)' : 'var(--color-gray-400)' }}
                      >
                        {product.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      </button>
                      <button
                        className="btn btn-ghost btn-icon"
                        onClick={() => setConfirmDelete(product)}
                        title="Eliminar"
                        style={{ color: 'var(--color-error)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
