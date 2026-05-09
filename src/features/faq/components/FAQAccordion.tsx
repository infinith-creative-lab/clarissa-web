'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { getFAQContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { ChevronDownIcon } from '@/components/ui/Icon';
import { FAQCategory, FAQItem } from '@/lib/content/types';

interface FAQAccordionProps {
  categories?: FAQCategory[];
  title?: string;
}

/**
 * Reusable and elegant accordion for FAQ items.
 */
export function FAQAccordion({ 
  categories: customCategories, 
  title
}: FAQAccordionProps) {
  const t = useTranslations();
  const content = getFAQContent();
  const categories = customCategories || content.categories;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-neutral-900 mb-20 text-center tracking-tight">
          {title}
        </h2>
      )}

      {categories.map((category: FAQCategory) => (
        <div key={category.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 mb-24 last:mb-0">
          {/* Category Title - Sticky on desktop */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-[11px] font-bold text-brand-600 tracking-[0.5em] uppercase mb-4">
                {t(category.titleKey as any)}
              </h3>
              <div className="w-12 h-px bg-brand-200" />
            </div>
          </div>

          {/* Accordion Items */}
          <div className="lg:col-span-8 divide-y divide-neutral-100 border-t border-neutral-100">
            {category.items.map((item: FAQItem, index: number) => {
              const isOpen = openId === item.id;
              const displayIndex = (index + 1).toString().padStart(2, '0');
              
              return (
                <div key={item.id} className="group">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start justify-between py-10 text-left transition-all duration-500"
                  >
                    <div className="flex gap-6 md:gap-10">
                      <span className="text-[10px] font-bold text-neutral-300 tracking-widest mt-2">
                        {displayIndex}
                      </span>
                      <span className={`text-xl md:text-2xl lg:text-3xl font-serif transition-all duration-500 ${isOpen ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-900'}`}>
                        {t(item.questionKey as any)}
                      </span>
                    </div>
                    
                    {/* Animated Plus/Minus Icon */}
                    <div className="relative w-6 h-6 mt-2 flex-shrink-0">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-900 transition-transform duration-500" />
                      <div className={`absolute top-0 left-1/2 w-px h-full bg-neutral-900 transition-transform duration-500 ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-12 md:pl-20 pb-12 pr-10 text-base md:text-lg text-neutral-600 leading-relaxed font-light tracking-wide max-w-2xl">
                          {t(item.answerKey as any)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
}
