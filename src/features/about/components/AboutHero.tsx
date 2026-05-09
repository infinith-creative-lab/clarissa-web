'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';

/**
 * About page hero section.
 * Custom minimalist elegant layout: full-width image top, spacious typography block below.
 * Content sourced from provider — dashboard-ready.
 */
export function AboutHero() {
  const t = useTranslations('about');
  const { heroImage } = getAboutContent();

  return (
    <div className="relative bg-white">
      {/* Editorial Image */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={heroImage}
          alt="Clarissa About"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/5" />
      </section>
    </div>
  );
}
