import { BUSINESS } from './business';
import { SEO_OG_IMAGE } from './assets';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://sskk-shop.vercel.app'
).replace(/\/$/, '');

export const GOOGLE_SITE_VERIFICATION = '21e02a1655dd9e96';

export const DEFAULT_KEYWORDS = [
  'gold jewellery',
  '22K gold jewellery',
  'diamond jewellery',
  'bridal jewellery sets',
  'gold rings',
  'gold necklaces',
  'gold bangles',
  'jhumka earrings',
  'nath nose ring',
  'Indian jewellery',
  'jewellery shop Doharighat',
  'jewellery shop Mau',
  'jewellery Uttar Pradesh',
  'Shubham Swarn Kala Kendra',
  'SSKK jewellery',
  'hallmark gold jewellery',
  'Doharighat gold showroom',
  'Mau jewellery store',
].join(', ');

export const CATEGORY_SLUGS = [
  'rings',
  'earrings',
  'necklaces',
  'chains',
  'bangles',
  'bridal',
  'nath',
  'pendants',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_META: Record<
  CategorySlug,
  { name: string; title: string; description: string }
> = {
  rings: {
    name: 'Rings',
    title: 'Gold & Diamond Rings | Shubham Swarn Kala Kendra',
    description:
      'Explore exquisite gold and diamond rings at Shubham Swarn Kala Kendra in Doharighat, Mau. Engagement rings, wedding bands, and traditional designs.',
  },
  earrings: {
    name: 'Earrings',
    title: 'Gold Earrings & Jhumkas | Doharighat, Mau',
    description:
      'Shop elegant gold earrings, jhumkas, and diamond studs at Shubham Swarn Kala Kendra. Traditional and contemporary designs in Doharighat, Mau.',
  },
  necklaces: {
    name: 'Necklaces',
    title: 'Gold Necklaces & Harams | Shubham Swarn Kala Kendra',
    description:
      'Discover beautifully crafted gold necklaces, harams, and chokers at Shubham Swarn Kala Kendra in Doharighat, Mau, Uttar Pradesh.',
  },
  chains: {
    name: 'Chains',
    title: 'Gold Chains | Men & Women Designs | Doharighat',
    description:
      'Premium gold chains in classic and contemporary designs at Shubham Swarn Kala Kendra. Rope chains, link chains, and more in Doharighat, Mau.',
  },
  bangles: {
    name: 'Bangles',
    title: 'Gold Bangles & Bracelets | Shubham Swarn Kala Kendra',
    description:
      'Traditional and modern gold bangles, kada, and bracelets at Shubham Swarn Kala Kendra in Doharighat, Mau. Handcrafted with 22K gold.',
  },
  bridal: {
    name: 'Bridal',
    title: 'Bridal Jewellery Sets | Wedding Collections | Doharighat',
    description:
      'Complete bridal jewellery sets for your wedding day at Shubham Swarn Kala Kendra. Bridal haar, nath, bangles, and kundan sets in Doharighat, Mau.',
  },
  nath: {
    name: 'Nath',
    title: 'Traditional Nath Nose Rings | Shubham Swarn Kala Kendra',
    description:
      'Traditional Indian nath and nose rings in gold with pearl and diamond detailing. Bridal nath designs at Shubham Swarn Kala Kendra, Doharighat.',
  },
  pendants: {
    name: 'Pendants',
    title: 'Gold & Diamond Pendants | Lockets | Doharighat, Mau',
    description:
      'Dazzling gold and diamond pendants, lockets, and religious designs at Shubham Swarn Kala Kendra in Doharighat, Mau, Uttar Pradesh.',
  },
};

export const absoluteUrl = (path = ''): string => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const categoryUrl = (slug: CategorySlug | string): string =>
  absoluteUrl(`/collections/${slug.toLowerCase()}`);

export const productUrl = (slug: string): string => absoluteUrl(`/product/${slug}`);

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
  sameAs: [BUSINESS.socials.instagram, BUSINESS.socials.facebook].filter(Boolean),
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
    streetAddress: BUSINESS.address,
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

export const buildBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildCategoryPageSchema = (
  slug: CategorySlug
) => {
  const meta = CATEGORY_META[slug];
  const categoryPageUrl = categoryUrl(slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      {
        '@type': 'CollectionPage',
        '@id': `${categoryPageUrl}#collectionpage`,
        url: categoryPageUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Collections',
              item: `${SITE_URL}/collections`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: meta.name,
              item: categoryPageUrl,
            },
          ],
        },
      },
    ],
  };
};

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
    title: 'Shubham Swarn Kala Kendra | Gold & Diamond Jewellery in Doharighat, Mau',
    description:
      'Discover premium gold and diamond jewellery at Shubham Swarn Kala Kendra in Doharighat, Mau, Uttar Pradesh. Explore rings, earrings, necklaces, chains, bangles, bridal jewellery and more.',
    canonical: SITE_URL,
  },
  collections: {
    title: 'Jewellery Collections | Gold, Diamond & Bridal | Doharighat',
    description:
      'Browse curated gold, diamond, bridal, rings, earrings, necklaces, chains, bangles, nath, and pendant collections from Shubham Swarn Kala Kendra in Doharighat, Mau.',
    canonical: `${SITE_URL}/collections`,
  },
  jewelry: {
    title: 'All Jewellery | Gold & Diamond Pieces | Shubham Swarn Kala Kendra',
    description:
      'View the complete collection of handcrafted gold and diamond jewellery at Shubham Swarn Kala Kendra in Doharighat, Mau, Uttar Pradesh.',
    canonical: `${SITE_URL}/jewelry`,
  },
  about: {
    title: 'About Us | Shubham Swarn Kala Kendra, Doharighat',
    description:
      'Learn about Shubham Swarn Kala Kendra — a trusted gold showroom in Doharighat, Mau offering handcrafted 22K and 18K gold jewellery with personalized service.',
    canonical: `${SITE_URL}/about`,
  },
  contact: {
    title: 'Contact Us | Visit Doharighat Showroom | Shubham Swarn Kala Kendra',
    description:
      'Contact Shubham Swarn Kala Kendra for jewellery inquiries, custom designs, and showroom visits in Doharighat, Mau. Call, WhatsApp, or send an inquiry online.',
    canonical: `${SITE_URL}/contact`,
  },
  wishlist: {
    title: 'Wishlist | Saved Jewellery | Shubham Swarn Kala Kendra',
    description: 'View your saved jewellery pieces from Shubham Swarn Kala Kendra.',
    canonical: `${SITE_URL}/wishlist`,
    noIndex: true,
  },
  login: {
    title: 'Sign In | Shubham Swarn Kala Kendra',
    description: 'Sign in to your Shubham Swarn Kala Kendra account to access wishlists, track inquiries, and manage your profile.',
    canonical: `${SITE_URL}/login`,
    noIndex: true,
  },
  privacy: {
    title: 'Privacy Policy | Shubham Swarn Kala Kendra',
    description: `Read how ${BUSINESS.name} collects, uses, and protects your personal information.`,
    canonical: `${SITE_URL}/privacy-policy`,
  },
  terms: {
    title: 'Terms of Service | Shubham Swarn Kala Kendra',
    description: `Terms and conditions for using the ${BUSINESS.name} website and jewellery inquiry services.`,
    canonical: `${SITE_URL}/terms-of-service`,
  },
} as const;
