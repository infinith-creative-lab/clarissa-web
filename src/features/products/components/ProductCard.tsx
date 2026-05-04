'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { Product } from '../data/mockProducts';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-neutral-900 text-white text-[10px] font-bold px-3 py-1 tracking-[0.2em] uppercase">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-brand-500 text-white text-[10px] font-bold px-3 py-1 tracking-[0.2em] uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className={`absolute bottom-0 left-0 w-full p-4 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button className="w-full bg-white/90 backdrop-blur-md text-neutral-900 py-3 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300">
            Quick Add +
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col py-5 space-y-2">
        <div className="flex justify-between items-start gap-4">
          <Link 
            href={`/products/${product.id}`}
            className="text-[13px] font-bold text-neutral-900 uppercase tracking-widest leading-relaxed hover:text-neutral-500 transition-colors"
          >
            {product.name}
          </Link>
        </div>
        
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

        {/* Color Indicators */}
        {product.colors && (
          <div className="flex gap-1.5 pt-2">
            {product.colors.map((color, idx) => (
              <div 
                key={idx}
                className="w-3 h-3 rounded-full border border-neutral-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
