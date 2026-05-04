import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from './Container';
import { SearchIcon, UserIcon, MapPinIcon, MenuIcon } from '@/components/ui/Icon';

export function Header() {
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-100 border-b border-brand-200 shadow-sm">
      <Container className="flex h-16 md:h-24 items-center justify-between">

        {/* Left: Search Bar */}
        <div className="hidden md:flex flex-1 items-center">
          <div className="relative w-72 group">
            <input
              type="text"
              placeholder={t('search')}
              className="w-full bg-transparent border-b border-neutral-300 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 placeholder:uppercase placeholder:tracking-[0.2em] focus:outline-none transition-all duration-500"
            />
            {/* Elegant Focus Line Decor */}
            <div className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 transition-all duration-700 group-focus-within:w-full" />
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <SearchIcon className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors duration-500" />
            </div>
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
        <div className="flex-1 flex items-center justify-end gap-8 text-sm font-semibold text-neutral-700">
          <Link href="/about" className="group hidden md:flex items-center gap-2.5 hover:text-brand-900 transition-colors uppercase tracking-[0.18em] text-[13px] font-bold">
            <MapPinIcon className="w-4 h-4 text-neutral-500 group-hover:text-brand-900 transition-colors" /> {tHeader('storeLocation')}
          </Link>
          
          <div className="hidden md:block w-px h-4 bg-neutral-300" aria-hidden="true" />

          <Link href="/login" className="group hidden md:flex items-center gap-2.5 hover:text-brand-900 transition-colors uppercase tracking-[0.18em] text-[13px] font-bold">
            <UserIcon className="w-4 h-4 text-neutral-500 group-hover:text-brand-900 transition-colors" /> {tHeader('login')}
          </Link>

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
