import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <div className="flex-grow flex items-center justify-center section-padding text-center bg-white">
      <Container>
        <h1 className="font-heading font-bold text-8xl text-brand-200 mb-4">404</h1>
        <h2 className="font-heading font-bold text-3xl text-brand-900 mb-4">{t('title')}</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">{t('description')}</p>
        <Link href="/">
          <Button>{t('backHome')}</Button>
        </Link>
      </Container>
    </div>
  );
}
