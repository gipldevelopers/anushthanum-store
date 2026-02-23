'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Lightbulb, ShoppingBag, Sparkles, ArrowRight, CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { contentApi } from '@/services/contentApi';

const ICON_MAP = { BookOpen, Lightbulb, ShoppingBag, Sparkles };

const DEFAULT_DATA = {
  eyebrow: 'Guidance-First Approach',
  title: 'Your Spiritual Journey Starts with',
  titleHighlight: 'Knowledge',
  description: "We believe spiritual tools work only when used with proper understanding, intention, and discipline. That's why we guide you through every step.",
  ctaText: 'Ready to begin your conscious spiritual journey?',
  primaryButtonText: 'Shop by Intention',
  primaryButtonLink: '/browse-by-intention',
  secondaryButtonText: 'Visit Knowledge Hub',
  secondaryButtonLink: '/blog',
  quote: '"We do not sell hope — we teach method."',
  quoteAuthor: '— The Anushthanum Philosophy',
  steps: [
    { step: 1, icon: 'BookOpen', title: 'Learn', description: 'Understand the spiritual significance and proper use before you buy', features: ['Article library', 'Video guides', 'Expert insights'], link: '/blog', color: 'from-blue-500/20 to-blue-600/10' },
    { step: 2, icon: 'Lightbulb', title: 'Understand', description: 'Know who should use what, when, and how — with complete clarity', features: ['Usage guidelines', 'Safety notes', 'Best practices'], link: '/education', color: 'from-amber-500/20 to-amber-600/10' },
    { step: 3, icon: 'ShoppingBag', title: 'Choose Consciously', description: 'Select products that align with your needs and spiritual goals', features: ['Intention-based shopping', 'Expert recommendations', 'Personalized guidance'], link: '/browse-by-intention', color: 'from-emerald-500/20 to-emerald-600/10' },
    { step: 4, icon: 'Sparkles', title: 'Practice Correctly', description: 'Follow step-by-step rituals and methods for effective results', features: ['Activation rituals', 'Daily practices', 'Maintenance guides'], link: '/energization', color: 'from-purple-500/20 to-purple-600/10' },
  ],
};

export default function LearningJourneySection() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    contentApi.getPage('homepage')
      .then((res) => {
        const d = res?.page?.content?.learningJourney;
        if (d) setData({ ...DEFAULT_DATA, ...d });
      })
      .catch(() => { });
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{data.eyebrow}</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
            {data.title}{' '}<span className="text-gradient-gold">{data.titleHighlight}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-muted-foreground text-sm md:text-base">
            {data.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {data.steps.map((step, index) => {
            const IconComp = ICON_MAP[step.icon] || BookOpen;
            return (
              <motion.div key={step.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative">
                <Link href={step.link || '#'}
                  className="block h-full p-5 md:p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color || 'from-primary/20 to-primary/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                  <ul className="space-y-1.5">
                    {(step.features || []).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-sm text-muted-foreground mb-4">{data.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="group rounded-full px-8">
              <Link href={data.primaryButtonLink || '/browse-by-intention'}>
                {data.primaryButtonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href={data.secondaryButtonLink || '/blog'}>
                <BookOpen className="mr-2 w-4 h-4" />
                {data.secondaryButtonText}
              </Link>
            </Button>
          </div>
        </motion.div>

        {data.quote && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }} className="mt-12 md:mt-16 text-center">
            <blockquote className="max-w-xl mx-auto">
              <p className="text-lg md:text-xl font-serif italic text-foreground/80 mb-3">{data.quote}</p>
              {data.quoteAuthor && <footer className="text-sm text-muted-foreground">{data.quoteAuthor}</footer>}
            </blockquote>
          </motion.div>
        )}
      </div>
    </section>
  );
}
