'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  Star,
  ShoppingCart,
  Heart,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const trustFeatures = [
    { icon: Truck, label: 'Free Delivery', desc: 'Orders above ₹999' },
    { icon: Shield, label: 'Authentic', desc: 'Lab Certified' },
    { icon: RotateCcw, label: 'Easy Returns', desc: '7 Days' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-background">
        <div className="grid md:grid-cols-2">
          <div className="relative bg-muted/30 p-4 md:p-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-background">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors border border-border/50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors border border-border/50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isBestseller && <span className="badge-bestseller">Bestseller</span>}
                {product.isNew && <span className="badge-new">New</span>}
                {/* {discount > 0 && <span className="badge-discount">-{discount}%</span>} */}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-5 md:p-6 flex flex-col max-h-[80vh] md:max-h-[600px] overflow-y-auto">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground leading-tight mb-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-secondary fill-secondary'
                        : 'text-muted-foreground/20 fill-muted-foreground/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>
            {product.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{product.description}</p>
            )}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-medium text-foreground uppercase tracking-wide mb-2">Key Benefits</h4>
                <ul className="space-y-1.5">
                  {product.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.authenticity?.certified && (
              <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg mb-4">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-accent">{product.authenticity.certificate}</span>
              </div>
            )}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mb-5">
              <Button
                size="lg"
                className={`flex-1 h-12 transition-all ${isAddedToCart ? 'bg-accent hover:bg-accent text-accent-foreground' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`h-12 w-12 shrink-0 ${isWishlisted ? 'text-destructive border-destructive/30' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
              {trustFeatures.map((feature, idx) => (
                <div key={idx} className="text-center">
                  <feature.icon className="w-5 h-5 mx-auto text-primary mb-1" />
                  <p className="text-xs font-medium text-foreground">{feature.label}</p>
                  <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="mt-4 text-center text-sm text-primary hover:underline font-medium"
            >
              View Full Product Details →
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
