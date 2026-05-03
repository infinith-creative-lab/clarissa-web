'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, localeFlags, type Locale } from '@/lib/i18n/config';
import { useTransition } from 'react';
import { cn } from '@/lib/utils/cn';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="relative">
      <select
        className={cn(
          'appearance-none bg-transparent py-1 pl-2 pr-6 text-sm font-label font-medium outline-none cursor-pointer',
          isPending && 'opacity-50'
        )}
        value={locale}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs">
        ▼
      </span>
    </div>
  );
}
