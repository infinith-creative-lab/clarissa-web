'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';

/**
 * Overlapping intro card for the About page.
 * Positioned to overlap the hero image.
 */
export function BrandIntro() {
  const t = useTranslations('about');

  return (
    <section className="relative z-20 pt-0 pb-1 flex flex-col bg-transparent">

      {/* Intro Typography Block - Overlapping to break flatness */}
      <Container className="relative z-10 -mt-16 md:-mt-32 mb-10 md:mb-16">
        <div className="bg-white p-8 md:p-16 lg:p-20 max-w-4xl mx-auto shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100/50">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 mb-8 leading-snug md:leading-tight tracking-tight">
            {t('heroTitle')}
          </h1>
          <div className="w-12 h-px bg-brand-600 mb-8" />
          <p className="text-base md:text-lg text-neutral-600 font-body leading-relaxed md:leading-loose">
            {t('heroSubtitle')}
          </p>
        </div>
      </Container>
    </section>
  );
}
