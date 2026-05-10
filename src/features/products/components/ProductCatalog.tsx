'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';
import { useState, useRef, useEffect, Suspense } from 'react';
import { ChevronDownIcon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { Pagination } from '@/components/ui/Pagination';

const ITEMS_PER_PAGE = 12;

interface ProductCatalogProps {
  rootCategory: 'fashion' | 'beauty';
  title: string;
  subtitle: string;
  description: string;
}

function ProductCatalogContent({ 
  rootCategory,
  title,
  subtitle,
  description 
}: ProductCatalogProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize state from URL or 'all'
  const initialCategory = searchParams.get('category') || 'all';
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortRef = useRef<HTMLDivElement>(null);

  // Sync state with URL changes (supports browser Back/Forward)
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveTab(category);
  }, [searchParams]);

  // Update URL when filter changes
  const handleTabChange = (category: string) => {
    setActiveTab(category);
    setCurrentPage(1); // Reset to page 1 on filter change
    
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { 
      scroll: false 
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Sort dropdown
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      // Categories more dropdown
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sort Options Config
  const sortOptions = [
    { id: 'newest', label: t('catalog.newest') },
    { id: 'best-seller', label: t('catalog.bestSeller') },
    { id: 'discount', label: 'Diskon' },
    { id: 'price-high', label: t('catalog.priceHighLow') },
    { id: 'price-low', label: t('catalog.priceLowHigh') },
    { id: 'az', label: t('catalog.az') },
    { id: 'za', label: t('catalog.za') },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.id === sortBy)?.label || '';

  // Deriving categories
  const baseProducts = MOCK_PRODUCTS.filter(p => p.category === rootCategory);
  const allSubCategories = Array.from(new Set(baseProducts.map(p => p.subCategory)));
  
  // Logic to split categories: 4 visible, others in a dropdown
  const visibleSubCats = allSubCategories.slice(0, 4);
  const hiddenSubCats = allSubCategories.slice(4);
  const isTabHidden = hiddenSubCats.includes(activeTab);

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more dropdown when clicking outside
  // 3. Apply secondary filtering based on the active tab
  let filteredProducts = activeTab === 'all' 
    ? baseProducts 
    : baseProducts.filter(p => p.subCategory === activeTab);

  // 4. Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'az') return a.name.localeCompare(b.name);
    if (sortBy === 'za') return b.name.localeCompare(a.name);
    if (sortBy === 'best-seller') {
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.rating - a.rating;
    }
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'discount') {
      const discountA = a.originalPrice ? a.originalPrice - a.price : 0;
      const discountB = b.originalPrice ? b.originalPrice - b.price : 0;
      return discountB - discountA;
    }
    return 0;
  });

  return (
    <>
      <main className="bg-white min-h-screen">
        {/* Catalog Section */}
        <section className="py-12 md:py-20">
          <Container>
            {/* Toolbar (Filters & Sort) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-neutral-50 gap-6">
              {/* Category Toggles */}
              <div className="flex items-center gap-8 md:gap-10 w-full md:w-auto">
                <button 
                  onClick={() => handleTabChange('all')}
                  className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap cursor-pointer ${
                    activeTab === 'all' ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'
                  }`}
                >
                  {t('nav.allProducts')}
                  {activeTab === 'all' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 animate-in fade-in slide-in-from-left-2 duration-500" />
                  )}
                </button>

                {visibleSubCats.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap cursor-pointer ${
                      activeTab === cat ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'
                    }`}
                  >
                    {t(`productCategories.${cat}` as any)}
                    {activeTab === cat && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 animate-in fade-in slide-in-from-left-2 duration-500" />
                    )}
                  </button>
                ))}

                {/* More / Others Dropdown */}
                {hiddenSubCats.length > 0 && (
                  <div className="relative" ref={moreRef}>
                    <button 
                      onClick={() => setIsMoreOpen(!isMoreOpen)}
                      className={`flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 py-2 cursor-pointer ${
                        isTabHidden ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'
                      }`}
                    >
                      {isTabHidden ? t(`productCategories.${activeTab}` as any) : t('catalog.others')}
                      <ChevronDownIcon 
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300",
                          isMoreOpen && "rotate-180"
                        )} 
                      />
                      {isTabHidden && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 animate-in fade-in slide-in-from-left-2 duration-500" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isMoreOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-full mt-3 w-56 bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] rounded-none overflow-hidden"
                        >
                          <div className="py-2">
                            {hiddenSubCats.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => {
                                  handleTabChange(cat);
                                  setIsMoreOpen(false);
                                }}
                                className={cn(
                                  "w-full text-left px-5 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 cursor-pointer",
                                  activeTab === cat 
                                    ? "bg-neutral-900 text-brand-300" 
                                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                                )}
                              >
                                {t(`productCategories.${cat}` as any)}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Stats & Sort Placeholder */}
              <div className="flex items-center justify-end w-full md:w-auto gap-8">
                
                {/* Custom Premium Sort Dropdown */}
                <div className="flex items-center gap-3 relative" ref={sortRef}>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest hidden sm:block whitespace-nowrap">
                    {t('catalog.sortBy')}:
                  </span>
                  
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {currentSortLabel}
                    </span>
                    <ChevronDownIcon 
                      className={cn(
                        "w-3.5 h-3.5 text-neutral-400 transition-transform duration-300",
                        isSortOpen && "rotate-180"
                      )} 
                    />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 top-full mt-3 w-64 bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] rounded-none overflow-hidden"
                      >
                        <div className="py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSortBy(option.id);
                                setIsSortOpen(false);
                                setCurrentPage(1);
                              }}
                              className={cn(
                                "w-full text-left px-5 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 cursor-pointer",
                                sortBy === option.id 
                                  ? "bg-neutral-900 text-brand-300" 
                                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {(() => {
              const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
              const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
              const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

              return (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20">
                    {paginatedProducts.map((product, idx) => (
                      <div 
                        key={product.id}
                        className="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between border-t border-neutral-100 pt-8 gap-8">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                      {t('catalog.itemsFound', { count: filteredProducts.length })}
                    </span>
                    
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="py-0" // Remove padding since we have container padding
                    />

                    {/* Empty div for flex balance on desktop */}
                    <div className="hidden md:block w-[140px]" />
                  </div>
                </>
              );
            })()}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-40 text-center space-y-4">
                <h3 className="text-2xl font-heading font-bold text-neutral-300 uppercase tracking-widest">No Products Found</h3>
                <p className="text-sm text-neutral-400 uppercase tracking-widest">Please try a different category or filter</p>
              </div>
            )}
          </Container>
        </section>
      </main>
      <div className="relative border-t border-neutral-100">
        <FeaturesBar />
      </div>
    </>
  );
}

export function ProductCatalog(props: ProductCatalogProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductCatalogContent {...props} />
    </Suspense>
  );
}
