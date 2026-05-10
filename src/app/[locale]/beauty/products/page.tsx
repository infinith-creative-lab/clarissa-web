import { setRequestLocale } from 'next-intl/server';
import { ProductCatalog } from '@/features/products/components/ProductCatalog';

export default async function BeautyProductsPage({ 
  params 
}: { 
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProductCatalog 
      rootCategory="beauty"
      subtitle="Beauty"
      title="Collections"
      description="Elevate your daily ritual. Premium skincare and cosmetics for your natural glow."
    />
  );
}
