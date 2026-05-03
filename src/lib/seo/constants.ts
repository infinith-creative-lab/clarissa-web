/**
 * SEO constants for the Clarissa website.
 * Central source of truth for all SEO-related configuration.
 */
export const siteConfig = {
  name: 'Clarissa',
  domain: 'clarissa.id',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clarissa.id',
  defaultLocale: 'id',
  locales: ['id', 'en'] as const,
  defaultTitle: 'Clarissa — No. 1 One Stop Shopping Experience',
  titleTemplate: '%s | Clarissa',
  defaultDescription:
    'Temukan koleksi fashion, kecantikan, dan aksesoris terbaik di Clarissa. Belanja mudah, kualitas terjamin.',
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@clarissa_id',
  socialLinks: {
    instagram: 'https://instagram.com/clarissa.id',
    facebook: 'https://facebook.com/clarissa.id',
    tiktok: 'https://tiktok.com/@clarissa.id',
  },
} as const;
