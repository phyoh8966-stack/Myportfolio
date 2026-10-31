import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Images, X } from 'lucide-react';

export default function Gallery({ images, activeImage, onSelect, onClose, onMove }) {
  useEffect(() => {
    if (activeImage === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onMove(1);
      if (event.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, onClose, onMove]);

  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading reveal">
        <p className="eyebrow">A few favorite moments</p>
        <h2>Love, in little frames</h2>
        <p>Tap a photograph to take a closer look.</p>
      </div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            className={`gallery-tile gallery-tile--${index + 1} reveal`}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`View photo ${index + 1}: ${image.alt}`}
            key={image.src}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="gallery-tile__icon">
              <Images size={18} />
            </span>
          </button>
        ))}
      </div>
      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button className="lightbox__close" type="button" onClick={onClose} aria-label="Close photo">
            <X />
          </button>
          <button
            className="lightbox__arrow lightbox__arrow--left"
            type="button"
            onClick={() => onMove(-1)}
            aria-label="Previous photo"
          >
            <ArrowLeft />
          </button>
          <figure className="lightbox__figure">
            <img src={images[activeImage].src} alt={images[activeImage].alt} />
            <figcaption>{images[activeImage].alt}</figcaption>
          </figure>
          <button
            className="lightbox__arrow lightbox__arrow--right"
            type="button"
            onClick={() => onMove(1)}
            aria-label="Next photo"
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </section>
  );
}
