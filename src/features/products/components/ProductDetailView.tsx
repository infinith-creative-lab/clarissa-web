'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Product } from '../data/mockProducts';
import { cn } from '@/lib/utils/cn';
import { ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { getOutletStats } from '@/lib/content/provider';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const t = useTranslations();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [activeTab, setActiveTab] = useState<'details' | 'guide'>('details');

  const stores = getOutletStats().stores.slice(0, 5); // Get a few stores for the availability section

  // Formatting Price
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Container className="py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Gallery Navigation */}
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-neutral-900" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
                >
                  <ChevronRightIcon className="w-5 h-5 text-neutral-900" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "relative w-24 aspect-[3/4] flex-shrink-0 overflow-hidden border-2 transition-all duration-300 cursor-pointer",
                  activeImage === idx ? "border-neutral-900" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-neutral-900 uppercase tracking-widest leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-10">
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {t('catalog.size' as any) || 'UKURAN'}
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[50px] h-12 flex items-center justify-center border text-[13px] font-bold tracking-widest transition-all duration-300 cursor-pointer",
                        selectedSize === size 
                          ? "bg-neutral-900 border-neutral-900 text-white" 
                          : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {t('catalog.color' as any) || 'WARNA'}
                </span>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 border transition-all duration-300 cursor-pointer rounded-full",
                        selectedColor === color.name 
                          ? "border-neutral-900 bg-neutral-50" 
                          : "border-neutral-100 hover:border-neutral-300"
                      )}
                    >
                      <div className="w-4 h-4 rounded-full border border-neutral-200" style={{ backgroundColor: color.hex }} />
                      <span className="text-[11px] font-bold tracking-widest uppercase">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Check */}
            <div className="space-y-5 pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-xs font-bold tracking-[0.2em] uppercase">CEK KETERSEDIAAN</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    className="flex items-center gap-3 px-6 py-3 border border-brand-100 text-brand-800 bg-brand-50/30 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all duration-500 whitespace-nowrap cursor-pointer rounded-full group"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase">{store.city}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs & Content */}
            <div className="pt-10 border-t border-neutral-100">
              <div className="flex gap-10 mb-8">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={cn(
                    "text-[13px] font-bold tracking-[0.2em] uppercase relative py-2 cursor-pointer transition-colors",
                    activeTab === 'details' ? "text-neutral-900" : "text-neutral-300 hover:text-neutral-500"
                  )}
                >
                  DETAILS
                  {activeTab === 'details' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('guide')}
                  className={cn(
                    "text-[13px] font-bold tracking-[0.2em] uppercase relative py-2 cursor-pointer transition-colors",
                    activeTab === 'guide' ? "text-neutral-900" : "text-neutral-300 hover:text-neutral-500"
                  )}
                >
                  PANDUAN UKURAN
                  {activeTab === 'guide' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900" />
                  )}
                </button>
              </div>

              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <p className="text-neutral-600 leading-relaxed max-w-2xl">
                        {product.description}
                      </p>
                      {product.details && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                          {product.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-[13px] text-neutral-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-300 mt-1.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-neutral-600 leading-relaxed"
                    >
                      <p>{product.sizeGuide || 'Size guide content will be available soon.'}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
