import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { generateWebSiteSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/features/home/components/HeroSection';
import { CategoryGrid } from '@/features/home/components/CategoryGrid';
import { StealHerLooks } from '@/features/home/components/StealHerLooks';
import { EventSection } from '@/features/home/components/EventSection';
import { OutletMap } from '@/features/home/components/OutletMap';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    locale,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const websiteSchema = generateWebSiteSchema();

  return (
    <main>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <CategoryGrid />
      <StealHerLooks />
      <EventSection />
      <OutletMap />
    </main>
  );
}
