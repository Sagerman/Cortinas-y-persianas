import { useState, useRef } from 'react';
import {
  FolderPlus,
  Upload,
  Trash2,
  Play,
  Image as ImageIcon,
  Film,
  X,
  Check,
  Layers,
} from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';
import { ToastContainer, useToast } from '../../components/admin/Toast';

export default function ManageGalleryPage() {
  const {
    items,
    categories,
    loading,
    addFolder,
    removeFolder,
    uploadMedia,
    removeMedia,
  } = useGallery();

  const { toasts, addToast, removeToast } = useToast();

  const [activeTab, setActiveTab] = useState('all');
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState('📁');

  // Upload state
  const [selectedFolder, setSelectedFolder] = useState('cortinas');
  const [mediaTitle, setMediaTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Filter items
  const filteredItems = activeTab === 'all'
    ? items
    : items.filter((i) => i.category === activeTab);

  // Handle file select
  const handleFile = (file) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      addToast('Por favor selecciona un archivo de imagen o video válido.', 'error');
      return;
    }

    setSelectedFile(file);
    setMediaTitle(file.name.replace(/\.[^/.]+$/, ''));

    const previewUrl = URL.createObjectURL(file);
    setFilePreview({
      url: previewUrl,
      type: isVideo ? 'video' : 'image',
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = () => {
    if (filePreview?.url) {
      URL.revokeObjectURL(filePreview.url);
    }
    setSelectedFile(null);
    setFilePreview(null);
    setMediaTitle('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit media upload
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      addToast('Selecciona una imagen o video primero.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      await uploadMedia({
        file: selectedFile,
        category: selectedFolder,
        title: mediaTitle,
      });

      addToast(
        `${filePreview?.type === 'video' ? 'Video' : 'Foto'} subido con éxito a la carpeta.`,
        'success'
      );
      clearSelection();
    } catch (err) {
      console.error(err);
      addToast('Error al subir el archivo: ' + err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Create new folder
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const created = addFolder(newFolderName.trim(), newFolderIcon.trim());
    addToast(`Carpeta "${created.name}" creada correctamente.`, 'success');
    setSelectedFolder(created.id);
    setActiveTab(created.id);
    setNewFolderName('');
    setShowFolderModal(false);
  };

  // Delete folder
  const handleDeleteFolder = (cat) => {
    if (['cortinas', 'persianas'].includes(cat.id)) {
      addToast('Las carpetas principales de cortinas y persianas no se pueden eliminar.', 'error');
      return;
    }
    const count = items.filter((i) => i.category === cat.id).length;
    const confirmMsg = count > 0
      ? `¿Eliminar la carpeta "${cat.name}"? Contiene ${count} archivos.`
      : `¿Eliminar la carpeta "${cat.name}"?`;

    if (window.confirm(confirmMsg)) {
      removeFolder(cat.id);
      addToast(`Carpeta "${cat.name}" eliminada.`, 'success');
      if (activeTab === cat.id) setActiveTab('all');
    }
  };

  // Delete item
  const handleDeleteItem = async (item) => {
    if (!item.isDynamic) {
      addToast(
        'Este archivo está físicamente en el proyecto (src/assets/galeria). Para quitarlo, bórralo de la carpeta de tu computadora.',
        'info'
      );
      return;
    }

    if (window.confirm(`¿Estás seguro de eliminar "${item.title}"?`)) {
      const ok = await removeMedia(item.id);
      if (ok) {
        addToast('Archivo eliminado de la galería.', 'success');
      } else {
        addToast('No se pudo eliminar el archivo.', 'error');
      }
    }
  };

  return (
    <div className="animate-fade-in" id="admin-gallery-page">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            color: 'var(--color-primary-darker)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}>
            <Film size={26} />
            Gestión de Galería y Videos
          </h2>
          <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
            Organiza tus fotos y videos en carpetas (cortinas, persianas, accesorios) y crea nuevas secciones.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setShowFolderModal(true)}
          id="btn-create-folder"
        >
          <FolderPlus size={18} />
          Nueva Carpeta
        </button>
      </div>

      {/* Upload Box */}
      <div className="admin-form-card" style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 600,
          color: 'var(--color-primary-darker)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Upload size={20} />
          Subir Foto o Video a una Carpeta
        </h3>

        <form onSubmit={handleUploadSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
          }}>
            {/* Folder selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="upload-folder-select">
                Carpeta de destino *
              </label>
              <select
                id="upload-folder-select"
                className="form-input form-select"
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title / Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="upload-media-title">
                Título o Nombre (opcional)
              </label>
              <input
                id="upload-media-title"
                type="text"
                className="form-input"
                placeholder="Ej: Persiana Sheer Elegance Sala"
                value={mediaTitle}
                onChange={(e) => setMediaTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Drag & Drop Zone */}
          {!filePreview && (
            <div
              className={`image-drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ cursor: 'pointer' }}
            >
              <div className="image-drop-zone-icon">
                <Upload size={24} />
              </div>
              <p className="image-drop-zone-title">
                Arrastra una foto o video aquí o <span className="image-drop-zone-browse">busca en tu dispositivo</span>
              </p>
              <p className="image-drop-zone-text">
                Imágenes (JPG, PNG, WebP) o Videos (MP4) • Los videos se reproducirán sin audio automáticamente
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            style={{ display: 'none' }}
          />

          {/* Selected File Preview */}
          {filePreview && (
            <div style={{
              background: 'var(--color-gray-50)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              border: '1px solid var(--color-gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                {filePreview.type === 'video' ? (
                  <video
                    src={filePreview.url}
                    muted
                    style={{
                      width: 100,
                      height: 70,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      background: '#000',
                    }}
                  />
                ) : (
                  <img
                    src={filePreview.url}
                    alt="Preview"
                    style={{
                      width: 100,
                      height: 70,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-primary-darker)' }}>
                    {filePreview.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', marginTop: 2 }}>
                    Tipo: {filePreview.type === 'video' ? '🎬 Video' : '📷 Foto'} • Peso: {filePreview.size}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={clearSelection}
                  disabled={isUploading}
                >
                  <X size={16} />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={isUploading}
                  id="btn-confirm-upload"
                >
                  {isUploading ? (
                    'Subiendo...'
                  ) : (
                    <>
                      <Upload size={16} />
                      Subir a la Galería
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Folders & Categories Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-5)',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}>
          <button
            type="button"
            className={`category-pill ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>✨</span> Todos ({items.length})
          </button>

          {categories.map((cat) => {
            const count = items.filter((i) => i.category === cat.id).length;
            return (
              <div
                key={cat.id}
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <button
                  type="button"
                  className={`category-pill ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    borderTopRightRadius: cat.isCustom ? 0 : undefined,
                    borderBottomRightRadius: cat.isCustom ? 0 : undefined,
                  }}
                >
                  <span>{cat.icon || '📁'}</span> {cat.name} ({count})
                </button>
                {cat.isCustom && (
                  <button
                    type="button"
                    title={`Eliminar carpeta ${cat.name}`}
                    onClick={() => handleDeleteFolder(cat)}
                    style={{
                      background: 'var(--color-gray-100)',
                      border: '1px solid var(--color-gray-200)',
                      borderLeft: 'none',
                      borderTopRightRadius: 'var(--radius-full)',
                      borderBottomRightRadius: 'var(--radius-full)',
                      padding: '0 8px',
                      height: '100%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--color-gray-500)',
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
          Cargando galería...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Layers size={32} />
          </div>
          <h3 className="empty-state-title">No hay archivos en esta carpeta</h3>
          <p className="empty-state-text">
            Sube fotos o videos usando el formulario de arriba para que aparezcan en la tienda.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--color-white)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-gray-200)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Media Preview */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/10',
                background: '#000',
                overflow: 'hidden',
              }}>
                {item.type === 'video' ? (
                  <video
                    src={`${item.url}#t=0.1`}
                    muted
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}

                {/* Badge Video / Image */}
                <span style={{
                  position: 'absolute',
                  top: 'var(--space-2)',
                  left: 'var(--space-2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'var(--color-white)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                }}>
                  {item.type === 'video' ? (
                    <>
                      <Play size={10} fill="currentColor" /> Video (Sin audio)
                    </>
                  ) : (
                    <>
                      <ImageIcon size={11} /> Foto
                    </>
                  )}
                </span>

                {/* Tag */}
                <span style={{
                  position: 'absolute',
                  bottom: 'var(--space-2)',
                  left: 'var(--space-2)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  color: 'var(--color-white)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                }}>
                  {item.categoryLabel}
                </span>
              </div>

              {/* Info & Actions */}
              <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-800)',
                  marginBottom: 4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.title}
                </div>

                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-gray-400)',
                  marginBottom: 'var(--space-4)',
                }}>
                  {item.isDynamic ? '🟢 Subido desde el panel' : '📁 Archivo de carpeta local'}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ color: 'var(--color-error)' }}
                    onClick={() => handleDeleteItem(item)}
                    title={item.isDynamic ? 'Eliminar de la galería' : 'Información sobre archivo local'}
                  >
                    <Trash2 size={15} />
                    {item.isDynamic ? 'Eliminar' : 'Ver info'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create Folder */}
      {showFolderModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 'var(--z-modal)',
          padding: 'var(--space-4)',
        }}>
          <div style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            width: '100%',
            maxWidth: 420,
            boxShadow: 'var(--shadow-xl)',
            animation: 'scaleIn 0.2s ease both',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--color-primary-darker)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}>
                <FolderPlus size={22} />
                Nueva Carpeta
              </h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowFolderModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-500)', marginBottom: 'var(--space-4)' }}>
              Crea una categoría nueva para organizar tus fotos y videos (ej: Accesorios, Motorización, etc.).
            </p>

            <form onSubmit={handleCreateFolder}>
              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" htmlFor="folder-name-input">
                  Nombre de la carpeta *
                </label>
                <input
                  id="folder-name-input"
                  type="text"
                  className="form-input"
                  placeholder="Ej: Accesorios o Persianas Romanas"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                <label className="form-label" htmlFor="folder-icon-input">
                  Ícono o Emoji
                </label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {['📁', '🔧', '✨', '🛋️', '🏠', '🪟', '🌅'].map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNewFolderIcon(emoji)}
                      style={{
                        fontSize: '1.25rem',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: newFolderIcon === emoji ? '2px solid var(--color-primary)' : '1px solid var(--color-gray-200)',
                        background: newFolderIcon === emoji ? 'rgba(45, 106, 79, 0.1)' : 'var(--color-white)',
                        cursor: 'pointer',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowFolderModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="btn-save-folder"
                >
                  <Check size={16} />
                  Crear Carpeta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
