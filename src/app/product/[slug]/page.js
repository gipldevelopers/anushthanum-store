'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight,
  ZoomIn,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import ProductCard from '@/components/ui/ProductCard';
import ProductReviews from '@/components/sections/ProductReviews';
import ImageLightbox from '@/components/ui/ImageLightbox';
import StickyAddToCart from '@/components/ui/StickyAddToCart';
import DeliveryEstimate from '@/components/ui/DeliveryEstimate';
import { toast } from 'sonner';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug ?? '';
  const product = getProductBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product?.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    toast.success('Added to cart', { description: product.name });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants);
    router.push('/checkout');
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <main className="pb-20 lg:pb-8">
      <div className="container py-6 md:py-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/90 rounded-full p-3">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
            <div className="flex gap-3 overflow-x-auto pb-2 scroll-touch snap-x snap-mandatory">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors snap-start touch-target min-w-[44px] min-h-[44px] ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isBestseller && (
                <span className="badge-bestseller">Bestseller</span>
              )}
              {product.isNew && (
                <span className="badge-new">New Arrival</span>
              )}
              {!product.inStock && (
                <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-secondary fill-secondary'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground mb-6">
              {product.shortDescription}
            </p>

            {/* Authenticity */}
            <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl mb-6">
              <Shield className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-medium flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  100% Authentic & Energized
                </h4>
                <p className="text-xs text-muted-foreground">
                  {product.authenticity.certificate} • Origin:{' '}
                  {product.authenticity.origin}
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.name} className="mb-5">
                <label className="block text-sm font-medium mb-2.5">
                  {variant.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedVariants({
                          ...selectedVariants,
                          [variant.name]: option,
                        })
                      }
                      className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariants[variant.name] === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2.5">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-11 w-11"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-11 w-11"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Actions - Reference point for sticky bar */}
            <div ref={addToCartRef} className="flex gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1 h-12"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-12"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-destructive text-destructive' : ''
                  }`}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-12"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Delivery Estimate */}
            <div className="mb-6">
              <DeliveryEstimate inStock={product.inStock} />
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-muted/50 rounded-xl">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-[10px] text-muted-foreground">Above ₹999</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-[10px] text-muted-foreground">7 Days</p>
              </div>
              <div className="text-center">
                <Lock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-[10px] text-muted-foreground">100% Safe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Product Details */}
        <Accordion
          type="multiple"
          defaultValue={['description', 'benefits']}
          className="mb-16"
        >
          <AccordionItem value="description">
            <AccordionTrigger className="text-lg font-serif font-semibold">
              Product Description
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="benefits">
            <AccordionTrigger className="text-lg font-serif font-semibold">
              Key Benefits
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="who-should-wear">
            <AccordionTrigger className="text-lg font-serif font-semibold">
              Who Should Wear
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3">
                {product.whoShouldWear.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="wearing-rules">
            <AccordionTrigger className="text-lg font-serif font-semibold">
              Wearing Rules & Guidelines
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3">
                {product.wearingRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping">
            <AccordionTrigger className="text-lg font-serif font-semibold">
              Shipping & Returns
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Shipping</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Free shipping on orders above ₹999</li>
                    <li>• Standard delivery: 3-7 business days</li>
                    <li>• Express delivery available (additional charges)</li>
                    <li>• Pan-India delivery available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    Returns & Refunds
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 7-day return policy for unused items</li>
                    <li>• Items must be in original packaging</li>
                    <li>• Refund processed within 5-7 business days</li>
                    <li>• Contact support for return requests</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Customer Reviews */}
        <ProductReviews
          productId={product.id}
          productRating={product.rating}
          totalReviews={product.reviews}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={product.images}
        initialIndex={selectedImage}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        alt={product.name}
      />

      {/* Sticky Mobile Add to Cart */}
      <StickyAddToCart
        product={product}
        quantity={quantity}
        isVisible={showStickyBar}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </main>
  );
}
