const rudraksha5mukhi = '/images/products/rudraksha-5mukhi.jpg';
const rudrakshaBracelet = '/images/products/rudraksha-bracelet.jpg';
const rudrakshaMala = '/images/products/rudraksha-mala.jpg';
const yantraPendant = '/images/products/yantra-pendant.jpg';
const crystalAmethyst = '/images/products/crystal-amethyst.jpg';
const crystalQuartz = '/images/products/crystal-quartz.jpg';
const braceletTigerEye = '/images/products/bracelet-tiger-eye.jpg';
const yantraPlate = '/images/products/yantra-plate.jpg';

const rudrakshaBase = {
  '0-mukhi': {
    name: 'Nirakar (0 Mukhi) Rudraksha',
    description: 'The extremely rare Nirakar Rudraksha, also known as 0 Mukhi, is believed to represent the formless aspect of Lord Shiva (Nirakar Brahma). It brings immense peace and spiritual elevation.',
    shortDescription: 'Extremely rare formless Rudraksha',
    benefits: ['Ultimate spiritual elevation', 'Connects to formless divine', 'Deep meditation states', 'Moksha attainment'],
    whoShouldWear: ['High-level spiritual seekers', 'Sannyasis', 'Yogis'],
    wearingRules: ['Keep in altar', 'Do not wear during impure acts', 'Chant Om Namah Shivaya'],
    price: 151000,
    originalPrice: 175000,
    rating: 5.0,
    reviews: 12
  },
  '1-mukhi': {
    name: '1 Mukhi Rudraksha',
    description: 'The rarest and most auspicious 1 Mukhi Rudraksha, representing Lord Shiva himself. It brings immense power, wealth, and spiritual enlightenment.',
    shortDescription: 'The rarest bead representing Lord Shiva',
    benefits: ['Brings immense power and authority', 'Helps in attaining liberation (Moksha)', 'Cures migraines and heart diseases', 'Fulfills all desires'],
    whoShouldWear: ['Political leaders', 'Top executives', 'Spiritual masters'],
    wearingRules: ['Wear in gold or silver cap', 'Chant "Om Hreem Namah"', 'Wear on Monday morning'],
    price: 51000,
    originalPrice: 65000,
    rating: 5.0,
    reviews: 42
  },
  '2-mukhi': {
    name: '2 Mukhi Rudraksha',
    description: 'The 2 Mukhi Rudraksha represents Ardhanareshwara (Shiva and Shakti). It blesses the wearer with unity, harmony, and happy relationships.',
    shortDescription: 'For unity and harmony in relationships',
    benefits: ['Improves relationships', 'Brings mental peace', 'Cures stomach ailments', 'Enhances creativity'],
    whoShouldWear: ['Couples', 'People seeking emotional balance', 'Singles looking for partners'],
    wearingRules: ['Wear in thread or silver', 'Chant "Om Namah"', 'Wear on Monday'],
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 89
  },
  '3-mukhi': {
    name: '3 Mukhi Rudraksha',
    description: 'The 3 Mukhi Rudraksha represents the God of Fire (Agni). It burns past karmas and cures digestive problems.',
    shortDescription: 'For burning past karma and health',
    benefits: ['Burns past sins', 'Cures digestive issues', 'Relieves stress and depression', 'Boosts self-confidence'],
    whoShouldWear: ['People with low self-esteem', 'Those with stomach issues', 'Students'],
    wearingRules: ['Wear in red thread', 'Chant "Om Kleem Namah"', 'Wear on Sunday or Monday'],
    price: 2500,
    originalPrice: 3200,
    rating: 4.7,
    reviews: 112
  },
  '4-mukhi': {
    name: '4 Mukhi Rudraksha',
    description: 'Representing Lord Brahma, the 4 Mukhi Rudraksha enhances knowledge, creativity, and memory power.',
    shortDescription: 'For knowledge, creativity & memory',
    benefits: ['Enhances memory and concentration', 'Improves communication skills', 'Increases creativity', 'Good for students and researchers'],
    whoShouldWear: ['Students', 'Teachers', 'Writers', 'Researchers'],
    wearingRules: ['Wear in yellow thread', 'Chant "Om Hreem Namah"', 'Wear on Monday'],
    price: 2100,
    originalPrice: 2800,
    rating: 4.6,
    reviews: 78
  },
  '5-mukhi': {
    name: '5 Mukhi Rudraksha',
    description: 'The most common and auspicious bead representing Lord Shiva (Kalagni Rudra). Brings peace, health, and mental wellbeing.',
    shortDescription: 'For peace, health and mental balance',
    benefits: ['Brings mental peace', 'Lowers blood pressure', 'Improves memory', 'General wellbeing'],
    whoShouldWear: ['Everyone', 'Those with BP issues', 'Students'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Namah"', 'Wear on Monday'],
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 234
  },
  '6-mukhi': {
    name: '6 Mukhi Rudraksha',
    description: 'Representing Lord Kartikeya, the 6 Mukhi Rudraksha bestows willpower, courage, and focus.',
    shortDescription: 'For willpower, courage & focus',
    benefits: ['Increases willpower', 'Improves focus and grounding', 'Good for emotional stability', 'Enhances physical strength'],
    whoShouldWear: ['Athletes', 'Leaders', 'People with lack of focus'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Hum Namah"', 'Wear on Monday'],
    price: 2200,
    originalPrice: 2900,
    rating: 4.7,
    reviews: 92
  },
  '7-mukhi': {
    name: '7 Mukhi Rudraksha',
    description: 'Representing Goddess Mahalakshmi, the 7 Mukhi Rudraksha attracts wealth, abundance, and prosperity.',
    shortDescription: 'For wealth, abundance & prosperity',
    benefits: ['Attracts wealth', 'Removes financial miseries', 'Brings good luck', 'Professional success'],
    whoShouldWear: ['Businessmen', 'Professionals', 'Those facing financial crunches'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hum Namah"', 'Wear on Friday'],
    price: 2800,
    originalPrice: 3500,
    rating: 4.9,
    reviews: 145
  },
  '8-mukhi': {
    name: '8 Mukhi Rudraksha',
    description: 'Representing Lord Ganesha, the 8 Mukhi Rudraksha removes obstacles and brings success in all undertakings.',
    shortDescription: 'For removing obstacles & success',
    benefits: ['Removes obstacles', 'Brings success', 'Improves wisdom', 'Enhances analytical mind'],
    whoShouldWear: ['People facing recurring obstacles', 'Writers', 'Astrologers'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hum Namah"', 'Wear on Wednesday'],
    price: 3200,
    originalPrice: 4000,
    rating: 4.7,
    reviews: 67
  },
  '9-mukhi': {
    name: '9 Mukhi Rudraksha',
    description: 'Representing Goddess Durga (Shakti), the 9 Mukhi Rudraksha provides energy, power, and fearlessness.',
    shortDescription: 'For energy, power & fearlessness',
    benefits: ['Provides energy and dynamism', 'Removes fear', 'Good for spiritual power', 'Protects from enemies'],
    whoShouldWear: ['Women', 'People lacking energy', 'Devotees of Durga'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Hum Namah"', 'Wear on Friday'],
    price: 3800,
    originalPrice: 4800,
    rating: 4.8,
    reviews: 88
  },
  '10-mukhi': {
    name: '10 Mukhi Rudraksha',
    description: 'Representing Lord Vishnu, the 10 Mukhi Rudraksha acts as a shield against negative energies and evil eye.',
    shortDescription: 'For protection & pacifying planets',
    benefits: ['Protects from negative energies', 'Pacifies subtle planets', 'Brings peace', 'Protects from black magic'],
    whoShouldWear: ['People fearful of spirits', 'Those suffering from insomnia', 'General protection'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Namah"', 'Wear on Sunday'],
    price: 4200,
    originalPrice: 5200,
    rating: 4.7,
    reviews: 54
  },
  '11-mukhi': {
    name: '11 Mukhi Rudraksha',
    description: 'Representing Lord Hanuman, the 11 Mukhi Rudraksha bestows wisdom, courage, success, and protection.',
    shortDescription: 'For wisdom, courage & meditation',
    benefits: ['Improves meditation', 'Gives courage and confidence', 'Protects from accidents', 'Enhances vocabulary'],
    whoShouldWear: ['Orators', 'Adventurous people', 'Meditators'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Hum Namah"', 'Wear on Tuesday'],
    price: 4800,
    originalPrice: 5800,
    rating: 4.9,
    reviews: 76
  },
  '12-mukhi': {
    name: '12 Mukhi Rudraksha',
    description: 'Representing the Sun God (Surya), the 12 Mukhi Rudraksha brings radiance, leadership qualities, and power.',
    shortDescription: 'For leadership, name & fame',
    benefits: ['Increases leadership qualities', 'Brings name and fame', 'Radiance and charisma', 'Health and vitality'],
    whoShouldWear: ['Politicians', 'Administrators', 'Business leaders'],
    wearingRules: ['Wear in red thread', 'Chant "Om Krom Kshraum Raum Namah"', 'Wear on Sunday'],
    price: 5500,
    originalPrice: 6800,
    rating: 4.8,
    reviews: 62
  },
  '13-mukhi': {
    name: '13 Mukhi Rudraksha',
    description: 'Representing Lord Kamadeva and Indra, the 13 Mukhi Rudraksha increases charisma, attraction, and fulfills desires.',
    shortDescription: 'For attraction, charm & desires',
    benefits: ['Increases attraction and charm', 'Fulfills worldly desires', 'Brings luxury and comfort', 'Improves marketing skills'],
    whoShouldWear: ['Marketing professionals', 'Actors', 'Artists'],
    wearingRules: ['Wear in red thread', 'Chant "Om Hreem Namah"', 'Wear on Friday'],
    price: 7500,
    originalPrice: 9000,
    rating: 5.0,
    reviews: 34
  },
  '14-mukhi': {
    name: '14 Mukhi Rudraksha',
    description: 'The Deva Mani. Representing Lord Hanuman and Shiva, it awakens the third eye and strong intuition.',
    shortDescription: 'The Deva Mani for intuition & third eye',
    benefits: ['Awakens third eye', 'Improves intuition', 'Protection from ghosts and spirits', 'Corrects Mars (Mangal) defects'],
    whoShouldWear: ['Yogis', 'Spiritual healers', 'Stock traders'],
    wearingRules: ['Wear in red thread', 'Chant "Om Namah"', 'Wear on Tuesday'],
    price: 18000,
    originalPrice: 22000,
    rating: 5.0,
    reviews: 28
  },
  'ganesh': {
    name: 'Ganesh Rudraksha',
    description: 'A Rudraksha with a natural trunk-like elevation, representing Lord Ganesha. Removes obstacles and brings success.',
    shortDescription: 'For removing obstacles & wisdom',
    benefits: ['Removes obstacles', 'Increases intelligence', 'Brings good luck', 'Success in new ventures'],
    whoShouldWear: ['Students', 'Businessmen', 'Everyone starting something new'],
    wearingRules: ['Wear in red thread', 'Chant "Om Gam Ganpataye Namah"', 'Wear on Wednesday'],
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 105
  },
  'gauri-shankar': {
    name: 'Gauri Shankar Rudraksha',
    description: 'Two naturally joined Rudrakshas representing Shiva and Parvati. Best for happy married life and family harmony.',
    shortDescription: 'For happy married life and harmony',
    benefits: ['Improves marital happiness', 'Bringing family harmony', 'Bestows fertility', 'Expands consciousness'],
    whoShouldWear: ['Married couples', 'People delaying marriage', 'Spiritual seekers'],
    wearingRules: ['Wear in silver/gold', 'Chant "Om Gauri Shankaraya Namah"', 'Wear on Monday'],
    price: 15000,
    originalPrice: 21000,
    rating: 4.9,
    reviews: 56
  }
};

const malaBase = {
  '1-mukhi-half-moon': {
    name: '1 Mukhi Rudraksha Half Moon Mala',
    description: 'Rare 1 Mukhi Rudraksha Half Moon Mala for supreme power and connection to Lord Shiva.',
    shortDescription: 'Rare 1 Mukhi Mala for supreme power',
    benefits: ['Ultimate power and authority', 'Spiritual enlightenment', 'Fulfills all desires', 'Renunciation of worldly attachments'],
    whoShouldWear: ['Spiritual leaders', 'High-ranking officials', 'Devotees of Shiva'],
    wearingRules: ['Wear on Monday', 'Chant Om Namah Shivaya', 'Keep in altar when not worn'],
    price: 25000,
    originalPrice: 31000,
    rating: 5.0,
    reviews: 15,
    authenticity: { certified: true, origin: 'Indonesia', certificate: 'Lab Certified' }
  },
  '7-mukhi': {
    name: '7 Mukhi Rudraksha Mala',
    description: '7 Mukhi Rudraksha Mala for wealth, prosperity and abundance. Blessed by Goddess Mahalakshmi.',
    shortDescription: 'For wealth and abundance',
    benefits: ['Attracts wealth', 'Brings new opportunities', 'Removes financial blockages', 'Success in business'],
    whoShouldWear: ['Business owners', 'Professionals', 'Those seeking financial growth'],
    wearingRules: ['Wear on Friday', 'Chant Om Mahalakshmi Namah'],
    price: 5500,
    originalPrice: 7000,
    rating: 4.8,
    reviews: 24,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' }
  },
  'capped': {
    name: 'Silver Capped Rudraksha Mala',
    description: 'Beautifully capped Rudraksha beads in pure silver, creating a powerful and elegant mala.',
    shortDescription: 'Silver capped mala for protection and elegance',
    benefits: ['Enhanced energy flow', 'Protection', 'Peace of mind', 'Elegant spiritual wear'],
    whoShouldWear: ['Everyone', 'Those looking for premium malas'],
    wearingRules: ['Wear daily for protection', 'Remove while sleeping'],
    price: 8500,
    originalPrice: 10500,
    rating: 4.9,
    reviews: 45,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' }
  },
  'indra': {
    name: 'Indra Mala',
    description: 'The extremely rare and powerful Indra Mala, comprising beads from 1 Mukhi to 21 Mukhi. The ultimate energetic shield.',
    shortDescription: 'The ultimate power mala (1-21 Mukhi)',
    benefits: ['Total universal power', 'Chakra balancing', 'Karmic cleansing', 'Manifestation of all desires'],
    whoShouldWear: ['High-level leaders', 'Spiritual masters', 'Influential personalities'],
    wearingRules: ['Keep in safe or altar', 'Wear during special meditation'],
    price: 150000,
    originalPrice: 200000,
    rating: 5.0,
    reviews: 8,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' }
  },
  'karungali': {
    name: 'Karungali (Ebony) Mala',
    description: 'Authentic Karungali (Ebony Wood) Mala known for attracting success and removing negative energy.',
    shortDescription: 'Ebony wood mala for success and protection',
    benefits: ['Attracts success', 'Removes negative energy', 'Enhances focus', 'Good for chanting'],
    whoShouldWear: ['Students', 'Professionals', 'Devotees'],
    wearingRules: ['Can be worn daily'],
    price: 1500,
    originalPrice: 2000,
    rating: 4.7,
    reviews: 120,
    authenticity: { certified: true, origin: 'India' }
  },
  'panchmukhi': {
    name: '5 Mukhi (Panchmukhi) Rudraksha Mala',
    description: 'Traditional 5 Mukhi Rudraksha Mala for general wellbeing, peace, and health.',
    shortDescription: 'For general health and peace',
    benefits: ['Peace of mind', 'Lowers BP', 'Good for chanting', 'Daily protection'],
    whoShouldWear: ['Everyone'],
    wearingRules: ['Wear daily', 'Use for Japa'],
    price: 1200,
    originalPrice: 1800,
    rating: 4.9,
    reviews: 350,
    authenticity: { certified: true, origin: 'Indonesia', certificate: 'Lab Certified' }
  },
  'sphatik-combo': {
    name: 'Rudraksha Sphatik Mala',
    description: 'A cooling combination of Rudraksha and Crystal (Sphatik) beads to balance energy and heat.',
    shortDescription: 'Balancing combination of Rudraksha & Crystal',
    benefits: ['Cools the body/mind', 'Balances energies', 'Improves concentration', 'Calms the nervous system'],
    whoShouldWear: ['People with anger issues', 'Students', 'Healers'],
    wearingRules: ['Wear on Monday', 'Can be worn daily'],
    price: 1800,
    originalPrice: 2500,
    rating: 4.8,
    reviews: 95,
    authenticity: { certified: true, origin: 'Nepal/India', certificate: 'Lab Certified' }
  },
  'sarva-siddha': {
    name: 'Sarva Siddha Mala',
    description: 'A powerful combination mala for achieving success in all endeavors (Sarva Siddha).',
    shortDescription: 'For success in all endeavors',
    benefits: ['Success in all fields', 'Removal of planetary doshas', 'Chakra alignment', 'Spiritual growth'],
    whoShouldWear: ['Ambitious individuals', 'Leaders', 'Spiritual practitioners'],
    wearingRules: ['Wear during day', 'Remove at night'],
    price: 45000,
    originalPrice: 55000,
    rating: 5.0,
    reviews: 12,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' }
  },
  'siddha': {
    name: 'Siddha Mala',
    description: 'A Siddha Mala comprising Rudraksha beads from 1 to 14 Mukhi, blending the energies of all major deities.',
    shortDescription: 'Powerful combination of 1-14 Mukhi',
    benefits: ['Balances all chakras', 'Pacifies all planets', 'Holistic healing', 'Spiritual ascension'],
    whoShouldWear: ['Healers', 'Astrologers', 'Leaders'],
    wearingRules: ['Wear on Monday', 'Chant Om Namah Shivaya'],
    price: 35000,
    originalPrice: 42000,
    rating: 4.9,
    reviews: 28,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' }
  },
  'amla-crystal': {
    name: 'Amla Crystal Mala',
    description: 'A sacred Amla Crystal Mala, known for its purity and cooling properties. Ideal for meditation and reducing body heat.',
    shortDescription: 'Pure crystal mala for cooling & peace',
    benefits: ['Cools the body and mind', 'Enhances clarity and focus', 'Promotes peace', 'Good for digestive health'],
    whoShouldWear: ['Students', 'People with high body heat', 'Meditators'],
    wearingRules: ['Wear on Friday', 'Can be worn daily'],
    price: 1100,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 42,
    authenticity: { certified: true, origin: 'India', certificate: 'Lab Certified' }
  },
  'tulsi': {
    name: 'Original Tulsi Mala',
    description: 'Sacred Tulsi Mala made from the wood of the Holy Basil plant. Dear to Lord Vishnu and Krishna, it purifies the mind and body.',
    shortDescription: 'Sacred Tulsi for purity & devotion',
    benefits: ['Purifies mind, body, and soul', 'Protects from negative energies', 'Increases devotion', 'Maintains ritual purity'],
    whoShouldWear: ['Devotees of Vishnu/Krishna', 'Seekers of purity', 'Everyone'],
    wearingRules: ['Wear daily', 'Do not eat non-veg while wearing'],
    price: 900,
    originalPrice: 1200,
    rating: 4.9,
    reviews: 156,
    authenticity: { certified: true, origin: 'Vrindavan', certificate: 'Temple Certified' }
  },
  'sandalwood': {
    name: 'Pure Sandalwood Mala',
    description: 'Aromatic Sandalwood Mala (Chandan) known for its cooling properties and fragrance. Used for mediation and worship of Devi and Shiva.',
    shortDescription: 'Fragrant Sandalwood for peace & meditation',
    benefits: ['Cooling effect on mind', 'Enhances meditation', 'Fragrance relieves stress', 'Attracts positive energy'],
    whoShouldWear: ['Meditators', 'Healers', 'Everyone'],
    wearingRules: ['Wear daily', 'Keep away from water to preserve fragrance'],
    price: 1500,
    originalPrice: 2000,
    rating: 4.8,
    reviews: 65,
    authenticity: { certified: true, origin: 'Mysore', certificate: 'Lab Certified' }
  }
};

// Helper to create product variants based on available images
const createVariants = (baseKey, imagePaths) => {
  return imagePaths.map((img, index) => {
    const base = rudrakshaBase[baseKey];
    return {
      id: `rud-${baseKey}-${index + 1}`,
      name: `${base.name}${imagePaths.length > 1 ? ` - Variant ${index + 1}` : ''}`,
      slug: `${baseKey}-rudraksha${index > 0 ? `-${index + 1}` : ''}`,
      category: 'Rudraksha',
      categorySlug: 'rudraksha',
      subCategorySlug: baseKey,
      price: base.price,
      originalPrice: base.originalPrice,
      // Use current image as primary, rotate others for gallery
      images: [img, ...imagePaths.filter(i => i !== img)],
      rating: base.rating,
      reviews: base.reviews,
      description: base.description,
      shortDescription: base.shortDescription,
      benefits: base.benefits,
      whoShouldWear: base.whoShouldWear,
      wearingRules: base.wearingRules,
      inStock: true,
      authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' },
      isBestseller: index === 0, // Make first variant bestseller
    };
  });
};

const createMalaVariants = (baseKey, imagePaths) => {
  return imagePaths.map((img, index) => {
    const base = malaBase[baseKey];
    return {
      id: `mala-${baseKey}-${index + 1}`,
      name: `${base.name}${imagePaths.length > 1 ? ` - Design ${index + 1}` : ''}`,
      slug: `${baseKey}-mala${index > 0 ? `-${index + 1}` : ''}`,
      slug: `${baseKey}-mala${index > 0 ? `-${index + 1}` : ''}`,
      category: 'Malas',
      categorySlug: 'malas',
      subCategorySlug: baseKey === 'amla-crystal' ? 'crystal' : (baseKey === 'tulsi' ? 'tulsi' : (baseKey === 'sandalwood' ? 'sandalwood' : 'rudraksha')),
      price: base.price,
      originalPrice: base.originalPrice,
      // Primary image is current one. Add others for variety if needed, or keep single.
      // User request "display 27 products cards" implies each is unique.
      // Let's include other images in gallery so user can still see variety, but starting with THIS image.
      images: [img, ...imagePaths.filter(i => i !== img)],
      rating: base.rating,
      reviews: base.reviews,
      description: base.description,
      shortDescription: base.shortDescription,
      benefits: base.benefits,
      whoShouldWear: base.whoShouldWear,
      wearingRules: base.wearingRules,
      inStock: true,
      authenticity: base.authenticity,
      isBestseller: index === 0,
    };
  });
};

const rudrakshaProducts = [
  ...createVariants('0-mukhi', [
    '/images/products/0 mukhi rudraksha.png',
    '/images/products/0 mukhi rudraksha1.png',
    '/images/products/0 mukhi rudraksha2.png'
  ]),
  ...createVariants('1-mukhi', [
    '/images/products/1 mukhi rudraksha.png',
    '/images/products/1 mukhi rudraksha1.png',
    '/images/products/1 mukhi rudraksha2.png',
    '/images/products/1 mukhi rudraksha3.png'
  ]),
  ...createVariants('2-mukhi', [
    '/images/products/2 mukhi rudraksha.png',
    '/images/products/2 mukhi rudraksha1.png',
    '/images/products/2 mukhi rudraksha2.png',
    '/images/products/2 mukhi rudraksha3.png'
  ]),
  ...createVariants('3-mukhi', [
    '/images/products/3 mukhi rudraksha.png',
    '/images/products/3 mukhi rudraksha1.png',
    '/images/products/3 mukhi rudraksha2.png',
    '/images/products/3 mukhi rudraksha3.png'
  ]),
  ...createVariants('4-mukhi', [
    '/images/products/4 mukhi rudraksha.png',
    '/images/products/4 mukhi rudraksha1.png',
    '/images/products/4 mukhi rudraksha2.png'
  ]),
  ...createVariants('5-mukhi', [
    '/images/products/5 mukhi rudraksha.png',
    '/images/products/5 mukhi rudraksha1.png',
    '/images/products/5 mukhi rudraksha2.png',
    '/images/products/5 mukhi rudraksha3.png'
  ]),
  ...createVariants('6-mukhi', [
    '/images/products/6 mukhi rudraksha.png',
    '/images/products/6 mukhi rudraksha1.png',
    '/images/products/6 mukhi rudraksha2.png'
  ]),
  ...createVariants('7-mukhi', [
    '/images/products/7 mukhi rudraksha.png',
    '/images/products/7 mukhi rudraksha1.png',
    '/images/products/7 mukhi rudraksha2.png'
  ]),
  ...createVariants('8-mukhi', [
    '/images/products/8 mukhi rudraksha.png',
    '/images/products/8 mukhi rudraksha1.png',
    '/images/products/8 mukhi rudraksha2.png',
    '/images/products/8 mukhi rudraksha3.png'
  ]),
  ...createVariants('9-mukhi', [
    '/images/products/9 mukhi rudraksha.png',
    '/images/products/9 mukhi rudraksha1.png',
    '/images/products/9 mukhi rudraksha2.png',
    '/images/products/9 mukhi rudraksha3.png'
  ]),
  ...createVariants('10-mukhi', [
    '/images/products/10 mukhi rudraksha.png',
    '/images/products/10 mukhi rudraksha1.png',
    '/images/products/10 mukhi rudraksha2.png',
    '/images/products/10 mukhi rudraksha3.png'
  ]),
  ...createVariants('11-mukhi', [
    '/images/products/11 mukhi rudraksha.png',
    '/images/products/11 mukhi rudraksha1.png',
    '/images/products/11 mukhi rudraksha2.png',
    '/images/products/11 mukhi rudraksha3.png',
    '/images/products/11 mukhi rudraksha4.png'
  ]),
  ...createVariants('12-mukhi', [
    '/images/products/12 mukhi rudraksha.png',
    '/images/products/12 mukhi rudraksha1.png',
    '/images/products/12 mukhi rudraksha2.png',
    '/images/products/12 mukhi rudraksha3.png'
  ]),
  ...createVariants('13-mukhi', [
    '/images/products/13 mukhi rudraksha.png',
    '/images/products/13 mukhi rudraksha1.png',
    '/images/products/13 mukhi rudraksha2.png',
    '/images/products/13 mukhi rudraksha3.png'
  ]),
  ...createVariants('14-mukhi', [
    '/images/products/14 mukhi rudraksha.png',
    '/images/products/14 mukhi rudraksha1.png',
    '/images/products/14 mukhi rudraksha2.png',
    '/images/products/14 mukhi rudraksha3.png',
    '/images/products/14 mukhi rudraksha4.png'
  ]),
  ...createVariants('ganesh', [
    '/images/products/ganeshRudraksha.png',
    '/images/products/ganeshRudraksha1.png'
  ]),
  ...createVariants('gauri-shankar', [
    '/images/products/GauriShankar.png',
    '/images/products/GauriShankar1.png',
    '/images/products/GauriShankar2.png',
    '/images/products/GauriShankar3.png'
  ]),
];

const malaProducts = [
  ...createMalaVariants('1-mukhi-half-moon', [
    '/images/products/1 mukhi rudraksha half moon.png',
    '/images/products/1 mukhi rudraksha half moon2.png',
    '/images/products/1 mukhi rudraksha half moon3.png',
    '/images/products/1 mukhi rudraksha half moon4.png'
  ]),
  ...createMalaVariants('7-mukhi', [
    '/images/products/7 mukhi mala.png',
    '/images/products/7 mukhi mala1.png',
    '/images/products/7 mukhi mala2.png',
    '/images/products/7 mukhi mala3.png'
  ]),
  ...createMalaVariants('capped', [
    '/images/products/Capped Malas.png',
    '/images/products/Capped Malas1.png',
    '/images/products/Capped Malas2.png'
  ]),
  ...createMalaVariants('indra', [
    '/images/products/IndraMala.png',
    '/images/products/IndraMala1.png',
    '/images/products/IndraMala2.png'
  ]),
  ...createMalaVariants('karungali', [
    '/images/products/Karungali Mala.png',
    '/images/products/Karungali Mala1.png'
  ]),
  ...createMalaVariants('panchmukhi', [
    '/images/products/panchmukhi mala.png',
    '/images/products/panchmukhi mala1.png',
    '/images/products/panchmukhi mala2.png'
  ]),
  ...createMalaVariants('sphatik-combo', [
    '/images/products/Rudraksha-Sphatik Mala.png',
    '/images/products/Rudraksha-Sphatik Mala1.png',
    '/images/products/Rudraksha-Sphatik Mala2.png'
  ]),
  ...createMalaVariants('sarva-siddha', [
    '/images/products/sarva siddha mala.png'
  ]),
  ...createMalaVariants('siddha', [
    '/images/products/siddha mala.png',
    '/images/products/siddha mala1.png',
    '/images/products/siddha mala2.png',
    '/images/products/siddha mala4.png'
  ]),
  ...createMalaVariants('amla-crystal', [
    '/images/products/1.png',
    '/images/products/2.png',
    '/images/products/3.png',
    '/images/products/4.png'
  ]),
  ...createMalaVariants('tulsi', [
    '/images/products/tulsi1.png',
    '/images/products/tulsi2.png',
    '/images/products/tulsi3.png'
  ]),
  ...createMalaVariants('sandalwood', [
    '/images/products/sandalwood1.png',
    '/images/products/sandalwood2.png',
    '/images/products/sandalwood3.png'
  ]),
];

export const products = [
  ...rudrakshaProducts,
  ...malaProducts,
  {
    id: '2',
    name: 'Rudraksha Bracelet with Gold Accents',
    slug: 'rudraksha-bracelet-gold',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    subCategorySlug: 'gold-accent',
    price: 2499,
    originalPrice: 3499,
    images: [rudrakshaBracelet, rudrakshaBracelet, rudrakshaBracelet],
    rating: 4.9,
    reviews: 189,
    description: 'Exquisite Rudraksha bracelet featuring authentic 5 Mukhi beads with premium gold-plated accents.',
    shortDescription: 'Premium Rudraksha bracelet with gold accents',
    benefits: ['Continuous spiritual protection', 'Enhances positive energy', 'Stylish spiritual accessory', 'Promotes emotional balance'],
    whoShouldWear: ['Working professionals', 'Fashion-conscious spiritual seekers', 'Those seeking daily protection'],
    wearingRules: ['Wear on right hand for men, left for women', 'Energize with sandalwood paste monthly', 'Remove during impure activities'],
    variants: [
      { name: 'Size', options: ['Small', 'Medium', 'Large'] },
      { name: 'Metal', options: ['Gold Plated', 'Silver', 'Copper'] },
    ],
    inStock: true,
    isNew: true,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' },
  },
  {
    id: '3',
    name: '108 Bead Rudraksha Mala',
    slug: '108-bead-rudraksha-mala',
    category: 'Rudraksha',
    categorySlug: 'rudraksha',
    subCategorySlug: 'mala',
    price: 3999,
    originalPrice: 4999,
    images: [rudrakshaMala, rudrakshaMala, rudrakshaMala],
    rating: 4.7,
    reviews: 156,
    description: 'Traditional 108 bead Rudraksha mala perfect for japa meditation.',
    shortDescription: 'Traditional 108 bead mala for meditation',
    benefits: ['Perfect for japa meditation', 'Deepens spiritual practice', 'Enhances mantra chanting', 'Brings peace during meditation'],
    whoShouldWear: ['Meditation practitioners', 'Yoga enthusiasts', 'Spiritual devotees'],
    wearingRules: ['Use right hand for chanting', 'Do not cross the guru bead', 'Store in silk pouch when not in use'],
    inStock: true,
    isBestseller: true,
    authenticity: { certified: true, origin: 'Nepal', certificate: 'Lab Certified' },
  },
  {
    id: '4',
    name: 'Sri Yantra Gold Pendant',
    slug: 'sri-yantra-gold-pendant',
    category: 'Yantra',
    categorySlug: 'yantra',
    price: 5999,
    originalPrice: 7999,
    images: [yantraPendant, yantraPendant, yantraPendant],
    rating: 4.9,
    reviews: 98,
    description: 'Sacred Sri Yantra pendant in pure gold plating for wealth and spiritual growth.',
    shortDescription: 'Sacred Sri Yantra for wealth & spiritual growth',
    benefits: ['Attracts abundance and prosperity', 'Enhances spiritual awareness', 'Provides divine protection', 'Balances cosmic energies'],
    whoShouldWear: ['Business owners and entrepreneurs', 'Those seeking wealth and prosperity', 'Spiritual practitioners'],
    wearingRules: ['Wear close to heart on gold chain', 'Energize on Fridays', 'Chant Sri Suktam for activation'],
    variants: [{ name: 'Metal', options: ['Gold Plated', 'Pure Silver', 'Copper'] }],
    inStock: true,
    authenticity: { certified: true, origin: 'India', certificate: 'Temple Energized' },
  },
  {
    id: '5',
    name: 'Amethyst Crystal Sphere',
    slug: 'amethyst-crystal-sphere',
    category: 'Crystals',
    categorySlug: 'crystals',
    price: 2999,
    originalPrice: 3999,
    images: [crystalAmethyst, crystalAmethyst, crystalAmethyst],
    rating: 4.6,
    reviews: 87,
    description: 'Natural Amethyst crystal sphere, perfect for meditation and healing.',
    shortDescription: 'Natural healing Amethyst for calm & protection',
    benefits: ['Promotes calmness and peace', 'Enhances intuition', 'Protects from negative energy', 'Aids in meditation'],
    whoShouldWear: ['Those with anxiety or stress', 'Spiritual healers', 'Meditation practitioners'],
    wearingRules: ['Place in meditation space', 'Cleanse under moonlight monthly', 'Program with your intentions'],
    variants: [{ name: 'Size', options: ['Small (40mm)', 'Medium (60mm)', 'Large (80mm)'] }],
    inStock: true,
    isNew: true,
    authenticity: { certified: true, origin: 'Brazil', certificate: 'Gem Lab Certified' },
  },
  {
    id: '6',
    name: 'Clear Quartz Crystal Point',
    slug: 'clear-quartz-crystal-point',
    category: 'Crystals',
    categorySlug: 'crystals',
    price: 1999,
    images: [crystalQuartz, crystalQuartz, crystalQuartz],
    rating: 4.5,
    reviews: 124,
    description: 'Natural Clear Quartz crystal point, known as the "Master Healer."',
    shortDescription: 'Master Healer crystal for energy amplification',
    benefits: ['Amplifies energy and intentions', 'Clears mental fog', 'Enhances other crystals', 'Promotes clarity and focus'],
    whoShouldWear: ['Energy healers', 'Those seeking clarity', 'Crystal beginners'],
    wearingRules: ['Point away from body for release', 'Point toward body for receiving', 'Cleanse regularly in salt water'],
    inStock: true,
    authenticity: { certified: true, origin: 'Brazil', certificate: 'Gem Lab Certified' },
  },
  {
    id: '7',
    name: 'Tiger Eye Bracelet',
    slug: 'tiger-eye-bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    price: 1299,
    originalPrice: 1799,
    images: [braceletTigerEye, braceletTigerEye, braceletTigerEye],
    rating: 4.7,
    reviews: 203,
    description: 'Beautiful Tiger Eye stone bracelet with protective and grounding properties.',
    shortDescription: 'Protective Tiger Eye for courage & confidence',
    benefits: ['Boosts confidence and courage', 'Provides protection during travel', 'Attracts good luck', 'Balances emotions'],
    whoShouldWear: ['Business professionals', 'Those lacking confidence', 'Travelers'],
    wearingRules: ['Wear on right hand', 'Best worn on Sunday', 'Cleanse in sunlight monthly'],
    variants: [{ name: 'Size', options: ['6mm beads', '8mm beads', '10mm beads'] }],
    inStock: true,
    isBestseller: true,
    authenticity: { certified: true, origin: 'South Africa', certificate: 'Gem Lab Certified' },
  },
  {
    id: '8',
    name: 'Copper Sri Yantra Plate',
    slug: 'copper-sri-yantra-plate',
    category: 'Yantra',
    categorySlug: 'yantra',
    price: 1499,
    images: [yantraPlate, yantraPlate, yantraPlate],
    rating: 4.8,
    reviews: 67,
    description: 'Traditional copper Sri Yantra plate, energized and ready for worship.',
    shortDescription: 'Traditional copper yantra for abundance',
    benefits: ['Attracts wealth and prosperity', 'Removes obstacles', 'Creates positive environment', 'Enhances spiritual practices'],
    whoShouldWear: ['Business owners', 'Home owners', 'Those seeking prosperity'],
    wearingRules: ['Place facing East or North', 'Offer flowers and incense daily', 'Clean with lemon and salt weekly'],
    variants: [{ name: 'Size', options: ['3 inch', '4 inch', '6 inch'] }],
    inStock: true,
    authenticity: { certified: true, origin: 'India', certificate: 'Temple Energized' },
  },
];

export const categories = [
  { id: '1', name: 'Rudraksha', slug: 'rudraksha', description: 'Sacred beads blessed by Lord Shiva', productCount: 45 },
  { id: '2', name: 'Yantra', slug: 'yantra', description: 'Sacred geometric symbols for prosperity', productCount: 28 },
  { id: '3', name: 'Bracelets', slug: 'bracelets', description: 'Spiritual wearables for daily protection', productCount: 36 },
  { id: '4', name: 'Crystals', slug: 'crystals', description: 'Healing stones for energy balance', productCount: 52 },
  { id: '5', name: 'Malas', slug: 'malas', description: 'Sacred prayer beads for meditation and chanting', productCount: 27 },
];

export const getProductById = (id) => products.find((p) => p.id === id);
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => p.categorySlug === categorySlug);
export const getBestsellers = () => products.filter((p) => p.isBestseller);
export const getNewArrivals = () => products.filter((p) => p.isNew);
