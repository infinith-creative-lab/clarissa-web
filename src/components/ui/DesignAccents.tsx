import { cn } from '@/lib/utils/cn';

interface DesignAccentsProps {
  className?: string;
  variant?: 'gold-lines' | 'editorial' | 'minimal';
  letter?: string;
  letterPosition?: 'left' | 'right';
  vPosition?: 'top' | 'bottom';
}

export function DesignAccents({ 
  className, 
  variant = 'editorial',
  letter = 'C',
  letterPosition = 'left',
  vPosition = 'top'
}: DesignAccentsProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden select-none z-0', className)}>
      {variant === 'editorial' && (
        <>
          {/* Faded Editorial Initial */}
          <div className={cn(
            "absolute text-[40rem] font-heading font-bold text-neutral-900/[0.02] leading-none transition-all duration-1000",
            vPosition === 'top' ? "-top-24" : "-bottom-24",
            letterPosition === 'left' ? "-left-20" : "-right-20"
          )}>
            {letter}
          </div>
          
          {/* Subtle Silk-like Gradient */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,238,238,0.3) 0%, transparent 70%)' }} />
          
          {/* Minimalist Vertical Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-neutral-300 to-transparent opacity-40" />
          
          {/* Gold Hairline Accents */}
          <div className="absolute top-1/4 -right-10 w-64 h-px" style={{ background: 'linear-gradient(to left, rgba(197,160,89,0.4), transparent)', transform: 'rotate(15deg)' }} />
          <div className="absolute bottom-1/4 -left-10 w-64 h-px" style={{ background: 'linear-gradient(to right, rgba(197,160,89,0.4), transparent)', transform: 'rotate(-15deg)' }} />
        </>
      )}

      {/* Micro-texture Overlay (Common for all variants) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}
