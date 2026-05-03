import { siteConfig } from './constants';
import { getAbsoluteUrl } from '@/lib/utils/url';

/**
 * JSON-LD schema generators for structured data.
 * All functions return valid schema.org objects ready for JSON-LD injection.
 */

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    sameAs: Object.values(siteConfig.socialLinks),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-812-3456-7890',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/id/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(params: {
  name: string;
  address: string;
  city: string;
  province: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: params.name,
    image: `${siteConfig.url}/images/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address,
      addressLocality: params.city,
      addressRegion: params.province,
      addressCountry: 'ID',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(`/${locale}${item.path}`),
    })),
  };
}

export function generateArticleSchema(params: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
  image: string;
  locale: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    image: params.image,
    datePublished: params.publishedAt,
    dateModified: params.modifiedAt ?? params.publishedAt,
    author: {
      '@type': 'Organization',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(`/${params.locale}${params.path}`),
    },
  };
}
