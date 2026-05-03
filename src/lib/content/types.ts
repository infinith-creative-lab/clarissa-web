/**
 * Content model types for the Clarissa website.
 * These types define the shape of all content — currently sourced from static data,
 * designed to be swappable to CMS API responses with zero UI changes.
 */

export interface HeroBanner {
  id: string;
  subtitle: string;
  title: string;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  productImage?: string;
}

export interface Category {
  id: string;
  slug: string;
  nameKey: string;
  image: string;
  link: string;
}

export interface LookItem {
  id: string;
  title: string;
  mainImage: string;
  products: Array<{
    id: string;
    image: string;
    name: string;
  }>;
}

export interface EventItem {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  date?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  lat?: number;
  lng?: number;
}

export interface OutletStats {
  outletCount: number;
  cityCount: number;
  provinceCount: number;
  stores: StoreLocation[];
}

export interface FeatureItem {
  id: string;
  nameKey: string;
  icon?: string;
}

export interface HomePageContent {
  hero: string[];
  categories: Category[];
  looks: LookItem[];
  events: EventItem[];
  outletStats: OutletStats;
  features: FeatureItem[];
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface FooterColumn {
  titleKey: string;
  links: Array<{
    labelKey: string;
    href: string;
  }>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: string;
}
