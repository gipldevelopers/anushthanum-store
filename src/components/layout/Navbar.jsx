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
  ArrowRight,
  Home,
  Info,
  LogIn,
  UserCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Rudraksha',
    href: '/category/rudraksha',
    dropdown: [
      {
        label: 'Rudraksha Beads',
        href: '/category/rudraksha?type=beads',
        dropdown: [
          { label: 'Nirakar (0 Mukhi) Rudraksha', href: '/category/rudraksha/0-mukhi' },
          { label: '1 Mukhi Rudraksha', href: '/category/rudraksha/1-mukhi' },
          { label: '2 Mukhi Rudraksha', href: '/category/rudraksha/2-mukhi' },
          { label: '3 Mukhi Rudraksha', href: '/category/rudraksha/3-mukhi' },
          { label: '4 Mukhi Rudraksha', href: '/category/rudraksha/4-mukhi' },
          { label: '5 Mukhi Rudraksha', href: '/category/rudraksha/5-mukhi' },
          { label: '6 Mukhi Rudraksha', href: '/category/rudraksha/6-mukhi' },
          { label: '7 Mukhi Rudraksha', href: '/category/rudraksha/7-mukhi' },
          { label: '8 Mukhi Rudraksha', href: '/category/rudraksha/8-mukhi' },
          { label: '9 Mukhi Rudraksha', href: '/category/rudraksha/9-mukhi' },
          { label: '10 Mukhi Rudraksha', href: '/category/rudraksha/10-mukhi' },
          { label: '11 Mukhi Rudraksha', href: '/category/rudraksha/11-mukhi' },
          { label: '12 Mukhi Rudraksha', href: '/category/rudraksha/12-mukhi' },
          { label: '13 Mukhi Rudraksha', href: '/category/rudraksha/13-mukhi' },
          { label: '14 Mukhi Rudraksha', href: '/category/rudraksha/14-mukhi' },
          { label: 'Gauri Shankar Rudraksha', href: '/category/rudraksha/gauri-shankar' },
          { label: 'Ganesh Rudraksha', href: '/category/rudraksha/ganesh' },
        ]
      },
      { label: 'Rudraksha Bracelet', href: '/category/bracelets?type=rudraksha' },
      { label: 'Rudraksha Mala', href: '/category/rudraksha?type=mala' },
    ],
  },
  {
    label: 'Malas',
    href: '/category/malas',
    dropdown: [
      { label: 'Rudraksha Mala', href: '/category/malas/rudraksha' },
      { label: 'Crystal Mala', href: '/category/malas/crystal' },
      { label: 'Tulsi Mala', href: '/category/malas/tulsi' },
      { label: 'Sandalwood Mala', href: '/category/malas/sandalwood' },
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
    label: 'Jewellery',
    href: '/category/jewellery',
    dropdown: [
      { label: 'Rings', href: '/category/jewellery?type=rings' },
      { label: 'Earrings', href: '/category/jewellery?type=earrings' },
      { label: 'Necklaces', href: '/category/jewellery?type=necklaces' },
    ],
  },
  {
    label: 'Candles',
    href: '/category/candles',
    dropdown: [
      { label: 'Scented Candles', href: '/category/candles?type=scented' },
      { label: 'Ritual Candles', href: '/category/candles?type=ritual' },
    ],
  },
  {
    label: 'Shop by Intention',
    href: '/browse-by-intention',
  },
  {
    label: 'Articles',
    href: '/blog',
    dropdown: [
      { label: 'All Articles', href: '/blog' },
      { label: 'Astrology Insights', href: '/blog?category=astrology' },
      { label: 'Spiritual Guidance', href: '/blog?category=spiritual' },
      { label: 'Product Education', href: '/blog?category=education' },
      { label: 'Occult Science', href: '/blog?category=occult' },
    ],
  },
];

const mobileNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Track Order', href: '/track-order', icon: Package },
  { label: 'Contact Us', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
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
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleItem = (label) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (slug) => {
    router.push(`/product/${slug}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden bg-background border-b border-border">
        <div className="px-4 py-3">
          {/* Grid Layout: 2-8-2 */}
          <div className="grid grid-cols-12 items-center">
            {/* Left: Menu Button (2 columns) */}
            <div className="col-span-2 flex items-center justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 min-w-0 p-0"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Center: Logo (8 columns) */}
            <div className="col-span-8 flex items-center justify-center">
              <Link href="/" className="w-full flex justify-center">
                <h1 className="text-xl font-serif font-bold text-gradient-gold text-center leading-tight">
                  Anushthanum
                </h1>
              </Link>
            </div>

            {/* Right: Search & Cart (2 columns) */}
            <div className="col-span-2 flex items-center justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 min-w-0 p-0"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 min-w-0 p-0"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 relative"
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-4 text-base border-border focus:border-primary bg-muted/30 w-full"
                    />
                  </div>
                </form>
                <AnimatePresence>
                  {searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleSuggestionClick(product.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.category}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-primary hover:bg-muted/50 border-t border-border"
                      >
                        View all results
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-background border-b border-border">
        <div className="container py-1">
          <div className="flex items-center justify-between gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </a>
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gradient-gold">
                Anushthanum
              </h1>
            </Link>
            <div className="flex items-center gap-0.5 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-foreground/70 hover:text-foreground hover:bg-muted/50 touch-target h-11 w-11 sm:h-10 sm:w-10"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link href="/wishlist" className="touch-target flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 sm:h-10 sm:w-10 min-w-0"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative text-foreground/70 hover:text-foreground hover:bg-muted/50 touch-target h-11 w-11 sm:h-10 sm:w-10"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Button>
              <Link href="/profile" className="touch-target flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground hover:bg-muted/50 h-11 w-11 sm:h-10 sm:w-10 min-w-0"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 relative"
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search for Rudraksha, Yantra, Crystals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-6 text-base border-border focus:border-primary bg-muted/30"
                    />
                  </div>
                </form>
                <AnimatePresence>
                  {searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleSuggestionClick(product.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.category}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-primary hover:bg-muted/50 border-t border-border"
                      >
                        View all results
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="bg-background border-b border-border hidden lg:block">
        <div className="container">
          <div className="flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="nav-link flex items-center gap-1 py-3"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-0 w-52 py-1.5 bg-background rounded-lg shadow-lg border border-border z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <div key={subItem.label} className="relative group/sub">
                          <Link
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors w-full"
                          >
                            {subItem.label}
                            {subItem.dropdown && (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </Link>
                          {/* Nested Dropdown */}
                          {subItem.dropdown && (
                            <div className="absolute left-full top-0 ml-0.5 w-60 py-1.5 bg-background rounded-lg shadow-lg border border-border hidden group-hover/sub:block max-h-[80vh] overflow-y-auto">
                              {subItem.dropdown.map((nestedItem) => (
                                <Link
                                  key={nestedItem.label}
                                  href={nestedItem.href}
                                  className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors"
                                >
                                  {nestedItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link href="/contact" className="nav-link py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute inset-y-0 left-0 w-3/4 max-w-sm bg-background shadow-xl overflow-y-auto">
              <div className="p-4">
                {/* User Profile Section (Header) */}
                <div className="mb-6 pb-4 border-b border-border">
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <UserCircle className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate">Welcome Guest</p>
                      <p className="text-sm text-muted-foreground">Sign in for better experience</p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/signin"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center justify-center gap-2 py-2.5 px-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label} className="mb-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="flex-1 py-3 px-2 text-base font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                          onClick={() => !item.dropdown && setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {item.dropdown && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleItem(item.label)}
                            className="h-9 w-9 text-muted-foreground hover:text-foreground"
                            aria-label={expandedItems[item.label] ? 'Collapse' : 'Expand'}
                          >
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${expandedItems[item.label] ? 'rotate-90' : ''
                                }`}
                            />
                          </Button>
                        )}
                      </div>

                      {/* Collapsible Dropdown */}
                      <AnimatePresence>
                        {item.dropdown && expandedItems[item.label] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-2 pl-3 border-l-2 border-border space-y-1">
                              {item.dropdown.map((subItem) => (
                                <div key={subItem.label}>
                                  <div className="flex items-center justify-between">
                                    <Link
                                      href={subItem.href}
                                      className="flex-1 py-2.5 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                                      onClick={() => !subItem.dropdown && setIsMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                    {subItem.dropdown && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleItem(subItem.label)}
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        aria-label={expandedItems[subItem.label] ? 'Collapse' : 'Expand'}
                                      >
                                        <ChevronRight
                                          className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedItems[subItem.label] ? 'rotate-90' : ''
                                            }`}
                                        />
                                      </Button>
                                    )}
                                  </div>
                                  {/* Nested Mobile Dropdown */}
                                  <AnimatePresence>
                                    {subItem.dropdown && expandedItems[subItem.label] && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="ml-2 pl-3 border-l-2 border-border space-y-1">
                                          {subItem.dropdown.map((nestedItem) => (
                                            <Link
                                              key={nestedItem.label}
                                              href={nestedItem.href}
                                              className="block py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                                              onClick={() => setIsMenuOpen(false)}
                                            >
                                              {nestedItem.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Additional Mobile Links */}
                <div className="mt-6 pt-6 border-t border-border space-y-2">
                  {mobileNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 py-2.5 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}

                  {/* Wishlist in Mobile Menu */}
                  <Link
                    href="/wishlist"
                    className="flex items-center justify-between py-2.5 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      <span>My Wishlist</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full min-w-6 flex items-center justify-center">
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* Contact Info */}
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 py-2.5 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="font-medium">24/7 Support</p>
                      <p className="text-sm">+91 98765 43210</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
