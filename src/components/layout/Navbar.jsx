// 'use client';

// import { useState, useEffect, useMemo, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Search,
//   ShoppingCart,
//   User,
//   Menu,
//   X,
//   ChevronDown,
//   Package,
//   Phone,
//   Heart,
//   ArrowRight,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import { products } from '@/data/products';

// const navItems = [
//   {
//     label: 'Rudraksha',
//     href: '/category/rudraksha',
//     dropdown: [
//       { label: 'Rudraksha Beads', href: '/category/rudraksha?type=beads' },
//       { label: 'Rudraksha Bracelet', href: '/category/bracelets?type=rudraksha' },
//       { label: 'Rudraksha Mala', href: '/category/rudraksha?type=mala' },
//     ],
//   },
//   {
//     label: 'Yantra',
//     href: '/category/yantra',
//     dropdown: [
//       { label: 'Sri Yantra', href: '/category/yantra?type=sri' },
//       { label: 'Navgraha Yantra', href: '/category/yantra?type=navgraha' },
//       { label: 'Yantra Pendants', href: '/category/yantra?type=pendant' },
//     ],
//   },
//   {
//     label: 'Bracelets',
//     href: '/category/bracelets',
//     dropdown: [
//       { label: 'Rudraksha Bracelets', href: '/category/bracelets?type=rudraksha' },
//       { label: 'Crystal Bracelets', href: '/category/bracelets?type=crystal' },
//       { label: 'Gemstone Bracelets', href: '/category/bracelets?type=gemstone' },
//     ],
//   },
//   {
//     label: 'Crystals',
//     href: '/category/crystals',
//     dropdown: [
//       { label: 'Healing Crystals', href: '/category/crystals?type=healing' },
//       { label: 'Crystal Spheres', href: '/category/crystals?type=sphere' },
//       { label: 'Crystal Points', href: '/category/crystals?type=points' },
//     ],
//   },
//   {
//     label: 'Guidance',
//     href: '/guidance/choosing-consciously',
//     dropdown: [
//       { label: 'Choosing Consciously', href: '/guidance/choosing-consciously' },
//       { label: 'Suitability Guide', href: '/guidance/suitability' },
//       { label: 'Browse by Intention', href: '/browse-by-intention' },
//       { label: 'Education Center', href: '/education' },
//       { label: 'Our Process', href: '/energization' },
//       { label: 'Disclaimer', href: '/disclaimer' },
//     ],
//   },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const searchInputRef = useRef(null);
//   const { totalItems, setIsCartOpen } = useCart();
//   const { totalItems: wishlistCount } = useWishlist();
//   const router = useRouter();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isSearchOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [isSearchOpen]);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//       document.documentElement.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//       document.documentElement.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//       document.documentElement.style.overflow = '';
//     };
//   }, [isMenuOpen]);

//   const searchSuggestions = useMemo(() => {
//     if (searchQuery.length < 2) return [];
//     const query = searchQuery.toLowerCase();
//     return products
//       .filter(
//         (p) =>
//           p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
//       )
//       .slice(0, 5);
//   }, [searchQuery]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setIsSearchOpen(false);
//       setSearchQuery('');
//     }
//   };

//   const handleSuggestionClick = (slug) => {
//     router.push(`/product/${slug}`);
//     setIsSearchOpen(false);
//     setSearchQuery('');
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}
//     >
//       <div className="bg-background border-b border-border">
//         <div className="container py-3 lg:py-4">
//           <div className="flex items-center justify-between gap-4">
//             <a
//               href="tel:+919876543210"
//               className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
//             >
//               <Phone className="w-4 h-4" />
//               <span>+91 98765 43210</span>
//             </a>
//             <Link href="/" className="flex-shrink-0">
//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gradient-gold">
//                 Anushthanum
//               </h1>
//             </Link>
//             <div className="flex items-center gap-0.5 sm:gap-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="text-foreground/70 hover:text-foreground hover:bg-muted/50 touch-target h-11 w-11 sm:h-10 sm:w-10"
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5" />
//               </Button>
//               <Link href="/wishlist" className="touch-target flex">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="relative text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 sm:h-10 sm:w-10 min-w-0"
//                   aria-label="Wishlist"
//                 >
//                   <Heart className="w-5 h-5" />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
//                       {wishlistCount > 9 ? '9+' : wishlistCount}
//                     </span>
//                   )}
//                 </Button>
//               </Link>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative text-foreground/70 hover:text-foreground hover:bg-muted/50 touch-target h-11 w-11 sm:h-10 sm:w-10"
//                 aria-label="Cart"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
//                     {totalItems > 9 ? '9+' : totalItems}
//                   </span>
//                 )}
//               </Button>
//               <Link href="/profile" className="touch-target flex">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 sm:h-10 sm:w-10 min-w-0"
//                   aria-label="Account"
//                 >
//                   <User className="w-5 h-5" />
//                 </Button>
//               </Link>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden text-foreground/70 hover:text-foreground hover:bg-muted/50 touch-target h-11 w-11 sm:h-10 sm:w-10"
//                 aria-label="Menu"
//               >
//                 {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//               </Button>
//             </div>
//           </div>

//           <AnimatePresence>
//             {isSearchOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-4 relative"
//               >
//                 <form onSubmit={handleSearch}>
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       ref={searchInputRef}
//                       type="search"
//                       placeholder="Search for Rudraksha, Yantra, Crystals..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-12 pr-4 py-6 text-base border-border focus:border-primary bg-muted/30"
//                     />
//                   </div>
//                 </form>
//                 <AnimatePresence>
//                   {searchSuggestions.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -8 }}
//                       className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
//                     >
//                       {searchSuggestions.map((product) => (
//                         <button
//                           key={product.id}
//                           type="button"
//                           onClick={() => handleSuggestionClick(product.slug)}
//                           className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
//                         >
//                           <img
//                             src={product.images[0]}
//                             alt=""
//                             className="w-12 h-12 object-cover rounded-md"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-sm text-foreground truncate">
//                               {product.name}
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {product.category}
//                             </p>
//                           </div>
//                           <span className="text-sm font-semibold text-primary">
//                             {formatPrice(product.price)}
//                           </span>
//                         </button>
//                       ))}
//                       <Link
//                         href={`/search?q=${encodeURIComponent(searchQuery)}`}
//                         onClick={() => {
//                           setIsSearchOpen(false);
//                           setSearchQuery('');
//                         }}
//                         className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-primary hover:bg-muted/50 border-t border-border"
//                       >
//                         View all results
//                         <ArrowRight className="w-4 h-4" />
//                       </Link>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <nav className="bg-background border-b border-border hidden lg:block">
//         <div className="container">
//           <div className="flex items-center justify-center gap-1">
//             {navItems.map((item) => (
//               <div
//                 key={item.label}
//                 className="relative"
//                 onMouseEnter={() => setActiveDropdown(item.label)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 <Link href={item.href} className="nav-link flex items-center gap-1 py-3">
//                   {item.label}
//                   {item.dropdown && (
//                     <ChevronDown
//                       className={`w-3.5 h-3.5 transition-transform ${
//                         activeDropdown === item.label ? 'rotate-180' : ''
//                       }`}
//                     />
//                   )}
//                 </Link>
//                 <AnimatePresence>
//                   {item.dropdown && activeDropdown === item.label && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 8 }}
//                       transition={{ duration: 0.15 }}
//                       className="absolute top-full left-0 mt-0 w-52 py-1.5 bg-background rounded-lg shadow-lg border border-border z-50"
//                     >
//                       {item.dropdown.map((subItem) => (
//                         <Link
//                           key={subItem.label}
//                           href={subItem.href}
//                           className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//             <Link href="/track-order" className="nav-link flex items-center gap-1.5 py-3">
//               <Package className="w-4 h-4" />
//               Track Order
//             </Link>
//             <Link href="/contact" className="nav-link py-3">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-background border-b border-border"
//           >
//             <div className="container py-4">
//               {navItems.map((item) => (
//                 <div key={item.label} className="mb-3">
//                   <Link
//                     href={item.href}
//                     className="block py-2 font-medium text-foreground"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.label}
//                   </Link>
//                   {item.dropdown && (
//                     <div className="pl-4 mt-1 space-y-1 border-l-2 border-border ml-2">
//                       {item.dropdown.map((subItem) => (
//                         <Link
//                           key={subItem.label}
//                           href={subItem.href}
//                           className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
//                           onClick={() => setIsMenuOpen(false)}
//                         >
//                           {subItem.label}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="mt-4 pt-4 border-t border-border space-y-2">
//                 <a
//                   href="tel:+919876543210"
//                   className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors sm:hidden"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Phone className="w-4 h-4" />
//                   +91 98765 43210
//                 </a>
//                 <Link
//                   href="/track-order"
//                   className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Package className="w-4 h-4" />
//                   Track Order
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Phone className="w-4 h-4" />
//                   Contact Us
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Package,
  Phone,
  Heart,
  Plus,
  Minus,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

const navItems = [
  {
    label: 'Rudraksha',
    href: '/category/rudraksha',
    dropdown: [
      { label: 'Rudraksha Beads', href: '/category/rudraksha?type=beads' },
      { label: 'Rudraksha Bracelet', href: '/category/bracelets?type=rudraksha' },
      { label: 'Rudraksha Mala', href: '/category/rudraksha?type=mala' },
    ],
  },
  {
    label: 'Yantra',
    href: '/category/yantra',
    dropdown: [
      { label: 'Sri Yantra', href: '/category/yantra?type=sri' },
      { label: 'Navgraha Yantra', href: '/category/yantra?type=navgraha' },
      { label: 'Yantra Pendants', href: '/category/yantra?type=pendant' },
    ],
  },
  {
    label: 'Bracelets',
    href: '/category/bracelets',
    dropdown: [
      { label: 'Rudraksha Bracelets', href: '/category/bracelets?type=rudraksha' },
      { label: 'Crystal Bracelets', href: '/category/bracelets?type=crystal' },
      { label: 'Gemstone Bracelets', href: '/category/bracelets?type=gemstone' },
    ],
  },
  {
    label: 'Crystals',
    href: '/category/crystals',
    dropdown: [
      { label: 'Healing Crystals', href: '/category/crystals?type=healing' },
      { label: 'Crystal Spheres', href: '/category/crystals?type=sphere' },
      { label: 'Crystal Points', href: '/category/crystals?type=points' },
    ],
  },
  {
    label: 'Guidance',
    href: '/guidance/choosing-consciously',
    dropdown: [
      { label: 'Choosing Consciously', href: '/guidance/choosing-consciously' },
      { label: 'Suitability Guide', href: '/guidance/suitability' },
      { label: 'Browse by Intention', href: '/browse-by-intention' },
      { label: 'Education Center', href: '/education' },
      { label: 'Our Process', href: '/energization' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const searchInputRef = useRef(null);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  const toggleMobileAccordion = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-background'}`}>
      {/* Main Header Bar */}
      <div className="border-b border-border">
        <div className="container px-4 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden h-10 w-10 -ml-2"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-gradient-gold tracking-tight">
              Anushthanum
            </h1>
          </Link>

          {/* Icons Group */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex h-10 w-10"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative h-10 w-10"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Profile - Visible on Desktop */}
            <Link href="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Nav */}
      <nav className="hidden lg:block border-b border-border bg-background">
        <div className="container flex justify-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.href} className="flex items-center gap-1.5 py-4 text-sm font-medium hover:text-primary transition-colors">
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
              </Link>
              
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-56 p-2 bg-popover border border-border shadow-xl rounded-b-xl z-50"
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-background shadow-2xl z-[70] lg:hidden flex flex-col"
            >
              {/* Profile/Account Header in Mobile Menu */}
              <div className="p-6 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Welcome Back</p>
                    <Link 
                      href="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xs text-primary font-medium flex items-center"
                    >
                      Manage Account <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-auto -mt-6 -mr-2 h-8 w-8"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-2">
                {/* Search in Menu */}
                <div className="my-4">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-10 h-11 bg-muted/50 border-none focus-visible:ring-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>

                {/* Categories */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">Shopping</p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-border/40 last:border-0">
                      <div className="flex items-center justify-between py-3 px-2">
                        <Link 
                          href={item.href} 
                          className="text-[15px] font-medium flex-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {item.dropdown && (
                          <button 
                            onClick={() => toggleMobileAccordion(item.label)}
                            className="p-2 -mr-2 hover:bg-muted rounded-md transition-colors"
                          >
                            {mobileExpanded === item.label ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4 text-primary" />}
                          </button>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {item.dropdown && mobileExpanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-muted/20 rounded-lg mb-2"
                          >
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2.5 px-6 text-sm text-muted-foreground hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Additional Links */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 mt-8 mb-2">Help & Support</p>
                <div className="space-y-1 pb-10">
                  <Link href="/track-order" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-3 text-sm font-medium">
                    <Package className="w-4 h-4 text-muted-foreground" /> Track Your Order
                  </Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-3 text-sm font-medium">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Customer Support
                  </Link>
                </div>
              </div>

              {/* Mobile Logout/Footer section */}
              <div className="p-4 border-t border-border bg-background">
                 <Button variant="outline" className="w-full justify-start gap-3 border-none hover:bg-destructive/5 hover:text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                 </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
