import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_SITE_NAME = 'Persianas & Cortinas Dany';
const DEFAULT_TITLE = 'Persianas & Cortinas Dany — Decoración con Estilo | Granada, Meta';
const DEFAULT_DESC = 'Cortinas, persianas y estores a medida en Granada, Meta. Diseño exclusivo, alta calidad, garantía y la mejor asesoría para tu hogar u oficina.';
const DEFAULT_IMAGE = '/favicon.svg';

export default function SEO({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  type = 'website',
  article = false,
}) {
  const location = useLocation();
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://persianascortinasdany.com').replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const fullTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_TITLE;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or create link tag
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', canonicalUrl);

    // 3. Open Graph
    setMetaTag('property', 'og:site_name', DEFAULT_SITE_NAME);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', type || (article ? 'article' : 'website'));
    setMetaTag('property', 'og:locale', 'es_CO');

    // 4. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

  }, [fullTitle, description, canonicalUrl, fullImageUrl, type, article]);

  return null;
}
