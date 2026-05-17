import { ArrowRightIcon, MapPinIcon, ClockIcon } from '@/components/ui/Icon';
import { Link } from '@/lib/i18n/navigation';
import type { EventItem } from '@/lib/content/types';

interface EventCardProps {
  event: EventItem;
  readMoreLabel: string;
  categoryLabel?: string;
}

/**
 * Reusable editorial event card component.
 * Used across the home EventSection and the Events page grid.
 *
 * Dashboard-ready: all content flows from the EventItem type.
 */
export function EventCard({ event, readMoreLabel, categoryLabel }: EventCardProps) {
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <article className="group cursor-pointer flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden mb-6 bg-neutral-100 shrink-0" style={{ aspectRatio: '4/5' }}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Category Badge */}
        {categoryLabel && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 bg-brand-500 text-white text-[8px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
              {categoryLabel}
            </span>
          </div>
        )}

        {/* Date Overlay */}
        {formattedDate && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5">
            <ClockIcon className="w-3 h-3 text-brand-600" />
            <time
              dateTime={event.date}
              className="text-[9px] tracking-[0.1em] font-bold text-neutral-700 uppercase"
            >
              {formattedDate}
            </time>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-2">
        <div className="flex items-center gap-2 mb-3">
          <MapPinIcon className="w-3 h-3 text-brand-500" />
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
              {readMoreLabel}
            </span>
            <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
