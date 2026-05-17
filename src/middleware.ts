import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

/**
 * Next.js Middleware
 * Handles locale detection, routing, and redirects at the edge.
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - /api (API routes)
     * - /_next (Next.js internals)
     * - /images, /icons, /fonts (static assets)
     * - favicon.ico, robots.txt, sitemap.xml, manifest.json
     */
    '/((?!api|_next|assets|images|icons|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|manifest\\.webmanifest|feed/events\\.xml).*)',
  ],
};
