/* ============================================
   CORTINAS DANI — useProducts Hook
   CRUD operations for product management.
   ============================================ */

import { useState, useEffect, useCallback, useMemo } from 'react';
import * as storage from '../utils/storage';
import { SAMPLE_PRODUCTS } from '../utils/sampleData';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize products from storage or sample data
  useEffect(() => {
    const stored = storage.getProducts();
    if (stored && stored.length > 0) {
      setProducts(stored);
    } else {
      storage.saveProducts(SAMPLE_PRODUCTS);
      setProducts(SAMPLE_PRODUCTS);
    }
    setLoading(false);
  }, []);

  // Get only active products (for public store)
  const activeProducts = useMemo(() => products.filter(p => p.active), [products]);

  // Get featured products
  const featuredProducts = useMemo(() => products.filter(p => p.active && p.featured), [products]);

  // Get products by category
  const getByCategory = useCallback((category) => {
    if (!category || category === 'all') return activeProducts;
    return activeProducts.filter(p => p.category === category);
  }, [activeProducts]);

  // Search products
  const searchProducts = useCallback((query) => {
    if (!query) return activeProducts;
    const lower = query.toLowerCase();
    return activeProducts.filter(p => 
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );
  }, [activeProducts]);

  // Add product
  const addProduct = useCallback((productData) => {
    const newProduct = storage.addProduct(productData);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, []);

  // Update product
  const updateProduct = useCallback((id, updates) => {
    const updated = storage.updateProduct(id, updates);
    if (updated) {
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    }
    return updated;
  }, []);

  // Delete product
  const deleteProduct = useCallback((id) => {
    const success = storage.deleteProduct(id);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    return success;
  }, []);

  // Toggle active status
  const toggleStatus = useCallback((id) => {
    const updated = storage.toggleProductStatus(id);
    if (updated) {
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    }
    return updated;
  }, []);

  // Get product by ID
  const getById = useCallback((id) => {
    return products.find(p => p.id === id) || null;
  }, [products]);

  // Stats for admin dashboard
  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.active).length,
    inactive: products.filter(p => !p.active).length,
    categories: [...new Set(products.map(p => p.category))].length,
  }), [products]);

  return {
    products,
    activeProducts,
    featuredProducts,
    loading,
    stats,
    getByCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStatus,
    getById,
  };
}
