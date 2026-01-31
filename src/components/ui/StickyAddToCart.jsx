'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyAddToCart({ product, quantity, isVisible, onAddToCart, onBuyNow }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border shadow-lg"
        >
          <div className="container py-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-primary truncate">{formatPrice(product.price * quantity)}</p>
                <p className="text-xs text-muted-foreground">
                  {quantity > 1 ? `${quantity} × ${formatPrice(product.price)}` : product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="lg" onClick={onAddToCart} disabled={!product.inStock} className="px-4">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
                <Button size="lg" onClick={onBuyNow} disabled={!product.inStock} className="px-6">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
