import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, HeartHandshake, MapPin, LucideIcon } from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Authentic Gold',
    description:
      'Carefully crafted jewelry with a focus on purity and quality. Every piece is BIS hallmarked for your complete trust and peace of mind.',
  },
  {
    icon: Award,
    title: 'Timeless Craftsmanship',
    description:
      'Traditional artistry combined with contemporary design. Our master artisans bring generations of heritage to every intricate detail.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    description:
      'Helping customers find jewelry for their most important moments. From weddings to milestones, we guide you with warmth and expertise.',
  },
  {
    icon: MapPin,
    title: 'Trusted Local Jewellery',
    description:
      'Serving customers in Doharighat with care and dedication for years. A name synonymous with trust, quality, and enduring relationships.',
  },
];

const WhyChooseUs: React.FC = () => {
  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background-secondary/30">
      <div
        className="absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4B1F6F 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[35vw] h-[35vw] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
      />

      <div className="container relative">
        <SectionTitle
          label="Why SSKK"
          title="Why Choose Us"
          subtitle="At Shubham Swarn Kala Kendra, we blend heritage, purity, and personalized care to deliver jewelry that becomes a cherished part of your life's journey."
          className="mb-14 md:mb-16"
        />

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'group relative flex flex-col items-start p-7 md:p-8 h-full',
                  'bg-gradient-to-b from-background-tertiary/80 to-purple-900/20',
                  'border border-purple-700/40 transition-all duration-500',
                  'hover:border-gold-400/50 hover:shadow-gold-glow'
                )}
              >
                <div className="mb-6 w-16 h-16 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-full border border-gold-400/40 bg-purple-900/40 group-hover:shadow-gold-glow transition-all duration-500">
                  <Icon
                    className="w-7 h-7 md:w-8 md:h-8 text-gold-400"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-gold-400 uppercase tracking-[0.2em] text-[13px] md:text-sm font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-cream/75 text-sm md:text-base leading-relaxed font-light">
                  {feature.description}
                </p>

                <div className="absolute top-0 left-0 w-full h-[2px] gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export { WhyChooseUs };
export default WhyChooseUs;
