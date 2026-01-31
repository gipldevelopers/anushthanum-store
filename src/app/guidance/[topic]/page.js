'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  AlertTriangle,
  Compass,
  ArrowLeft,
  BookOpen,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const guidanceContent = {
  'choosing-consciously': {
    title: 'Choosing Products Consciously',
    subtitle: 'A mindful approach to spiritual product selection',
    icon: Compass,
    sections: [
      {
        title: 'Understand Your Current State',
        content: `Before choosing any spiritual product, take time to reflect on where you are in your journey. Ask yourself:
        
• What am I seeking? (Peace, protection, growth, healing?)
• Am I in a stable phase of life, or going through major changes?
• Do I have the time and space for regular spiritual practice?
• Am I seeking external solutions for internal work?

Honest self-reflection helps you choose products that truly serve you rather than feeding spiritual bypassing.`,
      },
      {
        title: 'Start Simple',
        content: `If you're new to spiritual products, we always recommend starting with universally beneficial, gentle items:

• 5 Mukhi Rudraksha - Safe for everyone, supports general wellbeing
• Clear Quartz Crystal - Gentle energy, good for beginners
• Simple meditation malas - For developing regular practice

Avoid rushing to rare or powerful items. Build your foundation first.`,
      },
      {
        title: 'Quality Over Quantity',
        content: `One authentic, well-cared-for spiritual item is more valuable than many neglected ones. Consider:

• Can you give proper care and attention to this item?
• Do you have the discipline to use it regularly?
• Is this purchase driven by genuine need or impulse?

A conscious purchase serves you better than an impulsive collection.`,
      },
      {
        title: 'Respect Traditions',
        content: `Many spiritual items come with traditional guidelines about who should use them and how. We encourage:

• Learning about the traditional context of items you're interested in
• Being open to guidance about what's suitable for you
• Respecting practices from their original traditions

This isn't about rigid rules—it's about approaching sacred items with appropriate understanding.`,
      },
    ],
  },
  suitability: {
    title: 'Product Suitability Guidelines',
    subtitle: 'Understanding who should and should not use certain items',
    icon: AlertTriangle,
    sections: [
      {
        title: 'General Safety Principles',
        content: `While most of our products are safe for general use, some considerations apply:

**Medical Conditions:**
If you have any medical conditions, especially related to skin sensitivity, allergies, or pregnancy, please consult healthcare providers before wearing items directly on the body.

**Mental Health:**
Those going through acute mental health challenges should be cautious with intensive spiritual practices. Our products support practice but are not therapeutic tools.

**Children:**
Many items are suitable for children, but supervision and age-appropriate choices are important. Very young children should not have small items that could be choking hazards.`,
      },
      {
        title: 'Rudraksha Considerations',
        content: `Most Rudrakshas are universally safe, but some traditional guidelines suggest:

**Generally Safe for All:**
• 5 Mukhi Rudraksha - The most universal and beneficial
• Rudraksha malas for meditation
• Rudraksha bracelets for daily wear

**Consult Before Using:**
• Higher mukhi Rudrakshas (above 14 mukhi) - traditionally require more preparation
• Very rare mukhis - may have specific requirements
• Multiple Rudrakshas worn together - combinations matter

We always indicate specific guidelines on product pages.`,
      },
      {
        title: 'Yantra Considerations',
        content: `Yantras are generally safe when used respectfully. However:

**Consider Your Practice Level:**
• Simple yantras for home placement - suitable for everyone
• Yantras for specific deities - best if you have connection to that tradition
• Complex tantric yantras - may require initiation or guidance

**Placement Matters:**
Where and how you place yantras affects their appropriateness. We provide guidance with each yantra.`,
      },
      {
        title: 'When to Avoid',
        content: `We recommend caution or avoidance in these cases:

• You're seeking a "quick fix" for serious life problems
• You're not willing to put in personal practice
• You're in crisis and need professional support
• You're collecting items without using them
• You feel pressured rather than drawn to an item

Sometimes the most spiritual choice is patience—waiting until you're truly ready.`,
      },
    ],
    warnings: [
      'Products are not substitutes for medical or psychological treatment',
      'Results depend on personal practice and are not guaranteed',
      'Some items require specific care and handling',
      'Intensive practices should be done under guidance',
    ],
  },
};

function renderContentBlock(paragraph, i) {
  const trimmed = paragraph.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('**')) {
    return (
      <h4 key={i} className="font-semibold text-foreground mb-2">
        {trimmed.replace(/\*\*/g, '')}
      </h4>
    );
  }
  if (trimmed.startsWith('•')) {
    return (
      <ul key={i} className="space-y-1 ml-4 list-disc">
        {trimmed.split('\n').map((item, j) => (
          <li key={j} className="text-muted-foreground">
            {item.replace(/^•\s*/, '')}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="text-muted-foreground whitespace-pre-line">
      {trimmed}
    </p>
  );
}

export default function GuidancePage() {
  const params = useParams();
  const topic = params?.topic ?? '';
  const content = guidanceContent[topic];

  if (!content) {
    return (
      <main className="min-h-screen py-16">
        <div className="container text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  const Icon = content.icon;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="absolute inset-0 sacred-pattern opacity-30" />
        <div className="container relative z-10">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Guidance
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {content.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      {section.title}
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
                      {section.content
                        .split(/\n\n+/)
                        .map((paragraph, i) =>
                          renderContentBlock(paragraph, i)
                        )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Warnings if present */}
            {content.warnings && content.warnings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-5 h-5" />
                      Important Reminders
                    </h3>
                    <ul className="space-y-2">
                      {content.warnings.map((warning, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <XCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-serif font-bold text-2xl mb-4">
              Need Personal Guidance?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team can help you find the right products for your specific
              situation and spiritual goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/browse-by-intention">Browse by Intention</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
