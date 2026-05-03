import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from './Container';
import Image from 'next/image';
import logoImg from '@/assets/logo.png';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  PhoneIcon, 
  MailIcon 
} from '@/components/ui/Icon';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-white font-sans">
      {/* 1. Brand Bar - White Background */}
      <div className="border-t border-neutral-100" style={{ padding: '8px 0' }}>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Actual Logo Image - Static Import */}
            <div className="w-12 md:w-20 h-auto shrink-0">
              <Link href="/">
                <Image 
                  src={logoImg} 
                  alt="Clarissa Logo" 
                  className="w-full h-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Tagline Center */}
            <div className="flex-1 text-center">
              <h2 className="text-xl md:text-3xl font-heading font-semibold text-neutral-800 tracking-tight">
                {t('tagline')}
              </h2>
            </div>

            {/* Socials Right */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium text-neutral-700 mb-2">{t('followUs')}</span>
              <div className="flex gap-4">
                {[
                  { icon: InstagramIcon, href: t('socials.instagram') },
                  { icon: (props: any) => (
                    <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
                  ), href: t('socials.tiktok') },
                  { icon: FacebookIcon, href: t('socials.facebook') },
                  { icon: TwitterIcon, href: t('socials.twitter') }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    className="text-neutral-800 hover:text-brand-900 transition-all"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Navigation Section - Light Pink Background */}
      <div className="bg-[#fdf2f2] pt-14 pb-20 border-t border-brand-100/50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
            {/* FASHION */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('fashion.title')}</h4>
              <ul className="flex flex-col gap-3">
                {Object.entries(t.raw('fashion.items')).map(([key, label]: [string, any]) => (
                  <li key={key}>
                    <Link href={`/fashion/${key}`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* BEAUTY */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('beauty.title')}</h4>
              <ul className="flex flex-col gap-3">
                {Object.entries(t.raw('beauty.items')).map(([key, label]: [string, any]) => (
                  <li key={key}>
                    <Link href={`/beauty/${key}`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* INFORMASI PELANGGAN & TOKO ONLINE */}
            <div className="col-span-1 flex flex-col gap-10">
              <div>
                <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('customer.title')}</h4>
                <ul className="flex flex-col gap-3">
                  {Object.entries(t.raw('customer.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/${key}`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('online.title')}</h4>
                <ul className="flex flex-col gap-3">
                  {Object.entries(t.raw('online.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/shop/${key}`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* TENTANG CLARISSA & KONTAK */}
            <div className="col-span-1 flex flex-col gap-10">
              <div>
                <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('about.title')}</h4>
                <ul className="flex flex-col gap-3">
                  {Object.entries(t.raw('about.items')).map(([key, label]: [string, any]) => (
                    <li key={key}>
                      <Link href={`/about/${key}`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-800 uppercase mb-6 tracking-wide">{t('contact.title')}</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-neutral-800" />
                    <span className="text-sm font-medium text-neutral-800">08778016399</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailIcon className="w-5 h-5 text-neutral-800" />
                    <span className="text-sm font-medium text-neutral-800 break-all">clarissastoremarketing@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* JADILAH MEMBER */}
            <div className="col-span-1">
              <h4 className="text-base font-bold text-neutral-800 uppercase mb-4 tracking-wide">{t('member.title')}</h4>
              <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
                {t('member.description')}
              </p>
              <Link 
                href="/member" 
                className="text-base font-bold text-neutral-800 uppercase border-b-2 border-neutral-800 pb-1 hover:text-brand-900 hover:border-brand-900 transition-all inline-block"
              >
                {t('member.button')}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Copyright Bar - Dark Background */}
      <div className="bg-neutral-900 py-8 text-white border-t border-neutral-800">
        <Container>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-6 text-xs font-medium uppercase tracking-wider">
              <Link href="/terms" className="hover:text-brand-200 transition-colors">{t('bottom.terms')}</Link>
              <span className="opacity-40 text-white">|</span>
              <Link href="/privacy" className="hover:text-brand-200 transition-colors">{t('bottom.privacy')}</Link>
              <span className="opacity-40 text-white">|</span>
              <Link href="/cookies" className="hover:text-brand-200 transition-colors">{t('bottom.cookies')}</Link>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium tracking-wide">
              <p className="opacity-80">
                {t('bottom.copyright')}
              </p>
              <p className="opacity-60 uppercase tracking-[0.2em]">
                {t('bottom.madeBy')}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
