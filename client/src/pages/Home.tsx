import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { BrandIntro } from '@/components/sections/BrandIntro';
import { Categories } from '@/components/sections/Categories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { SignatureBanner } from '@/components/sections/SignatureBanner';
import { CinematicShowcase } from '@/components/sections/CinematicShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { BridalCollection } from '@/components/sections/BridalCollection';
import { BestsellersCarousel } from '@/components/sections/BestsellersCarousel';
import { HomeInquiry } from '@/components/sections/HomeInquiry';
import SEO from '@/components/common/SEO';
import InquiryModal from '@/components/common/InquiryModal';
import { BUSINESS } from '@/config/business';
import { Product } from '@/lib/types';

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Shubham Swarn Kala Kendra | Premium 22K Gold Showroom Doharighat"
        description="Experience royal 22K gold rings, bridal necklaces, bangles, nath, chains, and custom crafted Indian jewelry at Shubham Swarn Kala Kendra, Doharighat, Mau."
      />

      <CinematicHero />
      <BrandIntro />
      <Categories />
      <FeaturedProducts />
      <CinematicShowcase />
      <SignatureBanner />
      <WhyChooseUs />
      <BridalCollection />
      <BestsellersCarousel />

      <section className="py-24 bg-[#140827] relative border-t border-gold-500/20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-gold-400 uppercase tracking-[0.3em] text-xs font-semibold block">
                Showroom Experience
              </span>
              <h2 className="heading-serif text-3xl md:text-5xl text-gold-gradient font-bold leading-tight">
                Visit {BUSINESS.name} in Doharighat
              </h2>
              <p className="text-cream/80 text-base leading-relaxed font-light">
                We invite you to experience our warm hospitality and view our complete collection of 22K gold rings, bangles, bridal sets, and custom gemstone creations in person.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/20">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-gold-300">Showroom Address</h4>
                    <p className="text-xs text-cream/70 mt-1">{BUSINESS.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/20">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-gold-300">Direct Phone Numbers</h4>
                    <p className="text-xs text-cream/70 mt-1">
                      {BUSINESS.phonePrimaryFormatted} / {BUSINESS.phoneSecondaryFormatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#200e3d]/60 border border-gold-500/20">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-gold-300">Opening Hours</h4>
                    <p className="text-xs text-cream/70 mt-1">{BUSINESS.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={BUSINESS.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Call Now via WhatsApp
                </a>
                <Link to="/contact" className="btn-secondary">
                  Get Directions & Contact Form
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden gold-border shadow-gold-glow-lg">
              <iframe
                title="Shubham Swarn Kala Kendra Doharighat Map Location"
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(240deg) brightness(85%) contrast(120%)' }}
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
