'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = 'Product image',
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const toggleZoom = () => setIsZoomed((z) => !z);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10 bg-background/50 hover:bg-background/80" onClick={onClose} aria-label="Close lightbox">
            <X className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10 bg-background/50 hover:bg-background/80" onClick={(e) => { e.stopPropagation(); toggleZoom(); }} aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}>
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </Button>
          {images.length > 1 && (
            <>
              <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 h-12 w-12" onClick={(e) => { e.stopPropagation(); goToPrevious(); }} aria-label="Previous image">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 h-12 w-12" onClick={(e) => { e.stopPropagation(); goToNext(); }} aria-label="Next image">
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`relative max-w-[90vw] max-h-[85vh] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          >
            <img
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              style={{ maxHeight: '85vh', maxWidth: '90vw' }}
            />
          </motion.div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/50 backdrop-blur-sm rounded-lg p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); setIsZoomed(false); }}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-colors ${currentIndex === index ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/50 backdrop-blur-sm rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
