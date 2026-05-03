import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { Link } from '@/lib/i18n/navigation';
import { MailIcon, PhoneIcon, HelpCircleIcon } from '@/components/ui/Icon';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';

export function TopBar() {
  const t = useTranslations('topBar');
  const tNav = useTranslations('nav');

  return (
    <div className="w-full flex flex-col">
      {/* Upper Tab Layer */}
      <div className="bg-brand-50 text-xs hidden lg:block pt-2">
        <Container className="flex justify-between items-end">
          {/* Tabs */}
          <div className="flex items-end gap-2 px-2">
            <Link 
              href="/fashion" 
              className="bg-neutral-900 text-brand-100 px-6 py-2.5 rounded-t-lg font-medium text-xs tracking-wider uppercase"
            >
              {tNav('fashion')}
            </Link>
            <Link 
              href="/beauty" 
              className="bg-white text-neutral-600 border border-neutral-300 border-b-0 px-6 py-2.5 rounded-t-lg font-medium text-xs tracking-wider hover:bg-neutral-50 transition-colors uppercase"
            >
              {tNav('beauty')}
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-6 pb-2.5 text-neutral-600 font-medium">
            <span className="flex items-center gap-2 hover:text-brand-900 cursor-pointer transition-colors">
              <MailIcon className="w-4 h-4" /> clarissastoremarketing@gmail.com
            </span>
            <span className="flex items-center gap-2 hover:text-brand-900 cursor-pointer transition-colors">
              <PhoneIcon className="w-4 h-4" /> 08778016399
            </span>
            <Link href="/faq" className="flex items-center gap-2 hover:text-brand-900 transition-colors uppercase">
              <HelpCircleIcon className="w-4 h-4" /> {t('faq')}
            </Link>
            <div className="pl-4 border-l border-neutral-300">
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </div>

      {/* Announcement Bar (Marquee) */}
      <div className="bg-neutral-900 text-brand-100 text-[10px] md:text-xs py-2 uppercase tracking-widest font-medium w-full">
        <Container>
          <div className="flex w-full">
            {/* Marquee Wrapper with Smooth Gradient Mask for fade in/out effect at the exact container edges */}
            <div 
              className="flex-1 overflow-hidden flex relative group"
              style={{ 
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)'
              }}
            >
              <div 
                className="animate-marquee whitespace-nowrap flex items-center gap-16 pl-16 shrink-0 group-hover:[animation-play-state:paused] cursor-default"
                style={{ animationDuration: '40s' }}
              >
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
              </div>
              <div 
                className="animate-marquee whitespace-nowrap flex items-center gap-16 pl-16 shrink-0 group-hover:[animation-play-state:paused] cursor-default" 
                aria-hidden="true"
                style={{ animationDuration: '40s' }}
              >
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement1')}</span>
                <span className="text-neutral-500">•</span>
                <span>{t('announcement2')}</span>
                <span className="text-neutral-500">•</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
