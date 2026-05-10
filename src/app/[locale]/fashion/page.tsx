import { redirect } from '@/lib/i18n/navigation';

export default async function FashionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect({ href: '/fashion/products', locale });
}
