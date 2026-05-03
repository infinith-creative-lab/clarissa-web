import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  children: string;
  decorated?: boolean;
  centered?: boolean;
  className?: string;
}

/**
 * Section heading component matching the Clarissa design system.
 * `decorated` adds horizontal lines on both sides (matches "CHOOSE YOUR STYLE" pattern).
 */
export function SectionHeading({
  children,
  decorated = false,
  centered = true,
  className,
}: SectionHeadingProps) {
  if (decorated) {
    return (
      <h2
        className={cn(
          'heading-decorated',
          centered && 'justify-center',
          className,
        )}
      >
        {children}
      </h2>
    );
  }

  return (
    <h2
      className={cn(
        'font-heading text-2xl md:text-3xl font-bold tracking-wide uppercase',
        centered && 'text-center',
        className,
      )}
    >
      {children}
    </h2>
  );
}
