'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Loader2, Save, Plus, Trash2, GripVertical, Image as ImageIcon,
  Settings, Globe, MessageCircle, Layout, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle2, BookOpen, Users, Star, Shield,
} from 'lucide-react';
import { adminContentApi } from '@/services/contentApi';
import { imageSrc } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────
   DEFAULTS (mirrors the seed data exactly)
───────────────────────────────────────────────────────── */
const DEFAULT_HERO_SLIDES = [
  { image: '/images/hero/hero-1.jpg', subtitle: 'Authentic. Energized. Certified.', title: 'Sacred Tools for Your Spiritual Journey', description: 'Experience the power of lab-certified Rudraksha, ancient Yantras, and healing crystals.', cta: 'Explore Collection', link: '/browse-by-intention', badges: ['Lab Certified', 'Vedic Energized'] },
  { image: '/images/hero/hero-2.jpg', subtitle: 'Guidance First Platform', title: 'Clarity Before You Buy', description: "We don't just sell products; we provide the wisdom to use them.", cta: 'Get Guidance', link: '/guidance/choosing-consciously', badges: ['Free Consultation', 'Expert Support'] },
];
const DEFAULT_LEARNING = {
  eyebrow: 'Guidance-First Approach', title: 'Your Spiritual Journey Starts with', titleHighlight: 'Knowledge',
  description: "We believe spiritual tools work only when used with proper understanding, intention, and discipline.",
  ctaText: 'Ready to begin your conscious spiritual journey?',
  primaryButtonText: 'Shop by Intention', primaryButtonLink: '/browse-by-intention',
  secondaryButtonText: 'Visit Knowledge Hub', secondaryButtonLink: '/blog',
  quote: '"We do not sell hope — we teach method."', quoteAuthor: '— The Anushthanum Philosophy',
  steps: [
    { step: 1, icon: 'BookOpen', title: 'Learn', description: 'Understand the spiritual significance and proper use before you buy', features: ['Article library', 'Video guides', 'Expert insights'], link: '/blog', color: 'from-blue-500/20 to-blue-600/10' },
    { step: 2, icon: 'Lightbulb', title: 'Understand', description: 'Know who should use what, when, and how — with complete clarity', features: ['Usage guidelines', 'Safety notes', 'Best practices'], link: '/education', color: 'from-amber-500/20 to-amber-600/10' },
    { step: 3, icon: 'ShoppingBag', title: 'Choose Consciously', description: 'Select products that align with your needs and spiritual goals', features: ['Intention-based shopping', 'Expert recommendations', 'Personalized guidance'], link: '/browse-by-intention', color: 'from-emerald-500/20 to-emerald-600/10' },
    { step: 4, icon: 'Sparkles', title: 'Practice Correctly', description: 'Follow step-by-step rituals and methods for effective results', features: ['Activation rituals', 'Daily practices', 'Maintenance guides'], link: '/energization', color: 'from-purple-500/20 to-purple-600/10' },
  ],
};
const DEFAULT_GUIDANCE = {
  eyebrow: 'Guidance & Awareness', title: 'Walk Your Spiritual Path', titleHighlight: 'Mindfully',
  description: "Every product you choose should resonate with your journey.",
  promiseTitle: 'Our Promise: No Miracle Claims',
  promiseText: 'We respect the sacred nature of spiritual practice. Our products support your sadhana — the real transformation comes from your dedication.',
  promiseButtonText: 'Read Disclaimer', promiseButtonLink: '/disclaimer',
  cards: [
    { icon: 'Compass', title: 'Choose Consciously', description: 'Every spiritual product carries energy. We guide you to select items that align with your journey.', link: '/guidance/choosing-consciously' },
    { icon: 'Heart', title: 'Know Your Intentions', description: 'Browse by purpose - whether for peace, protection, prosperity, or spiritual growth.', link: '/browse-by-intention' },
    { icon: 'AlertTriangle', title: 'Who Should Avoid', description: 'Not every product suits everyone. We clearly mention contraindications for your wellbeing.', link: '/guidance/suitability' },
    { icon: 'Shield', title: 'Our Ethical Stance', description: 'We do not promise miracles. Spiritual growth is a journey, and our products support your practice.', link: '/disclaimer' },
  ],
};
const DEFAULT_WHY = {
  eyebrow: 'Our Promise', title: 'Why Buy Products from Anushthanum?',
  description: 'We are committed to providing the most authentic and spiritually powerful products for your divine journey.',
  reasons: [
    { icon: 'Shield', title: '100% Authentic', description: 'Every Rudraksha comes with lab certification ensuring authenticity and origin.' },
    { icon: 'Sparkles', title: 'Temple Energized', description: 'All products are energized through proper Vedic rituals by our experts.' },
    { icon: 'Award', title: '25+ Years Experience', description: 'Trusted by over 50,000 customers with decades of expertise.' },
    { icon: 'Users', title: 'Expert Guidance', description: 'Our Vedic scholars provide personalized recommendations.' },
    { icon: 'Truck', title: 'Pan India Delivery', description: 'Free shipping on orders above ₹999 with secure packaging.' },
    { icon: 'HeartHandshake', title: 'Satisfaction Guarantee', description: '7-day return policy if you are not completely satisfied.' },
  ],
};
const DEFAULT_TEAM = {
  eyebrow: 'Our Guidance', title: 'Meet Our Spiritual Experts',
  description: 'Our Vedic scholars and spiritual healers ensure every product is authentic and properly energized.',
  experts: [
    { name: 'Pandit Raghunath Sharma', role: 'Chief Vedic Scholar', experience: '35+ years', image: '/images/team/expert-1.jpg', specialty: 'Rudraksha Authentication' },
    { name: 'Dr. Priya Devi', role: 'Crystal Healing Expert', experience: '20+ years', image: '/images/team/expert-2.jpg', specialty: 'Energy Healing' },
    { name: 'Acharya Vikram Singh', role: 'Yantra Specialist', experience: '15+ years', image: '/images/team/expert-3.jpg', specialty: 'Sacred Geometry' },
  ],
  stats: [
    { icon: 'Users', value: '50,000+', label: 'Happy Customers' },
    { icon: 'Award', value: '25+', label: 'Years Experience' },
    { icon: 'BookOpen', value: '100%', label: 'Authentic Products' },
  ],
};
const DEFAULT_SETTINGS = { siteName: 'Anushthanum', tagline: 'Sacred Spiritual Products', logo: '', favicon: '/favicon.ico', contactEmail: 'info@anushthanum.com', contactPhone: '+91 9876543210', address: '', socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '', whatsapp: '' }, footerText: '© 2024 Anushthanum. All rights reserved.' };

/* ─────────────────────────────────────────────────────────
   REUSABLE MINI-COMPONENTS
───────────────────────────────────────────────────────── */
function FieldRow({ label, children }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  );
}

/* ─── Collapsible accordion item ─── */
function AccordionItem({ title, subtitle, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/40 transition-colors" onClick={() => setOpen(o => !o)}>
        <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{title || 'Untitled'}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </div>
      {open && <div className="border-t p-4 space-y-4 bg-muted/20">{children}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SLIDE EDITOR (Hero)
───────────────────────────────────────────────────────── */
function SlideEditor({ slide, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const set = field => e => onChange(index, { [field]: e.target.value });
  return (
    <AccordionItem title={slide.title || `Slide ${index + 1}`} subtitle={slide.subtitle} defaultOpen={index === 0}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Slide {index + 1} of {total}</span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
      <FieldRow label="Image URL">
        <div className="flex gap-2">
          <div className="relative flex-1"><ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" value={slide.image || ''} onChange={set('image')} placeholder="/images/hero/hero-1.jpg" /></div>
          {slide.image && <img src={imageSrc(slide.image) || slide.image} alt="" className="h-10 w-16 rounded object-cover border flex-shrink-0" onError={e => e.target.style.display = 'none'} />}
        </div>
      </FieldRow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Title"><Input value={slide.title || ''} onChange={set('title')} placeholder="Sacred Tools for…" /></FieldRow>
        <FieldRow label="Subtitle (eyebrow)"><Input value={slide.subtitle || ''} onChange={set('subtitle')} placeholder="Authentic. Energized." /></FieldRow>
      </div>
      <FieldRow label="Description"><Textarea value={slide.description || ''} onChange={set('description')} rows={2} /></FieldRow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Button Text"><Input value={slide.cta || ''} onChange={set('cta')} placeholder="Explore Collection" /></FieldRow>
        <FieldRow label="Button Link"><Input value={slide.link || ''} onChange={set('link')} placeholder="/browse-by-intention" /></FieldRow>
      </div>
      <FieldRow label="Badges (comma-separated)">
        <Input value={(slide.badges || []).join(', ')} onChange={e => onChange(index, { badges: e.target.value.split(',').map(b => b.trim()).filter(Boolean) })} placeholder="Lab Certified, Vedic Energized" />
        <div className="flex flex-wrap gap-1 mt-1">{(slide.badges || []).map((b, i) => <Badge key={i} variant="secondary" className="text-xs">{b}</Badge>)}</div>
      </FieldRow>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────
   STEP EDITOR (Learning Journey)
───────────────────────────────────────────────────────── */
function StepEditor({ step, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const set = field => e => onChange(index, { [field]: e.target.value });
  return (
    <AccordionItem title={step.title || `Step ${index + 1}`} subtitle={step.description} defaultOpen={index === 0}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Step {index + 1} of {total}</span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Title"><Input value={step.title || ''} onChange={set('title')} /></FieldRow>
        <FieldRow label="Icon (Lucide name)"><Input value={step.icon || ''} onChange={set('icon')} placeholder="BookOpen" /></FieldRow>
      </div>
      <FieldRow label="Description"><Textarea value={step.description || ''} onChange={set('description')} rows={2} /></FieldRow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Link"><Input value={step.link || ''} onChange={set('link')} placeholder="/blog" /></FieldRow>
        <FieldRow label="Color classes"><Input value={step.color || ''} onChange={set('color')} placeholder="from-blue-500/20 to-blue-600/10" /></FieldRow>
      </div>
      <FieldRow label="Features (one per line)">
        <Textarea
          value={(step.features || []).join('\n')}
          onChange={e => onChange(index, { features: e.target.value.split('\n').map(f => f.trim()).filter(Boolean) })}
          rows={3} placeholder="Article library&#10;Video guides&#10;Expert insights"
        />
      </FieldRow>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────
   CARD EDITOR (Guidance)
───────────────────────────────────────────────────────── */
function CardEditor({ card, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const set = field => e => onChange(index, { [field]: e.target.value });
  return (
    <AccordionItem title={card.title || `Card ${index + 1}`} subtitle={card.description} defaultOpen={index === 0}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Card {index + 1} of {total}</span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Title"><Input value={card.title || ''} onChange={set('title')} /></FieldRow>
        <FieldRow label="Icon (Lucide name)"><Input value={card.icon || ''} onChange={set('icon')} placeholder="Compass" /></FieldRow>
      </div>
      <FieldRow label="Description"><Textarea value={card.description || ''} onChange={set('description')} rows={2} /></FieldRow>
      <FieldRow label="Link"><Input value={card.link || ''} onChange={set('link')} placeholder="/guidance/choosing-consciously" /></FieldRow>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────
   REASON EDITOR (Why Choose Us)
───────────────────────────────────────────────────────── */
function ReasonEditor({ reason, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const set = field => e => onChange(index, { [field]: e.target.value });
  return (
    <AccordionItem title={reason.title || `Reason ${index + 1}`} subtitle={reason.description} defaultOpen={index === 0}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Item {index + 1} of {total}</span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Title"><Input value={reason.title || ''} onChange={set('title')} /></FieldRow>
        <FieldRow label="Icon"><Input value={reason.icon || ''} onChange={set('icon')} placeholder="Shield" /></FieldRow>
      </div>
      <FieldRow label="Description"><Textarea value={reason.description || ''} onChange={set('description')} rows={2} /></FieldRow>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPERT EDITOR (Team) — with file upload
───────────────────────────────────────────────────────── */
function ExpertEditor({ expert, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const set = field => e => onChange(index, { [field]: e.target.value });
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPEG, PNG, WebP, GIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 5 MB.');
      return;
    }
    setUploading(true);
    try {
      const res = await adminContentApi.uploadTeamImage(file);
      if (res?.url) {
        onChange(index, { image: res.url });
        toast.success('Photo uploaded successfully!');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const photoSrc = imageSrc(expert.image) || expert.image;

  return (
    <AccordionItem title={expert.name || `Expert ${index + 1}`} subtitle={expert.role} defaultOpen={index === 0}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Expert {index + 1} of {total}</span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
          <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Full Name"><Input value={expert.name || ''} onChange={set('name')} /></FieldRow>
        <FieldRow label="Role / Title"><Input value={expert.role || ''} onChange={set('role')} placeholder="Chief Vedic Scholar" /></FieldRow>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldRow label="Specialty"><Input value={expert.specialty || ''} onChange={set('specialty')} placeholder="Rudraksha Authentication" /></FieldRow>
        <FieldRow label="Experience"><Input value={expert.experience || ''} onChange={set('experience')} placeholder="35+ years" /></FieldRow>
      </div>

      {/* Photo upload */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Expert Photo</Label>
        <div className="flex items-start gap-4">
          {/* Avatar preview */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
              {photoSrc ? (
                <img src={photoSrc} alt={expert.name || 'Expert'} className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              ) : null}
              <div className={`absolute inset-0 rounded-full flex items-center justify-center bg-muted ${photoSrc ? 'hidden' : 'flex'}`}>
                <Users className="w-8 h-8 text-muted-foreground/40" />
              </div>
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-background/70 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}
          </div>

          {/* Drop zone */}
          <div className="flex-1">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all min-h-[90px]
                ${dragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/50 hover:bg-muted/40'}
                ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">Uploading…</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  <p className="text-xs text-center text-muted-foreground leading-relaxed">
                    <span className="text-primary font-medium">Click to upload</span> or drag & drop<br />
                    JPEG, PNG, WebP, GIF — max 5 MB
                  </p>
                </>
              )}
            </div>

            {/* Current path display + clear button */}
            {expert.image && (
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xs text-muted-foreground truncate flex-1 font-mono bg-muted px-2 py-1 rounded">{expert.image}</p>
                <Button type="button" variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onChange(index, { image: '' })} title="Remove photo">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────
   GENERIC ARRAY UTILS
───────────────────────────────────────────────────────── */
function makeArrayUpdater(setter) {
  return {
    update: (i, updates) => setter(prev => prev.map((item, idx) => idx === i ? { ...item, ...updates } : item)),
    remove: (i) => setter(prev => prev.filter((_, idx) => idx !== i)),
    move: (i, dir) => setter(prev => {
      const arr = [...prev];
      const t = i + dir;
      if (t < 0 || t >= arr.length) return arr;
      [arr[i], arr[t]] = [arr[t], arr[i]];
      return arr;
    }),
  };
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Hero
  const [slides, setSlides] = useState(DEFAULT_HERO_SLIDES);

  // Learning Journey
  const [learning, setLearning] = useState(DEFAULT_LEARNING);
  const [learningSteps, setLearningSteps] = useState(DEFAULT_LEARNING.steps);

  // Guidance
  const [guidance, setGuidance] = useState(DEFAULT_GUIDANCE);
  const [guidanceCards, setGuidanceCards] = useState(DEFAULT_GUIDANCE.cards);

  // Why Choose Us
  const [why, setWhy] = useState(DEFAULT_WHY);
  const [whyReasons, setWhyReasons] = useState(DEFAULT_WHY.reasons);

  // Team
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [experts, setExperts] = useState(DEFAULT_TEAM.experts);
  const [stats, setStats] = useState(DEFAULT_TEAM.stats);

  // Site settings
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  /* ── Load ── */
  useEffect(() => {
    const load = async () => {
      try {
        const [hpRes, stRes] = await Promise.allSettled([
          adminContentApi.getPage('homepage'),
          adminContentApi.getPage('site-settings'),
        ]);

        if (hpRes.status === 'fulfilled') {
          const c = hpRes.value?.page?.content || {};
          if (c.heroSlides?.length) setSlides(c.heroSlides);
          if (c.learningJourney) { setLearning({ ...DEFAULT_LEARNING, ...c.learningJourney }); if (c.learningJourney.steps) setLearningSteps(c.learningJourney.steps); }
          if (c.guidance) { setGuidance({ ...DEFAULT_GUIDANCE, ...c.guidance }); if (c.guidance.cards) setGuidanceCards(c.guidance.cards); }
          if (c.whyChooseUs) { setWhy({ ...DEFAULT_WHY, ...c.whyChooseUs }); if (c.whyChooseUs.reasons) setWhyReasons(c.whyChooseUs.reasons); }
          if (c.teamExperts) { setTeam({ ...DEFAULT_TEAM, ...c.teamExperts }); if (c.teamExperts.experts) setExperts(c.teamExperts.experts); if (c.teamExperts.stats) setStats(c.teamExperts.stats); }
        }
        if (stRes.status === 'fulfilled' && stRes.value?.page?.content) {
          setSettings({ ...DEFAULT_SETTINGS, ...stRes.value.page.content });
        }
      } catch { toast.error('Failed to load CMS data'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const slideOps = makeArrayUpdater(setSlides);
  const stepOps = makeArrayUpdater(setLearningSteps);
  const cardOps = makeArrayUpdater(setGuidanceCards);
  const reasonOps = makeArrayUpdater(setWhyReasons);
  const expertOps = makeArrayUpdater(setExperts);
  const statsOps = makeArrayUpdater(setStats);

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true); setSaveStatus(null);
    try {
      await Promise.all([
        adminContentApi.savePage('homepage', {
          title: 'Homepage',
          content: {
            heroSlides: slides,
            learningJourney: { ...learning, steps: learningSteps },
            guidance: { ...guidance, cards: guidanceCards },
            whyChooseUs: { ...why, reasons: whyReasons },
            teamExperts: { ...team, experts, stats },
          },
        }),
        adminContentApi.savePage('site-settings', { title: 'Site Settings', content: settings }),
      ]);
      setSaveStatus('success');
      toast.success('All content saved successfully!');
    } catch (err) {
      setSaveStatus('error');
      toast.error(err.message || 'Failed to save content');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const set = (setter, field) => e => setter(prev => ({ ...prev, [field]: e.target.value }));
  const setSocialLink = platform => e => setSettings(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: e.target.value } }));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between"><div className="space-y-2"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-64" /></div><Skeleton className="h-10 w-36" /></div>
        <Skeleton className="h-12 w-full" />
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><Layout className="h-7 w-7 text-primary" />Content CMS</h1>
          <p className="text-muted-foreground mt-1">Manage all homepage sections and site settings.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2 min-w-[160px]">
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
            : saveStatus === 'success' ? <><CheckCircle2 className="h-4 w-4 text-green-500" />Saved!</>
              : saveStatus === 'error' ? <><AlertCircle className="h-4 w-4 text-destructive" />Retry</>
                : <><Save className="h-4 w-4" />Save All Changes</>}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="hero" className="gap-1.5 text-xs"><ImageIcon className="h-3.5 w-3.5" />Hero</TabsTrigger>
          <TabsTrigger value="learning" className="gap-1.5 text-xs"><BookOpen className="h-3.5 w-3.5" />Learning Journey</TabsTrigger>
          <TabsTrigger value="guidance" className="gap-1.5 text-xs"><Shield className="h-3.5 w-3.5" />Guidance</TabsTrigger>
          <TabsTrigger value="why" className="gap-1.5 text-xs"><Star className="h-3.5 w-3.5" />Why Choose Us</TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5 text-xs"><Users className="h-3.5 w-3.5" />Team Experts</TabsTrigger>
          <TabsTrigger value="site" className="gap-1.5 text-xs"><Globe className="h-3.5 w-3.5" />Site Info</TabsTrigger>
          <TabsTrigger value="contact" className="gap-1.5 text-xs"><MessageCircle className="h-3.5 w-3.5" />Contact</TabsTrigger>
        </TabsList>

        {/* ── HERO ── */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <SectionHeader title="Hero Carousel Slides" description="Slides shown in the homepage banner. Use ↑ ↓ to reorder." />
            <CardContent className="space-y-3">
              {slides.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                  <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No slides. Click Add Slide to begin.</p>
                </div>
              )}
              {slides.map((slide, i) => (
                <SlideEditor key={i} slide={slide} index={i} total={slides.length}
                  onChange={(idx, u) => slideOps.update(idx, u)} onRemove={slideOps.remove}
                  onMoveUp={() => slideOps.move(i, -1)} onMoveDown={() => slideOps.move(i, 1)} />
              ))}
              <Button variant="outline" onClick={() => setSlides(p => [...p, { image: '', subtitle: '', title: '', description: '', cta: '', link: '', badges: [] }])}
                className="w-full gap-2 border-dashed"><Plus className="h-4 w-4" />Add Slide</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── LEARNING JOURNEY ── */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <SectionHeader title="Section Header" description="Text shown above the steps grid." />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Eyebrow label"><Input value={learning.eyebrow} onChange={set(setLearning, 'eyebrow')} /></FieldRow>
                <FieldRow label="Title Highlight word"><Input value={learning.titleHighlight} onChange={set(setLearning, 'titleHighlight')} placeholder="Knowledge" /></FieldRow>
              </div>
              <FieldRow label="Main title (before highlight)"><Input value={learning.title} onChange={set(setLearning, 'title')} /></FieldRow>
              <FieldRow label="Description"><Textarea value={learning.description} onChange={set(setLearning, 'description')} rows={2} /></FieldRow>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Quote"><Input value={learning.quote} onChange={set(setLearning, 'quote')} /></FieldRow>
                <FieldRow label="Quote Author"><Input value={learning.quoteAuthor} onChange={set(setLearning, 'quoteAuthor')} /></FieldRow>
              </div>
              <div className="border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="CTA sub-text"><Input value={learning.ctaText} onChange={set(setLearning, 'ctaText')} /></FieldRow>
                <FieldRow label="Primary button text"><Input value={learning.primaryButtonText} onChange={set(setLearning, 'primaryButtonText')} /></FieldRow>
                <FieldRow label="Primary button link"><Input value={learning.primaryButtonLink} onChange={set(setLearning, 'primaryButtonLink')} /></FieldRow>
                <FieldRow label="Secondary button text"><Input value={learning.secondaryButtonText} onChange={set(setLearning, 'secondaryButtonText')} /></FieldRow>
                <FieldRow label="Secondary button link"><Input value={learning.secondaryButtonLink} onChange={set(setLearning, 'secondaryButtonLink')} /></FieldRow>
              </div>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Journey Steps" description="The 4 numbered step cards. Icon field accepts Lucide icon names." />
            <CardContent className="space-y-3">
              {learningSteps.map((step, i) => (
                <StepEditor key={i} step={step} index={i} total={learningSteps.length}
                  onChange={(idx, u) => stepOps.update(idx, u)} onRemove={stepOps.remove}
                  onMoveUp={() => stepOps.move(i, -1)} onMoveDown={() => stepOps.move(i, 1)} />
              ))}
              <Button variant="outline" onClick={() => setLearningSteps(p => [...p, { step: p.length + 1, icon: 'Sparkles', title: '', description: '', features: [], link: '', color: 'from-primary/20 to-primary/10' }])}
                className="w-full gap-2 border-dashed"><Plus className="h-4 w-4" />Add Step</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── GUIDANCE ── */}
        <TabsContent value="guidance" className="space-y-4">
          <Card>
            <SectionHeader title="Guidance Section Header" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Eyebrow"><Input value={guidance.eyebrow} onChange={set(setGuidance, 'eyebrow')} /></FieldRow>
                <FieldRow label="Highlight word"><Input value={guidance.titleHighlight} onChange={set(setGuidance, 'titleHighlight')} /></FieldRow>
              </div>
              <FieldRow label="Title"><Input value={guidance.title} onChange={set(setGuidance, 'title')} /></FieldRow>
              <FieldRow label="Description"><Textarea value={guidance.description} onChange={set(setGuidance, 'description')} rows={2} /></FieldRow>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Guidance Cards" description="The 4 compact cards in the grid." />
            <CardContent className="space-y-3">
              {guidanceCards.map((card, i) => (
                <CardEditor key={i} card={card} index={i} total={guidanceCards.length}
                  onChange={(idx, u) => cardOps.update(idx, u)} onRemove={cardOps.remove}
                  onMoveUp={() => cardOps.move(i, -1)} onMoveDown={() => cardOps.move(i, 1)} />
              ))}
              <Button variant="outline" onClick={() => setGuidanceCards(p => [...p, { icon: 'Shield', title: '', description: '', link: '' }])}
                className="w-full gap-2 border-dashed"><Plus className="h-4 w-4" />Add Card</Button>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Promise Banner" description="The full-width banner at the bottom of this section." />
            <CardContent className="space-y-4">
              <FieldRow label="Title"><Input value={guidance.promiseTitle} onChange={set(setGuidance, 'promiseTitle')} /></FieldRow>
              <FieldRow label="Body text"><Textarea value={guidance.promiseText} onChange={set(setGuidance, 'promiseText')} rows={2} /></FieldRow>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Button text"><Input value={guidance.promiseButtonText} onChange={set(setGuidance, 'promiseButtonText')} /></FieldRow>
                <FieldRow label="Button link"><Input value={guidance.promiseButtonLink} onChange={set(setGuidance, 'promiseButtonLink')} /></FieldRow>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── WHY CHOOSE US ── */}
        <TabsContent value="why" className="space-y-4">
          <Card>
            <SectionHeader title="Section Header" />
            <CardContent className="space-y-4">
              <FieldRow label="Eyebrow"><Input value={why.eyebrow} onChange={set(setWhy, 'eyebrow')} /></FieldRow>
              <FieldRow label="Heading"><Input value={why.title} onChange={set(setWhy, 'title')} /></FieldRow>
              <FieldRow label="Description"><Textarea value={why.description} onChange={set(setWhy, 'description')} rows={2} /></FieldRow>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Reason Cards" description="The 6 feature cards in the dark section." />
            <CardContent className="space-y-3">
              {whyReasons.map((reason, i) => (
                <ReasonEditor key={i} reason={reason} index={i} total={whyReasons.length}
                  onChange={(idx, u) => reasonOps.update(idx, u)} onRemove={reasonOps.remove}
                  onMoveUp={() => reasonOps.move(i, -1)} onMoveDown={() => reasonOps.move(i, 1)} />
              ))}
              <Button variant="outline" onClick={() => setWhyReasons(p => [...p, { icon: 'Star', title: '', description: '' }])}
                className="w-full gap-2 border-dashed"><Plus className="h-4 w-4" />Add Reason</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TEAM EXPERTS ── */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <SectionHeader title="Section Header" />
            <CardContent className="space-y-4">
              <FieldRow label="Eyebrow"><Input value={team.eyebrow} onChange={set(setTeam, 'eyebrow')} /></FieldRow>
              <FieldRow label="Heading"><Input value={team.title} onChange={set(setTeam, 'title')} /></FieldRow>
              <FieldRow label="Description"><Textarea value={team.description} onChange={set(setTeam, 'description')} rows={2} /></FieldRow>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Expert Profiles" description="Circular cards with photos." />
            <CardContent className="space-y-3">
              {experts.map((expert, i) => (
                <ExpertEditor key={i} expert={expert} index={i} total={experts.length}
                  onChange={(idx, u) => expertOps.update(idx, u)} onRemove={expertOps.remove}
                  onMoveUp={() => expertOps.move(i, -1)} onMoveDown={() => expertOps.move(i, 1)} />
              ))}
              <Button variant="outline" onClick={() => setExperts(p => [...p, { name: '', role: '', specialty: '', experience: '', image: '' }])}
                className="w-full gap-2 border-dashed"><Plus className="h-4 w-4" />Add Expert</Button>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Statistics" description="The 3 stat tiles below the expert cards." />
            <CardContent className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 p-3 border rounded-lg bg-muted/20">
                  <FieldRow label="Value"><Input value={stat.value || ''} onChange={e => statsOps.update(i, { value: e.target.value })} placeholder="50,000+" /></FieldRow>
                  <FieldRow label="Label"><Input value={stat.label || ''} onChange={e => statsOps.update(i, { label: e.target.value })} placeholder="Happy Customers" /></FieldRow>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── SITE INFO ── */}
        <TabsContent value="site" className="space-y-4">
          <Card>
            <SectionHeader title="General Site Settings" description="Brand identity and global config." />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Site Name"><Input value={settings.siteName || ''} onChange={e => setSettings(p => ({ ...p, siteName: e.target.value }))} /></FieldRow>
                <FieldRow label="Tagline"><Input value={settings.tagline || ''} onChange={e => setSettings(p => ({ ...p, tagline: e.target.value }))} /></FieldRow>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Logo URL">
                  <div className="flex gap-2">
                    <Input value={settings.logo || ''} onChange={e => setSettings(p => ({ ...p, logo: e.target.value }))} placeholder="/uploads/logo.png" />
                    {settings.logo && <img src={imageSrc(settings.logo) || settings.logo} alt="logo" className="h-10 w-10 object-contain border rounded flex-shrink-0" onError={e => e.target.style.display = 'none'} />}
                  </div>
                </FieldRow>
                <FieldRow label="Favicon URL"><Input value={settings.favicon || ''} onChange={e => setSettings(p => ({ ...p, favicon: e.target.value }))} /></FieldRow>
              </div>
              <FieldRow label="Footer Copyright Text"><Input value={settings.footerText || ''} onChange={e => setSettings(p => ({ ...p, footerText: e.target.value }))} /></FieldRow>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── CONTACT ── */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <SectionHeader title="Contact Information" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Email"><Input type="email" value={settings.contactEmail || ''} onChange={e => setSettings(p => ({ ...p, contactEmail: e.target.value }))} /></FieldRow>
                <FieldRow label="Phone"><Input value={settings.contactPhone || ''} onChange={e => setSettings(p => ({ ...p, contactPhone: e.target.value }))} /></FieldRow>
              </div>
              <FieldRow label="Address"><Textarea value={settings.address || ''} onChange={e => setSettings(p => ({ ...p, address: e.target.value }))} rows={2} /></FieldRow>
            </CardContent>
          </Card>
          <Card>
            <SectionHeader title="Social Media Links" description="Leave empty to hide in footer." />
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/anushthanum' },
                { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/anushthanum' },
                { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/anushthanum' },
                { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@anushthanum' },
                { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+919876543210' },
              ].map(({ key, label, placeholder }) => (
                <FieldRow key={key} label={label}>
                  <Input value={settings.socialLinks?.[key] || ''} onChange={setSocialLink(key)} placeholder={placeholder} />
                </FieldRow>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
