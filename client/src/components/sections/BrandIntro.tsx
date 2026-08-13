import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Gem, Crown } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { JEWELRY_IMAGES } from '@/config/assets';

const BrandIntro: React.FC = () => {
  const imageWrapperRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrapperRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '8%']);

  const { ref: contentRef, inView: contentInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const features = [
    {
      icon: Crown,
      title: 'Heritage Craftsmanship',
      desc: 'Generations of skilled artisans bringing royal Indian designs to life with meticulous attention to detail.',
    },
    {
      icon: Gem,
      title: 'Certified Purity',
      desc: 'Every piece of 22K gold jewelry is hallmarked and sourced with complete transparency for your trust.',
    },
  ];

  const imageUrl = JEWELRY_IMAGES.showcase;

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute top-1/2 right-0 w-[40vw] h-[40vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={imageWrapperRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-xl mx-auto lg:mx-0 overflow-hidden gold-border shadow-gold-glow-lg">
              <motion.img
                style={{ y: imageY }}
                src={imageUrl}
                alt="Premium 22K gold jewelry collection featuring necklace, earrings, and bangles"
                className="w-full h-[115%] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 border-2 border-gold-400/50 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-28 md:h-28 gold-gradient opacity-10 -z-10" />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="relative"
          >
            <SectionTitle
              label="Our Story"
              title="Where Tradition Meets Timeless Design"
              subtitle="Shubham Swarn Kala Kendra is a trusted destination for beautifully crafted jewelry, combining traditional Indian craftsmanship with contemporary elegance."
              align="left"
              className="mb-10"
            />

            <motion.div variants={itemVariants} className="space-y-6 mb-2">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-gold-400/40 bg-purple-900/30">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="heading-serif text-cream text-lg md:text-xl font-semibold mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-text-muted text-sm md:text-base leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.ul variants={itemVariants} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Trusted since generations',
                'Custom design services',
                'Hallmarked 22K gold',
                'Personalized consultation',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-cream/80 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <Check className="w-4 h-4 text-gold-400" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { BrandIntro };
export default BrandIntro;
