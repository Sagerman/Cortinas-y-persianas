/* ============================================
   CORTINAS DANI — Storage Utility
   Abstraction over LocalStorage for product data.
   Designed to be easily swapped for a real API/backend.
   ============================================ */

const STORAGE_KEYS = {
  PRODUCTS: 'cortinas_dani_products_v2',
  AUTH: 'cortinas_dani_auth',
};

/**
 * Get all products from storage
 * @returns {Array} Array of product objects
 */
export function getProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading products from storage:', e);
    return null;
  }
}

/**
 * Save products to storage
 * @param {Array} products - Array of product objects
 */
export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to storage:', e);
  }
}

/**
 * Get a single product by ID
 * @param {string} id - Product ID
 * @returns {Object|null} Product object or null
 */
export function getProductById(id) {
  const products = getProducts();
  if (!products) return null;
  return products.find(p => p.id === id) || null;
}

/**
 * Add a new product
 * @param {Object} product - Product data (without ID)
 * @returns {Object} The created product with ID
 */
export function addProduct(product) {
  const products = getProducts() || [];
  const newProduct = {
    ...product,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

/**
 * Update an existing product
 * @param {string} id - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated product or null
 */
export function updateProduct(id, updates) {
  const products = getProducts();
  if (!products) return null;
  
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveProducts(products);
  return products[index];
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {boolean} Success
 */
export function deleteProduct(id) {
  const products = getProducts();
  if (!products) return false;
  
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
  return true;
}

/**
 * Toggle product active status
 * @param {string} id - Product ID
 * @returns {Object|null} Updated product
 */
export function toggleProductStatus(id) {
  const products = getProducts();
  if (!products) return null;
  
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index].active = !products[index].active;
  products[index].updatedAt = new Date().toISOString();
  
  saveProducts(products);
  return products[index];
}

/* ---------- Auth ---------- */

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

/**
 * Attempt admin login
 * @param {string} username
 * @param {string} password
 * @returns {boolean} Success
 */
export function loginAdmin(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
    return true;
  }
  return false;
}

/**
 * Check if admin is logged in
 * @returns {boolean}
 */
export function isAdminLoggedIn() {
  try {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH));
    return auth?.loggedIn === true;
  } catch {
    return false;
  }
}

/**
 * Logout admin
 */
export function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}

/* ---------- Helpers ---------- */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
