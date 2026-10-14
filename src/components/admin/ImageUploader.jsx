import { useState, useRef, useEffect } from 'react';
import { Upload, Image, X, Loader, Camera, Scissors, Check } from 'lucide-react';
import { useBackgroundRemoval, fileToDataURL, compressImage } from '../../hooks/useBackgroundRemoval';

/**
 * Image uploader with an explicit choice:
 *  - "Foto original": the photo is saved exactly as uploaded (only resized/compressed).
 *  - "Quitar fondo": cuts out the curtain/blind and leaves a transparent background.
 * Background removal only runs when the user picks that option.
 */
export default function ImageUploader({ currentImage, onImageChange }) {
  const [originalImage, setOriginalImage] = useState(currentImage || null);
  const [removedImage, setRemovedImage] = useState(null);
  const [mode, setMode] = useState('original'); // 'original' | 'removed'
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const sourceRef = useRef(null); // File or data URL used for background removal
  const lastEmittedRef = useRef(currentImage || null);
  const { removeBackground, processing, progress, error } = useBackgroundRemoval();

  // Sync when the parent loads an existing product image (edit mode)
  useEffect(() => {
    if (currentImage !== lastEmittedRef.current) {
      lastEmittedRef.current = currentImage || null;
      setOriginalImage(currentImage || null);
      setRemovedImage(null);
      setMode('original');
      sourceRef.current = currentImage || null;
    }
  }, [currentImage]);

  const emit = (value) => {
    lastEmittedRef.current = value;
    onImageChange(value);
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const dataUrl = await fileToDataURL(file);
    const compressed = await compressImage(dataUrl);

    sourceRef.current = file;
    setOriginalImage(compressed);
    setRemovedImage(null);
    setMode('original');
    emit(compressed);
  };

  const selectOriginal = () => {
    if (processing || !originalImage) return;
    setMode('original');
    emit(originalImage);
  };

  const selectRemoved = async () => {
    if (processing || !originalImage) return;

    if (removedImage) {
      setMode('removed');
      emit(removedImage);
      return;
    }

    const resultUrl = await removeBackground(sourceRef.current || originalImage);
    if (resultUrl) {
      const compressed = await compressImage(resultUrl);
      setRemovedImage(compressed);
      setMode('removed');
      emit(compressed);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const clearImages = () => {
    setOriginalImage(null);
    setRemovedImage(null);
    setMode('original');
    sourceRef.current = null;
    emit(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const previewSrc = mode === 'removed' && removedImage ? removedImage : originalImage;

  return (
    <div className="image-uploader" id="image-uploader">
      <label className="form-label">Imagen del Producto</label>

      {/* Drop Zone */}
      {!originalImage && (
        <div
          className={`image-drop-zone ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="image-drop-zone-icon">
            <Upload size={24} />
          </div>
          <p className="image-drop-zone-title">
            Arrastra una imagen aquí o <span className="image-drop-zone-browse">busca en tus archivos</span>
          </p>
          <p className="image-drop-zone-text">
            PNG, JPG o WebP • Luego podrás elegir si quitarle el fondo o dejarla tal cual
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        id="image-file-input"
      />

      {originalImage && (
        <div className="image-editor">
          {/* Mode selector */}
          <div className="image-mode-selector" role="radiogroup" aria-label="Cómo subir la foto">
            <button
              type="button"
              role="radio"
              aria-checked={mode === 'original'}
              className={`image-mode-option ${mode === 'original' ? 'active' : ''}`}
              onClick={selectOriginal}
              disabled={processing}
              id="image-mode-original"
            >
              <span className="image-mode-icon"><Camera size={20} /></span>
              <span className="image-mode-text">
                <strong>Foto original</strong>
                <small>Se sube tal cual está</small>
              </span>
              {mode === 'original' && <span className="image-mode-check"><Check size={14} /></span>}
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={mode === 'removed'}
              className={`image-mode-option ${mode === 'removed' ? 'active' : ''}`}
              onClick={selectRemoved}
              disabled={processing}
              id="image-mode-remove-bg"
            >
              <span className="image-mode-icon"><Scissors size={20} /></span>
              <span className="image-mode-text">
                <strong>Quitar fondo</strong>
                <small>Solo la cortina o persiana, fondo transparente</small>
              </span>
              {mode === 'removed' && <span className="image-mode-check"><Check size={14} /></span>}
            </button>
          </div>

          {/* Preview */}
          <div
            className={`image-preview-box image-preview-single ${
              mode === 'removed' ? 'image-preview-processed' : 'image-preview-original'
            }`}
          >
            <span className="image-preview-label">
              {mode === 'removed' ? '✨ Sin fondo' : '📷 Original'}
            </span>
            {processing && (
              <div className="processing-overlay">
                <Loader size={28} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Quitando fondo... {progress}%</span>
                <div className="processing-bar">
                  <div className="processing-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            <img src={previewSrc} alt="Vista previa del producto" />
          </div>

          <p className="image-mode-hint">
            {mode === 'removed'
              ? 'Esta es la versión que se guardará (sin fondo). Puedes volver a la original cuando quieras.'
              : 'Esta es la versión que se guardará. Si quieres, toca "Quitar fondo" para recortar solo el producto.'}
          </p>

          {error && (
            <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>
              {error}
            </p>
          )}

          <div className="image-preview-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={processing}
            >
              <Image size={16} />
              Cambiar imagen
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={clearImages}
              disabled={processing}
            >
              <X size={16} />
              Quitar imagen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
