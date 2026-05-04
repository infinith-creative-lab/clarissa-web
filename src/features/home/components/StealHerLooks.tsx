"use client";

import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icon';
import { useRef } from 'react';

export function StealHerLooks() {
  const t = useTranslations('looks');
  const { looks } = getHomeContent();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-white overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.2em] uppercase text-neutral-900 mb-4">
              {t('heading')}
            </h2>
            <div className="w-24 h-1 bg-brand-200" />
          </div>
          
          {/* Custom Navigation */}
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center border border-neutral-200 hover:border-neutral-900 cursor-pointer"
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
              aria-label="Previous look"
            >
              <ChevronLeftIcon className="w-6 h-6 stroke-[1px]" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center border border-neutral-200 hover:border-neutral-900 cursor-pointer"
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
              aria-label="Next look"
            >
              <ChevronRightIcon className="w-6 h-6 stroke-[1px]" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10"
        >
          {looks.map((look, index) => (
            <div 
              key={look.id} 
              className="min-w-[85%] md:min-w-[450px] snap-center group"
            >
              <div className="relative overflow-hidden mb-8 shadow-sm" style={{ aspectRatio: '3/4' }}>
                <img 
                  src={look.mainImage} 
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="text-[10px] tracking-[0.4em] font-bold text-white uppercase bg-neutral-900/40 backdrop-blur-sm px-3 py-1">
                    LOOK {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-heading font-bold tracking-widest text-neutral-900 uppercase">
                  {look.title}
                </h3>
                
                <div className="flex gap-4">
                  {look.products.map((product) => (
                    <div key={product.id} className="group/item cursor-pointer">
                      <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden bg-neutral-50 border border-neutral-100 transition-all duration-500 group-hover/item:border-brand-200">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" 
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center ml-2">
                    <button className="text-[10px] tracking-widest font-bold uppercase border-b border-neutral-900 pb-1 hover:text-brand-600 hover:border-brand-600 transition-all duration-300">
                      EXPLORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
