'use client';

import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: 'dark' | 'light' | 'brand';
  height?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  className?: string;
}

const overlayStyles = {
  dark: 'bg-gradient-to-b from-black/60 via-black/40 to-black/70',
  light: 'bg-gradient-to-b from-white/40 via-white/20 to-white/60',
  brand: 'bg-gradient-to-b from-neutral-900/50 via-neutral-900/30 to-neutral-900/60',
};

const heightStyles = {
  sm: 'h-[300px] md:h-[400px]',
  md: 'h-[400px] md:h-[500px] lg:h-[550px]',
  lg: 'h-[500px] md:h-[600px] lg:h-[700px]',
};

/**
 * Full-width editorial hero banner component.
 * Reusable for About, Blog, Contact, and any future pages.
 *
 * Dashboard-ready: pass `title`, `subtitle`, and `backgroundImage` from CMS content.
 */
export function PageHero({
  title,
  subtitle,
  backgroundImage,
  overlay = 'brand',
  height = 'md',
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden flex items-center justify-center',
        heightStyles[height],
        className,
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[2000ms]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay */}
      <div className={cn('absolute inset-0 z-[1]', overlayStyles[overlay])} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative Top Line */}
        <div className="w-px h-12 bg-white/30 mx-auto mb-8" />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-[0.15em] uppercase leading-tight mb-6">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm md:text-base text-white/70 font-body tracking-[0.2em] uppercase max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}

        {/* Decorative Bottom Line */}
        <div className="w-px h-12 bg-white/30 mx-auto mt-8" />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/15 z-10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/15 z-10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/15 z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/15 z-10" />
    </section>
  );
}
