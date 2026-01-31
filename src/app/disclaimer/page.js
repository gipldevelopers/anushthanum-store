'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Heart,
  Shield,
  BookOpen,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const weOffer = [
  {
    title: 'Authentic Spiritual Products',
    description:
      'Lab-certified Rudraksha, traditionally crafted Yantras, and genuine healing crystals sourced with care and integrity.',
  },
  {
    title: 'Traditional Energization',
    description:
      'Products prepared through Vedic rituals by qualified pandits, following time-honored traditions with sincerity.',
  },
  {
    title: 'Honest Guidance',
    description:
      'Transparent information about products, their traditional uses, and what you can realistically expect.',
  },
  {
    title: 'Educational Resources',
    description:
      'Knowledge about spiritual practices, safe usage guidelines, and how to approach your journey mindfully.',
  },
  {
    title: 'Quality Assurance',
    description:
      'Authenticity certificates, quality checks, and a commitment to delivering genuine products.',
  },
  {
    title: 'Respectful Support',
    description:
      'A team that respects your spiritual journey and provides guidance without pressure or false promises.',
  },
];

const weDoNotOffer = [
  {
    title: 'Miracle Cures',
    description:
      'We do not claim that our products cure diseases, solve health problems, or provide medical benefits. Please consult healthcare professionals for medical issues.',
  },
  {
    title: 'Guaranteed Results',
    description:
      'We cannot guarantee specific outcomes from using our products. Spiritual growth is a personal journey that depends on many factors beyond any product.',
  },
  {
    title: 'Instant Solutions',
    description:
      'We do not promise quick fixes for life problems. Real transformation requires time, practice, and personal effort.',
  },
  {
    title: 'Supernatural Powers',
    description:
      'We do not claim our products grant supernatural abilities, magical powers, or control over external circumstances.',
  },
  {
    title: 'Astrological Remedies',
    description:
      'While some products are traditionally associated with planetary influences, we do not claim they can change your destiny or override astrological conditions.',
  },
  {
    title: 'Replacement for Professional Help',
    description:
      'Our products are not substitutes for medical treatment, psychological therapy, financial advice, or other professional services.',
  },
];

const ethicalStandards = [
  'We never use fear-based marketing or pressure tactics',
  'We clearly state product limitations and realistic expectations',
  'We respect all spiritual traditions without claiming superiority',
  'We encourage informed decision-making over impulse purchases',
  'We value your wellbeing over our sales',
  'We maintain honesty even when it means losing a sale',
];

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 sacred-pattern opacity-30" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              Important Information
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Disclaimer & <span className="text-gradient-gold">Transparency</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Honesty is the foundation of our practice. Here&apos;s a clear statement of what
              Anushthanum offers and what we do not claim.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-primary/20">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-serif font-bold mb-4">Our Core Belief</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  At Anushthanum, we believe that spiritual products are{' '}
                  <strong>tools to support your practice</strong>—not magic solutions that work
                  independently of your effort.
                </p>
                <p className="text-muted-foreground">
                  The real transformation in any spiritual journey comes from <em>your</em>{' '}
                  dedication, discipline, devotion, and consistent practice. Our products aim to
                  enhance and support this personal journey, not replace it.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                    What Anushthanum Offers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weOffer.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </span>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <XCircle className="w-6 h-6" />
                    What We Do NOT Offer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weDoNotOffer.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <XCircle className="w-4 h-4 text-destructive" />
                      </span>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold mb-4">Our Ethical Standards</h2>
            <p className="text-muted-foreground mb-8">
              Beyond legal disclaimers, we hold ourselves to higher ethical standards that guide
              every aspect of our business.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              {ethicalStandards.map((standard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{standard}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-amber-500/5">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="border-amber-500/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-4">
                      Health & Medical Disclaimer
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      The products sold on this website are for spiritual and traditional use only.
                      They are not intended to diagnose, treat, cure, or prevent any disease or
                      health condition.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Any health-related information provided is based on traditional beliefs and
                      should not be considered medical advice. Always consult with qualified
                      healthcare professionals for health concerns.
                    </p>
                    <p className="text-muted-foreground">
                      If you are pregnant, nursing, taking medication, or have a medical condition,
                      please consult your physician before using any products that may be worn on
                      the body.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Legal Notices</h2>
            <div className="space-y-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Product Variations</h4>
                <p>
                  Natural products like Rudraksha and crystals may vary slightly in appearance from
                  images shown. Each piece is unique, and minor variations in color, pattern, or
                  size are natural characteristics.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-foreground mb-2">No Guarantee of Results</h4>
                <p>
                  Results from using spiritual products vary from person to person and depend on
                  many factors including personal practice, belief, and individual circumstances. We
                  make no guarantees regarding specific outcomes.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-foreground mb-2">Traditional Knowledge</h4>
                <p>
                  Information about traditional uses and beliefs associated with our products is
                  provided for educational purposes. This information is based on historical and
                  cultural practices and has not been evaluated by any regulatory authority.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-foreground mb-2">User Responsibility</h4>
                <p>
                  By purchasing our products, you acknowledge that you have read and understood this
                  disclaimer. You accept full responsibility for your decision to use our products
                  and understand that we cannot be held liable for any outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif font-bold text-2xl mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re happy to discuss any concerns or questions you have about our products,
              practices, or policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/education">Learn About Spiritual Practice</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
