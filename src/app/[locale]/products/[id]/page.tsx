import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts';
import { ProductDetailView } from '@/features/products/components/ProductDetailView';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';

interface PageProps {
  params: {
    id: string;
    locale: string;
  };
}

// Generate static params for all products across all supported locales
export async function generateStaticParams() {
  const locales = ['id', 'en']; // Use supported locales
  
  const params = [];
  for (const locale of locales) {
    for (const product of MOCK_PRODUCTS) {
      params.push({ locale, id: product.id });
    }
  }
  
  return params;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white">
      <ProductDetailView product={product} />
      
      {/* Brand Values Bar as a footer for the product page */}
      <div className="bg-brand-50/30">
        <FeaturesBar />
      </div>
    </main>
  );
}
