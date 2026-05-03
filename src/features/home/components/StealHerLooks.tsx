import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';

export function StealHerLooks() {
  const t = useTranslations('looks');
  const { looks } = getHomeContent();

  return (
    <section className="section-padding bg-neutral-50 overflow-hidden">
      <Container>
        <div className="mb-10 text-left">
          <SectionHeading centered={false} className="text-brand-900 mb-2">
            {t('heading')}
          </SectionHeading>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
          {looks.map((look) => (
            <Card key={look.id} className="min-w-[300px] md:min-w-[400px] snap-center shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
                <img 
                  src={look.mainImage} 
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-heading font-bold text-xl mb-3">{look.title}</h3>
                  <div className="flex gap-2">
                    {look.products.map((product) => (
                      <div key={product.id} className="w-12 h-12 rounded bg-white overflow-hidden border border-white/20">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
