import { cn } from '@/lib/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-label font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border border-neutral-300',
          'font-body text-sm text-neutral-900 placeholder:text-neutral-400',
          'transition-all duration-[var(--transition-fast)]',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none',
          error && 'border-error focus:border-error focus:ring-red-200',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-error font-label">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-label font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border border-neutral-300',
          'font-body text-sm text-neutral-900 placeholder:text-neutral-400',
          'transition-all duration-[var(--transition-fast)]',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none',
          'resize-y min-h-[120px]',
          error && 'border-error focus:border-error focus:ring-red-200',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-error font-label">{error}</p>
      )}
    </div>
  );
}
