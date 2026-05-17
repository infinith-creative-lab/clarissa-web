import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/constants';

/**
 * Web App Manifest — PWA-ready configuration.
 * Includes app shortcuts for quick navigation and full icon set.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name + ' — No. 1 One Stop Shopping Experience',
    short_name: 'Clarissa',
    description: siteConfig.defaultDescription,
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#F5E6E0',
    categories: ['shopping', 'fashion', 'beauty', 'lifestyle'],
    lang: 'id',
    dir: 'ltr',
    icons: [
      {
        src: '/assets/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Fashion Collection',
        short_name: 'Fashion',
        url: '/id/fashion',
        description: 'Browse our latest fashion collection',
      },
      {
        name: 'Beauty Products',
        short_name: 'Beauty',
        url: '/id/beauty',
        description: 'Explore skincare, cosmetics, and haircare',
      },
      {
        name: 'Events & Happenings',
        short_name: 'Events',
        url: '/id/events',
        description: 'Discover upcoming Clarissa events near you',
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        url: '/id/contact',
        description: 'Get in touch with the Clarissa team',
      },
    ],
  };
}
