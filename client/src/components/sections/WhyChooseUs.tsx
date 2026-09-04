import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Shield,
  Gem,
  Sparkles,
  CircleDollarSign,
  Compass,
  HeartHandshake,
  LucideIcon,
} from 'lucide-react';
import { SectionTitle } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Feature {
  numeral: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    numeral: '01',
    icon: Shield,
    title: 'BIS Hallmarked Gold',
    description:
      'Every piece of gold jewellery at our Doharighat showroom carries a BIS hallmark, verifying purity independently.',
  },
  {
    numeral: '02',
    icon: Gem,
    title: 'Certified Diamonds',
    description:
      'We source and set only diamond stones with certified grading for clarity, cut and carat.',
  },
  {
    numeral: '03',
    icon: Sparkles,
    title: 'Expert Craftsmanship',
    description:
      'Our in-house craftsmen hand-finish each piece with heritage techniques learned over generations of jewellers.',
  },
  {
    numeral: '04',
    icon: CircleDollarSign,
    title: 'Transparent Pricing',
    description:
      'Final prices are estimates based on live gold rates and making charges for the day of purchase; share complete breakup.',
  },
  {
    numeral: '05',
    icon: Compass,
    title: 'Custom Jewellery',
    description:
      'Bring any design, reference or family heirloom brief and we craft a bespoke piece around your budget and taste.',
  },
  {
    numeral: '06',
    icon: HeartHandshake,
    title: 'Personalised Service',
    description:
      'Visit our Doharighat showroom for a one-on-one consultation with a jewellery expert at no charge.',
  },
];

const WhyChooseUs: React.FC = () => {
  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="why-sskk"
      className="section-padding relative overflow-hidden bg-background-secondary/30"
    >
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
          className="mb-12 md:mb-14"
        />

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.numeral}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={cn(
                  'group relative flex flex-col items-start p-5 md:p-6 h-full',
                  'bg-gradient-to-b from-background-tertiary/80 to-purple-900/20',
                  'border border-purple-700/40 transition-all duration-500',
                  'hover:border-gold-400/40'
                )}
              >
                <div className="relative mb-4 w-full">
                  <span className="block text-[11px] uppercase tracking-[0.22em] font-semibold text-gold-400/70 mb-1">
                    {feature.numeral}
                  </span>
                  <span
                    className="absolute -top-1 right-0 heading-serif font-bold text-gold-400/12 leading-none select-none pointer-events-none"
                    style={{ fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)' }}
                    aria-hidden="true"
                  >
                    {feature.numeral}
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-center w-11 h-11 rounded-full border border-gold-400/28 bg-purple-900/38 transition-all duration-500 group-hover:scale-105">
                  <Icon
                    className="w-[22px] h-[22px] text-gold-400"
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="text-gold-400 uppercase tracking-[0.18em] text-[12px] md:text-[13px] font-bold mb-3 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-cream/72 text-[13px] md:text-sm leading-relaxed font-light">
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
