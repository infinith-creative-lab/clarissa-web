import type { Metadata } from 'next';
import { siteConfig } from './constants';
import { getAbsoluteUrl } from '@/lib/utils/url';

interface BuildMetadataOptions {
  title: string;
  description: string;
  locale: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string;
}

/**
 * Build a complete Next.js Metadata object with OG, Twitter, hreflang alternates.
 * Use this in every page's generateMetadata function.
 */
export function buildMetadata({
  title,
  description,
  locale,
  path = '',
  ogImage,
  noIndex = false,
  keywords,
}: BuildMetadataOptions): Metadata {
  const url = getAbsoluteUrl(`/${locale}${path}`);
  const image = ogImage ?? `${siteConfig.url}${siteConfig.defaultOgImage}`;

  const alternates: Record<string, string> = {};
  for (const loc of siteConfig.locales) {
    alternates[loc] = getAbsoluteUrl(`/${loc}${path}`);
  }

  return {
    title,
    description,
    keywords: keywords ?? undefined,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? ['en_US'] : ['id_ID'],
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
