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
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden group" style={{ backgroundColor: '#EAE8E3' }}>
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

      {/* Navigation Arrows - Transparent Bordered Square */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '2rem', display: 'flex', alignItems: 'center', zIndex: 20 }}>
        <button 
          onClick={prevSlide}
          style={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'rgba(255, 255, 255, 1)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon style={{ width: '24px', height: '24px', strokeWidth: '1.5px' }} />
        </button>
      </div>
      
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: '2rem', display: 'flex', alignItems: 'center', zIndex: 20 }}>
        <button 
          onClick={nextSlide}
          style={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'rgba(255, 255, 255, 1)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateX(2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          aria-label="Next slide"
        >
          <ChevronRightIcon style={{ width: '24px', height: '24px', strokeWidth: '1.5px' }} />
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
