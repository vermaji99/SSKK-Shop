import React, { useState } from 'react';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Categories } from '@/components/sections/Categories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { BridalCollection } from '@/components/sections/BridalCollection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { HomeInquiry } from '@/components/sections/HomeInquiry';
import SEO from '@/components/common/SEO';
import InquiryModal from '@/components/common/InquiryModal';
import { PAGE_SEO } from '@/config/seo';
import { Product } from '@/lib/types';

const PlaceholderOurStory: React.FC = () => (
  <section
    aria-label="Our Story — Shubham Swarn Kala Kendra heritage and craftsmanship"
    id="our-story-home"
    className="section-padding bg-background-secondary relative"
  >
    <div className="container flex items-center justify-center min-h-[280px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        Our Story editorial section — Rendered in T11
      </span>
    </div>
  </section>
);

const PlaceholderCustomerJourney: React.FC = () => (
  <section
    aria-label="Customer Journey — 5 step process from discovery to celebration"
    id="customer-journey"
    className="section-padding bg-background relative"
  >
    <div className="container flex items-center justify-center min-h-[260px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        Customer Journey 5-step timeline — Rendered in T12
      </span>
    </div>
  </section>
);

const PlaceholderCustomCTA: React.FC = () => (
  <section
    aria-label="Custom Jewellery call-to-action banner"
    id="custom-cta"
    className="section-padding bg-background-tertiary relative border-y border-gold-500/15"
  >
    <div className="container flex items-center justify-center min-h-[220px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        Custom Jewellery CTA banner — Rendered in T13
      </span>
    </div>
  </section>
);

const PlaceholderShowroom: React.FC = () => (
  <section
    aria-label="Visit our showroom — Doharighat address, hours, contact"
    id="showroom-visit"
    className="section-padding bg-[#140827] relative border-t border-gold-500/20"
  >
    <div className="container flex items-center justify-center min-h-[300px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        Showroom unified panel + 3 CTAs row — Restyled in T15
      </span>
    </div>
  </section>
);

const PlaceholderTestimonials: React.FC = () => (
  <section
    aria-label="Customer testimonials and feedback carousel"
    id="testimonials-home"
    className="section-padding bg-background-secondary relative"
  >
    <div className="container flex items-center justify-center min-h-[240px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        Safe Testimonials carousel (EXAMPLE/EDITABLE) — Rendered in T14
      </span>
    </div>
  </section>
);

const PlaceholderFAQ: React.FC = () => (
  <section
    aria-label="Frequently asked questions — jewellery purchase, hallmark, custom designs"
    id="faq-home"
    className="section-padding bg-background relative border-y border-gold-500/10"
  >
    <div className="container flex items-center justify-center min-h-[260px]">
      <span className="text-xs text-text-muted uppercase tracking-[0.25em]">
        FAQ 7 questions accordion — Rendered in T14
      </span>
    </div>
  </section>
);

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        canonical={PAGE_SEO.home.canonical}
      />

      <section aria-label="Cinematic hero — brand introduction video and primary CTAs" id="hero">
        <CinematicHero />
      </section>

      <PlaceholderTrustBar />

      <section aria-label="Jewellery categories — rings, earrings, necklaces, bridal, custom designs" id="categories">
        <Categories />
      </section>

      <section aria-label="Signature pieces — featured jewellery collection highlights" id="signature-pieces">
        <FeaturedProducts />
      </section>

      <section aria-label="Bridal collection — wedding jewellery editorial showcase" id="bridal">
        <BridalCollection />
      </section>

      <section aria-label="Why choose SSKK — 6 reasons to trust our jewellery" id="why-sskk">
        <WhyChooseUs />
      </section>

      <PlaceholderOurStory />

      <PlaceholderCustomerJourney />

      <PlaceholderCustomCTA />

      <PlaceholderShowroom />

      <PlaceholderTestimonials />

      <PlaceholderFAQ />

      <section aria-label="Home inquiry form — contact SSKK directly" id="home-inquiry">
        <HomeInquiry />
      </section>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default Home;
