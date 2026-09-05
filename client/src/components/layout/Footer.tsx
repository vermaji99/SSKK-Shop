import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS } from '@/config/business';

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Jewellery', path: '/collections' },
  { name: 'Bridal', path: '/collections/bridal' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Story', path: '/about#story' },
  { name: 'Visit Showroom', path: '/contact#visit' },
  { name: 'Enquire', path: '/contact#enquiry' },
];

const categoryLinks = [
  { name: 'Rings', path: '/collections/rings' },
  { name: 'Earrings', path: '/collections/earrings' },
  { name: 'Necklaces', path: '/collections/necklaces' },
  { name: 'Bangles', path: '/collections/bangles' },
  { name: 'Gold Chains', path: '/collections/chains' },
  { name: 'Bridal Sets', path: '/collections/bridal' },
  { name: 'Diamond Jewellery', path: '/collections/diamonds' },
];

const WHATSAPP_FOOTER_PREFILL = encodeURIComponent(
  "Hello SSKK, I'm reaching out from the footer of your website to enquire about your jewellery collection and showroom in Doharighat."
);

export function Footer() {
  return (
    <footer className="relative bg-background-secondary border-t border-gold/15">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container section-padding pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-gold-gradient mb-3">{BUSINESS.name}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{BUSINESS.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={BUSINESS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                aria-label="Instagram"
                className={cn(
                  'h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 text-gold',
                  'hover:bg-gold hover:text-purple-900 transition-all duration-300'
                )}
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href={BUSINESS.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                aria-label="Facebook"
                className={cn(
                  'h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 text-gold',
                  'hover:bg-gold hover:text-purple-900 transition-all duration-300'
                )}
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href={`${BUSINESS.socials.whatsapp}?text=${WHATSAPP_FOOTER_PREFILL}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                aria-label="WhatsApp"
                className={cn(
                  'h-10 w-10 flex items-center justify-center rounded-full border border-gold/30 text-gold',
                  'hover:bg-gold hover:text-purple-900 transition-all duration-300'
                )}
              >
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    data-cursor="hover"
                    className="text-text-muted hover:text-gold transition-colors duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    data-cursor="hover"
                    className="text-text-muted hover:text-gold transition-colors duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-serif text-lg text-gold mb-6">Contact Us</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={16} strokeWidth={1.5} className="text-gold flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <a
                    href={`tel:+91${BUSINESS.phonePrimary}`}
                    data-cursor="hover"
                    className="block text-text-muted hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {BUSINESS.phonePrimaryFormatted}
                  </a>
                  <a
                    href={`tel:+91${BUSINESS.phoneSecondary}`}
                    data-cursor="hover"
                    className="block text-text-muted hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {BUSINESS.phoneSecondaryFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="text-gold flex-shrink-0 mt-1" />
                <p className="text-text-muted text-sm leading-relaxed">{BUSINESS.location}</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} strokeWidth={1.5} className="text-gold flex-shrink-0 mt-1" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  data-cursor="hover"
                  className="text-text-muted hover:text-gold transition-colors duration-300 text-sm"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted">
            <Link
              to="/privacy-policy"
              data-cursor="hover"
              className="hover:text-gold transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              data-cursor="hover"
              className="hover:text-gold transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <span className="hidden md:inline text-gold/40" aria-hidden="true">·</span>
            <span className="text-text-muted/80 text-[11px]">
              Crafted by <span className="text-gold-300/80 font-medium tracking-wide">Shubham Verma</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
