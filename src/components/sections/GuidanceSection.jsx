'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  AlertTriangle,
  Compass,
  BookOpen,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const guidanceCards = [
  {
    icon: Compass,
    title: 'Choose Consciously',
    description:
      'Every spiritual product carries energy. We guide you to select items that align with your journey.',
    link: '/guidance/choosing-consciously',
  },
  {
    icon: Heart,
    title: 'Know Your Intentions',
    description:
      'Browse by purpose - whether for peace, protection, prosperity, or spiritual growth.',
    link: '/browse-by-intention',
  },
  {
    icon: AlertTriangle,
    title: 'Who Should Avoid',
    description:
      'Not every product suits everyone. We clearly mention contraindications for your wellbeing.',
    link: '/guidance/suitability',
  },
  {
    icon: Shield,
    title: 'Our Ethical Stance',
    description:
      'We do not promise miracles. Spiritual growth is a journey, and our products support your practice.',
    link: '/disclaimer',
  },
];

export default function GuidanceSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary uppercase tracking-widest mb-2"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Guidance & Awareness
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3"
          >
            Walk Your Spiritual Path <span className="text-gradient-gold">Mindfully</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground"
          >
            Every product you choose should resonate with your journey. Here&apos;s how we help you
            make mindful decisions.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-12">
          {guidanceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={card.link}
                className="group block h-full p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl bg-card border border-border p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif font-bold text-lg mb-1.5">Our Promise: No Miracle Claims</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We respect the sacred nature of spiritual practice. Our products support your{' '}
                <em>sadhana</em> — the real transformation comes from your dedication.
              </p>
            </div>
            <Button asChild className="flex-shrink-0">
              <Link href="/disclaimer">
                Read Disclaimer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
