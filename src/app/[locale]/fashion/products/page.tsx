import { setRequestLocale } from 'next-intl/server';
import { ProductCatalog } from '@/features/products/components/ProductCatalog';

export default async function FashionProductsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProductCatalog 
      rootCategory="fashion"
      subtitle="Fashion"
      title="Collections"
      description="Curated essentials for the modern lifestyle. Timeless pieces, ethically sourced."
    />
  );
}
