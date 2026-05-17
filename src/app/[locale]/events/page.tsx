import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { EventsContent } from '@/features/events/components/EventsContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { getEventPageContent } from '@/lib/content/provider';
import { siteConfig } from '@/lib/seo/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'eventsPage.meta' });

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/events',
    keywords: 'clarissa events, fashion exhibition, store opening, modest fashion, indonesia fashion events',
  });
}

/**
 * Build JSON-LD structured data for the events page.
 * Generates an EventSeries schema + individual Event entries for rich snippets.
 */
function buildEventsJsonLd(locale: string) {
  const { events } = getEventPageContent();

  const eventSchemas = events.map((event) => ({
    '@type': 'Event',
    name: event.title,
    description: event.description,
    ...(event.date && { startDate: event.date }),
    location: {
      '@type': 'Place',
      name: event.location,
    },
    image: event.image.startsWith('http')
      ? event.image
      : `${siteConfig.url}${event.image}`,
    url: `${siteConfig.url}/${locale}${event.ctaLink}`,
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Clarissa Events & Happenings',
    description: 'Discover the latest events, exhibitions, store openings, and exclusive collections from Clarissa across Indonesia.',
    url: `${siteConfig.url}/${locale}/events`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: events.length,
      itemListElement: eventSchemas.map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: event,
      })),
    },
  };
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd data={buildEventsJsonLd(locale)} />
      <EventsContent />
    </main>
  );
}
