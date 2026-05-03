import { siteConfig } from '@/lib/seo/constants';
import { getAbsoluteUrl } from '@/lib/utils/url';

export function HreflangLinks({ path = '' }: { path?: string }) {
  return (
    <>
      {siteConfig.locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc === 'id' ? 'id-ID' : 'en-US'}
          href={getAbsoluteUrl(`/${loc}${path}`)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={getAbsoluteUrl(`/${siteConfig.defaultLocale}${path}`)}
      />
    </>
  );
}
