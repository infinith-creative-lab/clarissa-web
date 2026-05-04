import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/features/home/components/HeroSection';
import { CategoryGrid } from '@/features/home/components/CategoryGrid';
import { EventSection } from '@/features/home/components/EventSection';
import { OutletMap } from '@/features/home/components/OutletMap';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';
import { getBeautyContent } from '@/lib/content/provider';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Fallback to home meta translations for now, or create beauty specific
  const t = await getTranslations({ locale, namespace: 'meta' });
  
  return buildMetadata({
    title: `Beauty | ${t('title')}`,
    description: t('description'),
    keywords: 'beauty, cosmetics, skincare, haircare, bodycare, clarissa',
    locale,
  });
}

export default async function BeautyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const beautyContent = getBeautyContent();

  return (
    <main>
      <HeroSection slides={beautyContent.hero} />
      
      <CategoryGrid 
        categories={beautyContent.categories}
        columns={2}
        title="CHOOSE YOUR PRODUCT"
        description="Buat dirimu lebih menawan"
        ctaText="Cek Katalog Kami"
        ctaLink="/beauty/catalog"
      />
      
      {/* Beauty page does not include StealHerLooks per mockup */}
      
      <EventSection 
        events={beautyContent.events}
        title="OUR EVENT"
        ctaText="Cari Tau Event Di Kotamu"
        ctaLink="/events"
      />
      
      <OutletMap 
        stats={beautyContent.outletStats} 
      />
      
      <FeaturesBar features={beautyContent.features} />
    </main>
  );
}
