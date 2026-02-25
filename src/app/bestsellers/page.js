'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/services/productApi';

const UPLOAD_BASE = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '')
  : '';

function toFullImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? `${UPLOAD_BASE}${path}` : `${UPLOAD_BASE}/${path}`;
}

function mapProductImages(product) {
  const base = product?.images?.length
    ? product.images.map((img) => (typeof img === 'string' ? toFullImageUrl(img) : img)).filter(Boolean)
    : product?.thumbnail
      ? [toFullImageUrl(product.thumbnail)]
      : ['/placeholder.svg'];
  const stock = Number(product.stock ?? 0);
  return {
    ...product,
    images: base.length ? base : ['/placeholder.svg'],
    stock,
    inStock: stock > 0,
  };
}

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function BestsellersPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    getProducts({
      isBestseller: true,
      sort: sortBy,
      page: currentPage,
      limit: itemsPerPage,
    })
      .then((res) => {
        const list = (res?.products || []).map(mapProductImages);
        setProducts(list);
        setTotal(res?.total ?? list.length);
        setTotalPages(res?.totalPages ?? 1);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
        setTotalPages(0);
      })
      .finally(() => setIsLoading(false));
  }, [sortBy, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="py-6 md:py-10">
      <div className="container">
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Bestsellers</span>
        </nav>

        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2"
          >
            Bestselling Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-sm text-muted-foreground max-w-xl"
          >
            Customer favorites – handpicked bestsellers from our collection.
          </motion.p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{total}</span> products
          </p>
          <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-[180px] min-w-0">
              <SlidersHorizontal className="w-4 h-4 mr-2 shrink-0" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent align="end">
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <h3 className="font-medium mb-2">No bestsellers yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              Mark products as bestsellers in the admin panel to see them here.
            </p>
            <Button asChild>
              <Link href="/">Browse All Products</Link>
            </Button>
          </div>
        )}

        {!isLoading && products.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                  className="w-9 h-9 p-0"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
