import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { CATEGORIES } from '../../utils/sampleData';
import ImageUploader from '../../components/admin/ImageUploader';
import { ToastContainer, useToast } from '../../components/admin/Toast';

export default function AddProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, getById } = useProducts();
  const { toasts, addToast, removeToast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cortinas',
    active: true,
    featured: false,
    image: null,
  });

  // Load product data if editing
  useEffect(() => {
    if (isEditing) {
      const product = getById(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          active: product.active,
          featured: product.featured || false,
          image: product.image || null,
        });
      }
    }
  }, [id, isEditing, getById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData(prev => ({ ...prev, image: imageData }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
    };

    if (isEditing) {
      updateProduct(id, productData);
      addToast('Producto actualizado correctamente', 'success');
    } else {
      addProduct(productData);
      addToast('Producto creado correctamente', 'success');
    }

    setTimeout(() => navigate('/portal-privado-dani/productos'), 1000);
  };

  return (
    <div className="animate-fade-in" id="add-product-page">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Link to="/portal-privado-dani/productos" className="back-link">
          <ArrowLeft size={18} />
          Volver a productos
        </Link>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          color: 'var(--color-primary-darker)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}>
          <Package size={24} />
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="admin-form-card">
        <div className="admin-form-grid">
          {/* Name */}
          <div className="form-group admin-form-full">
            <label className="form-label" htmlFor="prod-name">Nombre del Producto *</label>
            <input
              id="prod-name"
              name="name"
              className="form-input"
              type="text"
              placeholder="Ej: Cortina de Lino Natural"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label" htmlFor="prod-price">Precio (COP - Pesos Colombianos) *</label>
            <input
              id="prod-price"
              name="price"
              className="form-input"
              type="number"
              step="1000"
              min="0"
              placeholder="Ej: 350000"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="prod-category">Categoría *</label>
            <select
              id="prod-category"
              name="category"
              className="form-input form-select"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group admin-form-full">
            <label className="form-label" htmlFor="prod-desc">Descripción</label>
            <textarea
              id="prod-desc"
              name="description"
              className="form-input form-textarea"
              placeholder="Describe las características del producto..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Image Uploader */}
          <ImageUploader
            currentImage={formData.image}
            onImageChange={handleImageChange}
          />

          {/* Toggles */}
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
            }}>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
              />
              Producto Activo
            </label>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
            }}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                style={{ width: 18, height: 18, accentColor: 'var(--color-accent)' }}
              />
              Producto Destacado
            </label>
          </div>
        </div>

        {/* Submit */}
        <div style={{
          marginTop: 'var(--space-8)',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--color-gray-100)',
          display: 'flex',
          gap: 'var(--space-3)',
          justifyContent: 'flex-end',
        }}>
          <Link to="/portal-privado-dani/productos" className="btn btn-outline">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} />
            {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}
