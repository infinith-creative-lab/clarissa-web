'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

/**
 * Enterprise-grade animated counter with IntersectionObserver trigger.
 * Extracted as a shared reusable component from the Clarissa design system.
 *
 * Dashboard-ready: pass `end`, `suffix`, and `label` from CMS content.
 */
export function StatCounter({
  end,
  duration = 1200,
  suffix = '',
  label,
  className,
  valueClassName,
  labelClassName,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic for a polished feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div
        className={cn(
          'text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-neutral-900 tracking-tighter leading-none',
          valueClassName,
        )}
      >
        {count}
        {suffix && (
          <span className="text-brand-500 ml-0.5">{suffix}</span>
        )}
      </div>
      {label && (
        <div
          className={cn(
            'mt-3 text-[10px] tracking-[0.5em] font-bold text-neutral-400 uppercase',
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
