import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Film,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { logoutAdmin } from '../../utils/storage';

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/portal-privado-dani');
  };

  const linkClass = ({ isActive }) =>
    `admin-nav-link ${isActive ? 'active' : ''}`;

  return (
    <>
      <div
        className={`admin-sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`} id="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo">
            <span className="admin-sidebar-logo-icon" style={{ fontSize: '0.75rem', fontWeight: 800 }}>PDC</span>
            Persianas &amp; Cortinas Dany
          </div>
          <div className="admin-sidebar-badge">Panel de Administración</div>
        </div>

        <nav className="admin-sidebar-nav">
          <span className="admin-sidebar-section">Principal</span>

          <NavLink to="/portal-privado-dani/dashboard" className={linkClass} onClick={onClose}>
            <span className="admin-nav-link-icon"><LayoutDashboard size={18} /></span>
            Dashboard
          </NavLink>

          <NavLink to="/portal-privado-dani/productos" className={linkClass} onClick={onClose}>
            <span className="admin-nav-link-icon"><Package size={18} /></span>
            Productos
          </NavLink>

          <NavLink to="/portal-privado-dani/productos/nuevo" className={linkClass} onClick={onClose}>
            <span className="admin-nav-link-icon"><PlusCircle size={18} /></span>
            Nuevo Producto
          </NavLink>

          <NavLink to="/portal-privado-dani/galeria" className={linkClass} onClick={onClose}>
            <span className="admin-nav-link-icon"><Film size={18} /></span>
            Galería y Videos
          </NavLink>

          <span className="admin-sidebar-section" style={{ marginTop: 'auto' }}>Enlaces</span>

          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">
            <span className="admin-nav-link-icon"><ExternalLink size={18} /></span>
            Ver Tienda
          </a>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-link" onClick={handleLogout} style={{ width: '100%' }}>
            <span className="admin-nav-link-icon"><LogOut size={18} /></span>
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
