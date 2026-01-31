'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Rudraksha',
    slug: 'rudraksha',
    image: '/images/categories/rudraksha-category.jpg',
    description: 'Sacred beads for spiritual awakening',
    count: 45,
  },
  {
    name: 'Yantra',
    slug: 'yantra',
    image: '/images/categories/yantra-category.jpg',
    description: 'Divine geometry for prosperity',
    count: 28,
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    image: '/images/categories/bracelets-category.jpg',
    description: 'Spiritual wearables for protection',
    count: 36,
  },
  {
    name: 'Crystals',
    slug: 'crystals',
    image: '/images/categories/crystals-category.jpg',
    description: 'Healing stones for energy balance',
    count: 52,
  },
];

export default function CategoriesSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
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
              key={category.slug}
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
                  <span className="text-[10px] md:text-xs text-background/70 uppercase tracking-wider">
                    {category.count} Products
                  </span>
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
