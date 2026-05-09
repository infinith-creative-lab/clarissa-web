'use client';

import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { StatCounter } from '@/components/ui/StatCounter';
import { Divider } from '@/components/ui/Divider';

/**
 * Horizontal stats bar using the shared StatCounter component.
 * Content sourced from provider — dashboard-ready.
 */
export function BrandStats() {
  const t = useTranslations();
  const { stats } = getAboutContent();

  return (
    <section className="relative py-6 md:py-8 bg-neutral-900 overflow-hidden">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,139,124,0.08) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center ${
                index < stats.length - 1 ? 'md:border-r md:border-white/10' : ''
              }`}
            >
              <StatCounter
                end={stat.value}
                suffix={stat.suffix}
                label={t(stat.labelKey as any)}
                duration={1400}
                valueClassName="!text-white !text-3xl md:!text-4xl lg:!text-5xl"
                labelClassName="!text-white/40 !mt-1"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
