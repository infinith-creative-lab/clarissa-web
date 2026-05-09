'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';

export function BrandVision() {
  const t = useTranslations('about');
  const { visionImage } = getAboutContent();

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <DesignAccents letter="L" letterPosition="right" vPosition="bottom" />
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-16">
            {/* Vision */}
            <div className="relative group">
              <span className="text-[10px] md:text-xs font-bold text-brand-600 tracking-[0.2em] uppercase mb-4 block opacity-80">
                Our Future
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-6 leading-tight transition-colors duration-500 group-hover:text-brand-700">
                {t('visionTitle')}
              </h2>
              <div className="w-12 h-px bg-brand-600 mb-6" />
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-body">
                {t('visionContent')}
              </p>
            </div>

            {/* Mission */}
            <div className="relative group">
              <span className="text-[10px] md:text-xs font-bold text-brand-600 tracking-[0.2em] uppercase mb-4 block opacity-80">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-6 leading-tight transition-colors duration-500 group-hover:text-brand-700">
                {t('missionTitle')}
              </h2>
              <div className="w-12 h-px bg-brand-600 mb-6" />
              <ul className="space-y-4">
                {(t.raw('missionList') as string[]).map((item, index) => (
                  <li key={index} className="flex items-start gap-4 text-neutral-600 text-base md:text-lg leading-relaxed font-body">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[3/4] relative overflow-hidden group shadow-2xl shadow-neutral-900/5">
              <img
                src={visionImage}
                alt="Clarissa Vision & Mission"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
            </div>
            
            {/* Minimalist Accents */}
            <div className="hidden lg:block absolute -top-8 -right-8 w-32 h-32 border-t border-r border-neutral-300 pointer-events-none" />
            <div className="hidden lg:block absolute -bottom-8 -left-8 w-32 h-32 border-b border-l border-neutral-300 pointer-events-none" />
          </div>

        </div>
      </Container>
    </section>
  );
}
