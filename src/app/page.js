'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeroCarousel from '@/components/sections/HeroCarousel';
import QuickAccessSection from '@/components/sections/QuickAccessSection';
import LearningJourneySection from '@/components/sections/LearningJourneySection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import PopularProductsSection from '@/components/sections/PopularProductsSection';
import NewArrivalsSection from '@/components/sections/NewArrivalsSection';
import RecentlyViewedSection from '@/components/sections/RecentlyViewedSection';
import GuidanceSection from '@/components/sections/GuidanceSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import TeamExpertsSection from '@/components/sections/TeamExpertsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
function NewsletterSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12"
        >
          <div className="absolute inset-0 sacred-pattern opacity-5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-background/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/15 rounded-full text-xs font-medium text-primary-foreground mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Learn & Grow
            </div>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-primary-foreground mb-3">
              Receive Wisdom & Guidance
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Subscribe for spiritual insights, practice guides, and mindful product education — no spam, just wisdom.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-11 px-4 bg-background/15 border-background/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-background/40 focus:ring-background/20"
              />
              <Button size="lg" className="h-11 bg-foreground text-background hover:bg-foreground/90">
                Subscribe
              </Button>
            </form>
            <p className="text-[11px] text-primary-foreground/60 mt-4">
              We teach method, not sell hope. Read our Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    const animatedElements = document.querySelectorAll('.observe');
    animatedElements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <HeroCarousel />
      <QuickAccessSection />
      <PopularProductsSection />
      <LearningJourneySection />
      <CategoriesSection />
      <NewArrivalsSection />
      <RecentlyViewedSection />
      <GuidanceSection />
      <WhyChooseUsSection />
      <TeamExpertsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
