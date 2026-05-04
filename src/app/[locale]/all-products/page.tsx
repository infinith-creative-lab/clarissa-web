import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { ProductCard } from '@/features/products/components/ProductCard';
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

export default async function AllProductsPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ category?: string; sort?: string }> 
}) {
  const { locale } = await params;
  const { category, sort } = await searchParams;
  setRequestLocale(locale);

  // Simple Filtering Logic (Server Side)
  let filteredProducts = MOCK_PRODUCTS;
  if (category && category !== 'all') {
    filteredProducts = MOCK_PRODUCTS.filter(p => p.category === category);
  }

  return (
    <>
      <main className="bg-white min-h-screen pt-12">
        {/* Header Section */}
        <div className="border-b border-neutral-100 pb-16">
          <Container>
            <div className="flex flex-col items-center text-center space-y-6">
              <span className="text-[11px] font-bold tracking-[0.6em] text-neutral-400 uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
                Collections
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-neutral-900 uppercase leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
                All Products
              </h1>
              <p className="max-w-xl text-sm text-neutral-500 tracking-widest uppercase leading-loose animate-in fade-in slide-in-from-bottom-10 duration-1000">
                Curated essentials for the modern lifestyle. <br className="hidden md:block" />
                Timeless pieces, ethically sourced.
              </p>
            </div>
          </Container>
        </div>

        {/* Catalog Section */}
        <section className="py-12 md:py-20">
          <Container>
            {/* Toolbar (Filters & Sort) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-neutral-50 gap-6">
              {/* Category Toggles */}
              <div className="flex items-center gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                {['all', 'fashion', 'beauty'].map((cat) => (
                  <button 
                    key={cat}
                    className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap ${
                      (category === cat || (!category && cat === 'all')) ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'
                    }`}
                  >
                    {cat}
                    {(category === cat || (!category && cat === 'all')) && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 animate-in fade-in slide-in-from-left-2 duration-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Stats & Sort Placeholder */}
              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8">
                <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
                  {filteredProducts.length} Items Found
                </span>
                <select className="bg-transparent border-none text-[11px] font-bold tracking-[0.15em] uppercase focus:outline-none cursor-pointer">
                  <option>Sort By: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20">
              {filteredProducts.map((product, idx) => (
                <div 
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

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
