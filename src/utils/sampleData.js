/* ============================================
   CORTINAS DANI — Sample Product Data
   Initial products to populate the store demo.
   ============================================ */

export const CATEGORIES = [
  { id: 'cortinas', name: 'Cortinas', icon: '🪟' },
  { id: 'persianas', name: 'Persianas', icon: '🏠' },
  { id: 'estores', name: 'Estores', icon: '🌅' },
  { id: 'accesorios', name: 'Accesorios', icon: '🔧' },
];

export const SAMPLE_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Cortina de Lino Natural',
    description: 'Elegante cortina de lino 100% natural con caída suave. Perfecta para salones y comedores que buscan un estilo rústico-moderno. Filtrado de luz delicado que crea ambientes cálidos.',
    price: 350000,
    category: 'cortinas',
    active: true,
    featured: true,
    image: null,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prod_002',
    name: 'Persiana Veneciana Aluminio',
    description: 'Persiana veneciana de aluminio de alta calidad con lamas de 25mm. Control preciso de la luz y la privacidad. Disponible en múltiples colores. Ideal para oficinas y dormitorios.',
    price: 280000,
    category: 'persianas',
    active: true,
    featured: true,
    image: null,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'prod_003',
    name: 'Estor Enrollable Translúcido',
    description: 'Estor enrollable con tejido translúcido que permite el paso de la luz natural sin sacrificar la privacidad. Sistema de enrollado suave y silencioso. Perfecto para cualquier habitación.',
    price: 180000,
    category: 'estores',
    active: true,
    featured: false,
    image: null,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: 'prod_004',
    name: 'Cortina Blackout Premium',
    description: 'Cortina con tejido blackout de alta densidad que bloquea el 99% de la luz. Ideal para dormitorios y salas de cine en casa. Aislamiento térmico y acústico superior.',
    price: 480000,
    category: 'cortinas',
    active: true,
    featured: true,
    image: null,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'prod_005',
    name: 'Persiana Vertical de Tela',
    description: 'Persiana vertical con lamas de tela de 89mm. Ideal para ventanas grandes y puertas correderas. Control de luz y privacidad con un toque decorativo elegante.',
    price: 390000,
    category: 'persianas',
    active: true,
    featured: false,
    image: null,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'prod_006',
    name: 'Estor Noche y Día',
    description: 'Estor con sistema de doble tejido que permite alternar entre transparencia y opacidad. Diseño moderno y funcional para controlar la luz a tu gusto.',
    price: 320000,
    category: 'estores',
    active: true,
    featured: true,
    image: null,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'prod_007',
    name: 'Rieles para Cortina Dobles',
    description: 'Sistema de riel doble de aluminio para colgar dos capas de cortina. Incluye soportes, topes y todos los accesorios necesarios para la instalación.',
    price: 145000,
    category: 'accesorios',
    active: true,
    featured: false,
    image: null,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'prod_008',
    name: 'Cortina de Terciopelo',
    description: 'Lujosa cortina de terciopelo con acabado suave al tacto. Proporciona aislamiento térmico y un toque de sofisticación a cualquier espacio. Disponible en colores ricos y profundos.',
    price: 620000,
    category: 'cortinas',
    active: true,
    featured: false,
    image: null,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'prod_009',
    name: 'Abrazaderas Decorativas',
    description: 'Par de abrazaderas metálicas decorativas con acabado dorado mate. Diseño elegante para sujetar cortinas con estilo. Incluye tornillos de instalación.',
    price: 85000,
    category: 'accesorios',
    active: true,
    featured: false,
    image: null,
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'prod_010',
    name: 'Persiana Enrollable Solar',
    description: 'Persiana enrollable con tejido solar screen que reduce la entrada de calor hasta en un 80% manteniendo la visibilidad hacia el exterior. Ideal para climas cálidos.',
    price: 350000,
    category: 'persianas',
    active: false,
    featured: false,
    image: null,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-01T10:00:00Z',
  },
];

/**
 * Get a placeholder gradient for products without images
 * @param {string} category - Product category
 * @returns {string} CSS gradient
 */
export function getPlaceholderGradient(category) {
  const gradients = {
    cortinas: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 40%, #52B788 100%)',
    persianas: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #95D5B2 100%)',
    estores: 'linear-gradient(135deg, #C9A96E 0%, #D4BA8A 40%, #E8E0D2 100%)',
    accesorios: 'linear-gradient(135deg, #0A1F1A 0%, #2D6A4F 40%, #C9A96E 100%)',
  };
  return gradients[category] || gradients.cortinas;
}

/**
 * Get placeholder icon for products without images
 * @param {string} category - Product category
 * @returns {string} Emoji icon
 */
export function getPlaceholderIcon(category) {
  const cat = CATEGORIES.find(c => c.id === category);
  return cat ? cat.icon : '🪟';
}

/**
 * Format price with currency
 * @param {number} price 
 * @returns {string}
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
