import React, { useState } from 'react';
import { MapPin, Phone, Clock, Shield, Award, Gem, HeartHandshake, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { Categories } from '@/components/sections/Categories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { BridalCollection } from '@/components/sections/BridalCollection';
import { HomeInquiry } from '@/components/sections/HomeInquiry';
import SEO from '@/components/common/SEO';
import InquiryModal from '@/components/common/InquiryModal';
import { BUSINESS } from '@/config/business';
import { PAGE_SEO } from '@/config/seo';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: Shield, label: 'BIS Hallmarked', tone: 'text-amber-300' },
  { icon: Award, label: 'Certified Diamonds', tone: 'text-emerald-300' },
  { icon: Gem, label: '22K & 18K Gold', tone: 'text-yellow-300' },
  { icon: HeartHandshake, label: 'Custom Designs', tone: 'text-rose-300' },
];

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const trustIconClass =
    'w-5 h-5 md:w-[22px] md:h-[22px]';

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        canonical={PAGE_SEO.home.canonical}
      />

      <CinematicHero />

      <section
        aria-label="Trust & assurance"
        className="relative border-y border-gold-400/15 bg-background-secondary/60"
      >
        <div className="container py-5 md:py-6">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center justify-center gap-2.5 md:gap-3 py-1">
                  <div
                    className={cn(
                      'flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold-400/8 border border-gold-400/20'
                    )}
                  >
                    <Icon className={cn(trustIconClass, item.tone)} strokeWidth={1.75} />
                  </div>
                  <span className="font-medium tracking-wide text-cream/85 uppercase text-[11px] sm:text-[12px] md:text-[13px]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Categories />

      <FeaturedProducts />

      <BridalCollection />

      <section
        aria-label="Visit our showroom"
        className="section-padding bg-[#140827] relative border-t border-gold-500/20"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6 lg:space-y-7">
              <div className="space-y-3">
                <span className="text-gold-400 uppercase tracking-[0.3em] text-[11px] sm:text-xs font-semibold block">
                  Showroom Experience
                </span>
                <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl text-cream font-semibold leading-[1.1]">
                  Visit <span className="text-gold-gradient">SSKK</span> in Doharighat
                </h2>
              </div>
              <p className="text-cream/75 text-base leading-relaxed font-light max-w-xl">
                View our 22K gold rings, bridal sets and custom designs in person at our showroom.
              </p>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/15">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-serif font-semibold text-gold-300 mb-1">Showroom Address</h4>
                    <p className="text-xs text-cream/70 leading-relaxed">{BUSINESS.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/15">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-serif font-semibold text-gold-300 mb-1">Direct Phone</h4>
                    <div className="text-xs text-cream/70 space-y-0.5">
                      <a href={`tel:+91${BUSINESS.phonePrimary}`} className="block hover:text-gold-300 transition-colors">
                        {BUSINESS.phonePrimaryFormatted}
                      </a>
                      <a href={`tel:+91${BUSINESS.phoneSecondary}`} className="block hover:text-gold-300 transition-colors">
                        {BUSINESS.phoneSecondaryFormatted}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/15">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold-400" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-serif font-semibold text-gold-300 mb-1">Opening Hours</h4>
                    <p className="text-xs text-cream/70 leading-relaxed">{BUSINESS.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={BUSINESS.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-[11px] sm:text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
                <Link to="/contact" className="btn-secondary text-[11px] sm:text-xs">
                  Get Directions &amp; Contact
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/15">
              <iframe
                title="Shubham Swarn Kala Kendra Doharighat Map Location"
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(88%) hue-rotate(240deg) brightness(82%) contrast(115%)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeInquiry />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default Home;
