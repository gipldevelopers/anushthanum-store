'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCategories } from '@/services/categoryApi';

const UPLOAD_BASE = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '')
  : '';

function toFullImageUrl(path) {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? `${UPLOAD_BASE}${path}` : `${UPLOAD_BASE}/${path}`;
}

export default function QuickAccessSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories({ type: 'material' })
      .then((res) => {
        const list = res?.categories ?? [];
        setItems(list.map((c) => ({
          id: c.id,
          label: c.name,
          image: toFullImageUrl(c.image) || '/placeholder.svg',
          slug: c.slug,
        })));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const displayItems = items.map((item) => ({
    ...item,
    href: item.href ?? `/category/${item.slug}`,
  }));

  if (loading && displayItems.length === 0) {
    return (
      <section className="py-8 bg-background border-b">
        <div className="container">
          <div className="flex justify-center gap-4 py-4">
            <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
            <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
            <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (displayItems.length === 0) return null;

  return (
    <section className="py-8 bg-background border-b">
      <div className="container">
        <div className="flex overflow-x-auto pb-4 pt-2 gap-4 md:gap-8 lg:justify-center no-scrollbar scroll-smooth">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              <Link href={item.href} className="flex flex-col items-center group gap-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-center text-foreground/80 group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
