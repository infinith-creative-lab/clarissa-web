import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <main className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading font-bold text-3xl mb-4">Blog Post: {slug}</h1>
          <p className="text-neutral-600">This is a placeholder for the blog post detail page.</p>
        </div>
      </Container>
    </main>
  );
}
