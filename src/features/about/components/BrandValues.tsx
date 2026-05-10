'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/ui/Divider';
import { AboutValue } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { HeartIcon, StarIcon, ShieldIcon, SparkleIcon } from '@/components/ui/Icon';
import type { TablerIconType } from '@/components/ui/Icon';

/* ── Value Icon Map ── */

const iconMap: Record<AboutValue['icon'], TablerIconType> = {
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
