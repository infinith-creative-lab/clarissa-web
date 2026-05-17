'use client';

import { EventsGrid } from './EventsGrid';
import { EventsCTA } from './EventsCTA';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

/**
 * Client component orchestrator for the Events page.
 * Assembles all Events sections in the correct editorial order.
 * Used by the server page.tsx to maintain SSR/SSG boundary.
 */
export function EventsContent() {
  return (
    <>
      <EventsGrid />
      <EventsCTA />
      <FeaturesBar />
    </>
  );
}
