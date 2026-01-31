'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Heart,
  Flame,
  Star,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const spiritualPaths = [
  {
    id: 'bhakti',
    title: 'Bhakti (Devotion)',
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    description: 'The path of love and devotion to the Divine',
    content: `Bhakti is the path of pure devotion and unconditional love for the Divine. It doesn't require complex rituals or deep philosophical knowledge—only a sincere and open heart.

**Key Characteristics:**
- Emotional connection with the Divine
- Surrender and trust
- Love without expectation
- Accessible to everyone regardless of background

**Practices:**
- Kirtan (devotional singing)
- Prayer and worship
- Service to deity or guru
- Remembrance of the Divine in daily life

**Suitable Products:**
Items that support your devotional practice—malas for japa, deity yantras for worship, and sacred items for your altar.`,
    suitableFor:
      'Those who connect through emotions and love, who find joy in singing, prayer, and service.',
  },
  {
    id: 'sadhana',
    title: 'Sadhana (Practice)',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Disciplined spiritual practice and self-development',
    content: `Sadhana refers to a consistent, disciplined spiritual practice undertaken for self-transformation. It's the daily commitment to your spiritual growth.

**Key Characteristics:**
- Regular, disciplined practice
- Personal transformation as the goal
- May include various techniques
- Requires consistency over time

**Common Practices:**
- Daily meditation
- Mantra repetition (japa)
- Pranayama (breath work)
- Yoga and asanas
- Study of sacred texts

**Suitable Products:**
Rudraksha for meditation, specific yantras for focus, crystals for energy work, and malas for mantra practice.`,
    suitableFor:
      'Those who value discipline, consistency, and are committed to daily practice for personal growth.',
  },
  {
    id: 'anushthan',
    title: 'Anushthan (Ritual Observance)',
    icon: Star,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    description: 'Intensive spiritual practice for specific duration',
    content: `Anushthan is a dedicated, intensive spiritual practice performed for a specific period (often 9, 21, 40, or 108 days) with strict discipline and specific rules.

**Key Characteristics:**
- Fixed duration and specific rules
- Often undertaken for specific purposes
- Requires preparation and commitment
- More intensive than regular sadhana

**Important Considerations:**
- Usually requires guidance from a guru
- Specific dietary and lifestyle restrictions
- Fixed number of mantra repetitions
- Specific timing and procedures

**Suitable Products:**
Energized yantras, specific mukhi Rudrakshas, mala beads for high-count japa, and ritual items.

**Note:** Anushthan should ideally be undertaken under proper guidance. Our experts can advise on appropriate practices.`,
    suitableFor:
      'Experienced practitioners with existing practice who seek focused, intensive spiritual work for specific goals.',
  },
];

const safetyGuidelines = [
  {
    title: 'Before You Begin',
    items: [
      "Consult with a knowledgeable guide if you're new to spiritual practices",
      'Start with gentle, universally beneficial products (5 Mukhi Rudraksha, clear quartz)',
      'Set realistic expectations—spiritual growth takes time',
      'Ensure you are in good physical and mental health',
    ],
  },
  {
    title: 'During Your Practice',
    items: [
      'Follow prescribed methods for wearing and caring for your items',
      'Maintain cleanliness and respect for sacred objects',
      "Don't mix practices from different traditions without guidance",
      'Listen to your body and intuition—stop if something feels wrong',
    ],
  },
  {
    title: 'Signs to Seek Guidance',
    items: [
      'Feeling overwhelmed, anxious, or disturbed during practice',
      'Physical discomfort when wearing or using items',
      'Confusion about which products or practices are right for you',
      'Desire to undertake intensive practices like anushthan',
    ],
  },
];

const preparationSteps = [
  {
    title: 'Physical Preparation',
    description:
      'Clean yourself with a bath/shower before wearing new spiritual items for the first time. Ensure the product is also cleaned according to its care instructions.',
    icon: Shield,
  },
  {
    title: 'Mental Preparation',
    description:
      'Approach your spiritual items with respect and clear intention. Take a few moments to center yourself before putting on or using any sacred item.',
    icon: Heart,
  },
  {
    title: 'Ongoing Care',
    description:
      'Regularly clean and re-energize your items as recommended. Store them in clean, respectful places when not in use. Remove during activities that might compromise their sanctity.',
    icon: Clock,
  },
];

function renderPathContent(content) {
  return content.split(/\n\n+/).map((paragraph, i) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('**'))
      return (
        <h4 key={i} className="font-semibold text-lg mb-2">
          {trimmed.replace(/\*\*/g, '')}
        </h4>
      );
    if (trimmed.startsWith('-'))
      return (
        <ul key={i} className="space-y-1 mb-4">
          {trimmed.split('\n').map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              {item.replace(/^- /, '')}
            </li>
          ))}
        </ul>
      );
    return (
      <p key={i} className="text-muted-foreground mb-4">
        {trimmed}
      </p>
    );
  });
}

export default function EducationPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Knowledge Center
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Understanding Your <span className="text-gradient-gold">Spiritual Path</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Knowledge is the foundation of meaningful spiritual practice. Learn about different
              paths, safe practices, and how to make the most of your spiritual journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-4">
              The Three Paths: Bhakti, Sadhana & Anushthan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding these distinctions helps you choose the right approach and products for
              where you are in your spiritual journey.
            </p>
          </div>

          <Tabs defaultValue="bhakti" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-3 mb-8">
              {spiritualPaths.map((path) => (
                <TabsTrigger key={path.id} value={path.id} className="gap-2">
                  <path.icon className={`w-4 h-4 ${path.color}`} />
                  <span className="hidden sm:inline">{path.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {spiritualPaths.map((path) => (
              <TabsContent key={path.id} value={path.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl ${path.bgColor} flex items-center justify-center`}
                      >
                        <path.icon className={`w-7 h-7 ${path.color}`} />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-2xl">{path.title}</h3>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                    </div>
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      {renderPathContent(path.content)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Best Suited For</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{path.suitableFor}</p>
                      </CardContent>
                    </Card>
                    <Button asChild className="w-full">
                      <Link href="/browse-by-intention">
                        Browse Products
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Safe Usage Guidelines</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Spiritual practice should enhance your wellbeing. Follow these guidelines for a safe
              and enriching experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {safetyGuidelines.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {index === 2 ? (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Preparation & After-Care</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proper preparation and care ensure your spiritual items remain effective and sacred.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {preparationSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card rounded-lg border px-6">
              <AccordionTrigger>Can anyone wear Rudraksha?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most Rudrakshas, especially the 5 Mukhi, are universally beneficial and can be worn
                by anyone regardless of age, gender, or religious background. However, certain rare
                mukhis may have specific guidelines. We clearly mention any restrictions on each
                product page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-card rounded-lg border px-6">
              <AccordionTrigger>Do I need a guru to start spiritual practice?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                While guidance is always valuable, you don&apos;t need a guru to begin. Start with
                simple practices and universally beneficial products. As you deepen your practice,
                you may naturally find appropriate guidance. We&apos;re here to help you get started
                safely.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-card rounded-lg border px-6">
              <AccordionTrigger>Can I wear multiple spiritual items together?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Generally, yes—but with awareness. Some combinations work harmoniously, while others
                may not be ideal. When in doubt, consult our experts. A general rule: start simple
                and add items gradually as you understand their effects on you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-card rounded-lg border px-6">
              <AccordionTrigger>
                What if I don&apos;t feel any difference after wearing an item?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Spiritual effects are often subtle and may take time to notice. Focus on your
                practice rather than outcomes. If you have concerns about product authenticity,
                contact us. Remember: these are tools for practice, not magic solutions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-2xl mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team of spiritual guides is here to help you navigate your journey with clarity
              and confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/browse-by-intention">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
