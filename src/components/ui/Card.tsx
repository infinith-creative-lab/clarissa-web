import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl overflow-hidden shadow-card',
        hover && 'card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardImage({
  src,
  alt,
  className,
  overlay,
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: ReactNode;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-[var(--transition-slow)] group-hover:scale-105"
        loading="lazy"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/20 flex items-end p-4">
          {overlay}
        </div>
      )}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('p-4', className)}>{children}</div>;
}
