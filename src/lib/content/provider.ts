import type {
  HomePageContent,
  Category,
  LookItem,
  EventItem,
  OutletStats,
  NavLink,
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
      id: 'womens-fashion',
      slug: 'womens-fashion',
      nameKey: 'categories.womens',
      image: '/images/categories/womens.jpg',
      link: '/fashion/women',
    },
    {
      id: 'mens-fashion',
      slug: 'mens-fashion',
      nameKey: 'categories.mens',
      image: '/images/categories/mens.jpg',
      link: '/fashion/men',
    },
    {
      id: 'accessories',
      slug: 'accessories',
      nameKey: 'categories.accessories',
      image: '/images/categories/accessories.jpg',
      link: '/accessories',
    },
    {
      id: 'kids-maternity',
      slug: 'kids-maternity',
      nameKey: 'categories.kids',
      image: '/images/categories/kids.jpg',
      link: '/kids',
    },
  ];
}

export function getLooks(): LookItem[] {
  return [
    {
      id: 'look-1',
      title: 'Casual Style',
      mainImage: '/images/looks/look-1.jpg',
      products: [
        { id: 'p1', image: '/images/looks/look-1-p1.jpg', name: 'Top' },
        { id: 'p2', image: '/images/looks/look-1-p2.jpg', name: 'Bottom' },
      ],
    },
    {
      id: 'look-2',
      title: 'Office Look',
      mainImage: '/images/looks/look-2.jpg',
      products: [
        { id: 'p3', image: '/images/looks/look-2-p1.jpg', name: 'Blazer' },
        { id: 'p4', image: '/images/looks/look-2-p2.jpg', name: 'Bag' },
      ],
    },
    {
      id: 'look-3',
      title: 'Weekend Vibes',
      mainImage: '/images/looks/look-3.jpg',
      products: [
        { id: 'p5', image: '/images/looks/look-3-p1.jpg', name: 'Dress' },
        { id: 'p6', image: '/images/looks/look-3-p2.jpg', name: 'Sandals' },
      ],
    },
  ];
}

export function getEvents(): EventItem[] {
  return [
    {
      id: 'event-1',
      title: 'Event di Lapangan Solo',
      location: 'Solo',
      description: 'Clarissa Gratis Diskon Spesial',
      image: '/images/events/event-1.jpg',
      ctaText: 'Baca selengkapnya',
      ctaLink: '/events/solo',
    },
    {
      id: 'event-2',
      title: 'Clarissa Grand Opening',
      location: 'Jakarta',
      description: 'Grand Opening Diskon Spesial',
      image: '/images/events/event-2.jpg',
      ctaText: 'Baca selengkapnya',
      ctaLink: '/events/jakarta',
    },
  ];
}

export function getOutletStats(): OutletStats {
  return {
    outletCount: 12,
    cityCount: 12,
    provinceCount: 2,
    mapImage: '/images/outlets/indonesia-map.svg',
  };
}

export function getHomeContent(): HomePageContent {
  return {
    hero: {
      id: 'hero-bag-series',
      subtitle: 'The New Essentials',
      title: 'NEW BAG SERIES',
      badgeText: 'NEW!',
      ctaText: 'Belanja Sekarang',
      ctaLink: '/fashion/bags',
      backgroundImage: '/images/hero/hero-bg.jpg',
      productImage: '/images/hero/hero-product.png',
    },
    categories: getCategories(),
    looks: getLooks(),
    events: getEvents(),
    outletStats: getOutletStats(),
  };
}
