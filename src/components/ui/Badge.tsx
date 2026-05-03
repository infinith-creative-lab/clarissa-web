import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'brand' | 'teal' | 'gold';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-900 text-white',
  brand: 'bg-brand-500 text-white',
  teal: 'bg-accent-teal text-white',
  gold: 'bg-accent-gold text-white',
};

export function Badge({
  variant = 'default',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-3 py-1 text-xs font-label font-bold uppercase tracking-wider rounded-full',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Starburst badge matching the "NEW!" design element.
 */
export function StarburstBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center w-20 h-20 bg-neutral-900 text-white rounded-full',
        'font-heading font-bold text-lg',
        'before:absolute before:inset-0 before:bg-neutral-900 before:rounded-full before:rotate-45',
        'z-10',
        className,
      )}
    >
      <span className="relative z-20">{children}</span>
    </div>
  );
}
