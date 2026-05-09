import { cn } from '@/lib/utils/cn';

type DividerVariant = 'line' | 'dot' | 'gradient';

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
  color?: 'brand' | 'neutral' | 'white';
}

const colorMap = {
  brand: {
    line: 'bg-brand-200',
    dot: 'bg-brand-400',
    gradientFrom: 'from-transparent',
    gradientVia: 'via-brand-300',
    gradientTo: 'to-transparent',
  },
  neutral: {
    line: 'bg-neutral-200',
    dot: 'bg-neutral-400',
    gradientFrom: 'from-transparent',
    gradientVia: 'via-neutral-300',
    gradientTo: 'to-transparent',
  },
  white: {
    line: 'bg-white/30',
    dot: 'bg-white/60',
    gradientFrom: 'from-transparent',
    gradientVia: 'via-white/40',
    gradientTo: 'to-transparent',
  },
};

/**
 * Reusable decorative divider component matching the Clarissa design system.
 * Supports line, dot, and gradient variants with brand/neutral/white color schemes.
 */
export function Divider({
  variant = 'line',
  className,
  color = 'brand',
}: DividerProps) {
  const colors = colorMap[color];

  if (variant === 'dot') {
    return (
      <div className={cn('flex items-center justify-center gap-2', className)}>
        <div className={cn('w-1 h-1 rounded-full', colors.dot)} />
        <div className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
        <div className={cn('w-1 h-1 rounded-full', colors.dot)} />
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'h-px w-full bg-gradient-to-r mx-auto',
          colors.gradientFrom,
          colors.gradientVia,
          colors.gradientTo,
          className,
        )}
      />
    );
  }

  // Default: line
  return (
    <div className={cn('h-1 w-16 rounded-full mx-auto', colors.line, className)} />
  );
}
