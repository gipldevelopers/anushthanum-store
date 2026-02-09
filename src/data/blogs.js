export const blogCategories = [
  { id: 'all', name: 'All Articles', icon: 'BookOpen' },
  { id: 'rudraksha', name: 'Rudraksha Guide', icon: 'CircleDot' },
  { id: 'yantra', name: 'Yantra Knowledge', icon: 'Triangle' },
  { id: 'crystals', name: 'Crystal Healing', icon: 'Gem' },
  { id: 'meditation', name: 'Meditation', icon: 'Flower2' },
  { id: 'astrology', name: 'Astrology', icon: 'Star' },
  { id: 'rituals', name: 'Rituals & Practices', icon: 'Flame' },
  { id: 'wellness', name: 'Spiritual Wellness', icon: 'Sparkles' },
];

export const blogPosts = [
  {
    id: '1',
    slug: 'complete-guide-choosing-first-rudraksha',
    title: 'The Complete Guide to Choosing Your First Rudraksha',
    excerpt: 'Learn how to select the perfect Rudraksha bead based on your birth chart and spiritual goals.',
    content: `Rudraksha beads have been revered for thousands of years as powerful spiritual tools. Whether you're seeking mental peace, spiritual growth, or physical well-being, choosing the right Rudraksha is crucial.

## Understanding Mukhi (Faces)

The number of natural lines (mukhis) on a Rudraksha determines its ruling deity and properties:

- **1 Mukhi**: Ruled by Lord Shiva, brings enlightenment
- **5 Mukhi**: Most common, ruled by Kalagni Rudra, brings peace
- **7 Mukhi**: Ruled by Goddess Lakshmi, attracts wealth

## How to Choose Based on Your Birth Chart

Your birth chart reveals which planetary influences are strongest in your life. Consulting with an astrologer can help identify:

1. Your ruling planet
2. Weak planetary positions
3. Doshas that need balancing

## Quality Indicators

Always look for:
- Natural holes (not drilled)
- Clear, well-defined mukhis
- Authentic Nepali or Indonesian origin
- Lab certification`,
    image: '/images/products/rudraksha-mala.jpg',
    author: { name: 'Dr. Priya Devi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', role: 'Vedic Scholar' },
    date: '2024-01-20',
    readTime: '8 min read',
    category: 'rudraksha',
    tags: ['rudraksha', 'beginners', 'guide', 'spiritual'],
    isMustRead: true,
    isFeatured: true,
    views: 12500,
  },
  {
    id: '2',
    slug: 'energize-care-yantra-guide',
    title: 'How to Energize and Care for Your Yantra',
    excerpt: 'Proper rituals and daily practices to maintain the spiritual power of your sacred Yantra.',
    content: `Yantras are geometric representations of divine energies. To harness their full potential, proper energization and care are essential.

## The Prana Pratishtha Ceremony

Before using any Yantra, it must undergo Prana Pratishtha - the ritual of infusing divine life force:

1. Choose an auspicious day (Panchami, Dashami)
2. Purify with Ganga water
3. Offer sandalwood paste and flowers
4. Chant the specific mantra 108 times

## Daily Care Routine

Maintain your Yantra's power through:

- Morning worship with incense
- Weekly cleansing with milk
- Keeping in a clean, elevated place`,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    author: { name: 'Acharya Vikram', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'Tantra Expert' },
    date: '2024-01-15',
    readTime: '6 min read',
    category: 'yantra',
    tags: ['yantra', 'rituals', 'energization', 'care'],
    isPopular: true,
    views: 9800,
  },
  {
    id: '3',
    slug: 'crystal-healing-beginners-journey',
    title: "Crystal Healing: A Beginner's Journey",
    excerpt: 'Discover the transformative power of healing crystals for your wellness routine.',
    content: `Crystals have been used for healing across cultures for millennia. Here is a gentle introduction to starting your crystal journey.

## Choosing Your First Crystal

Begin with crystals known for their gentle, universal energy:

- **Clear Quartz**: Amplifies intention and clarity
- **Amethyst**: Calms the mind and supports meditation
- **Rose Quartz**: Opens the heart to love and compassion

## Cleansing and Charging

1. Rinse under running water or leave in moonlight
2. Set your intention while holding the crystal
3. Place in sunlight (avoid for amethyst) or on selenite

## Using Crystals in Daily Practice

Keep a small crystal on your desk, wear as jewellery, or hold during meditation. Consistency and intention matter more than complex rituals.`,
    image: 'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?w=800',
    author: { name: 'Pandit Sharma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', role: 'Crystal Therapist' },
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'crystals',
    tags: ['crystals', 'healing', 'beginners', 'wellness'],
    isMustRead: true,
    views: 15200,
  },
];

export const getBlogBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
export const getBlogsByCategory = (category) =>
  category === 'all' ? blogPosts : blogPosts.filter((p) => p.category === category);
export const getMustReadBlogs = () => blogPosts.filter((p) => p.isMustRead);
export const getPopularBlogs = () => blogPosts.filter((p) => p.isPopular);
export const getFeaturedBlogs = () => blogPosts.filter((p) => p.isFeatured);
