import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * GA4 & Analytics Utility for Persianas & Cortinas Dany
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initGA() {
  if (!GA_ID || typeof window === 'undefined') return;

  // Prevent duplicate script injection
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    send_page_view: false, // We track pageviews manually on route changes
    anonymize_ip: true,
  });
}

export function trackPageView(path, title) {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

export function trackEvent(action, category, label, value) {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * AnalyticsTracker component to place inside BrowserRouter
 */
export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return null;
}
