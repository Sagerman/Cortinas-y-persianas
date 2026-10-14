import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * Masonry grid of photos/videos with a full-screen lightbox (<dialog>).
 * @param {{ items: Array<{id:string,url:string,type:'image'|'video',title:string,categoryLabel:string}>, limit?: number }} props
 */
export default function GalleryGrid({ items, limit }) {
  const [openIndex, setOpenIndex] = useState(null);
  const visible = limit ? items.slice(0, limit) : items;

  return (
    <>
      <div className="gallery-grid">
        {visible.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <Lightbox items={visible} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}

function GalleryTile({ item, index, onOpen }) {
  const videoRef = useRef(null);
  const isVideo = item.type === 'video';

  const playPreview = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const stopPreview = () => {
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <button
      type="button"
      className={`gallery-tile ${isVideo ? 'is-video' : ''}`}
      style={{ animationDelay: `${Math.min(index, 12) * 0.05}s` }}
      onClick={onOpen}
      onMouseEnter={isVideo ? playPreview : undefined}
      onMouseLeave={isVideo ? stopPreview : undefined}
      onFocus={isVideo ? playPreview : undefined}
      onBlur={isVideo ? stopPreview : undefined}
      aria-label={`Ver ${isVideo ? 'video' : 'foto'}: ${item.title}`}
      id={`gallery-tile-${index}`}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={`${item.url}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      ) : (
        <img src={item.url} alt={item.title} loading="lazy" decoding="async" />
      )}

      <span className="gallery-tile-overlay">
        <span className="gallery-tile-tag">{item.categoryLabel}</span>
        <span className="gallery-tile-action">
          {isVideo ? <Play size={22} fill="currentColor" /> : <Maximize2 size={20} />}
        </span>
      </span>

      {isVideo && (
        <span className="gallery-tile-video-badge">
          <Play size={12} fill="currentColor" /> Video
        </span>
      )}
    </button>
  );
}

function Lightbox({ items, index, onChange }) {
  const dialogRef = useRef(null);
  const isOpen = index !== null && items[index];
  const item = isOpen ? items[index] : null;

  // Open / close the native dialog in sync with state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const go = useCallback(
    (delta) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, go]);

  // Fallback light-dismiss for browsers without closedby support
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      closedby="any"
      onClose={() => onChange(null)}
      onClick={handleBackdropClick}
      aria-label="Visor de galería"
      id="gallery-lightbox"
    >
      {item && (
        <div className="lightbox-inner">
          <button
            type="button"
            className="lightbox-btn lightbox-close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            autoFocus
          >
            <X size={22} />
          </button>

          {items.length > 1 && (
            <>
              <button type="button" className="lightbox-btn lightbox-prev" onClick={() => go(-1)} aria-label="Anterior">
                <ChevronLeft size={26} />
              </button>
              <button type="button" className="lightbox-btn lightbox-next" onClick={() => go(1)} aria-label="Siguiente">
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <figure className="lightbox-media" key={item.id}>
            {item.type === 'video' ? (
              <video
                src={item.url}
                controls
                autoPlay
                loop
                playsInline
                muted
                defaultMuted
                onVolumeChange={(e) => {
                  e.currentTarget.muted = true;
                  e.currentTarget.volume = 0;
                }}
              />
            ) : (
              <img src={item.url} alt={item.title} />
            )}
            <figcaption className="lightbox-caption">
              <span className="lightbox-caption-tag">{item.categoryLabel}</span>
              <span className="lightbox-caption-count">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </dialog>
  );
}
