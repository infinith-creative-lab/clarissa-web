'use client';

import { useTranslations } from 'next-intl';
import { DesignAccents } from '@/components/ui/DesignAccents';
import { ArrowRightIcon } from '@/components/ui/Icon';

/**
 * A separate, high-end contact section for the FAQ page.
 * Features a large decorative 'L' accent and is fully localized.
 */
export function FAQContact() {
  const t = useTranslations();

  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden border-t border-neutral-100">
      {/* Editorial Accent 'L' */}
      <DesignAccents 
        letter="L" 
        letterPosition="right" 
        vPosition="bottom" 
        className="overflow-visible [&>div:first-child]:-bottom-23" 
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-block px-6 py-1.5 bg-brand-500 text-brand-100 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
          {t('faq.cta.badge' as any)}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-6 max-w-xl mx-auto leading-tight tracking-tight">
          {t('faq.cta.title' as any)}
        </h3>
        
        <p className="text-neutral-500 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed font-light">
          {t('faq.cta.description' as any)}
        </p>
        
        <a 
          href="/contact" 
          className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.4em] uppercase text-neutral-900 hover:text-brand-600 transition-all duration-300"
        >
          <span>{t('faq.cta.button' as any)}</span>
          <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
