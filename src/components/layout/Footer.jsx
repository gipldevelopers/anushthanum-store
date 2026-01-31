'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  RotateCcw,
  CreditCard,
  Award,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = {
  shop: [
    { label: 'Rudraksha', href: '/category/rudraksha' },
    { label: 'Yantra', href: '/category/yantra' },
    { label: 'Bracelets', href: '/category/bracelets' },
    { label: 'Crystals', href: '/category/crystals' },
    { label: 'Browse by Intention', href: '/browse-by-intention' },
    { label: 'New Arrivals', href: '/new-arrivals' },
  ],
  learn: [
    { label: 'Education Center', href: '/education' },
    { label: 'Our Process', href: '/energization' },
    { label: 'Choosing Consciously', href: '/guidance/choosing-consciously' },
    { label: 'Suitability Guide', href: '/guidance/suitability' },
    { label: 'Blog', href: '/blog' },
  ],
  help: [
    { label: 'Track Order', href: '/track-order' },
    // { label: 'Shipping Info', href: '/shipping' },
    // { label: 'Returns & Exchange', href: '/returns' },
    // { label: 'FAQs', href: '/faqs' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
};

const features = [
  { icon: Shield, label: '100% Authentic', desc: 'Lab Certified Products' },
  { icon: Truck, label: 'Free Shipping', desc: 'Orders above ₹999' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '7 Day Return Policy' },
  { icon: CreditCard, label: 'Secure Payment', desc: 'SSL Encrypted' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="container py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-xs md:text-sm text-background">{feature.label}</h4>
                  <p className="text-[10px] md:text-xs text-background/50">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold mb-4">
                Anushthanum
              </h2>
            </Link>
            <p className="text-sm text-background/60 mb-6 max-w-sm leading-relaxed">
              Your trusted source for authentic Rudraksha, sacred Yantras, and healing crystals.
              Every product is lab-certified and energized by Vedic experts.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/10 rounded-full text-xs text-background/80">
                <Award className="w-3.5 h-3.5" />
                Lab Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background/10 rounded-full text-xs text-background/80">
                <Shield className="w-3.5 h-3.5" />
                10,000+ Happy Customers
              </span>
            </div>
            <div className="mb-6">
              <h4 className="font-medium text-sm mb-3 text-background">Get Updates & Offers</h4>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-background/10 border-background/15 text-background placeholder:text-background/40 focus:border-primary text-sm h-10"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'Youtube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-sm mb-4 text-background">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-sm mb-4 text-background">Learn</h4>
            <ul className="space-y-2.5">
              {footerLinks.learn.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-sm mb-4 text-background">Help</h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-sm mb-4 text-background">Contact</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>123 Spiritual Lane, Varanasi, UP 221001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:care@anushtanum.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                  care@anushtanum.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-xs">
              © {new Date().getFullYear()} Anushtanum. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-background/50 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
