/**
 * Get the base site URL from environment.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clarissa.id';
}

/**
 * Build an absolute URL from a relative path.
 */
export function getAbsoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/**
 * Build a canonical URL for a given locale and path.
 */
export function getCanonicalUrl(locale: string, path: string = ''): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}/${locale}${normalizedPath}`;
}
