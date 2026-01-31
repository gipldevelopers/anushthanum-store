'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Mehta',
    location: 'Mumbai',
    rating: 5,
    text: 'The 5 Mukhi Rudraksha has truly transformed my meditation practice. I can feel the positive energy and peace it brings.',
    product: '5 Mukhi Rudraksha',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'After wearing the Sri Yantra pendant, I noticed significant improvements in my business. The certificate gave me confidence.',
    product: 'Sri Yantra Pendant',
  },
  {
    name: 'Ananya Sharma',
    location: 'Bangalore',
    rating: 5,
    text: 'The crystal bracelet is beautiful and the customer service was exceptional. They guided me on which crystal would be best.',
    product: 'Tiger Eye Bracelet',
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'I was skeptical at first, but the Rudraksha Mala was clearly authentic and well-energized. Premium packaging too.',
    product: '108 Bead Mala',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-primary uppercase tracking-widest"
          >
            Customer Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2 mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-divider"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-5 md:p-6 bg-card rounded-xl border border-border hover:shadow-soft transition-shadow"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              <div className="flex gap-1.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-sm md:text-base text-foreground mb-4 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mb-1">{testimonial.product}</p>
              <p className="font-medium text-sm text-foreground">
                {testimonial.name}, {testimonial.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
