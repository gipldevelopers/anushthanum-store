'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Heart,
  Trash2,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import EmptyState from '@/components/ui/EmptyState';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success('Added to cart', { description: product.name });
  };

  const handleAddAllToCart = () => {
    items.forEach((product) => {
      addToCart(product, 1);
    });
    clearWishlist();
    toast.success('All items added to cart');
  };

  return (
    <main className="py-6 md:py-10">
      <div className="container max-w-5xl">
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary fill-primary/20" />
              My Wishlist
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </motion.div>

          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2"
            >
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                <Trash2 className="w-4 h-4 mr-1.5" />
                Clear All
              </Button>
              <Button size="sm" onClick={handleAddAllToCart}>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add All to Cart
              </Button>
            </motion.div>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save products you love for later. Click the heart icon on any product to add it here."
            actionLabel="Browse Products"
            actionHref="/"
          />
        ) : (
          <div className="space-y-4">
            {items.map((product, index) => {
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative w-full sm:w-24 h-48 sm:h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted/30 shrink-0"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                      {product.isBestseller && (
                        <span className="badge-bestseller text-[10px] px-1.5 py-0.5">
                          Best
                        </span>
                      )}
                      {/* {discount > 0 && (
                        <span className="badge-discount text-[10px] px-1.5 py-0.5">
                          -{discount}%
                        </span>
                      )} */}
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                        {product.category}
                      </p>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-medium text-sm md:text-base text-foreground line-clamp-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < Math.floor(product.rating)
                                  ? 'text-secondary'
                                  : 'text-muted-foreground/30'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 shrink-0 justify-center">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="h-9 flex-1 sm:flex-none"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1.5" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromWishlist(product.id)}
                      className="h-9 text-muted-foreground hover:text-destructive flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      <span className="hidden sm:inline">Remove</span>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Button variant="outline" asChild className="group">
              <Link href="/">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
