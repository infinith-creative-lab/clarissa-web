import { siteConfig } from '@/lib/seo/constants';
import { getEvents } from '@/lib/content/provider';

/**
 * RSS 2.0 Feed for Clarissa Events.
 * Accessible at /feed/events.xml
 * Enables feed readers, Google News, and social aggregators to discover events.
 */
export async function GET() {
  const events = getEvents();

  const items = events
    .map((event) => {
      const pubDate = event.date
        ? new Date(event.date).toUTCString()
        : new Date().toUTCString();

      const imageUrl = event.image.startsWith('http')
        ? event.image
        : `${siteConfig.url}${event.image}`;

      return `
    <item>
      <title><![CDATA[${event.title}]]></title>
      <link>${siteConfig.url}/id${event.ctaLink}</link>
      <guid isPermaLink="true">${siteConfig.url}/id${event.ctaLink}</guid>
      <description><![CDATA[${event.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${event.category ?? 'event'}</category>
      <enclosure url="${imageUrl}" type="image/jpeg" />
      <dc:creator>Clarissa</dc:creator>
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Clarissa Events &amp; Happenings</title>
    <link>${siteConfig.url}/id/events</link>
    <description>Discover the latest events, exhibitions, store openings, and exclusive collections from Clarissa across Indonesia.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed/events.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteConfig.url}/icons/icon-192x192.png</url>
      <title>Clarissa</title>
      <link>${siteConfig.url}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
