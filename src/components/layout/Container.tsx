import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('container-main', className)}>
      {children}
    </div>
  );
}
