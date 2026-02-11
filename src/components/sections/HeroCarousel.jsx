'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: '/images/hero/hero-1.jpg',
    subtitle: 'Authentic. Energized. Certified.',
    title: 'Sacred Tools for Your Spiritual Journey',
    description: 'Experience the power of lab-certified Rudraksha, ancient Yantras, and healing crystals. Each piece is energized by Vedic scholars to help you achieve your life goals.',
    cta: 'Explore Collection',
    link: '/browse-by-intention',
    badges: ['Lab Certified', 'Vedic Energized'],
  },
  {
    image: '/images/hero/hero-2.jpg',
    subtitle: 'Guidance First Platform',
    title: 'Clarity Before You Buy',
    description: 'We don’t just sell products; we provide the wisdom to use them. Get free astrological insights and detailed practice guides with every purchase.',
    cta: 'Get Guidance',
    link: '/guidance/choosing-consciously',
    badges: ['Free Consultation', 'Expert Support'],
  },
  {
    image: '/images/hero/hero-3.jpg',
    subtitle: 'Ancient Wisdom, Modern Life',
    title: 'Transform Your Energy',
    description: 'Align your chakras and attract positivity with our premium collection of semi-precious stone bracelets and malas, handcrafted for durability and aesthetics.',
    cta: 'Shop Bracelets',
    link: '/category/bracelets',
    badges: ['Handcrafted', 'Premium Quality'],
  },
  {
    image: '/images/hero/hero-blog.jpg',
    subtitle: 'The Knowledge Hub',
    title: 'Unlock Sacred Secrets',
    description: 'Dive deep into the science of spirituality. Read our latest articles on occult sciences, planetary influences, and the correct methods of sadhana.',
    cta: 'Read Articles',
    link: '/blog',
    badges: ['Occult Science', 'Vedic Wisdom'],
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section className="relative h-[calc(100vh-80px)] sm:h-[calc(100vh-120px)] min-h-[400px] sm:min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0">
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
                </div>
                <div className="relative h-full container flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-xl text-background"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {slide.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/15 backdrop-blur-sm rounded-full text-xs font-medium text-background border border-background/20"
                        >
                          {i === 0 ? <Shield className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                          {badge}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-[0.25em]">
                      {slide.subtitle}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-2 mb-4 leading-tight text-background">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-background/80 mb-6 sm:mb-8 max-w-md leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        asChild
                        className="bg-primary hover:bg-primary/90 text-primary-foreground group btn-glow"
                      >
                        <Link href={slide.link}>
                          {slide.cta}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="border-background/30 text-background hover:bg-background/10 hover:text-background bg-transparent"
                      >
                        <Link href="/browse-by-intention">Browse by Intention</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors border border-background/20 touch-target min-w-[44px] min-h-[44px]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/20 transition-colors border border-background/20 touch-target min-w-[44px] min-h-[44px]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'bg-primary w-8' : 'bg-background/40 hover:bg-background/60 w-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20">
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          className="h-full bg-primary"
        />
      </div>
    </section>
  );
}