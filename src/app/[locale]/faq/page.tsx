import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { FAQContent } from '@/features/faq/components/FAQContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  
  return buildMetadata({
    title: `${t('heroTitle')} — Clarissa`,
    description: t('heroSubtitle'),
    locale,
  });
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <FAQContent />
    </main>
  );
}
