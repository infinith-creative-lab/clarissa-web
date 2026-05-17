'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { getEventPageContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';
import { Pagination } from '@/components/ui/Pagination';
import { EventCard } from '@/components/ui/EventCard';

const ITEMS_PER_PAGE = 8;

/* ── Category Filter ── */

type EventCategory = 'all' | 'exhibition' | 'opening' | 'collection' | 'editorial';

const CATEGORIES: EventCategory[] = ['all', 'exhibition', 'opening', 'collection', 'editorial'];

/* ── Events Grid Section ── */

/**
 * Full editorial events grid with category filters and pagination.
 * Uses the shared EventCard reusable component.
 */
export function EventsGrid() {
  const t = useTranslations('eventsPage');
  const { events } = getEventPageContent();

  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events by category
  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return events;
    return events.filter((e) => e.category === activeCategory);
  }, [events, activeCategory]);

  // Paginate
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when category changes
  const handleCategoryChange = (cat: EventCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="relative py-20 md:py-32 bg-neutral-50 overflow-hidden">
      <DesignAccents variant="editorial" letter="C" letterPosition="left" vPosition="top" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.3em] uppercase text-neutral-900 mb-6">
            {t('gridTitle')}
          </h2>
          <p className="text-sm text-neutral-500 tracking-[0.15em] uppercase font-medium max-w-xl mx-auto">
            {t('gridSubtitle')}
          </p>
          <div className="w-32 h-1 bg-brand-200 mx-auto mt-8" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                px-5 py-2 text-[10px] tracking-[0.3em] font-bold uppercase transition-all duration-300 cursor-pointer
                ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }
              `}
            >
              {t(`categories.${cat}` as any)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {paginatedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                readMoreLabel={t('readMore')}
                categoryLabel={event.category ? t(`categories.${event.category}` as any) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-sm tracking-[0.15em] uppercase font-medium">
              {t('noEvents')}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
