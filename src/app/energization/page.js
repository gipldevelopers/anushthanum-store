'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Flame,
  BookOpen,
  Sun,
  Moon,
  Users,
  CheckCircle2,
  Shield,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const energizationSteps = [
  {
    step: 1,
    icon: Shield,
    title: 'Purification (Shuddhi)',
    description:
      'Every product undergoes physical and energetic purification using traditional methods—gangajal, raw milk, and sacred mantras to remove any negative imprints.',
    duration: 'Day 1',
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'Vedic Invocation',
    description:
      'Qualified pandits perform specific Vedic mantras and rituals to invite divine energies. Each product type has its own set of traditional invocations.',
    duration: 'Days 2-3',
  },
  {
    step: 3,
    icon: Flame,
    title: 'Havan (Sacred Fire)',
    description:
      'A dedicated fire ceremony is performed with specific offerings and mantras. The sacred fire serves as a medium to transfer blessings to the products.',
    duration: 'Day 4',
  },
  {
    step: 4,
    icon: Moon,
    title: 'Resting Period',
    description:
      'Products are placed in the temple space to absorb the sanctified environment. This allows the energies to stabilize and integrate.',
    duration: 'Days 5-6',
  },
  {
    step: 5,
    icon: Sun,
    title: 'Final Blessing',
    description:
      'A final blessing ceremony marks the completion. Products are then carefully packed with sacred items like kumkum and rice for protection.',
    duration: 'Day 7',
  },
];

const whatWeDoNot = [
  'Claim supernatural powers or miraculous results',
  'Promise that products will solve all life problems',
  'Suggest our energization replaces personal practice',
  'Guarantee specific outcomes from using our products',
];

const whatWeDo = [
  'Follow authentic Vedic traditions with integrity',
  'Work with qualified, experienced pandits',
  'Provide products that support your spiritual practice',
  'Maintain transparency about our processes',
];

export default function EnergizationPage() {
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
              <Sparkles className="w-3 h-3 mr-1" />
              Our Process
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Product <span className="text-gradient-gold">Energization</span> Process
            </h1>
            <p className="text-lg text-muted-foreground">
              Transparency is sacred to us. Here&apos;s exactly how we prepare and energize every
              spiritual product before it reaches you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold mb-4">What is Energization?</h2>
              <p className="text-muted-foreground mb-4">
                Energization (also called Pran Pratishtha or Abhimantran) is a traditional process
                of invoking and establishing divine energy in spiritual items. It&apos;s rooted in
                centuries-old Vedic practices.
              </p>
              <p className="text-muted-foreground mb-4">
                At Anushthanum, we perform this process with utmost respect for tradition while
                being completely transparent about what it involves and what it means.
              </p>
              <p className="text-muted-foreground">
                <strong>Important:</strong> While we honor and follow these traditions, we believe
                the true power lies in your own practice, intention, and devotion. Our energized
                products are tools to support your journey—not replacements for your personal
                spiritual work.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Flame className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-2">7-Day Sacred Process</h3>
                  <p className="text-muted-foreground text-sm">
                    Every product goes through our complete energization cycle
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our 7-Day Energization Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A detailed look at each stage of our traditional preparation process.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {energizationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {index !== energizationSteps.length - 1 && (
                  <div className="absolute left-7 top-16 bottom-0 w-px bg-border" />
                )}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-serif font-semibold text-lg">{step.title}</h3>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Commitment to Honesty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in being completely transparent about our practices and what you can
              realistically expect from our products.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-destructive/20">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2 text-destructive">
                    <Shield className="w-5 h-5" />
                    What We Do NOT Do
                  </h3>
                  <ul className="space-y-3">
                    {whatWeDoNot.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-destructive text-xs">✕</span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-500/20">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    What We DO
                  </h3>
                  <ul className="space-y-3">
                    {whatWeDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Team of Pandits</h2>
            <p className="text-muted-foreground mb-6">
              Our energization process is conducted by experienced Vedic pandits who have spent
              years studying and practicing traditional rituals. They bring not just knowledge, but
              devotion and sincerity to every ceremony they perform.
            </p>
            <p className="text-muted-foreground mb-8">
              Each pandit in our team has a minimum of 10 years of experience in performing Vedic
              rituals and has been trained in traditional gurukuls.
            </p>
            <Button asChild variant="outline">
              <Link href="/contact">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-2xl mb-4">Questions About Our Process?</h2>
            <p className="text-muted-foreground mb-6">
              We welcome your questions. Understanding what you&apos;re receiving is part of
              conscious spirituality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/disclaimer">Read Our Disclaimer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
