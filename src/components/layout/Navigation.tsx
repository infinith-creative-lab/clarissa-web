import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export function Navigation() {
  const t = useTranslations('nav');

  const links = [
    { href: '/', label: t('allProducts') },
    { href: '/fashion', label: t('fashion') },
    { href: '/beauty', label: t('beauty') },
    { href: '/accessories', label: t('accessories') },
    { href: '/about', label: t('about') },
    { href: '/outlets', label: t('outlets') },
    { href: '/promo', label: t('promo') },
  ];

  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-label font-medium text-neutral-600 hover:text-brand-600 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
