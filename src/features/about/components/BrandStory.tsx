'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/ui/Divider';
import { DesignAccents } from '@/components/ui/DesignAccents';

/**
 * Split-layout brand story section with editorial image and rich typography.
 * All text is i18n-driven, image sourced from content provider.
 */
export function BrandStory() {
  const t = useTranslations('about');
  const { storyImage } = getAboutContent();

  return (
    <section className="relative py-20 md:py-32 bg-white flex flex-col overflow-hidden">
      <DesignAccents variant="editorial" letter="C" letterPosition="left" vPosition="top" />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Editorial Image */}
          <div className="relative group">
            <div className="relative overflow-hidden">
              <img
                src={storyImage}
                alt="Clarissa brand story"
                className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover frame */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/40 transition-all duration-700 pointer-events-none" />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-brand-200/40 -z-10" />
          </div>

          {/* Story Content */}
          <div className="flex flex-col justify-center">
            <div className="text-[10px] font-bold text-brand-600 tracking-[0.5em] uppercase mb-6">
              {t('storyLabel')}
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.1em] uppercase text-neutral-900 mb-8 leading-tight">
              {t('storyTitle')}
            </h2>

            <Divider variant="line" color="brand" className="w-16 mx-0 mb-8" />

            <div className="space-y-6">
              {(t.raw('storyParagraphs') as string[]).map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-neutral-600 text-base md:text-lg leading-relaxed font-body"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
