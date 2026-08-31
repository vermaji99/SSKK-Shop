import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionTitle, Button } from '@/components/ui';
import { Crown } from 'lucide-react';
import { JEWELRY_IMAGES } from '@/config/assets';

const SignatureBanner: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '15%']);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const bannerUrl = JEWELRY_IMAGES.haarSet;

  return (
    <section
      ref={bannerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '60vh' }}
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bannerUrl})`,
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'linear-gradient(135deg, rgba(5,2,10,0.95) 0%, rgba(26,11,46,0.85) 40%, rgba(16,7,25,0.92) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.3) 0%, transparent 60%)',
        }}
      />

      <div className="relative container flex items-center justify-center" style={{ minHeight: '60vh', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 40 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-8 border border-gold-400/60 bg-purple-900/30 backdrop-blur-sm"
          >
            <Crown className="w-7 h-7 text-gold-400" strokeWidth={1.5} />
          </motion.div>

          <SectionTitle
            label="Signature Collection"
            title="The Art of Indian Craftsmanship"
            subtitle="Each piece is a masterpiece, handcrafted by skilled artisans who bring generations of heritage to every creation."
            align="center"
            className="mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center justify-center"
          >
            <Button asChild variant="primary" size="lg">
              <Link to="/collections?category=necklaces">
                Discover Signature Collection
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { SignatureBanner };
export default SignatureBanner;
