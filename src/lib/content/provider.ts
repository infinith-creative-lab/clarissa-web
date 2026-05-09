import type {
  HomePageContent,
  AboutPageContent,
  Category,
  LookItem,
  EventItem,
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
      nameKey: 'categories.modestWear',
      image: '/images/categories/modest-wear.webp',
      link: '/fashion/modest-wear',
    },
    {
      id: 'hijab-collection',
      slug: 'hijab-collection',
      nameKey: 'categories.hijab',
      image: '/images/categories/hijab.webp',
      link: '/fashion/hijab',
    },
    {
      id: 'underwear',
      slug: 'underwear',
      nameKey: 'categories.underwear',
      image: '/images/categories/underwear.webp',
      link: '/fashion/underwear',
    },
    {
      id: 'bags-accessories',
      slug: 'bags-accessories',
      nameKey: 'categories.bagsAccessories',
      image: '/images/categories/bags-accessories.webp',
      link: '/accessories',
    },
    {
      id: 'footwear',
      slug: 'footwear',
      nameKey: 'categories.footwear',
      image: '/images/categories/footwear.webp',
      link: '/fashion/shoes',
    },
    {
      id: 'kids-lifestyle',
      slug: 'kids-lifestyle',
      nameKey: 'categories.kidsLifestyle',
      image: '/images/categories/kids-lifestyle.webp',
      link: '/kids',
    },
  ];
}

export function getBeautyCategories(): Category[] {
  return [
    {
      id: 'skincare',
      slug: 'skincare',
      nameKey: 'categories.skincare',
      image: '/images/categories/beauty/Skincare.webp',
      link: '/beauty/skincare',
    },
    {
      id: 'cosmetics',
      slug: 'cosmetics',
      nameKey: 'categories.cosmetics',
      image: '/images/categories/beauty/Cosmetics.webp',
      link: '/beauty/cosmetics',
    },
    {
      id: 'haircare',
      slug: 'haircare',
      nameKey: 'categories.haircare',
      image: '/images/categories/beauty/Haircare.webp',
      link: '/beauty/haircare',
    },
    {
      id: 'bodycare',
      slug: 'bodycare',
      nameKey: 'categories.bodycare',
      image: '/images/categories/beauty/Bodycare.webp',
      link: '/beauty/bodycare',
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
      ctaLink: '/blog/solo-exhibition',
    },
    {
      id: 'event-2',
      title: 'GRESIK STORE OPENING',
      location: 'Gresik, East Java',
      description: 'Celebrating a new chapter of luxury in Gresik with special discounts and exclusive collections.',
      image: '/images/events/event-gresik.webp',
      ctaText: 'READ MORE',
      ctaLink: '/blog/gresik-opening',
    },
    {
      id: 'event-3',
      title: 'SUMMER VOGUE COLLECTION',
      location: 'Clarissa Online',
      description: 'Discover the airy silhouettes and ethereal fabrics of our latest Summer 2026 collection.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/blog/summer-vogue',
    },
    {
      id: 'event-4',
      title: 'THE ART OF MODESTY',
      location: 'Editorial',
      description: 'An in-depth look at the philosophy behind our minimalist modest wear designs.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      ctaText: 'READ MORE',
      ctaLink: '/blog/art-of-modesty',
    },
  ];
}

export function getOutletStats(): OutletStats {
  return {
    outletCount: 12,
    cityCount: 8,
    provinceCount: 4,
    stores: [
      { id: 'st-1', name: 'Clarissa Grand Indonesia', address: 'Grand Indonesia Mall, Central Jakarta', city: 'Jakarta', x: 25, y: 35, lat: -6.1953, lng: 106.8231 },
      { id: 'st-2', name: 'Clarissa Pondok Indah', address: 'Pondok Indah Mall 2, South Jakarta', city: 'Jakarta', x: 22, y: 42, lat: -6.2655, lng: 106.7844 },
      { id: 'st-3', name: 'Clarissa Paris Van Java', address: 'Paris Van Java Mall, Bandung', city: 'Bandung', x: 35, y: 55, lat: -6.8892, lng: 107.5959 },
      { id: 'st-4', name: 'Clarissa Tunjungan Plaza', address: 'Tunjungan Plaza 6, Surabaya', city: 'Surabaya', x: 75, y: 55, lat: -7.2634, lng: 112.7394 },
      { id: 'st-5', name: 'Clarissa Pakuwon Mall', address: 'Pakuwon Mall, West Surabaya', city: 'Surabaya', x: 72, y: 58, lat: -7.2891, lng: 112.6756 },
      { id: 'st-6', name: 'Clarissa Ciputra World', address: 'Ciputra World Surabaya', city: 'Surabaya', x: 73, y: 54, lat: -7.2912, lng: 112.7247 },
      { id: 'st-7', name: 'Clarissa Paragon Semarang', address: 'Paragon City Mall, Semarang', city: 'Semarang', x: 55, y: 45, lat: -6.9744, lng: 110.4131 },
      { id: 'st-8', name: 'Clarissa Trans Studio Mall', address: 'TSM Bandung, West Java', city: 'Bandung', x: 38, y: 52, lat: -6.9255, lng: 107.6364 },
      { id: 'st-9', name: 'Clarissa Galaxy Mall', address: 'Galaxy Mall 3, East Surabaya', city: 'Surabaya', x: 78, y: 52, lat: -7.2668, lng: 112.7844 },
      { id: 'st-10', name: 'Clarissa Mall Olympic Garden', address: 'MOG Malang, East Java', city: 'Malang', x: 74, y: 75, lat: -7.9786, lng: 112.6214 },
      { id: 'st-11', name: 'Clarissa Sun City Mall', address: 'Sun City Mall Sidoarjo', city: 'Sidoarjo', x: 76, y: 62, lat: -7.4463, lng: 112.7177 },
      { id: 'st-12', name: 'Clarissa Senayan City', address: 'Senayan City, Central Jakarta', city: 'Jakarta', x: 24, y: 38, lat: -6.2272, lng: 106.7972 },
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
      { id: 'store-1', name: 'Clarissa Gresik', city: 'Gresik', image: '/images/stores/gresik.webp', address: 'Jl. Tj. Hulu II No.58, Ponganganrejo, Yosowilangun, Kec Manyar, Kab Gresik, Jawa Timur.', mapLink: 'https://share.google/NE6u3pgrJYIXQtSJC' },
      { id: 'store-2', name: 'Clarissa Lamongan', city: 'Lamongan', image: '/images/stores/lamongan.webp', address: 'Jl. Lamongrejo No.65, Krajan, Jetis, Kabupaten Lamongan, Jawa Timur', mapLink: 'https://share.google/AI6I875LNNOfIUvGl' },
      { id: 'store-3', name: 'Clarissa Mojokerto', city: 'Mojokerto', image: '/images/stores/mojokerto.webp', address: 'Jl. Empunala No.151, Mergelo, Balongsari, Kec. Magersari, Kota Mojokerto, Jawa Timur', mapLink: 'https://share.google/EsEBIXrpVfq540MQB' },
      { id: 'store-4', name: 'Clarissa Jombang', city: 'Jombang', image: '/images/stores/jombang.webp', address: 'Jl. KH. Hasyim Asy\'ari No.56, Jombatan, Kec. Jombang, Kabupaten Jombang, Jawa Timur', mapLink: 'https://share.google/GvN18cMBQj0g78Vi7' },
      { id: 'store-5', name: 'Clarissa Tuban', city: 'Tuban', image: '/images/stores/tuban.webp', address: 'Jl. Sunan Kalijogo No.54, Latsari, Kabupaten Tuban, Jawa Timur', mapLink: 'https://share.google/IOhiZcVgfT9Wfq46F' },
      { id: 'store-6', name: 'Clarissa Kediri', city: 'Kediri', image: '/images/stores/kediri.webp', address: 'Jl. HOS. Cokroaminoto No.171, Banjaran,Kabupaten Kediri, Jawa Timur', mapLink: 'https://share.google/eaMfFf6pICQneYedT' },
      { id: 'store-7', name: 'Clarissa Tuluangagung', city: 'Tulungagung', image: '/images/stores/tulungagung.webp', address: 'Jl. KHR Abdul Fattah No.37, Botoran, Kec. Tulungagung, Kabupaten Tulungagung, Jawa Timur', mapLink: 'https://share.google/nBNqwM8XmyYPIFSuM' },
      { id: 'store-8', name: 'Clarissa Malang', city: 'Malang', image: '/images/stores/malang.webp', address: 'Jl. Simpang Ijen No.5, Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur', mapLink: 'https://share.google/JjzH5WS4jRJntbDGw' },
      { id: 'store-9', name: 'Clarissa Probolinggo', city: 'Probolinggo', image: '/images/stores/probolinggo.webp', address: 'Jl. Dr.Sutomo No.153, Mangunharjo, Kec. Mayangan, Kota Probolinggo, Jawa Timur', mapLink: 'https://share.google/9u40dve8PFbIG7LtN' },
      { id: 'store-10', name: 'Clarissa Madiun', city: 'Madiun', image: '/images/stores/madiun.webp', address: 'Jl. Cokroaminoto No.88, Kejuron, Kec. Taman, Kota Madiun, Jawa Timur', mapLink: 'https://share.google/O1PaxAP7fPAJXAqNx' },
      { id: 'store-11', name: 'Clarissa Pasuruan', city: 'Pasuruan', image: '/images/stores/pasuruan.webp', address: 'Jl. Dokter Wahidin Sudiro Husodo No.176,RT.1/RW.4, Purutrejo, Kec. Purworejo, Kota Pasuruan, Jawa Timur' },
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
