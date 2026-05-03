import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

/**
 * Next.js 16 Proxy — replaces middleware.ts
 * Handles locale detection, routing, and redirects at the edge.
 */
export const proxy = createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - /api (API routes)
     * - /_next (Next.js internals)
     * - /images, /icons, /fonts (static assets)
     * - favicon.ico, robots.txt, sitemap.xml, manifest.json
     */
    '/((?!api|_next|images|icons|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json).*)',
  ],
};
