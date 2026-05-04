import type {
  HomePageContent,
  Category,
  LookItem,
  EventItem,
  OutletStats,
  NavLink,
  FeatureItem,
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
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
      link: '/beauty/skincare',
    },
    {
      id: 'cosmetics',
      slug: 'cosmetics',
      nameKey: 'categories.cosmetics',
      image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop',
      link: '/beauty/cosmetics',
    },
    {
      id: 'haircare',
      slug: 'haircare',
      nameKey: 'categories.haircare',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
      link: '/beauty/haircare',
    },
    {
      id: 'bodycare',
      slug: 'bodycare',
      nameKey: 'categories.bodycare',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
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
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477eb69248f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1600&auto=format&fit=crop',
    ],
    categories: getBeautyCategories(),
    looks: [],
    events: getEvents(),
    outletStats: getOutletStats(),
    features: getFeatures(),
  };
}
