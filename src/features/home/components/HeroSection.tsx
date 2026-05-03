'use client';

import { useState, useEffect } from 'react';
import { getHomeContent } from '@/lib/content/provider';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icon';

export function HeroSection() {
  const slides = getHomeContent().hero;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] bg-[#EAE8E3] overflow-hidden group">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}

      {/* Navigation Arrows - Minimalist Naked Style */}
      <div className="absolute inset-y-0 left-8 md:left-12 flex items-center z-20">
        <button 
          onClick={prevSlide}
          className="text-white/40 hover:text-white transition-all duration-500 hover:-translate-x-1"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-10 h-10 md:w-12 md:h-12 stroke-[1px]" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-8 md:right-12 flex items-center z-20">
        <button 
          onClick={nextSlide}
          className="text-white/40 hover:text-white transition-all duration-500 hover:translate-x-1"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-10 h-10 md:w-12 md:h-12 stroke-[1px]" />
        </button>
      </div>

      {/* Editorial Pagination - Fraction Style (01 / 03) */}
      <div className="absolute bottom-12 right-12 md:right-20 z-20 flex items-center gap-4 text-white font-heading tracking-[0.3em]">
        <span className="text-xl md:text-2xl font-bold">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <div className="w-12 h-px bg-white/40" />
        <span className="text-sm md:text-base text-white/60">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
