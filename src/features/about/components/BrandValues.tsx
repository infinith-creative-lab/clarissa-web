'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/ui/Divider';
import { AboutValue } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { SVGProps } from 'react';

/* ── Value Icon Components ── */

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

const iconMap: Record<AboutValue['icon'], typeof HeartIcon> = {
  heart: HeartIcon,
  star: StarIcon,
  shield: ShieldIcon,
  sparkle: SparkleIcon,
};

/* ── Value Card ── */

function ValueCard({
  value,
  index,
}: {
  value: AboutValue;
  index: number;
}) {
  const t = useTranslations();
  const IconComponent = iconMap[value.icon];

  return (
    <div
      className="group flex flex-col items-center text-center p-4 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center mb-5 text-brand-600 bg-brand-50 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className="font-serif font-semibold text-lg text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-brand-700">
        {t(value.titleKey as any)}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-500 leading-relaxed font-body max-w-[240px]">
        {t(value.descriptionKey as any)}
      </p>
    </div>
  );
}

/* ── Brand Values Section ── */

/**
 * Ultra-slim horizontal values bar.
 */
export function BrandValues() {
  const t = useTranslations();
  const { values } = getAboutContent();

  return (
    <section className="relative py-6 md:py-8 bg-brand-50 overflow-hidden border-y border-neutral-100/50">
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <div
                key={value.id}
                className={`flex flex-col items-center group px-4 ${
                  index < values.length - 1 ? 'md:border-r md:border-brand-200/50' : ''
                }`}
              >
                <div className="text-brand-600 mb-2 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase text-neutral-900 text-center">
                  {t(value.titleKey as any)}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
