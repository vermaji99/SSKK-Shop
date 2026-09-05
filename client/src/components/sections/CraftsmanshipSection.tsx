import * as React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui';

const steps = [
  {
    num: '01',
    title: 'DESIGN',
    desc: 'Every piece begins with a thoughtful design, balancing timeless aesthetics with structural balance.',
  },
  {
    num: '02',
    title: 'CRAFT',
    desc: 'Skilled master artisans bring the design to life using 22K and 18K hallmarked precious gold.',
  },
  {
    num: '03',
    title: 'DETAIL',
    desc: 'Every setting, curve and gemstone finish is carefully refined to meet strict purity and optical standards.',
  },
  {
    num: '04',
    title: 'FOREVER',
    desc: 'Created to be worn with pride, treasured through life moments, and passed forward as a family heirloom.',
  },
];

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-background-secondary/60 border-t border-gold-400/15">
      <div className="container relative">
        <SectionTitle
          label="ARTISTRY & PROCESS"
          title="The Craftsmanship Journey"
          subtitle="How master goldsmiths transform pure 22K gold into heirlooms."
          align="center"
          className="mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.1 }}
              className="relative p-6 sm:p-8 bg-[#0B0515] border border-gold-400/20 hover:border-gold-400/50 transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-3xl sm:text-4xl text-gold-400/40 font-bold group-hover:text-gold-300 transition-colors">
                  {step.num}
                </span>
                <div className="w-8 h-[1px] bg-gold-400/30 group-hover:w-12 transition-all" />
              </div>

              <h3 className="font-serif text-xl font-medium text-cream tracking-wide mb-3 group-hover:text-gold-300 transition-colors">
                {step.title}
              </h3>

              <p className="text-cream/75 text-sm leading-relaxed font-sans">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
