"use client";

import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';

export function FeaturesBar() {
  const t = useTranslations();
  const { features } = getHomeContent();

  return (
    <section className="bg-neutral-900 py-3 border-y border-neutral-800 relative overflow-hidden">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <Container className="relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-x-16 gap-y-4 px-4">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400 group-hover:scale-125 transition-transform duration-500" />
              
              <span className="text-brand-100 text-[10px] md:text-[11px] font-heading font-bold tracking-[0.2em] uppercase transition-all duration-300 group-hover:text-white whitespace-nowrap">
                {t(feature.nameKey as any)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
