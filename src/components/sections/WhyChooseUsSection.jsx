'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Sparkles,
  Users,
  Truck,
  HeartHandshake,
} from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: '100% Authentic',
    description: 'Every Rudraksha comes with lab certification ensuring authenticity and origin.',
  },
  {
    icon: Sparkles,
    title: 'Temple Energized',
    description: 'All products are energized through proper Vedic rituals by our experts.',
  },
  {
    icon: Award,
    title: '25+ Years Experience',
    description: 'Trusted by over 50,000 customers with decades of expertise.',
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Our Vedic scholars provide personalized recommendations.',
  },
  {
    icon: Truck,
    title: 'Pan India Delivery',
    description: 'Free shipping on orders above ₹999 with secure packaging.',
  },
  {
    icon: HeartHandshake,
    title: 'Satisfaction Guarantee',
    description: '7-day return policy if you are not completely satisfied.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-foreground text-background overflow-hidden">
      <div className="container relative">
        <div className="absolute inset-0 opacity-[0.02] sacred-pattern" />
        <div className="text-center mb-10 md:mb-12 relative">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-primary uppercase tracking-widest"
          >
            Our Promise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2 mb-3 text-background"
          >
            Why Rudraksha from Anushtanum?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-background/60 max-w-xl mx-auto"
          >
            We are committed to providing the most authentic and spiritually powerful products for
            your divine journey.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-5 md:p-6 rounded-xl bg-background/5 border border-background/10 hover:bg-background/8 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/90 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <reason.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-base md:text-lg font-serif font-semibold mb-1.5 text-background">
                {reason.title}
              </h3>
              <p className="text-background/60 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
