import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { ContactContent } from '@/features/contact/components/ContactContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ContactContent />
    </main>
  );
}
