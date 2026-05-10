'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Product } from '../data/mockProducts';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations();

  // Formatting Price
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      className="group flex flex-col h-full bg-white transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {/* Product Image */}
        <Image
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Hover Overlays */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Inner Border Design (Hover Only) */}
        <div className={`absolute inset-4 border border-white/60 z-10 pointer-events-none transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} />

        {/* Badges (White Style) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-neutral-900 text-[9px] font-bold px-3 py-1.5 tracking-[0.2em] uppercase shadow-sm w-fit">
              {t('productTags.new')}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-white text-brand-600 text-[9px] font-bold px-3 py-1.5 tracking-[0.2em] uppercase shadow-sm w-fit">
              {t('productTags.off', { percent: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) })}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-white text-neutral-900 text-[9px] font-bold px-3 py-1.5 tracking-[0.2em] uppercase shadow-sm w-fit">
              {t('productTags.bestSeller')}
            </span>
          )}
        </div>

        {/* Center Action Button */}
        <div className={`absolute inset-0 flex items-center justify-center z-30 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Link 
            href={`/products/${product.id}`}
            className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3.5 bg-white/95 backdrop-blur-sm text-neutral-900 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-brand-50 hover:text-brand-700 transition-all duration-300 transform scale-95 group-hover:scale-100 shadow-xl"
          >
            Lihat Detail Produk
          </Link>
        </div>
      </div>

      {/* Content (Outside) */}
      <div className="flex flex-col py-5 space-y-2">
        <Link 
          href={`/products/${product.id}`}
          className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest leading-relaxed group-hover:text-[#7A4B3A] transition-colors duration-300"
        >
          {product.name}
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-heading font-semibold text-neutral-900 tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-neutral-400 line-through tracking-wide">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
