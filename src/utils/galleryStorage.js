/* ============================================
   CORTINAS DANI — Gallery & Media Storage
   Combines static assets from `src/assets/galeria/**` with
   dynamic categories/folders and uploaded photos & videos.

   In local dev: uses IndexedDB for high-capacity media (videos & photos).
   In production: ready to connect Cloudinary / Supabase Storage.
   ============================================ */

import { GALLERY_ITEMS as STATIC_ITEMS } from './gallery';

const DB_NAME = 'CortinasDaniGalleryDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_items';
const CATEGORIES_KEY = 'cortinas_dani_gallery_categories_v1';

// Default starter categories
const DEFAULT_CATEGORIES = [
  { id: 'cortinas', name: 'Cortinas', icon: '🪟' },
  { id: 'persianas', name: 'Persianas', icon: '🏠' },
  { id: 'estores', name: 'Estores', icon: '🌅' },
  { id: 'accesorios', name: 'Accesorios', icon: '🔧' },
];

/**
 * Open or initialize IndexedDB for local video/photo storage
 */
function openDB() {
  return new Promise((resolve, _reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.warn('Could not open IndexedDB, falling back to static items only:', request.error);
      resolve(null);
    };
  });
}

/**
 * Get all categories (defaults + custom created by admin)
 */
export function getGalleryCategories() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

/**
 * Save categories list
 */
export function saveGalleryCategories(categories) {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving categories:', e);
  }
}

/**
 * Add a new folder / category
 * @param {string} name - e.g. "Accesorios de Lujo"
 * @param {string} icon - optional emoji or icon identifier
 */
export function createGalleryCategory(name, icon = '📁') {
  const categories = getGalleryCategories();
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `cat-${Date.now()}`;

  // If already exists, return existing
  const existing = categories.find((c) => c.id === slug);
  if (existing) return existing;

  const newCat = {
    id: slug,
    name: name.trim(),
    icon: icon.trim() || '📁',
    isCustom: true,
  };

  const updated = [...categories, newCat];
  saveGalleryCategories(updated);
  return newCat;
}

/**
 * Delete a custom category
 */
export function deleteGalleryCategory(categoryId) {
  const categories = getGalleryCategories();
  const filtered = categories.filter((c) => c.id !== categoryId);
  saveGalleryCategories(filtered);
  return filtered;
}

/**
 * Read all dynamic items from IndexedDB
 */
export async function getDynamicItems() {
  const db = await openDB();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

/**
 * Save an uploaded media item (photo or video) into IndexedDB
 * In production: this is where the upload to Cloudinary / Supabase Storage will happen.
 */
export async function saveMediaItem({ file, category, title }) {
  const db = await openDB();
  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');

  if (!isVideo && !isImage) {
    throw new Error('Solo se permiten archivos de imagen o video.');
  }

  // Convert File to Blob URL / Data URL for local display
  const dataUrl = await fileToDataURL(file);

  const categories = getGalleryCategories();
  const catObj = categories.find((c) => c.id === category) || {
    id: category,
    name: category,
  };

  const newItem = {
    id: `dyn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    url: dataUrl,
    type: isVideo ? 'video' : 'image',
    category: catObj.id,
    categoryLabel: catObj.name,
    title: (title && title.trim()) || file.name.replace(/\.[^/.]+$/, ''),
    fileName: file.name,
    fileSize: file.size,
    isDynamic: true,
    createdAt: new Date().toISOString(),
  };

  if (db) {
    await new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.add(newItem);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  return newItem;
}

/**
 * Delete a dynamic item from IndexedDB
 */
export async function deleteMediaItem(id) {
  const db = await openDB();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Convert file to Data URL
 */
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Combined fetch: static files + dynamic uploads
 */
export async function fetchAllGalleryData() {
  const categories = getGalleryCategories();
  const dynamicItems = await getDynamicItems();

  // Combine dynamic items with any static bundled items
  const allItems = [...dynamicItems, ...STATIC_ITEMS].sort((a, b) => {
    // Newest dynamic items first
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (a.isDynamic) return -1;
    if (b.isDynamic) return 1;
    return a.id.localeCompare(b.id);
  });

  return {
    categories,
    items: allItems,
  };
}
