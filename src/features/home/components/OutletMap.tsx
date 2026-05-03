import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/navigation';

export function OutletMap() {
  const t = useTranslations('outlets');
  const { outletStats } = getHomeContent();

  return (
    <section className="section-padding bg-brand-50 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-8">
          <SectionHeading className="mb-4 text-brand-900">
            {t('heading')}
          </SectionHeading>
        </div>

        <div className="relative w-full max-w-3xl mx-auto h-[300px] md:h-[400px] mb-12 flex justify-center items-center">
          {/* Fallback map graphic styling matching the design */}
          <div className="w-full h-full text-brand-400 flex justify-center items-center">
             <div className="w-full max-w-2xl bg-brand-200/50 rounded-full blur-3xl absolute inset-0 m-auto h-[200px]" />
             <svg viewBox="0 0 800 300" className="w-full h-full fill-brand-400 relative z-10">
               {/* Simplified Indonesia Map Path placeholder */}
               <path d="M100,150 Q200,100 300,160 T500,180 T700,150 L680,180 Q600,220 500,200 T300,220 T150,180 Z" />
             </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8 text-center">
          <div>
            <div className="font-heading font-bold text-5xl text-brand-600 mb-2">{outletStats.outletCount}</div>
            <div className="font-label text-brand-900 uppercase tracking-widest">{t('outletCount')}</div>
          </div>
          <div>
            <div className="font-heading font-bold text-5xl text-brand-600 mb-2">{outletStats.cityCount}</div>
            <div className="font-label text-brand-900 uppercase tracking-widest">{t('cityCount')}</div>
          </div>
          <div>
            <div className="font-heading font-bold text-5xl text-brand-600 mb-2">{outletStats.provinceCount}</div>
            <div className="font-label text-brand-900 uppercase tracking-widest">{t('provinceCount')}</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-neutral-600 mb-6">{t('openHours')}</p>
          <Link href="/outlets">
            <Button variant="secondary" className="bg-brand-200 text-brand-800 hover:bg-brand-300">
              {t('visitUs')}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
