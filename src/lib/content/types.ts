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
  nameKey?: string; // For static i18n
  name?: string | { en: string; id: string }; // For dynamic CMS content
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
  category?: 'exhibition' | 'opening' | 'collection' | 'editorial';
  featured?: boolean;
}

/** Events page — dashboard-editable fields */
export interface EventPageContent {
  events: EventItem[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  x?: number; // Percentage from left (0-100)
  y?: number; // Percentage from top (0-100)
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

/** About page — dashboard-editable fields */
export interface AboutValue {
  id: string;
  icon: 'heart' | 'star' | 'shield' | 'sparkle';
  titleKey: string;
  descriptionKey: string;
}

export interface AboutStat {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
}

export interface StoreShowcase {
  id: string;
  name: string;
  city: string;
  image: string;
  address: string;
  mapLink?: string;
  whatsapp?: string;
}

export interface AboutPageContent {
  heroImage: string;
  storyImage: string;
  visionImage: string;
  stats: AboutStat[];
  values: AboutValue[];
  storeShowcases: StoreShowcase[];
}

/** FAQ page — dashboard-editable fields */
export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface FAQCategory {
  id: string;
  titleKey: string;
  items: FAQItem[];
}

export interface FAQPageContent {
  heroTitleKey: string;
  heroSubtitleKey: string;
  categories: FAQCategory[];
}

/** Contact page — dashboard-editable fields */
export interface ContactPageContent {
  heroTitleKey: string;
  heroSubtitleKey: string;
  email: string;
  phone: string;
  hoursKey: string;
}
