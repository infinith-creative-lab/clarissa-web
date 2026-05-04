import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Link } from '@/lib/i18n/navigation';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { DesignAccents } from '@/components/ui/DesignAccents';

export function EventSection() {
  const t = useTranslations('events');
  const { events } = getHomeContent();

  // Limit to 4 items as requested
  const latestEvents = events.slice(0, 4);

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-36 bg-white overflow-hidden">
      {/* Editorial Design Accents */}
      <DesignAccents variant="editorial" letter="L" letterPosition="right" vPosition="bottom" />

      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.3em] uppercase text-neutral-900 mb-6">
            {t('heading')}
          </h2>
          <div className="w-32 h-1 bg-brand-200 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {latestEvents.map((event) => (
            <div key={event.id} className="group cursor-pointer flex flex-col h-full">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-6 bg-neutral-100 shrink-0" style={{ aspectRatio: '4/5' }}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] tracking-[0.4em] font-bold text-brand-600 uppercase">
                    {event.location}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-lg md:text-xl text-neutral-900 tracking-wide leading-snug group-hover:text-brand-600 transition-colors duration-300 mb-4 min-h-[3.5rem] line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-xs text-neutral-500 leading-relaxed font-medium line-clamp-3 mb-6 min-h-[3rem]">
                  {event.description}
                </p>

                <div className="mt-auto pt-4">
                  <Link href={event.ctaLink} className="inline-flex items-center gap-2 group/link">
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase border-b border-neutral-900 pb-1 group-hover/link:text-brand-600 group-hover/link:border-brand-600 transition-all">
                      {t('readMore')}
                    </span>
                    <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 hover:pl-14 hover:pr-10">
              <span className="relative z-10">{t('viewAll')}</span>
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
