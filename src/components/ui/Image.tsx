'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string;
  fallback?: string;
  containerClassName?: string;
}

export function Image({ 
  className, 
  alt, 
  fallback = '/images/placeholder.webp', 
  containerClassName,
  src,
  ...props 
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn('overflow-hidden relative bg-neutral-100', containerClassName)}>
      <NextImage
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        alt={alt}
        src={error ? fallback : src}
        {...props}
      />
    </div>
  );
}
