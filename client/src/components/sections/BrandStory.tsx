import * as React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui';
import { JEWELRY_IMAGES } from '@/config/assets';
import { BUSINESS } from '@/config/business';

export const BrandStory: React.FC = () => {
  return (
    <section id="our-story" className="section-padding relative overflow-hidden bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionTitle
              label="OUR STORY"
              title="Craftsmanship rooted in tradition. Designed for today."
              subtitle=""
              align="left"
              className="mb-4"
            />

            <div className="space-y-4 text-cream/85 text-base sm:text-lg leading-relaxed font-sans">
              <p>
                Located in the heart of Doharighat, Mau, <strong className="text-gold-300 font-semibold">{BUSINESS.name}</strong> stands as a benchmark of trust, purity and timeless goldsmithing.
              </p>
              <p>
                We specialize in 100% BIS Hallmarked 22K and 18K gold jewellery, IGI/GIA certified diamond creations, and bespoke custom heritage pieces. Every design in our showroom reflects decades of dedication to flawless finishing, honest purity testing, and warm customer care.
              </p>
              <p>
                Whether celebrating a grand wedding, honoring family traditions, or marking a personal milestone, we invite you to experience jewellery crafted to become a cherished legacy.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-gold-400/20">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold block">
                  100% BIS
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  Hallmarked Purity
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-gold-gradient font-bold block">
                  Certified
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                  Diamonds & Gems
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-gold-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={JEWELRY_IMAGES.royalRing}
                alt="SSKK Master Jewellery Craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05020A] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-[#0E061B] border border-gold-400/30 p-5 hidden sm:block max-w-xs shadow-2xl">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-semibold block mb-1">
                Authentic Heritage
              </span>
              <p className="text-cream/90 text-xs font-sans leading-relaxed">
                Hand-engraved filigree & micro-pavé gemstone settings by master artisans in Uttar Pradesh.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
