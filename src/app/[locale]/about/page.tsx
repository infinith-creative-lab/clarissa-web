import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-heading font-bold tracking-[0.2em] uppercase">About Us</h1>
        <p className="mt-8 text-neutral-500 italic">Content coming soon...</p>
      </div>
    </main>
  );
}
