import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JEWELRY_IMAGES } from '@/config/assets';

export const CatalogueBanner: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-gradient-to-r from-[#0C0617] via-[#150A26] to-[#0C0617] border border-gold-400/20 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.85)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 space-y-6 relative z-10">
              <span className="eyebrow inline-block">Curated Excellence</span>
              <h2 className="editorial-h2 text-cream font-medium leading-[1.06]">
                Explore Our Complete <br className="hidden sm:inline" />
                <span className="text-gold-gradient font-serif">Jewellery Catalogue</span>
              </h2>
              <p className="text-cream/80 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                Discover handcrafted gold and diamond jewellery created for every occasion — from delicate everyday gold bands to opulent royal bridal heritage sets.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button asChild variant="primary" size="lg" className="min-w-[220px]">
                  <Link to="/collections" className="inline-flex items-center justify-center gap-2">
                    VIEW ALL JEWELLERY
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="min-w-[220px]">
                  <Link to="/contact#visit">SHOWROOM VISIT</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden">
              <img
                src={JEWELRY_IMAGES.showcase}
                alt="SSKK Gold and Diamond Jewellery Showcase"
                className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, #150A26 0%, rgba(21,10,38,0.4) 30%, transparent 100%), linear-gradient(180deg, transparent 60%, #0C0617 100%)',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogueBanner;
