import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from './Container';
import { SearchIcon, UserIcon, StoreIcon, ChevronDownIcon, MenuIcon } from '@/components/ui/Icon';

export function Header() {
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-100 border-b border-brand-200 shadow-sm">
      <Container className="flex h-16 md:h-24 items-center justify-between">
        
        {/* Left: Search Bar */}
        <div className="hidden md:flex flex-1 items-center">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder={t('search')}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-brand-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-300 shadow-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-brand-900">
              <SearchIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-heading font-bold text-3xl md:text-5xl tracking-[0.1em] text-neutral-900 leading-none group-hover:text-brand-900 transition-colors">
              CLARISSA
            </span>
            <span className="text-[9px] md:text-xs tracking-[0.2em] text-neutral-600 mt-2 font-bold uppercase">
              {tHeader('subtitle')}
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-6 text-sm font-semibold text-neutral-700">
          <Link href="/login" className="hidden md:flex items-center gap-2 hover:text-brand-900 transition-colors">
            <UserIcon className="w-4 h-4" /> {tHeader('login')}
          </Link>
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-brand-900 transition-colors uppercase">
            <StoreIcon className="w-4 h-4" /> {tHeader('storeLocation')} <ChevronDownIcon className="w-4 h-4" />
          </div>
          
          {/* Mobile Actions */}
          <button className="p-2 hover:bg-brand-100 rounded-full md:hidden text-neutral-600" aria-label={t('search')}>
             <SearchIcon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-brand-100 rounded-full md:hidden text-neutral-600" aria-label={t('menu')}>
             <MenuIcon className="w-5 h-5" />
          </button>
        </div>

      </Container>
    </header>
  );
}
