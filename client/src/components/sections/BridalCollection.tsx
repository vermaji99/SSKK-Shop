import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { JEWELRY_IMAGES } from '@/config/assets';

const bridalImages = [
  { src: JEWELRY_IMAGES.bridalSet, alt: 'Bridal gold necklace set with maang tikka', className: 'col-span-2 row-span-2' },
  { src: JEWELRY_IMAGES.jhumkaAlt, alt: 'Bridal gold jhumka earrings — alternate pair', className: 'col-span-1 row-span-1' },
  { src: JEWELRY_IMAGES.haarSet, alt: 'Traditional bridal haar long necklace set', className: 'col-span-1 row-span-1' },
  { src: JEWELRY_IMAGES.pendantNath, alt: 'Traditional bridal nath with pendant nose ring', className: 'col-span-1 row-span-1' },
  { src: JEWELRY_IMAGES.bangleAlt, alt: 'Bridal gold bangles stack — pair set', className: 'col-span-1 row-span-1' },
];

const BridalCollection: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden border-y border-gold-500/15"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 70% 50%, #35105A 0%, transparent 70%)',
        }}
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div style={{ y: parallaxY }} className="relative">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
              {bridalImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className={`relative overflow-hidden gold-border group ${img.className}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div>
            <SectionTitle
              label="Bridal Heritage"
              title="Made for Your Most Precious Moments"
              subtitle="Necklace, earrings, maang tikka, nath and bangles in 22K BIS Hallmarked gold."
              align="left"
              className="mb-10"
            />
            <Link
              to="/collections?category=bridal"
              className="group inline-flex items-center gap-3 btn-primary"
            >
              Explore Bridal Jewelry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { BridalCollection };
export default BridalCollection;
