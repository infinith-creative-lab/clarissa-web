'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { useTransition, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { ChevronDownIcon } from '@/components/ui/Icon';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 py-1 px-2 text-[13px] font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer",
          isPending ? "opacity-50 pointer-events-none" : "text-neutral-700 hover:text-neutral-900"
        )}
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDownIcon 
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-3 w-32 bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] rounded-none overflow-hidden"
          >
            <div className="py-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "w-full text-left px-5 py-2.5 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 cursor-pointer",
                    locale === loc 
                      ? "bg-neutral-900 text-brand-300" 
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                  )}
                >
                  {loc === 'id' ? 'Bahasa (ID)' : 'English (EN)'}
                </button>
              ))}
            </div>
            
            {/* Subtle indicator for the selected locale in the list */}
            <div className="absolute top-0 right-0 h-full w-0.5 bg-neutral-900/10 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
