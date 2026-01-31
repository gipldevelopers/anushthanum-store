'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function CartSidebar() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const hasFreeShipping = totalPrice >= freeShippingThreshold;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-serif font-semibold">Your Cart</h2>
                <span className="text-sm text-muted-foreground">({items.length})</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {items.length > 0 && (
              <div className="px-5 py-3 bg-muted/30 border-b border-border">
                {hasFreeShipping ? (
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <Truck className="w-4 h-4" />
                    <span className="font-medium">You&apos;ve unlocked free shipping!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">
                        Add {formatPrice(amountToFreeShipping)} more for free shipping
                      </span>
                      <Truck className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                    Discover our collection of authentic spiritual products
                  </p>
                  <Button onClick={() => setIsCartOpen(false)} asChild>
                    <Link href="/category/rudraksha">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-3 bg-card rounded-lg border border-border"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                        >
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {item.product.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                        <p className="text-sm font-semibold text-foreground mt-1.5">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-7 h-7 rounded-r-none hover:bg-muted/50"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-7 h-7 rounded-l-none hover:bg-muted/50"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 ml-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4 bg-muted/20">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <div className="grid gap-2">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 btn-glow"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
