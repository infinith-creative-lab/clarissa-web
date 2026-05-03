import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <main>
      <section className="bg-brand-50 section-padding text-center">
        <Container>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-900 mb-4">{t('heroTitle')}</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{t('heroSubtitle')}</p>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container className="max-w-4xl">
          <div className="space-y-16">
            <div className="text-center">
              <SectionHeading className="mb-6">{t('storyTitle')}</SectionHeading>
              <p className="text-neutral-700 leading-relaxed">{t('storyContent')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
              <div>
                <SectionHeading centered={false} className="mb-4">{t('missionTitle')}</SectionHeading>
                <p className="text-neutral-700 leading-relaxed">{t('missionContent')}</p>
              </div>
              <div>
                <SectionHeading centered={false} className="mb-4">{t('visionTitle')}</SectionHeading>
                <p className="text-neutral-700 leading-relaxed">{t('visionContent')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
