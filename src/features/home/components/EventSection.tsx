import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Link } from '@/lib/i18n/navigation';
import { ArrowRightIcon } from '@/components/ui/Icon';
import { DesignAccents } from '@/components/ui/DesignAccents';
import { EventCard } from '@/components/ui/EventCard';
import { EventItem } from '@/lib/content/types';

interface EventSectionProps {
  events?: EventItem[];
  title?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function EventSection({ 
  events: customEvents,
  title,
  ctaText,
  ctaLink
}: EventSectionProps = {}) {
  const t = useTranslations('events');
  const tCat = useTranslations('eventsPage.categories');
  const events = customEvents || getHomeContent().events;

  // Limit to 4 items as requested
  const latestEvents = events.slice(0, 4);

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-36 bg-white overflow-hidden">
      {/* Editorial Design Accents */}
      <DesignAccents variant="editorial" letter="L" letterPosition="right" vPosition="bottom" />

      <Container>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.3em] uppercase text-neutral-900 mb-6">
            {title || t('heading')}
          </h2>
          <div className="w-32 h-1 bg-brand-200 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {latestEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              readMoreLabel={t('readMore')}
              categoryLabel={event.category ? tCat(event.category as any) : undefined}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href={ctaLink || "/events"}>
            <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 hover:pl-14 hover:pr-10 cursor-pointer">
              <span className="relative z-10">{ctaText || t('viewAll')}</span>
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
