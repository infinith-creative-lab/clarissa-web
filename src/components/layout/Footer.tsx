import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from './Container';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="font-heading font-bold text-3xl tracking-widest text-neutral-900 mb-4 block">
              CLARISSA
            </Link>
            <p className="text-sm text-neutral-600 max-w-xs mb-6">
              {t('tagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">{t('fashionTitle')}</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/fashion/women" className="hover:text-brand-600 transition-colors">{t('fashionLinks.women')}</Link></li>
              <li><Link href="/fashion/men" className="hover:text-brand-600 transition-colors">{t('fashionLinks.men')}</Link></li>
              <li><Link href="/fashion/muslim" className="hover:text-brand-600 transition-colors">{t('fashionLinks.muslim')}</Link></li>
              <li><Link href="/fashion/bags" className="hover:text-brand-600 transition-colors">{t('fashionLinks.bags')}</Link></li>
              <li><Link href="/fashion/shoes" className="hover:text-brand-600 transition-colors">{t('fashionLinks.shoes')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">{t('aboutTitle')}</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link href="/about" className="hover:text-brand-600 transition-colors">{t('aboutLinks.story')}</Link></li>
              <li><Link href="/careers" className="hover:text-brand-600 transition-colors">{t('aboutLinks.careers')}</Link></li>
              <li><Link href="/outlets" className="hover:text-brand-600 transition-colors">{t('aboutLinks.outlets')}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600 transition-colors">{t('aboutLinks.contact')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-brand-500 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-brand-500 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
