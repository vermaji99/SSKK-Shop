import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { JEWELRY_IMAGES } from '@/config/assets';

const miniCategories = [
  { name: 'Bridal Necklaces', path: '/collections/necklaces' },
  { name: 'Bridal Earrings', path: '/collections/earrings' },
  { name: 'Maang Tikka', path: '/collections/bridal' },
  { name: 'Bangles & Kadas', path: '/collections/bangles' },
  { name: 'Complete Sets', path: '/collections/bridal' },
];

export const BridalCollection: React.FC = () => {
  return (
    <section
      id="bridal"
      className="section-padding relative overflow-hidden bg-background-secondary/30 border-y border-gold-400/15"
      aria-label="Bridal Heritage Collection"
    >
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full opacity-[0.08] blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #35105A 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[3/4] overflow-hidden border border-gold-400/20 group"
              >
                <img
                  src={JEWELRY_IMAGES.bridalSet}
                  alt="Royal 22K Gold Bridal Haar Set"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020A]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                    Royal Bridal Set
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative aspect-[4/3] overflow-hidden border border-gold-400/20 group"
              >
                <img
                  src={JEWELRY_IMAGES.jhumkaAlt}
                  alt="Traditional Gold Jhumkas"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative aspect-[4/3] overflow-hidden border border-gold-400/20 group"
              >
                <img
                  src={JEWELRY_IMAGES.pendantNath}
                  alt="Heritage Kundan Nath"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative aspect-[3/4] overflow-hidden border border-gold-400/20 group"
              >
                <img
                  src={JEWELRY_IMAGES.haarSet}
                  alt="Empress Gold Choker Necklace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020A]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-semibold">
                    Kundan & Gemstones
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Copy Content */}
          <div className="lg:col-span-6 space-y-6">
            <SectionTitle
              label="BRIDAL HERITAGE"
              title="For the moments that become memories."
              subtitle=""
              align="left"
              className="mb-4"
            />

            <p className="text-cream/85 text-base sm:text-lg leading-relaxed font-sans">
              Discover bridal jewellery crafted in 22K gold, diamonds and precious stones for weddings that deserve something unforgettable. Each piece is designed to carry the warmth of tradition and the sparkle of lifelong joy.
            </p>

            {/* Mini Categories */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold mb-3 flex items-center gap-2">
                <Sparkles size={13} /> Key Bridal Essentials
              </h4>
              <div className="flex flex-wrap gap-2">
                {miniCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="px-3.5 py-1.5 bg-[#0C0617] border border-gold-400/20 text-cream/90 hover:text-gold hover:border-gold-400/50 text-xs tracking-wide transition-all duration-300"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/collections/bridal"
                className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                EXPLORE BRIDAL JEWELLERY
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalCollection;
