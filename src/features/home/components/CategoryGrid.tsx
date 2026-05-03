/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Link } from '@/lib/i18n/navigation';

import { ArrowRightIcon } from '@/components/ui/Icon';
import { DesignAccents } from '@/components/ui/DesignAccents';

export function CategoryGrid() {
  const t = useTranslations();
  const { categories } = getHomeContent();

  return (
    <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-brand-50">
      {/* Editorial Design Accents */}
      <DesignAccents variant="editorial" />

      <Container className="relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-[0.25em] uppercase text-neutral-900 mb-4">
            {t('categories.heading')}
          </h2>
          <div className="w-24 h-1 bg-brand-200 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-24">
          {categories.map((category) => (
            <Link key={category.id} href={category.link} className="block group">
              <div className="relative h-[300px] md:h-[400px] rounded-none overflow-hidden transition-all duration-700">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/30 transition-colors duration-500" />
                
                {/* Minimalist Border Frame on Hover */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-white/40 transition-all duration-500 z-10" />

                <div className="absolute inset-x-0 bottom-10 flex justify-center px-4 z-20">
                  <h3 className="text-white font-heading font-medium text-xl md:text-2xl tracking-[0.2em] uppercase text-center drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                    {t(category.nameKey as any)}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="font-heading italic text-xl md:text-2xl text-neutral-800 mb-12 tracking-wide leading-relaxed">
            "{t('categories.description')}"
          </p>
          <Link href="/fashion">
            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 hover:pl-14 hover:pr-10">
              <span className="relative z-10">{t('categories.cta')}</span>
              <ArrowRightIcon className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
              
              {/* Button Decorative Underline */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-200 transition-all duration-500 group-hover:w-full" />
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
