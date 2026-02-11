// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   Star,
//   ShoppingCart,
//   Heart,
//   Share2,
//   Shield,
//   Truck,
//   RotateCcw,
//   Minus,
//   Plus,
//   Check,
//   ChevronRight,
//   ZoomIn,
//   Lock,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
// import { getProductBySlug, products } from '@/data/products';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
// import ProductCard from '@/components/ui/ProductCard';
// import ProductReviews from '@/components/sections/ProductReviews';
// import ImageLightbox from '@/components/ui/ImageLightbox';
// import StickyAddToCart from '@/components/ui/StickyAddToCart';
// import DeliveryEstimate from '@/components/ui/DeliveryEstimate';
// import { toast } from 'sonner';

// export default function ProductPage() {
//   const params = useParams();
//   const router = useRouter();
//   const slug = params?.slug ?? '';
//   const product = getProductBySlug(slug);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [showStickyBar, setShowStickyBar] = useState(false);
//   const addToCartRef = useRef(null);

//   const { addToCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();
//   const { addToRecentlyViewed } = useRecentlyViewed();

//   useEffect(() => {
//     if (product) {
//       addToRecentlyViewed(product);
//     }
//   }, [product?.id]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setShowStickyBar(!entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );

//     if (addToCartRef.current) {
//       observer.observe(addToCartRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   if (!product) {
//     return (
//       <div className="container py-20 text-center">
//         <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
//         <Link href="/" className="text-primary hover:underline">
//           Return to Home
//         </Link>
//       </div>
//     );
//   }

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const relatedProducts = products
//     .filter((p) => p.category === product.category && p.id !== product.id)
//     .slice(0, 4);

//   const handleAddToCart = () => {
//     addToCart(product, quantity, selectedVariants);
//     toast.success('Added to cart', { description: product.name });
//   };

//   const handleBuyNow = () => {
//     addToCart(product, quantity, selectedVariants);
//     router.push('/checkout');
//   };

//   const handleShare = async () => {
//     if (typeof navigator !== 'undefined' && navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: product.shortDescription,
//           url: window.location.href,
//         });
//       } catch (err) {
//         // User cancelled
//       }
//     } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
//       navigator.clipboard.writeText(window.location.href);
//       toast.success('Link copied to clipboard');
//     }
//   };

//   const isWishlisted = isInWishlist(product.id);

//   return (
//     <main className="pb-20 lg:pb-8">
//       <div className="container py-6 md:py-10">
//         {/* Breadcrumb */}
//         <nav
//           className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
//           aria-label="Breadcrumb"
//         >
//           <Link href="/" className="hover:text-primary">
//             Home
//           </Link>
//           <ChevronRight className="w-4 h-4" />
//           <Link
//             href={`/category/${product.categorySlug}`}
//             className="hover:text-primary"
//           >
//             {product.category}
//           </Link>
//           <ChevronRight className="w-4 h-4" />
//           <span className="text-foreground truncate max-w-[200px]">
//             {product.name}
//           </span>
//         </nav>

//         {/* Product Section */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
//           {/* Images */}
//           <div className="space-y-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
//               onClick={() => setIsLightboxOpen(true)}
//             >
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <div className="bg-background/90 rounded-full p-3">
//                   <ZoomIn className="w-6 h-6" />
//                 </div>
//               </div>
//             </motion.div>
//             <div className="flex gap-3 overflow-x-auto pb-2 scroll-touch snap-x snap-mandatory">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors snap-start touch-target min-w-[44px] min-h-[44px] ${
//                     selectedImage === index
//                       ? 'border-primary'
//                       : 'border-transparent hover:border-primary/50'
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt=""
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Details */}
//           <div>
//             {/* Badges */}
//             <div className="flex gap-2 mb-4">
//               {product.isBestseller && (
//                 <span className="badge-bestseller">Bestseller</span>
//               )}
//               {product.isNew && (
//                 <span className="badge-new">New Arrival</span>
//               )}
//               {!product.inStock && (
//                 <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
//                   Out of Stock
//                 </span>
//               )}
//             </div>

//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3">
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-3 mb-4">
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < Math.floor(product.rating)
//                         ? 'text-secondary fill-secondary'
//                         : 'text-muted-foreground/30'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-muted-foreground">
//                 {product.rating} ({product.reviews} reviews)
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 mb-6">
//               <span className="text-2xl md:text-3xl font-bold text-primary">
//                 {formatPrice(product.price)}
//               </span>
//               {product.originalPrice && (
//                 <>
//                   <span className="text-lg text-muted-foreground line-through">
//                     {formatPrice(product.originalPrice)}
//                   </span>
//                   <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded">
//                     {Math.round(
//                       (1 - product.price / product.originalPrice) * 100
//                     )}
//                     % OFF
//                   </span>
//                 </>
//               )}
//             </div>

//             <p className="text-muted-foreground mb-6">
//               {product.shortDescription}
//             </p>

//             {/* Authenticity */}
//             <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl mb-6">
//               <Shield className="w-8 h-8 text-accent flex-shrink-0" />
//               <div>
//                 <h4 className="font-medium flex items-center gap-2 text-sm">
//                   <Check className="w-4 h-4 text-accent" />
//                   100% Authentic & Energized
//                 </h4>
//                 <p className="text-xs text-muted-foreground">
//                   {product.authenticity.certificate} • Origin:{' '}
//                   {product.authenticity.origin}
//                 </p>
//               </div>
//             </div>

//             {/* Variants */}
//             {product.variants?.map((variant) => (
//               <div key={variant.name} className="mb-5">
//                 <label className="block text-sm font-medium mb-2.5">
//                   {variant.name}
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {variant.options.map((option) => (
//                     <button
//                       key={option}
//                       onClick={() =>
//                         setSelectedVariants({
//                           ...selectedVariants,
//                           [variant.name]: option,
//                         })
//                       }
//                       className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
//                         selectedVariants[variant.name] === option
//                           ? 'border-primary bg-primary text-primary-foreground'
//                           : 'border-border hover:border-primary'
//                       }`}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             {/* Quantity */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2.5">
//                 Quantity
//               </label>
//               <div className="flex items-center gap-3">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="h-11 w-11"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </Button>
//                 <span className="w-12 text-center text-lg font-medium">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="h-11 w-11"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Actions - Reference point for sticky bar */}
//             <div ref={addToCartRef} className="flex gap-3 mb-6">
//               <Button
//                 size="lg"
//                 className="flex-1 h-12 bg-primary hover:bg-primary/90"
//                 onClick={handleAddToCart}
//                 disabled={!product.inStock}
//               >
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Add to Cart
//               </Button>
//               <Button
//                 size="lg"
//                 variant="secondary"
//                 className="flex-1 h-12"
//                 onClick={handleBuyNow}
//                 disabled={!product.inStock}
//               >
//                 Buy Now
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="h-12 w-12"
//                 onClick={() => toggleWishlist(product)}
//               >
//                 <Heart
//                   className={`w-5 h-5 ${
//                     isWishlisted ? 'fill-destructive text-destructive' : ''
//                   }`}
//                 />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="h-12 w-12"
//                 onClick={handleShare}
//               >
//                 <Share2 className="w-5 h-5" />
//               </Button>
//             </div>

//             {/* Delivery Estimate */}
//             <div className="mb-6">
//               <DeliveryEstimate inStock={product.inStock} />
//             </div>

//             {/* Trust indicators */}
//             <div className="grid grid-cols-3 gap-3 p-4 bg-muted/50 rounded-xl">
//               <div className="text-center">
//                 <Truck className="w-5 h-5 mx-auto mb-1 text-primary" />
//                 <p className="text-xs font-medium">Free Shipping</p>
//                 <p className="text-[10px] text-muted-foreground">Above ₹999</p>
//               </div>
//               <div className="text-center">
//                 <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary" />
//                 <p className="text-xs font-medium">Easy Returns</p>
//                 <p className="text-[10px] text-muted-foreground">7 Days</p>
//               </div>
//               <div className="text-center">
//                 <Lock className="w-5 h-5 mx-auto mb-1 text-primary" />
//                 <p className="text-xs font-medium">Secure Payment</p>
//                 <p className="text-[10px] text-muted-foreground">100% Safe</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Accordion Product Details */}
//         <Accordion
//           type="multiple"
//           defaultValue={['description', 'benefits']}
//           className="mb-16"
//         >
//           <AccordionItem value="description">
//             <AccordionTrigger className="text-lg font-serif font-semibold">
//               Product Description
//             </AccordionTrigger>
//             <AccordionContent>
//               <p className="text-muted-foreground leading-relaxed">
//                 {product.description}
//               </p>
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="benefits">
//             <AccordionTrigger className="text-lg font-serif font-semibold">
//               Key Benefits
//             </AccordionTrigger>
//             <AccordionContent>
//               <ul className="space-y-3">
//                 {product.benefits.map((benefit, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
//                     <span>{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="who-should-wear">
//             <AccordionTrigger className="text-lg font-serif font-semibold">
//               Who Should Wear
//             </AccordionTrigger>
//             <AccordionContent>
//               <ul className="space-y-3">
//                 {product.whoShouldWear.map((item, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="wearing-rules">
//             <AccordionTrigger className="text-lg font-serif font-semibold">
//               Wearing Rules & Guidelines
//             </AccordionTrigger>
//             <AccordionContent>
//               <ul className="space-y-3">
//                 {product.wearingRules.map((rule, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
//                       {index + 1}
//                     </span>
//                     <span>{rule}</span>
//                   </li>
//                 ))}
//               </ul>
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="shipping">
//             <AccordionTrigger className="text-lg font-serif font-semibold">
//               Shipping & Returns
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="space-y-4 text-muted-foreground">
//                 <div>
//                   <h4 className="font-medium text-foreground mb-2">Shipping</h4>
//                   <ul className="space-y-1 text-sm">
//                     <li>• Free shipping on orders above ₹999</li>
//                     <li>• Standard delivery: 3-7 business days</li>
//                     <li>• Express delivery available (additional charges)</li>
//                     <li>• Pan-India delivery available</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-foreground mb-2">
//                     Returns & Refunds
//                   </h4>
//                   <ul className="space-y-1 text-sm">
//                     <li>• 7-day return policy for unused items</li>
//                     <li>• Items must be in original packaging</li>
//                     <li>• Refund processed within 5-7 business days</li>
//                     <li>• Contact support for return requests</li>
//                   </ul>
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>

//         {/* Customer Reviews */}
//         <ProductReviews
//           productId={product.id}
//           productRating={product.rating}
//           totalReviews={product.reviews}
//         />

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <section className="mt-16">
//             <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
//               Related Products
//             </h2>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//               {relatedProducts.map((relatedProduct, index) => (
//                 <ProductCard
//                   key={relatedProduct.id}
//                   product={relatedProduct}
//                   index={index}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       {/* Image Lightbox */}
//       <ImageLightbox
//         images={product.images}
//         initialIndex={selectedImage}
//         isOpen={isLightboxOpen}
//         onClose={() => setIsLightboxOpen(false)}
//         alt={product.name}
//       />

//       {/* Sticky Mobile Add to Cart */}
//       <StickyAddToCart
//         product={product}
//         quantity={quantity}
//         isVisible={showStickyBar}
//         onAddToCart={handleAddToCart}
//         onBuyNow={handleBuyNow}
//       />
//     </main>
//   );
// }

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
  ArrowLeft,
  Info,
  Sparkles,
  FileText,
  User,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [isMobile, setIsMobile] = useState(false);
  const addToCartRef = useRef(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product?.id, addToRecentlyViewed]);

  // Intersection observer for sticky bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    );

    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="container px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
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
    toast.success('Added to cart', {
      description: `${product.name} (${quantity} ${quantity > 1 ? 'items' : 'item'})`,
      action: {
        label: 'View Cart',
        onClick: () => router.push('/cart'),
      },
    });
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
        toast.success('Shared successfully');
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
    <main className="pb-20 lg:pb-8 min-h-screen">
      {/* Mobile Back Button */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-background border-b">
          <div className="container px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 -ml-3"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      )}

      <div className="container px-4 py-6 md:py-10">
        {/* Breadcrumb - Hidden on mobile, shown on tablet+ */}
        <nav
          className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Mobile Breadcrumb */}
        <nav className="md:hidden mb-4">
          <p className="text-xs text-muted-foreground truncate">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <span className="text-foreground">{product.category}</span>
          </p>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Images Column */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/90 rounded-full p-2 md:p-3">
                  <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              {/* Zoom hint on mobile */}
              {isMobile && (
                <div className="absolute bottom-3 right-3 bg-background/90 rounded-full p-2">
                  <ZoomIn className="w-4 h-4" />
                </div>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scroll-touch snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors snap-start ${selectedImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-primary/50'
                    }`}
                  style={{
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '60px' : '80px',
                  }}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isBestseller && (
                <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded">
                  New Arrival
                </span>
              )}
              {!product.inStock && (
                <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating)
                        ? 'text-secondary fill-secondary'
                        : 'text-muted-foreground/30'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                •
              </span>
              <span className="text-sm text-muted-foreground">
                {product.soldCount}+ sold
              </span>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
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
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground">
                  You save {formatPrice(product.originalPrice - product.price)}
                </p>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Authenticity Badge */}
            <div className="flex items-start gap-3 p-3 md:p-4 bg-accent/10 rounded-xl">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-accent flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium flex items-center gap-2 text-sm md:text-base">
                  <Check className="w-4 h-4 text-accent" />
                  100% Authentic & Energized
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {product.authenticity.certificate} • Origin:{' '}
                  {product.authenticity.origin}
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.name} className="space-y-3">
                <label className="block text-sm font-medium">
                  {variant.name}
                  {variant.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
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
                      className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-sm font-medium transition-all ${selectedVariants[variant.name] === option
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

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3 max-w-[180px]">
                <Button
                  variant="outline"
                  size={isMobile ? "icon" : "default"}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`${isMobile ? 'h-10 w-10' : 'h-11 w-11'}`}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-lg font-medium block">{quantity}</span>
                  <span className="text-xs text-muted-foreground">
                    Available: {product.stock || 50}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size={isMobile ? "icon" : "default"}
                  onClick={() => setQuantity(quantity + 1)}
                  className={`${isMobile ? 'h-10 w-10' : 'h-11 w-11'}`}
                  disabled={quantity >= (product.stock || 50)}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Delivery Estimate */}
            <DeliveryEstimate inStock={product.inStock} />

            {/* Action Buttons - Reference for sticky bar */}
            <div ref={addToCartRef} className="space-y-3">
              {/* PRIMARY ACTION BUTTONS - SINGLE ROW ON ALL DEVICES */}
              <div className="flex gap-3">
                <Button
                  size={isMobile ? "lg" : "lg"}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size={isMobile ? "lg" : "lg"}
                  variant="secondary"
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              {/* SECONDARY ACTION BUTTONS */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-destructive text-destructive' : ''
                      }`}
                  />
                  {isMobile ? (isWishlisted ? 'Saved' : 'Wishlist') : (isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist')}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 p-3 md:p-4 bg-muted/30 rounded-xl border">
              <div className="text-center">
                <Truck className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  Above ₹999
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Easy Returns</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  7 Days
                </p>
              </div>
              <div className="text-center">
                <Lock className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  100% Safe
                </p>
              </div>
            </div>

            {/* Mobile Stock Info */}
            {isMobile && product.stock < 10 && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <Info className="w-4 h-4" />
                <span>Only {product.stock} left in stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Accordion */}
        {/* Product Details Tabs */}
        <div className="mb-12 md:mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50 rounded-lg mb-6 scrollbar-hide">
              <TabsTrigger value="description" className="flex-shrink-0 gap-2 py-2.5 px-4">
                <FileText className="w-4 h-4" />
                Description
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex-shrink-0 gap-2 py-2.5 px-4">
                <Sparkles className="w-4 h-4" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="who-should-wear" className="flex-shrink-0 gap-2 py-2.5 px-4">
                <User className="w-4 h-4" />
                Who Should Wear
              </TabsTrigger>
              <TabsTrigger value="wearing-rules" className="flex-shrink-0 gap-2 py-2.5 px-4">
                <BookOpen className="w-4 h-4" />
                Rules
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-shrink-0 gap-2 py-2.5 px-4">
                <Truck className="w-4 h-4" />
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="animate-in fade-in-50 duration-500">
              <div className="bg-card border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Product Description
                  </h3>
                  <div className="prose prose-stone max-w-none text-muted-foreground">
                    <p className="leading-relaxed">{product.description}</p>
                  </div>
                </div>

                {product.materials && (
                  <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Materials</h4>
                      <p className="text-muted-foreground">{product.materials.join(', ')}</p>
                    </div>
                    {product.dimensions && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Dimensions</h4>
                        <p className="text-muted-foreground">{product.dimensions}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="animate-in fade-in-50 duration-500">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Key Benefits
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground/90 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="who-should-wear" className="animate-in fade-in-50 duration-500">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Who Should Wear
                </h3>
                <div className="space-y-4">
                  {product.whoShouldWear.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 font-serif font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wearing-rules" className="animate-in fade-in-50 duration-500">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Wearing Guidelines
                </h3>
                <div className="grid gap-4">
                  {product.wearingRules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-foreground/80">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="animate-in fade-in-50 duration-500">
              <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg">Shipping Information</h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        Free shipping on orders above ₹999
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        Standard delivery: 3-7 business days
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        Express delivery available
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        Pan-India delivery available
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg">Returns & Refunds</h4>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Info className="w-4 h-4 text-amber-500" />
                        7-day return policy for unused items
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Info className="w-4 h-4 text-amber-500" />
                        Items must be in original packaging
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        Refund processed in 5-7 business days
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12 md:mb-16">
          <ProductReviews
            productId={product.id}
            productRating={product.rating}
            totalReviews={product.reviews}
            productName={product.name}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 md:mt-16">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold">
                Related Products
              </h2>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                  compact={isMobile}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Section */}
        <section className="mt-12 md:mt-16">
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 md:mb-8">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {products.slice(0, 4).map((productItem, index) => (
              <ProductCard
                key={productItem.id}
                product={productItem}
                index={index}
                compact={isMobile}
              />
            ))}
          </div>
        </section>
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
        isVisible={showStickyBar && isMobile}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={isWishlisted}
        onToggleWishlist={() => toggleWishlist(product)}
      />
    </main>
  );
}