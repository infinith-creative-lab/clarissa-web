import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/navigation';

export function EventSection() {
  const t = useTranslations('events');
  const { events } = getHomeContent();

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-12">
          <SectionHeading className="mb-4 text-brand-900">
            {t('heading')}
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col sm:flex-row overflow-hidden border border-brand-100 shadow-none hover:shadow-card">
              <div className="sm:w-1/3 aspect-square sm:aspect-auto relative bg-neutral-200">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="sm:w-2/3 p-6 flex flex-col justify-center">
                <h3 className="font-heading font-bold text-xl text-brand-700 mb-2">{event.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{event.description}</p>
                <Link href={event.ctaLink} className="mt-auto">
                  <Button variant="outline" size="sm" className="rounded-full">
                    {t('readMore')}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/events">
            <Button variant="secondary" className="bg-brand-200 text-brand-800 hover:bg-brand-300">
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
