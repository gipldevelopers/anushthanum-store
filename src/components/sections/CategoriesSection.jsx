'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getCategories } from '@/services/categoryApi';

const UPLOAD_BASE = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '')
  : '';

function toFullImageUrl(path) {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? `${UPLOAD_BASE}${path}` : `${UPLOAD_BASE}/${path}`;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories({ showInShopSection: true })
      .then((res) => {
        const list = res?.categories ?? [];
        setCategories(list.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          image: toFullImageUrl(c.image),
          description: c.description || 'Explore our collection',
        })));
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading && categories.length === 0) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="text-center mb-6 md:mb-8">
            <div className="h-4 bg-muted rounded w-32 mx-auto mb-2" />
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 md:h-80 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-6 md:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-primary uppercase tracking-widest"
          >
            Browse Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-divider"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id ?? category.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block relative h-64 md:h-80 rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  {category.productCount != null && (
                    <span className="text-[10px] md:text-xs text-background/70 uppercase tracking-wider">
                      {category.productCount} Products
                    </span>
                  )}
                  <h3 className="text-lg md:text-xl font-serif font-bold text-background mt-0.5 mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-background/70 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-xs md:text-sm font-medium text-primary">
                    Shop Now
                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
