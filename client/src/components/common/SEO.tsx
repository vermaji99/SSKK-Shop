import React, { useEffect } from 'react';
import { BUSINESS } from '@/config/business';
import {
  DEFAULT_KEYWORDS,
  GOOGLE_SITE_VERIFICATION,
  buildDefaultSchemaGraph,
  resolveOgImage,
} from '@/config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
  noIndex?: boolean;
}

const upsertMeta = (
  selector: string,
  attributes: Record<string, string>,
  content: string
) => {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      element!.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description = BUSINESS.description,
  keywords = DEFAULT_KEYWORDS,
  canonical = BUSINESS.siteUrl,
  ogImage,
  ogType = 'website',
  schema,
  noIndex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${BUSINESS.name}`
    : `${BUSINESS.name} | Crafted In Gold | Doharighat, Mau`;

  const resolvedOgImage = resolveOgImage(ogImage);
  const robotsContent = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = 'en-IN';

    upsertMeta('meta[name="description"]', { name: 'description' }, description);
    upsertMeta('meta[name="keywords"]', { name: 'keywords' }, keywords);
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robotsContent);
    upsertMeta('meta[name="googlebot"]', { name: 'googlebot' }, robotsContent);
    upsertMeta(
      'meta[name="google-site-verification"]',
      { name: 'google-site-verification' },
      GOOGLE_SITE_VERIFICATION
    );

    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, resolvedOgImage);
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, `${BUSINESS.name} jewelry`);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, ogType);
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, BUSINESS.name);
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'en_IN');

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, resolvedOgImage);

    upsertLink('canonical', canonical);

    const structuredData = schema || buildDefaultSchemaGraph();

    let scriptTag = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [
    fullTitle,
    description,
    keywords,
    canonical,
    resolvedOgImage,
    ogType,
    schema,
    robotsContent,
  ]);

  return null;
};

export default SEO;
