import type {
  HomePageContent,
  AboutPageContent,
  Category,
  LookItem,
  EventItem,
  EventPageContent,
  OutletStats,
  NavLink,
  FeatureItem,
  FAQPageContent,
  ContactPageContent,
} from './types';

/**
 * Content Provider — abstraction layer over content sources.
 *
 * Currently reads from static data. To integrate a CMS:
 * 1. Replace the static returns with API calls
 * 2. No UI changes required — all components consume these types
 */

export function getNavigationLinks(): NavLink[] {
  return [
    { labelKey: 'nav.allProducts', href: '/' },
    { labelKey: 'nav.fashion', href: '/fashion' },
    { labelKey: 'nav.beauty', href: '/beauty' },
    { labelKey: 'nav.accessories', href: '/accessories' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.outlets', href: '/outlets' },
    { labelKey: 'nav.promo', href: '/promo' },
  ];
}

export function getCategories(): Category[] {
  return [
    {
      id: 'modest-wear',
      slug: 'modest-wear',
      nameKey: 'productCategories.modest',
      image: '/images/categories/modest-wear.webp',
      link: '/fashion/products?category=modest',
    },
    {
      id: 'hijab-collection',
      slug: 'hijab-collection',
      nameKey: 'productCategories.hijab',
      image: '/images/categories/hijab.webp',
      link: '/fashion/products?category=hijab',
    },
    {
      id: 'underwear',
      slug: 'underwear',
      nameKey: 'productCategories.underwear',
      image: '/images/categories/underwear.webp',
      link: '/fashion/products?category=underwear',
    },
    {
      id: 'bags-accessories',
      slug: 'bags-accessories',
      nameKey: 'productCategories.bags',
      image: '/images/categories/bags-accessories.webp',
      link: '/fashion/products?category=bags',
    },
    {
      id: 'footwear',
      slug: 'footwear',
      nameKey: 'productCategories.footwear',
      image: '/images/categories/footwear.webp',
      link: '/fashion/products?category=footwear',
    },
    {
      id: 'kids-lifestyle',
      slug: 'kids-lifestyle',
      nameKey: 'productCategories.kids',
      image: '/images/categories/kids-lifestyle.webp',
      link: '/fashion/products?category=kids',
    },
  ];
}

export function getBeautyCategories(): Category[] {
  return [
    {
      id: 'skincare',
      slug: 'skincare',
      nameKey: 'productCategories.skincare',
      image: '/images/categories/beauty/Skincare.webp',
      link: '/beauty/products?category=skincare',
    },
    {
      id: 'cosmetics',
      slug: 'cosmetics',
      nameKey: 'productCategories.cosmetics',
      image: '/images/categories/beauty/Cosmetics.webp',
      link: '/beauty/products?category=cosmetics',
    },
    {
      id: 'haircare',
      slug: 'haircare',
      nameKey: 'productCategories.haircare',
      image: '/images/categories/beauty/Haircare.webp',
      link: '/beauty/products?category=haircare',
    },
    {
      id: 'bodycare',
      slug: 'bodycare',
      nameKey: 'categories.bodycare',
      image: '/images/categories/beauty/Bodycare.webp',
      link: '/beauty/products?category=bodycare',
    },
  ];
}

export function getLooks(): LookItem[] {
  return [
    {
      id: 'look-1',
      title: 'TIMELESS ELEGANCE',
      mainImage: '/images/looks/steal-1.webp',
      products: [
        { id: 'p1', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=200&auto=format&fit=crop', name: 'White Blouse' },
        { id: 'p2', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=200&auto=format&fit=crop', name: 'Denim Pants' },
      ],
    },
    {
      id: 'look-2',
      title: 'MODEST CHIC',
      mainImage: '/images/looks/steal-2.webp',
      products: [
        { id: 'p3', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200&auto=format&fit=crop', name: 'Hijab Scarf' },
        { id: 'p4', image: 'https://images.unsplash.com/photo-1604176354204-926873ff3da9?q=80&w=200&auto=format&fit=crop', name: 'Tunic Top' },
      ],
    },
    {
      id: 'look-3',
      title: 'MODERN MODEST',
      mainImage: '/images/looks/steal-3.webp',
      products: [
        { id: 'p5', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=200&auto=format&fit=crop', name: 'Summer Dress' },
        { id: 'p6', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop', name: 'Tan Heels' },
      ],
    },
  ];
}

export function getEvents(): EventItem[] {
  return [
    {
      id: 'event-1',
      title: 'SOLO GRAND EXHIBITION',
      location: 'Solo, Central Java',
      description: 'Experience the intersection of traditional heritage and modern fashion in our exclusive Solo showcase.',
      image: '/images/events/event-solo.webp',
      ctaText: 'READ MORE',
      ctaLink: '/events/solo-exhibition',
      date: '2026-06-15',
      category: 'exhibition',
      featured: true,
    },
    {
      id: 'event-2',
      title: 'GRESIK STORE OPENING',
      location: 'Gresik, East Java',
      description: 'Celebrating a new chapter of luxury in Gresik with special discounts and exclusive collections.',
      image: '/images/events/event-gresik.webp',
      ctaText: 'READ MORE',
      ctaLink: '/events/gresik-opening',
      date: '2026-05-20',
      category: 'opening',
    },
    {
      id: 'event-3',
      title: 'SUMMER VOGUE COLLECTION',
      location: 'Clarissa Online',
      description: 'Discover the airy silhouettes and ethereal fabrics of our latest Summer 2026 collection.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/summer-vogue',
      date: '2026-07-01',
      category: 'collection',
    },
    {
      id: 'event-4',
      title: 'THE ART OF MODESTY',
      location: 'Editorial',
      description: 'An in-depth look at the philosophy behind our minimalist modest wear designs.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/art-of-modesty',
      date: '2026-04-10',
      category: 'editorial',
    },
    {
      id: 'event-5',
      title: 'KEDIRI FASHION WEEK',
      location: 'Kediri, East Java',
      description: 'A week-long celebration of modest fashion featuring local designers and exclusive runway shows.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/kediri-fashion-week',
      date: '2026-08-12',
      category: 'exhibition',
    },
    {
      id: 'event-6',
      title: 'MALANG FLAGSHIP LAUNCH',
      location: 'Malang, East Java',
      description: 'Grand opening of our largest flagship store in Malang with exclusive launch-day promotions.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/malang-flagship',
      date: '2026-09-05',
      category: 'opening',
    },
    {
      id: 'event-7',
      title: 'AUTUMN HERITAGE COLLECTION',
      location: 'Clarissa Online',
      description: 'Rich textures and warm tones define our Autumn 2026 collection, inspired by Indonesian heritage.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/autumn-heritage',
      date: '2026-09-20',
      category: 'collection',
    },
    {
      id: 'event-8',
      title: 'MODEST FASHION SUMMIT',
      location: 'Surabaya, East Java',
      description: 'Industry leaders and fashion pioneers gather to discuss the future of modest fashion in Southeast Asia.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/modest-summit',
      date: '2026-10-15',
      category: 'exhibition',
    },
    {
      id: 'event-9',
      title: 'TUBAN BEAUTY FEST',
      location: 'Tuban, East Java',
      description: 'A special beauty and skincare festival showcasing Clarissa\'s premium beauty collection and expert consultations.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/tuban-beauty-fest',
      date: '2026-11-01',
      category: 'exhibition',
    },
    {
      id: 'event-10',
      title: 'LAMONGAN STORE OPENING',
      location: 'Lamongan, East Java',
      description: 'Join us for the grand opening of our newest outlet in Lamongan with special launch promotions and exclusive deals.',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/lamongan-opening',
      date: '2026-11-10',
      category: 'opening',
    },
    {
      id: 'event-11',
      title: 'WINTER ELEGANCE COLLECTION',
      location: 'Clarissa Online',
      description: 'Luxurious fabrics and sophisticated silhouettes define our exclusive Winter 2026 collection launch.',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/winter-elegance',
      date: '2026-12-01',
      category: 'collection',
    },
    {
      id: 'event-12',
      title: 'HIJAB STYLING WORKSHOP',
      location: 'Jombang, East Java',
      description: 'Learn creative hijab styling techniques from professional stylists in this hands-on workshop event.',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/hijab-workshop',
      date: '2026-12-15',
      category: 'editorial',
    },
    {
      id: 'event-13',
      title: 'PROBOLINGGO FASHION NIGHT',
      location: 'Probolinggo, East Java',
      description: 'An evening of glamour and fashion featuring exclusive runway presentations and VIP shopping experience.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/probolinggo-fashion-night',
      date: '2027-01-10',
      category: 'exhibition',
    },
    {
      id: 'event-14',
      title: 'PASURUAN STORE OPENING',
      location: 'Pasuruan, East Java',
      description: 'Celebrate the opening of our Pasuruan flagship with exclusive first-day deals and member-only collections.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/pasuruan-opening',
      date: '2027-01-25',
      category: 'opening',
    },
    {
      id: 'event-15',
      title: 'SPRING BLOSSOM COLLECTION',
      location: 'Clarissa Online',
      description: 'Fresh pastels and floral motifs bring the essence of spring to our newest ready-to-wear collection.',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/spring-blossom',
      date: '2027-02-14',
      category: 'collection',
    },
    {
      id: 'event-16',
      title: 'MODEST WEAR EDITORIAL',
      location: 'Editorial',
      description: 'Behind the scenes of our latest editorial shoot exploring the art of modern modest fashion photography.',
      image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/events/modest-editorial',
      date: '2027-03-01',
      category: 'editorial',
    },
  ];
}

export function getOutletStats(): OutletStats {
  return {
    outletCount: 11,
    cityCount: 11,
    provinceCount: 1,
    stores: [
      { id: 'st-1', name: 'Clarissa Gresik', address: 'Jl. Tj. Hulu II No.58, Kab Gresik', city: 'Gresik', lat: -7.1558, lng: 112.6555 },
      { id: 'st-2', name: 'Clarissa Lamongan', address: 'Jl. Lamongrejo No.65, Kab Lamongan', city: 'Lamongan', lat: -7.1187, lng: 112.4158 },
      { id: 'st-3', name: 'Clarissa Mojokerto', address: 'Jl. Empunala No.151, Kota Mojokerto', city: 'Mojokerto', lat: -7.4721, lng: 112.4419 },
      { id: 'st-4', name: 'Clarissa Jombang', address: 'Jl. KH. Hasyim Asy\'ari No.56, Jombang', city: 'Jombang', lat: -7.5492, lng: 112.2338 },
      { id: 'st-5', name: 'Clarissa Tuban', address: 'Jl. Sunan Kalijogo No.54, Tuban', city: 'Tuban', lat: -6.9015, lng: 112.0649 },
      { id: 'st-6', name: 'Clarissa Kediri', address: 'Jl. HOS. Cokroaminoto No.171, Kediri', city: 'Kediri', lat: -7.8184, lng: 112.0118 },
      { id: 'st-7', name: 'Clarissa Tulungagung', address: 'Jl. KHR Abdul Fattah No.37, Tulungagung', city: 'Tulungagung', lat: -8.0617, lng: 111.9056 },
      { id: 'st-8', name: 'Clarissa Malang', address: 'Jl. Simpang Ijen No.5, Kota Malang', city: 'Malang', lat: -7.9786, lng: 112.6214 },
      { id: 'st-9', name: 'Clarissa Probolinggo', address: 'Jl. Dr.Sutomo No.153, Probolinggo', city: 'Probolinggo', lat: -7.7479, lng: 113.2155 },
      { id: 'st-10', name: 'Clarissa Madiun', address: 'Jl. Cokroaminoto No.88, Madiun', city: 'Madiun', lat: -7.6338, lng: 111.5303 },
      { id: 'st-11', name: 'Clarissa Pasuruan', address: 'Jl. Dokter Wahidin Sudiro Husodo No.176, Pasuruan', city: 'Pasuruan', lat: -7.6444, lng: 112.9037 },
    ],
  };
}

export function getFeatures(): FeatureItem[] {
  return [
    { id: 'feat-1', nameKey: 'features.return' },
    { id: 'feat-2', nameKey: 'features.payment' },
    { id: 'feat-3', nameKey: 'features.member' },
    { id: 'feat-4', nameKey: 'features.voucher' },
  ];
}

export function getHomeContent(): HomePageContent {
  return {
    hero: [
      '/images/hero/hero-1.webp',
      '/images/hero/hero-2.webp',
      '/images/hero/hero-3.webp',
    ],
    categories: getCategories(),
    looks: getLooks(),
    events: getEvents(),
    outletStats: getOutletStats(),
    features: getFeatures(),
  };
}

export function getBeautyContent(): HomePageContent {
  return {
    hero: [
      '/images/hero/beauty/hero-1.webp',
      '/images/hero/beauty/hero-2.webp',
      '/images/hero/beauty/hero-3.webp',
    ],
    categories: getBeautyCategories(),
    looks: [],
    events: getEvents(),
    outletStats: getOutletStats(),
    features: getFeatures(),
  };
}

export function getAboutContent(): AboutPageContent {
  return {
    heroImage: '/images/about/hero.webp',
    storyImage: '/images/stores/kediri.webp',
    visionImage: '/images/about/vision.webp',
    stats: [
      { id: 'stat-1', value: 12, suffix: '+', labelKey: 'about.stats.outlets' },
      { id: 'stat-2', value: 8, suffix: '+', labelKey: 'about.stats.cities' },
      { id: 'stat-3', value: 10, suffix: '+', labelKey: 'about.stats.years' },
      { id: 'stat-4', value: 50, suffix: 'K+', labelKey: 'about.stats.customers' },
    ],
    values: [
      { id: 'val-1', icon: 'sparkle', titleKey: 'about.values.uptodate.title', descriptionKey: 'about.values.uptodate.description' },
      { id: 'val-2', icon: 'star', titleKey: 'about.values.allinone.title', descriptionKey: 'about.values.allinone.description' },
      { id: 'val-3', icon: 'heart', titleKey: 'about.values.affordable.title', descriptionKey: 'about.values.affordable.description' },
      { id: 'val-4', icon: 'shield', titleKey: 'about.values.premiumquality.title', descriptionKey: 'about.values.premiumquality.description' },
    ],
    storeShowcases: [
      { id: 'store-1', name: 'Clarissa Gresik', city: 'Gresik', image: '/images/stores/gresik.webp', address: 'Jl. Tj. Hulu II No.58, Ponganganrejo, Yosowilangun, Kec Manyar, Kab Gresik, Jawa Timur.', mapLink: 'https://share.google/NE6u3pgrJYIXQtSJC', whatsapp: '+6281234567890' },
      { id: 'store-2', name: 'Clarissa Lamongan', city: 'Lamongan', image: '/images/stores/lamongan.webp', address: 'Jl. Lamongrejo No.65, Krajan, Jetis, Kabupaten Lamongan, Jawa Timur', mapLink: 'https://share.google/AI6I875LNNOfIUvGl', whatsapp: '+6281234567890' },
      { id: 'store-3', name: 'Clarissa Mojokerto', city: 'Mojokerto', image: '/images/stores/mojokerto.webp', address: 'Jl. Empunala No.151, Mergelo, Balongsari, Kec. Magersari, Kota Mojokerto, Jawa Timur', mapLink: 'https://share.google/EsEBIXrpVfq540MQB', whatsapp: '+6281234567890' },
      { id: 'store-4', name: 'Clarissa Jombang', city: 'Jombang', image: '/images/stores/jombang.webp', address: 'Jl. KH. Hasyim Asy\'ari No.56, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur', mapLink: 'https://share.google/GvN18cMBQj0g78Vi7', whatsapp: '+6281234567890' },
      { id: 'store-5', name: 'Clarissa Tuban', city: 'Tuban', image: '/images/stores/tuban.webp', address: 'Jl. Sunan Kalijogo No.54, Latsari, Kabupaten Tuban, Jawa Timur', mapLink: 'https://share.google/IOhiZcVgfT9Wfq46F', whatsapp: '+6281234567890' },
      { id: 'store-6', name: 'Clarissa Kediri', city: 'Kediri', image: '/images/stores/kediri.webp', address: 'Jl. HOS. Cokroaminoto No.171, Banjaran,Kabupaten Kediri, Jawa Timur', mapLink: 'https://share.google/eaMfFf6pICQneYedT', whatsapp: '+6281234567890' },
      { id: 'store-7', name: 'Clarissa Tuluangagung', city: 'Tulungagung', image: '/images/stores/tulungagung.webp', address: 'Jl. KHR Abdul Fattah No.37, Botoran, Kec. Tulungagung, Kabupaten Tulungagung, Jawa Timur', mapLink: 'https://share.google/nBNqwM8XmyYPIFSuM', whatsapp: '+6281234567890' },
      { id: 'store-8', name: 'Clarissa Malang', city: 'Malang', image: '/images/stores/malang.webp', address: 'Jl. Simpang Ijen No.5, Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur', mapLink: 'https://share.google/JjzH5WS4jRJntbDGw', whatsapp: '+6281234567890' },
      { id: 'store-9', name: 'Clarissa Probolinggo', city: 'Probolinggo', image: '/images/stores/probolinggo.webp', address: 'Jl. Dr.Sutomo No.153, Mangunharjo, Kec. Mayangan, Kota Probolinggo, Jawa Timur', mapLink: 'https://share.google/9u40dve8PFbIG7LtN', whatsapp: '+6281234567890' },
      { id: 'store-10', name: 'Clarissa Madiun', city: 'Madiun', image: '/images/stores/madiun.webp', address: 'Jl. Cokroaminoto No.88, Kejuron, Kec. Taman, Kota Madiun, Jawa Timur', mapLink: 'https://share.google/O1PaxAP7fPAJXAqNx', whatsapp: '+6281234567890' },
      { id: 'store-11', name: 'Clarissa Pasuruan', city: 'Pasuruan', image: '/images/stores/pasuruan.webp', address: 'Jl. Dokter Wahidin Sudiro Husodo No.176,RT.1/RW.4, Purutrejo, Kec. Purworejo, Kota Pasuruan, Jawa Timur', whatsapp: '+6281234567890' },
    ],
  };
}

/**
 * Returns content for the FAQ page.
 * Dashboard-ready: Swappable with a fetch() call to a CMS.
 */
export function getFAQContent(): FAQPageContent {
  return {
    heroTitleKey: 'faq.heroTitle',
    heroSubtitleKey: 'faq.heroSubtitle',
    categories: [
      {
        id: 'cat-orders',
        titleKey: 'faq.categories.orders.title',
        items: [
          {
            id: 'q-1-1',
            questionKey: 'faq.categories.orders.q1.question',
            answerKey: 'faq.categories.orders.q1.answer',
          },
          {
            id: 'q-1-2',
            questionKey: 'faq.categories.orders.q2.question',
            answerKey: 'faq.categories.orders.q2.answer',
          },
        ],
      },
      {
        id: 'cat-shipping',
        titleKey: 'faq.categories.shipping.title',
        items: [
          {
            id: 'q-2-1',
            questionKey: 'faq.categories.shipping.q1.question',
            answerKey: 'faq.categories.shipping.q1.answer',
          },
          {
            id: 'q-2-2',
            questionKey: 'faq.categories.shipping.q2.question',
            answerKey: 'faq.categories.shipping.q2.answer',
          },
        ],
      },
      {
        id: 'cat-returns',
        titleKey: 'faq.categories.returns.title',
        items: [
          {
            id: 'q-3-1',
            questionKey: 'faq.categories.returns.q1.question',
            answerKey: 'faq.categories.returns.q1.answer',
          },
        ],
      },
      {
        id: 'cat-membership',
        titleKey: 'faq.categories.membership.title',
        items: [
          {
            id: 'q-4-1',
            questionKey: 'faq.categories.membership.q1.question',
            answerKey: 'faq.categories.membership.q1.answer',
          },
        ],
      },
    ],
  };
}
/**
 * Returns content for the Contact page.
 * Dashboard-ready: Swappable with a fetch() call to a CMS.
 */
export function getContactContent(): ContactPageContent {
  return {
    heroTitleKey: 'contact.heading',
    heroSubtitleKey: 'contact.subtitle',
    email: 'info@clarissa.id',
    phone: '+62 812 3456 7890',
    hoursKey: 'contact.info.hours',
  };
}

/**
 * Returns content for the Events page.
 * Dashboard-ready: Swappable with a fetch() call to a CMS.
 */
export function getEventPageContent(): EventPageContent {
  return {
    events: getEvents(),
  };
}
