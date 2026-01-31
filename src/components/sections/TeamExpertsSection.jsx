'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Users } from 'lucide-react';

const experts = [
  {
    name: 'Pandit Raghunath Sharma',
    role: 'Chief Vedic Scholar',
    experience: '35+ years',
    image: '/images/team/expert-1.jpg',
    specialty: 'Rudraksha Authentication',
  },
  {
    name: 'Dr. Priya Devi',
    role: 'Crystal Healing Expert',
    experience: '20+ years',
    image: '/images/team/expert-2.jpg',
    specialty: 'Energy Healing',
  },
  {
    name: 'Acharya Vikram Singh',
    role: 'Yantra Specialist',
    experience: '15+ years',
    image: '/images/team/expert-3.jpg',
    specialty: 'Sacred Geometry',
  },
];

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Award, value: '25+', label: 'Years Experience' },
  { icon: BookOpen, value: '100%', label: 'Authentic Products' },
];

export default function TeamExpertsSection() {
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
            Our Guidance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2 mb-3"
          >
            Meet Our Spiritual Experts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto"
          >
            Our Vedic scholars and spiritual healers ensure every product is authentic and properly
            energized.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-14">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-5 mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-border group-hover:border-primary/50 transition-colors">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-base md:text-lg font-serif font-semibold mb-0.5">{expert.name}</h3>
              <p className="text-sm text-primary font-medium mb-1">{expert.role}</p>
              <p className="text-xs text-muted-foreground mb-2">{expert.specialty}</p>
              <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                {expert.experience}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-4 md:p-5 bg-card rounded-xl border border-border"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xl md:text-2xl font-serif font-bold text-gradient-gold">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
