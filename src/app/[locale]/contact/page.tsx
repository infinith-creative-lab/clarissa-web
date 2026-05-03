import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
  const t = await getTranslations('contact');

  return (
    <main>
      <section className="bg-brand-50 py-16 text-center">
        <Container>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-900 mb-4">{t('heading')}</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <SectionHeading centered={false} className="mb-8">Kirim Pesan</SectionHeading>
              {/* Note: Form logic would be handled via Server Actions or Client Component */}
              <form className="space-y-6">
                <Input label={t('form.name')} placeholder={t('form.name')} id="name" name="name" />
                <Input label={t('form.email')} placeholder={t('form.email')} type="email" id="email" name="email" />
                <Input label={t('form.phone')} placeholder={t('form.phone')} type="tel" id="phone" name="phone" />
                <Input label={t('form.subject')} placeholder={t('form.subject')} id="subject" name="subject" />
                <Textarea label={t('form.message')} placeholder={t('form.message')} id="message" name="message" />
                <Button type="button" fullWidth size="lg">{t('form.submit')}</Button>
              </form>
            </div>

            <div>
              <SectionHeading centered={false} className="mb-8">Informasi Kontak</SectionHeading>
              <div className="space-y-8">
                <div>
                  <h4 className="font-heading font-bold text-lg mb-2">{t('info.addressTitle')}</h4>
                  <p className="text-neutral-600">{t('info.address')}</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-2">{t('info.phoneTitle')}</h4>
                  <p className="text-neutral-600">{t('info.phone')}</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-2">{t('info.emailTitle')}</h4>
                  <p className="text-neutral-600">{t('info.email')}</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-2">{t('info.hoursTitle')}</h4>
                  <p className="text-neutral-600">{t('info.hours')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
