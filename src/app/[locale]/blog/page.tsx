import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.meta' });
  
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/blog',
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');

  return (
    <main>
      <section className="bg-brand-50 py-16 text-center">
        <Container>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-900 mb-4">{t('heading')}</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </Container>
      </section>

      <section className="section-padding bg-white min-h-[40vh] flex items-center justify-center">
        <Container className="text-center">
          <SectionHeading className="mb-4">{t('comingSoon')}</SectionHeading>
        </Container>
      </section>
    </main>
  );
}
