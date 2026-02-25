'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function NewArrivalsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ isNew: true, limit: 8, sort: 'newest' })
      .then((res) => {
        const list = res?.products ?? [];
        setProducts(list.map(mapProductImages));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading && products.length === 0) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="flex justify-between items-end mb-6">
            <div className="h-8 bg-muted rounded w-48 animate-pulse" />
            <div className="h-9 bg-muted rounded w-24 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-primary uppercase tracking-widest"
            >
              Just Arrived
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2"
            >
              New Arrivals
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" asChild className="group border-border">
              <Link href="/new-arrivals">
                View All New
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
