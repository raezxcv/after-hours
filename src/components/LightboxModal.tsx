import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Calendar, MapPin } from 'lucide-react';
import { GalleryItem } from '../data/bandData';
import { handleImageError } from '../utils/imageHelper';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(items[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/92 backdrop-blur-md animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[100] p-2 bg-punk-black border border-punk-border text-dirty-white hover:text-crimson transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 bg-punk-black/80 hover:bg-crimson border border-punk-border text-dirty-white transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 bg-punk-black/80 hover:bg-crimson border border-punk-border text-dirty-white transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Lightbox Card */}
      <div className="max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-punk-black border border-punk-border shadow-2xl overflow-hidden tape-top-right">
        {/* Image Frame */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative p-2 sm:p-4 min-h-[300px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            onError={handleImageError}
            className="max-h-[70vh] w-auto max-w-full object-contain border border-punk-border"
          />
          <div className="absolute top-4 left-4 bg-crimson text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5">
            {item.category}
          </div>
        </div>

        {/* Information Sidebar */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between bg-punk-zinc border-t md:border-t-0 md:border-l border-punk-border overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-faded-light mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-crimson" /> {item.date}
              </span>
              <span>{currentIndex + 1} / {items.length}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-dirty-white uppercase tracking-tight mb-2">
              {item.title}
            </h3>

            <p className="font-mono text-xs text-crimson mb-4 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {item.location}
            </p>

            <p className="font-body text-sm text-dirty-white/90 leading-relaxed mb-6">
              {item.caption}
            </p>
          </div>

          <div className="pt-4 border-t border-punk-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-faded-light">
              <Camera className="w-3.5 h-3.5 text-crimson" />
              <span>PHOTO: {item.photographer}</span>
            </div>
            <p className="font-mono text-[11px] text-faded-gray">
              AFTERHOURS BAND ARCHIVE • 35MM DIRECT FLASH SERIES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

