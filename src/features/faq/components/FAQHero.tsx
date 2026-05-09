import { useTranslations } from 'next-intl';
import { getFAQContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';

export function FAQHero() {
  const t = useTranslations();
  const { heroTitleKey, heroSubtitleKey } = getFAQContent();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-white overflow-hidden border-b border-neutral-100">
      <DesignAccents letter="C" letterPosition="left" vPosition="top" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-[10px] md:text-xs font-bold text-brand-600 tracking-[0.4em] uppercase mb-6">
            Customer Care
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-neutral-900 tracking-tight mb-10 leading-[0.9]">
            {t(heroTitleKey as any)}
          </h1>
          <div className="w-20 h-1 bg-brand-500 mb-10" />
          <p className="text-neutral-500 text-base md:text-xl tracking-wide leading-relaxed font-light max-w-xl">
            {t(heroSubtitleKey as any)}
          </p>
        </div>
      </Container>
    </section>
  );
}
