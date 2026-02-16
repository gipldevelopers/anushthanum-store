'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const items = [
  { 
    id: 1, 
    label: 'Rudraksha', 
    image: '/images/products/5 mukhi rudraksha.png',
    href: '/category/rudraksha' 
  },
  { 
    id: 2, 
    label: 'Karungali', 
    image: '/images/products/Karungali Mala.png',
    href: '/category/karungali' 
  },
  { 
    id: 3, 
    label: 'Pyrite', 
    image: '/images/products/crystal-quartz.jpg', // Placeholder
    href: '/category/crystals' 
  },
  { 
    id: 4, 
    label: 'Sandalwood', 
    image: '/images/products/sandalwood1.png',
    href: '/category/malas' 
  },
  { 
    id: 5, 
    label: 'Sphatik', 
    image: '/images/products/Rudraksha-Sphatik Mala.png',
    href: '/category/malas' 
  },
  { 
    id: 6, 
    label: 'Tiger Eye', 
    image: '/images/products/bracelet-tiger-eye.jpg',
    href: '/category/bracelets' 
  },
  { 
    id: 7, 
    label: 'Rose Quartz', 
    image: '/images/products/crystal-amethyst.jpg', // Placeholder
    href: '/category/crystals' 
  },
  { 
    id: 8, 
    label: 'Amethyst', 
    image: '/images/products/crystal-amethyst.jpg',
    href: '/category/crystals' 
  }
];

export default function QuickAccessSection() {
  return (
    <section className="py-8 bg-background border-b">
      <div className="container">
        <div className="flex overflow-x-auto pb-4 pt-2 gap-4 md:gap-8 lg:justify-center no-scrollbar scroll-smooth">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              <Link href={item.href} className="flex flex-col items-center group gap-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm bg-muted/30">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
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
