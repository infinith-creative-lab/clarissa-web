/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { Card, CardImage } from '@/components/ui/Card';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/Button';

export function CategoryGrid() {
  const t = useTranslations();
  const { categories } = getHomeContent();

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-12">
          <SectionHeading decorated className="mb-4 text-brand-900">
            {t('categories.heading')}
          </SectionHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.id} href={category.link} className="block group">
              <Card className="h-64 md:h-80 bg-neutral-100">
                <CardImage 
                  src={category.image} 
                  alt={t(category.nameKey as any)}
                  className="h-full"
                  overlay={
                    <h3 className="text-white font-heading font-bold text-2xl tracking-wide uppercase">
                      {t(category.nameKey as any)}
                    </h3>
                  }
                />
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="font-body text-neutral-600 mb-6">
            {t('categories.description')}
          </p>
          <Link href="/fashion">
            <Button variant="secondary" className="bg-brand-200 text-brand-800">{t('categories.cta')}</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
