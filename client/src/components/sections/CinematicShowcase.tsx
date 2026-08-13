import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { HoverFrameVideo } from '@/components/cinematic/HoverFrameVideo';
import { useDeviceProfile } from '@/hooks/useDeviceProfile';

const CinematicShowcase: React.FC = () => {
  const { isMobile, isTouch } = useDeviceProfile();

  const subtitle = isTouch
    ? 'Tap and drag across the piece to explore our jewelry in motion — crafted with the precision of fine goldsmithing.'
    : 'Move your cursor over the piece to experience our jewelry in motion — crafted with the precision of fine goldsmithing.';

  const aspectRatio = isMobile ? '3/4' : '4/5';

  return (
    <section className="section-padding relative overflow-hidden bg-[#080312] border-y border-gold-500/10">
      <div
        className="absolute top-0 right-0 w-[70vw] sm:w-[45vw] h-[70vw] sm:h-[45vw] rounded-full opacity-10 sm:opacity-15 blur-[100px] sm:blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #35105A 0%, transparent 70%)' }}
      />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <SectionTitle
              label="Cinematic Craft"
              title="See Every Detail Come Alive"
              subtitle={subtitle}
              align="left"
              className="mb-6 sm:mb-8 [&_h2]:text-2xl sm:[&_h2]:text-3xl md:[&_h2]:text-4xl"
            />

            <Link
              to="/collections"
              className="group inline-flex items-center justify-center lg:justify-start gap-2 text-gold-400/90 text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.28em] font-light hover:text-gold-300 transition-colors"
            >
              View Signature Pieces
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 w-full max-w-[min(100%,22rem)] sm:max-w-md mx-auto lg:max-w-none lg:ml-auto"
          >
            <HoverFrameVideo aspectRatio={aspectRatio} className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { CinematicShowcase };
export default CinematicShowcase;
