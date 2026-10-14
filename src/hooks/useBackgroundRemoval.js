/* ============================================
   CORTINAS DANI — useBackgroundRemoval Hook
   Client-side background removal using @imgly/background-removal.
   ============================================ */

import { useState, useCallback } from 'react';

export function useBackgroundRemoval() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const removeBackground = useCallback(async (imageFile) => {
    setProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Dynamic import to avoid loading the heavy library upfront
      const { removeBackground: removeBg } = await import('@imgly/background-removal');

      const result = await removeBg(imageFile, {
        progress: (key, current, total) => {
          if (total > 0) {
            setProgress(Math.round((current / total) * 100));
          }
        },
      });

      // Convert blob to data URL for storage/display
      const dataUrl = await blobToDataURL(result);
      
      setProcessing(false);
      setProgress(100);
      return dataUrl;
    } catch (err) {
      console.error('Background removal failed:', err);
      setError('No se pudo quitar el fondo. Intente con otra imagen.');
      setProcessing(false);
      return null;
    }
  }, []);

  return {
    removeBackground,
    processing,
    progress,
    error,
  };
}

/**
 * Convert a File to a data URL for preview
 * @param {File} file
 * @returns {Promise<string>}
 */
export function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert a Blob to a data URL
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Compress an image data URL to reduce storage size
 * @param {string} dataUrl
 * @param {number} maxWidth
 * @param {number} quality
 * @returns {Promise<string>}
 */
export function compressImage(dataUrl, maxWidth = 800, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/webp', quality));
    };
    img.src = dataUrl;
  });
}
