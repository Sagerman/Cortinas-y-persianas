/* ============================================
   CORTINAS DANI — useGallery Hook
   Provides reactive access to gallery categories and media items
   (combines local static files + admin dynamic uploads).
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllGalleryData,
  createGalleryCategory,
  deleteGalleryCategory,
  saveMediaItem,
  deleteMediaItem,
} from '../utils/galleryStorage';

export function useGallery() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchAllGalleryData();
      setCategories(data.categories);
      setItems(data.items);
    } catch (err) {
      console.error('Error loading gallery data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Create folder/category
  const addFolder = useCallback(
    (name, icon) => {
      const created = createGalleryCategory(name, icon);
      setCategories((prev) => {
        if (prev.some((c) => c.id === created.id)) return prev;
        return [...prev, created];
      });
      return created;
    },
    []
  );

  // Delete folder/category
  const removeFolder = useCallback((id) => {
    const updated = deleteGalleryCategory(id);
    setCategories(updated);
  }, []);

  // Upload item (image or video)
  const uploadMedia = useCallback(
    async ({ file, category, title }) => {
      const newItem = await saveMediaItem({ file, category, title });
      setItems((prev) => [newItem, ...prev]);
      return newItem;
    },
    []
  );

  // Delete media item
  const removeMedia = useCallback(async (id) => {
    const success = await deleteMediaItem(id);
    if (success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
    return success;
  }, []);

  // Filter items by category
  const getByCategory = useCallback(
    (category) => {
      if (!category || category === 'all') return items;
      return items.filter((item) => item.category === category);
    },
    [items]
  );

  return {
    items,
    categories,
    loading,
    refresh: loadData,
    addFolder,
    removeFolder,
    uploadMedia,
    removeMedia,
    getByCategory,
  };
}
