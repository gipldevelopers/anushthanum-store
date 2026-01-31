'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Brain,
  Sparkles,
  Sun,
  Moon,
  Flame,
  Leaf,
  Star,
  Users,
  GraduationCap,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

const intentions = [
  {
    id: 'peace',
    icon: Leaf,
    title: 'Inner Peace & Calm',
    description: 'For those seeking tranquility, stress relief, and mental clarity',
    color: 'bg-green-500/10 text-green-600',
    products: ['amethyst-crystal-sphere', '5-mukhi-rudraksha'],
  },
  {
    id: 'protection',
    icon: Shield,
    title: 'Protection & Safety',
    description: 'Shield yourself from negative energies and harmful influences',
    color: 'bg-blue-500/10 text-blue-600',
    products: ['sri-yantra-gold-pendant', '108-bead-rudraksha-mala'],
  },
  {
    id: 'prosperity',
    icon: Sparkles,
    title: 'Prosperity & Abundance',
    description: 'Attract wealth, success, and material abundance',
    color: 'bg-yellow-500/10 text-yellow-600',
    products: ['copper-sri-yantra-plate', 'clear-quartz-crystal-point'],
  },
  {
    id: 'health',
    icon: Heart,
    title: 'Health & Healing',
    description: 'Support physical wellbeing and recovery',
    color: 'bg-red-500/10 text-red-600',
    products: ['rudraksha-bracelet-gold', 'amethyst-crystal-sphere'],
  },
  {
    id: 'focus',
    icon: Brain,
    title: 'Focus & Concentration',
    description: 'Enhance mental clarity, memory, and concentration',
    color: 'bg-purple-500/10 text-purple-600',
    products: ['clear-quartz-crystal-point', '5-mukhi-rudraksha'],
  },
  {
    id: 'spiritual',
    icon: Sun,
    title: 'Spiritual Growth',
    description: 'Deepen meditation practice and spiritual awareness',
    color: 'bg-orange-500/10 text-orange-600',
    products: ['108-bead-rudraksha-mala', 'sri-yantra-gold-pendant'],
  },
];

const rituals = [
  {
    id: 'daily-wear',
    icon: Sun,
    title: 'Daily Wear',
    description: 'Items suitable for everyday use and continuous wearing',
    products: ['rudraksha-bracelet-gold', 'tiger-eye-bracelet', 'sri-yantra-gold-pendant'],
  },
  {
    id: 'meditation',
    icon: Moon,
    title: 'Meditation & Japa',
    description: 'Tools to enhance your meditation and mantra practice',
    products: ['108-bead-rudraksha-mala', 'clear-quartz-crystal-point', '5-mukhi-rudraksha'],
  },
  {
    id: 'puja',
    icon: Flame,
    title: 'Puja & Rituals',
    description: 'Sacred items for worship and ceremonial use',
    products: ['copper-sri-yantra-plate', '108-bead-rudraksha-mala'],
  },
  {
    id: 'home',
    icon: Users,
    title: 'Home & Vastu',
    description: 'Products to energize and protect your living space',
    products: ['copper-sri-yantra-plate', 'amethyst-crystal-sphere'],
  },
];

const experienceLevels = [
  {
    id: 'beginner',
    icon: GraduationCap,
    title: 'Beginner',
    subtitle: 'New to Spiritual Practice',
    description:
      'Start your journey with gentle, forgiving products that require minimal preparation. These items are perfect for those exploring spirituality for the first time.',
    recommendations: [
      'Start with 5 Mukhi Rudraksha - the most versatile and universally beneficial',
      'Crystal bracelets for subtle energy work',
      'Small yantras for home placement',
    ],
    products: ['5-mukhi-rudraksha', 'tiger-eye-bracelet', 'amethyst-crystal-sphere'],
  },
  {
    id: 'practitioner',
    icon: Star,
    title: 'Regular Practitioner',
    subtitle: 'Established Practice',
    description:
      'For those with consistent spiritual practice who understand the importance of discipline and regularity. Ready for more specific and powerful items.',
    recommendations: [
      'Rudraksha malas for japa practice',
      'Specific yantras for focused intentions',
      'Higher mukhi Rudrakshas for advanced practices',
    ],
    products: ['108-bead-rudraksha-mala', 'copper-sri-yantra-plate', 'sri-yantra-gold-pendant'],
  },
  {
    id: 'advanced',
    icon: Zap,
    title: 'Advanced Sadhaka',
    subtitle: 'Deep Spiritual Commitment',
    description:
      'For dedicated practitioners with years of consistent sadhana, proper initiation, and guidance from a guru. These items require serious commitment.',
    recommendations: [
      'Rare mukhi Rudrakshas (consult before purchase)',
      'Complex yantra combinations',
      'Items requiring specific mantras and rituals',
    ],
    products: ['copper-sri-yantra-plate', '108-bead-rudraksha-mala'],
  },
];

export default function BrowseByIntentionPage() {
  const [activeTab, setActiveTab] = useState('intention');

  const getProductsBySlugs = (slugs) =>
    products.filter((p) => slugs.some((slug) => p.slug === slug || p.slug.includes(slug)));

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
            <Badge variant="outline" className="mb-4">
              Mindful Selection
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Find Products That <span className="text-gradient-gold">Align With You</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Every spiritual journey is unique. Browse our collection based on your intentions,
              how you plan to use the product, or your experience level in spiritual practice.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="intention" className="gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">By Intention</span>
                <span className="sm:hidden">Intention</span>
              </TabsTrigger>
              <TabsTrigger value="ritual" className="gap-2">
                <Flame className="w-4 h-4" />
                <span className="hidden sm:inline">By Ritual/Usage</span>
                <span className="sm:hidden">Ritual</span>
              </TabsTrigger>
              <TabsTrigger value="level" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">By Experience</span>
                <span className="sm:hidden">Level</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intention">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intentions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                    >
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getProductsBySlugs(item.products)
                        .slice(0, 2)
                        .map((product) => (
                          <Badge key={product.id} variant="secondary" className="text-xs">
                            {product.name}
                          </Badge>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/category/rudraksha?intention=${item.id}`}>View Products</Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ritual">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rituals.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                        <div className="grid grid-cols-2 gap-3">
                          {getProductsBySlugs(item.products)
                            .slice(0, 2)
                            .map((product) => (
                              <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {product.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="level">
              <div className="space-y-8">
                {experienceLevels.map((level, index) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    <div className="p-6 md:p-8 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <level.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-2xl">{level.title}</h3>
                          <p className="text-muted-foreground">{level.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{level.description}</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <h4 className="font-semibold mb-4">Our Recommendations:</h4>
                      <ul className="space-y-2 mb-6">
                        {level.recommendations.map((rec, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getProductsBySlugs(level.products)
                          .slice(0, 3)
                          .map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                          ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-2xl mb-4">
              Not Sure What&apos;s Right for You?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our spiritual guides can help you choose the right product based on your unique
              needs, birth chart, and spiritual goals. Book a free consultation.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get Personalized Guidance</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
