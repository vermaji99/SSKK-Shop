import React, { useState } from 'react';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Categories } from '@/components/sections/Categories';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { BridalCollection } from '@/components/sections/BridalCollection';
import { HomeInquiry } from '@/components/sections/HomeInquiry';
import SEO from '@/components/common/SEO';
import InquiryModal from '@/components/common/InquiryModal';
import { PAGE_SEO } from '@/config/seo';
import { Product } from '@/lib/types';

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

      <TrustBar />

      <section aria-label="Jewellery categories — rings, earrings, necklaces, bridal, custom designs" id="categories">
        <Categories />
      </section>

      <section aria-label="Signature pieces — featured jewellery collection highlights" id="signature-pieces">
        <FeaturedProducts />
      </section>

      <section aria-label="Bridal collection — wedding jewellery editorial showcase" id="bridal">
        <BridalCollection />
      </section>

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
