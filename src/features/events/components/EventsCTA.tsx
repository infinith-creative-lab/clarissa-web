'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';
import { ArrowRightIcon, MailIcon, PhoneIcon } from '@/components/ui/Icon';
import { Link } from '@/lib/i18n/navigation';

/**
 * Collaboration / contact CTA section for the Events page.
 * Split layout: content left, editorial image right.
 */
export function EventsCTA() {
  const t = useTranslations('eventsPage.cta');

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden border-t border-neutral-100">
      <DesignAccents
        letter="L"
        letterPosition="right"
        vPosition="bottom"
        className="overflow-visible [&>div:first-child]:-bottom-23"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Left */}
          <div className="flex flex-col">
            <div className="inline-block w-fit px-6 py-1.5 bg-brand-500 text-brand-100 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
              {t('badge')}
            </div>

            <h3 className="text-2xl md:text-4xl font-serif text-neutral-900 mb-6 leading-tight tracking-tight">
              {t('title')}
            </h3>

            <p className="text-neutral-500 text-sm md:text-base mb-10 leading-relaxed font-light max-w-md">
              {t('description')}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <a
                href={`mailto:${t('email')}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-brand-600 transition-colors duration-300"
              >
                <MailIcon className="w-4 h-4 text-brand-500" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium">
                  {t('email')}
                </span>
              </a>
              <a
                href={`tel:${t('phone')}`}
                className="group flex items-center gap-3 text-neutral-600 hover:text-brand-600 transition-colors duration-300"
              >
                <PhoneIcon className="w-4 h-4 text-brand-500" />
                <span className="text-xs tracking-[0.15em] uppercase font-medium">
                  {t('phone')}
                </span>
              </a>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.4em] uppercase text-neutral-900 hover:text-brand-600 transition-all duration-300"
            >
              <span>{t('button')}</span>
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image Right */}
          <div className="relative group">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800&auto=format&fit=crop"
                alt="Clarissa collaboration event"
                className="w-full h-[400px] md:h-[520px] object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover frame */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/40 transition-all duration-700 pointer-events-none" />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-brand-200/40 -z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
