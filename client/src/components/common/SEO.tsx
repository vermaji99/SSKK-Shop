import React, { useEffect } from 'react';
import { BUSINESS } from '@/config/business';
import { SEO_OG_IMAGE } from '@/config/assets';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = BUSINESS.description,
  keywords = 'gold jewelry, 22K gold rings, bridal necklaces, bangles, nath, Doharighat, Mau, Uttar Pradesh, Shubham Swarn Kala Kendra',
  canonical = BUSINESS.siteUrl,
  ogImage = SEO_OG_IMAGE,
  ogType = 'website',
  schema,
}) => {
  const fullTitle = title
    ? `${title} | ${BUSINESS.name}`
    : `${BUSINESS.name} | Crafted In Gold | Doharighat, Mau`;

  useEffect(() => {
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // OpenGraph Image
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', ogImage);

    // OpenGraph Type
    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.setAttribute('content', ogType);

    // OpenGraph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonical);

    // OpenGraph Site Name
    let ogSite = document.querySelector('meta[property="og:site_name"]');
    if (!ogSite) {
      ogSite = document.createElement('meta');
      ogSite.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSite);
    }
    ogSite.setAttribute('content', BUSINESS.name);

    // Twitter Card
    const setTwitterMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setTwitterMeta('twitter:card', 'summary_large_image');
    setTwitterMeta('twitter:title', fullTitle);
    setTwitterMeta('twitter:description', description);
    setTwitterMeta('twitter:image', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Structured Data JSON-LD
    const storeSchema = schema || {
      '@context': 'https://schema.org',
      '@type': 'JewelryStore',
      name: BUSINESS.name,
      image: ogImage,
      telephone: BUSINESS.phonePrimary,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sabji Mandi Road',
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.state,
        postalCode: BUSINESS.pincode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '26.0465',
        longitude: '83.5042',
      },
      priceRange: '₹₹₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '20:30',
        },
      ],
    };

    let scriptTag = document.getElementById('jsonld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'jsonld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(storeSchema);
  }, [fullTitle, description, keywords, canonical, ogImage, ogType, schema]);

  return null;
};

export default SEO;
