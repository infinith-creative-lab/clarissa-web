import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { DesignAccents } from '@/components/ui/DesignAccents';
import { ArrowRightIcon } from '@/components/ui/Icon';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center bg-white overflow-hidden py-24">
      {/* Editorial Design Accents */}
      <DesignAccents variant="editorial" />
      
      <Container className="relative z-10 text-center">
        <div className="relative mb-12 flex flex-col items-center">
          {/* Artistic 404 Background */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[25rem] font-heading font-black text-brand-50 select-none opacity-40 pointer-events-none">
            404
          </span>
          
          {/* Main Title */}
          <div className="relative z-10">
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-neutral-900 tracking-[0.2em] uppercase mb-6">
              {t('title')}
            </h1>
            <div className="w-24 h-1 bg-brand-300 mx-auto" />
          </div>
        </div>

        <p className="font-heading italic text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          "{t('description')}"
        </p>

        <Link href="/">
          <button className="group relative inline-flex items-center gap-4 px-12 py-5 bg-neutral-900 text-white font-heading text-lg tracking-widest uppercase transition-all duration-500 hover:bg-brand-900 hover:pl-14 hover:pr-10 cursor-pointer">
            <span className="relative z-10">{t('backHome')}</span>
            <ArrowRightIcon className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
            
            {/* Button Decorative Underline */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-200 transition-all duration-500 group-hover:w-full" />
          </button>
        </Link>
      </Container>

      {/* Decorative Floating Text */}
      <div className="absolute bottom-10 left-10 text-neutral-200 font-heading text-xs tracking-[0.5em] uppercase [writing-mode:vertical-lr] hidden lg:block select-none opacity-50">
        Clarissa Boutique • Indonesia
      </div>
    </div>
  );
}
