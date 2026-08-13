import { BUSINESS } from './business';
import { SEO_OG_IMAGE } from './assets';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://sskk-shop.vercel.app'
).replace(/\/$/, '');

export const GOOGLE_SITE_VERIFICATION = '21e02a1655dd9e96';

export const DEFAULT_KEYWORDS = [
  'gold jewelry',
  '22K gold jewelry',
  'diamond jewelry',
  'bridal jewelry sets',
  'gold rings',
  'gold necklaces',
  'gold bangles',
  'jhumka earrings',
  'nath nose ring',
  'Indian jewelry',
  'jewelry shop Doharighat',
  'jewelry shop Mau',
  'jewelry Uttar Pradesh',
  'Shubham Swarn Kala Kendra',
  'SSKK jewelry',
  'buy gold online India',
  'hallmark gold jewelry',
].join(', ');

export const absoluteUrl = (path = ''): string => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const resolveOgImage = (image?: string): string => absoluteUrl(image || SEO_OG_IMAGE);

export const buildOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  alternateName: BUSINESS.shortName,
  url: SITE_URL,
  logo: resolveOgImage(),
  image: resolveOgImage(),
  email: BUSINESS.email,
  telephone: `+91${BUSINESS.phonePrimary}`,
  sameAs: [BUSINESS.socials.instagram, BUSINESS.socials.facebook],
});

export const buildWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BUSINESS.name,
  description: BUSINESS.description,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/collections?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const buildJewelryStoreSchema = () => ({
  '@type': 'JewelryStore',
  '@id': `${SITE_URL}/#store`,
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: SITE_URL,
  image: resolveOgImage(),
  telephone: `+91${BUSINESS.phonePrimary}`,
  email: BUSINESS.email,
  priceRange: '₹₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sabji Mandi Road, Near Main Market',
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.state,
    postalCode: BUSINESS.pincode,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.0465,
    longitude: 83.5042,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Mau, Uttar Pradesh, India',
  },
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
});

export const buildDefaultSchemaGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildJewelryStoreSchema(),
  ],
});

export const PAGE_SEO = {
  home: {
    title: 'Premium 22K Gold & Diamond Jewelry | Doharighat, Mau',
    description:
      'Shop royal 22K gold rings, bridal sets, necklaces, bangles, jhumkas, and custom Indian jewelry at Shubham Swarn Kala Kendra — trusted gold showroom in Doharighat, Mau, Uttar Pradesh.',
    canonical: SITE_URL,
  },
  collections: {
    title: 'Jewelry Collections | Gold, Diamond & Bridal',
    description:
      'Browse curated gold, diamond, bridal, rings, earrings, necklaces, chains, bangles, and pendant collections from Shubham Swarn Kala Kendra.',
    canonical: `${SITE_URL}/collections`,
  },
  about: {
    title: 'About Us | Heritage Gold Craftsmanship Since 25+ Years',
    description:
      'Discover the legacy of Shubham Swarn Kala Kendra — master artisans, hallmark gold, certified diamonds, and trusted jewelry craftsmanship in Doharighat, Mau.',
    canonical: `${SITE_URL}/about`,
  },
  contact: {
    title: 'Contact Us | Visit Our Doharighat Showroom',
    description:
      'Contact Shubham Swarn Kala Kendra for gold jewelry inquiries, custom designs, and showroom visits. Call, WhatsApp, or send an inquiry online.',
    canonical: `${SITE_URL}/contact`,
  },
  privacy: {
    title: 'Privacy Policy',
    description: `Read how ${BUSINESS.name} collects, uses, and protects your personal information.`,
    canonical: `${SITE_URL}/privacy-policy`,
  },
  terms: {
    title: 'Terms of Service',
    description: `Terms and conditions for using the ${BUSINESS.name} website and jewelry inquiry services.`,
    canonical: `${SITE_URL}/terms-of-service`,
  },
} as const;
