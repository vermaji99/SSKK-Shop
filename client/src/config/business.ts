export type Testimonial = {
  id?: string;
  name: string;
  location?: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export const BUSINESS = {
  name: "Shubham Swarn Kala Kendra",
  shortName: "SSKK Jewelry",
  tagline: "Crafted In Gold",
  description: "Premier luxury gold showroom in Doharighat, Mau, Uttar Pradesh. Handcrafted 22K & 18K gold rings, necklaces, bridal sets, nath, bangles, and gemstone creations.",
  phonePrimary: "9935178342",
  phoneSecondary: "7459956483",
  phonePrimaryFormatted: "+91 99351 78342",
  phoneSecondaryFormatted: "+91 74599 56483",
  whatsappPrimary: "919935178342",
  whatsappSecondary: "917459956483",
  email: "contact@shubhamswarnkala.com",
  location: "Sabji Mandi, Doharighat, Mau, Uttar Pradesh, India",
  city: "Doharighat",
  district: "Mau",
  state: "Uttar Pradesh",
  country: "India",
  pincode: "275303",
  address: "Sabji Mandi Road, Near Main Market, Doharighat, Mau, UP - 275303",
  hours: "Monday – Sunday: 10:00 AM – 8:30 PM",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14349.52402123!2d83.5042!3d26.0465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991f24d10f8b89d%3A0x6b30f878f7e9140!2sDoharighat%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://sskk-shop.vercel.app',
  socials: {
    instagram: "https://instagram.com/shubhamswarnkalakendra",
    facebook: "https://facebook.com/shubhamswarnkalakendra",
    whatsapp: "https://wa.me/919935178342",
  },
};

export const WHATSAPP_PREFILLS = {
  header: "Hello SSKK, I'd like to know more about your gold jewellery collection and showroom in Doharighat.",
  hero: "Hello SSKK, I loved your jewellery on the website. Please share your latest bridal and everyday collections available in Doharighat.",
  product: (name: string, sku: string, purity?: string) =>
    `Hello SSKK, I am interested in ${name ? `"${name}"` : 'a jewellery piece'} (SKU: ${sku || '-'})${purity ? ` in ${purity}` : ''}. Please share current price, purity, and availability at your Doharighat showroom.`,
  custom: "Hello SSKK, I'd like to discuss a custom jewellery design. Can we book a consultation at your Doharighat showroom?",
  floating: "Hello SSKK, I would like to enquire about your jewellery collection.",
} as const;

export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${BUSINESS.whatsappPrimary}?text=${encodeURIComponent(message)}`;

export const GOOGLE_MAPS_SEARCH = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;

export const TESTIMONIALS_EDITABLE: Testimonial[] = [];
