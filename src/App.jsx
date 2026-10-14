import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

// Styles
import './styles/index.css';
import './styles/animations.css';
import './styles/components.css';
import './styles/admin.css';
import './styles/gallery.css';

// Public Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import CookieBanner from './components/common/CookieBanner';
import { AnalyticsTracker } from './utils/analytics';

// Public Pages
import HomePage from './pages/public/HomePage';
import CatalogPage from './pages/public/CatalogPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import ContactPage from './pages/public/ContactPage';
import GalleryPage from './pages/public/GalleryPage';
import LegalPage from './pages/public/LegalPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminSidebar from './components/admin/AdminSidebar';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import AddProductPage from './pages/admin/AddProductPage';
import ManageGalleryPage from './pages/admin/ManageGalleryPage';

// Auth
import { isAdminLoggedIn } from './utils/storage';

/* ============================================
   PUBLIC LAYOUT
   ============================================ */
function PublicLayout() {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  );
}

/* ============================================
   ADMIN LAYOUT
   ============================================ */
function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAdminLoggedIn());
  const location = useLocation();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Re-check auth on location change
  useEffect(() => {
    setAuthenticated(isAdminLoggedIn());
  }, [location.pathname]);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="admin-layout">
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar-title">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function getPageTitle(path) {
  if (path.includes('/dashboard')) return 'Dashboard';
  if (path.includes('/galeria')) return 'Galería y Videos';
  if (path.includes('/nuevo') || path.includes('/editar')) return 'Producto';
  if (path.includes('/productos')) return 'Productos';
  return 'Admin';
}

/* ============================================
   APP
   ============================================ */
export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/terminos" element={<LegalPage />} />
          <Route path="/privacidad" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes — Ruta 100% privada y oculta, inaccesible desde la navegación pública */}
        <Route path="/portal-privado-dani" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="productos" element={<ManageProductsPage />} />
          <Route path="productos/nuevo" element={<AddProductPage />} />
          <Route path="productos/editar/:id" element={<AddProductPage />} />
          <Route path="galeria" element={<ManageGalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
