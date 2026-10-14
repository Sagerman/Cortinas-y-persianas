/* ============================================
   CORTINAS DANI — Galería
   Detecta automáticamente todas las fotos y videos que estén en
   src/assets/galeria/. Solo hay que copiar los archivos en la carpeta:

     src/assets/galeria/cortinas/   → aparecen con la etiqueta "Cortinas"
     src/assets/galeria/persianas/  → aparecen con la etiqueta "Persianas"
     src/assets/galeria/<otra>/     → se crea una categoría nueva con ese nombre
     src/assets/galeria/            → (archivos sueltos) categoría "General"
   ============================================ */

const IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];
const VIDEO_EXT = ['mp4', 'webm', 'mov', 'm4v'];

// Vite reemplaza esto en tiempo de compilación por la lista real de archivos.
const files = import.meta.glob(
  '../assets/galeria/**/*.{jpg,jpeg,png,webp,avif,gif,mp4,webm,mov,m4v,JPG,JPEG,PNG,WEBP,AVIF,GIF,MP4,WEBM,MOV,M4V}',
  { eager: true, query: '?url', import: 'default' }
);

const CATEGORY_LABELS = {
  cortinas: 'Cortinas',
  persianas: 'Persianas',
  estores: 'Estores',
  accesorios: 'Accesorios',
  general: 'General',
};

function prettify(text) {
  return text
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

export const GALLERY_ITEMS = Object.entries(files)
  .map(([path, url]) => {
    const relative = path.split('/galeria/')[1] || '';
    const parts = relative.split('/');
    const fileName = parts[parts.length - 1];
    const category = parts.length > 1 ? parts[0].toLowerCase() : 'general';
    const ext = fileName.split('.').pop().toLowerCase();
    const type = VIDEO_EXT.includes(ext) ? 'video' : IMAGE_EXT.includes(ext) ? 'image' : null;

    return {
      id: relative,
      url,
      type,
      category,
      categoryLabel: CATEGORY_LABELS[category] || prettify(category),
      title: prettify(fileName.replace(/\.[^.]+$/, '')),
    };
  })
  .filter((item) => item.type)
  .sort((a, b) => a.id.localeCompare(b.id, 'es', { numeric: true }));

export const GALLERY_CATEGORIES = [...new Set(GALLERY_ITEMS.map((i) => i.category))].map((id) => ({
  id,
  name: CATEGORY_LABELS[id] || prettify(id),
}));
