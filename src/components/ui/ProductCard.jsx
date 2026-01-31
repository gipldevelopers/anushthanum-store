'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
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
          {discount > 0 && <span className="badge-discount">-{discount}%</span>}
        </div>

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-border/50 hover:scale-105 ${
            isWishlisted
              ? 'opacity-100 text-destructive'
              : 'opacity-0 group-hover:opacity-100 hover:bg-background hover:text-destructive'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-muted/30">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/70 via-foreground/40 to-transparent pointer-events-none"
          >
            <div className="flex gap-2 pointer-events-auto">
              <Button
                size="sm"
                className={`flex-1 text-sm transition-all ${
                  isAddedToCart ? 'bg-accent hover:bg-accent text-accent-foreground' : 'bg-primary hover:bg-primary/90'
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
                className="bg-background/90 hover:bg-background text-foreground"
                onClick={handleQuickView}
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </Link>

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
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
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
