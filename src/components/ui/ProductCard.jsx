'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToImage = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(idx);
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
          {product.isNew && <span className="badge-new">New</span>}
          {/* {discount > 0 && <span className="badge-discount">-{discount}%</span>} */}
        </div>

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-border/50 hover:scale-105 touch-target ${isWishlisted
            ? 'opacity-100 text-destructive'
            : 'touch-show-hover-hide hover:bg-background hover:text-destructive'
            }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <div className="block relative aspect-[4/5] overflow-hidden bg-muted/30">
          <Link href={`/product/${product.slug}`} className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </AnimatePresence>
          </Link>

          {/* Image Navigation Controls */}
          {product.images.length > 1 && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-background transition-colors z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-none">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => goToImage(e, idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm pointer-events-auto ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}


          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent pointer-events-none [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:pointer-events-auto z-20"
          >
            <div className="flex gap-2 pointer-events-auto">
              <Button
                size="sm"
                className={`flex-1 text-sm transition-all min-h-[44px] sm:min-h-0 ${isAddedToCart ? 'bg-accent hover:bg-accent text-accent-foreground' : 'bg-primary hover:bg-primary/90'
                  }`}
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 hover:bg-background text-foreground min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
                onClick={handleQuickView}
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="p-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1.5">{product.category}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-sm text-foreground line-clamp-2 hover:text-primary transition-colors leading-snug min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                    ? 'text-secondary fill-secondary'
                    : 'text-muted-foreground/20 fill-muted-foreground/20'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          {/* {product.authenticity?.certified && (
            <p className="text-[10px] text-accent font-medium mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
              {product.authenticity.certificate}
            </p>
          )} */}
        </div>
      </motion.article>

      <QuickViewModal product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  );
}
