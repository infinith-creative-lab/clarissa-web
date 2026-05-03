'use client';

import { useState, useEffect } from 'react';
import { getHomeContent } from '@/lib/content/provider';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icon';

export function HeroSection() {
  const content = getHomeContent().hero;

  // Simulated Carousel Slides from CMS
  const slides = [
    content.backgroundImage, 
    content.backgroundImage, // Slide 2
    content.backgroundImage, // Slide 3
  ];

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

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 md:left-12 flex items-center z-20">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center text-neutral-800 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-4 md:right-12 flex items-center z-20">
        <button 
          onClick={nextSlide}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center text-neutral-800 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 h-2.5 bg-white shadow-sm' 
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/80 shadow-sm'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
