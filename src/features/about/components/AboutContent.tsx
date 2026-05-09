'use client';

import { AboutHero } from './AboutHero';
import { BrandIntro } from './BrandIntro';
import { BrandStats } from './BrandStats';
import { BrandStory } from './BrandStory';
import { BrandVision } from './BrandVision';
import { BrandValues } from './BrandValues';
import { StoreCarousel } from './StoreCarousel';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

/**
 * Client component orchestrator for the About page.
 * Assembles all About sections in the correct order.
 * Used by the server page.tsx to maintain SSR/SSG boundary.
 */
export function AboutContent() {
  return (
    <>
      <AboutHero />
      <BrandIntro />
      <BrandStats />
      <BrandStory />
      <BrandValues />
      <BrandVision />
      <StoreCarousel />
      <FeaturesBar />
    </>
  );
}
