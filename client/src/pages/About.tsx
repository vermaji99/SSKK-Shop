import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Shield, Hand, Sparkles, ArrowRight, Award, Users, Palette, Crown } from 'lucide-react';
import { Button, SectionTitle, AnimatedCounter, GoldDivider } from '@/components/ui';
import { cn } from '@/lib/utils';

const stats = [
  { value: 25, suffix: '+', label: 'Years in Business', icon: Award },
  { value: 10000, suffix: '+', label: 'Happy Customers', icon: Users },
  { value: 5000, suffix: '+', label: 'Unique Designs', icon: Palette },
  { value: 50, suffix: '+', label: 'Master Artisans', icon: Crown },
];

const values = [
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    description:
      'Every piece is crafted from the finest metals and ethically sourced gemstones, handpicked by our experts for exceptional brilliance and clarity.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description:
      'With a legacy spanning decades, we have built relationships rooted in honesty. Every purchase comes with a certificate of authenticity and lifetime warranty.',
  },
  {
    icon: Hand,
    title: 'Artisanal Craftsmanship',
    description:
      'Our master artisans bring generations of expertise to each creation, meticulously setting every stone and shaping every curve by hand.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800/80 to-background" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 20%, rgba(212, 175, 55, 0.25) 0%, transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(75, 31, 111, 0.5) 0%, transparent 50%)',
          }}
        />
        <div className="relative container section-padding pt-40 pb-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.span
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block text-gold uppercase tracking-[0.35em] text-xs md:text-sm font-medium mb-6"
            >
              About SSKK
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="heading-serif font-bold text-gold-gradient leading-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              Our Story
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 text-text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Crafting heirlooms of tomorrow, rooted in the timeless traditions of Indian jewelry artistry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-gold-400/30 shadow-gold-glow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-purple-900 to-background-tertiary" />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-28 h-28 mx-auto mb-8 rounded-full gold-gradient flex items-center justify-center shadow-gold-glow-xl animate-gold-glow">
                    <Gem className="w-14 h-14 text-purple-900" strokeWidth={1.5} />
                  </div>
                  <p className="heading-serif text-cream text-2xl md:text-3xl font-bold italic">
                    "Jewelry is the most transformative thing you can wear."
                  </p>
                  <GoldDivider className="my-6 mx-auto" width={60} thickness={2} />
                  <p className="text-gold-300 uppercase tracking-widest text-sm font-semibold">
                    SSKK Est. 2000
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border-2 border-gold-400/20 -z-10" />
            <div className="absolute -top-6 -left-6 w-40 h-40 border-2 border-gold-400/20 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionTitle
              label="OUR HERITAGE"
              title="Where Tradition Meets Timeless Design"
              align="left"
            />
            <div className="mt-10 space-y-5 text-text-muted leading-relaxed text-base md:text-lg">
              <p>
                Founded in the heart of Doharighat, SSKK Jewelers began as a humble workshop
                where a single master artisan poured his soul into every creation. What started
                as a dream to preserve India's rich jewelry heritage has blossomed into a
                revered name synonymous with trust, elegance, and unparalleled craftsmanship.
              </p>
              <p>
                For over two decades, we have been the guardians of tradition — blending
                ancient techniques passed down through generations with contemporary designs
                that speak to the modern soul. Every piece in our collection tells a story;
                stories of celebrations, of love, of milestones, and of the women who wear
                our creations with quiet pride.
              </p>
              <p>
                From intricate gold necklaces inspired by temple architecture to delicate
                diamond pieces that catch the light in a thousand ways, our artisans imbue
                each creation with intention, meaning, and an unwavering commitment to
                excellence that has become the hallmark of the SSKK name.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/40 to-background" />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
            }}
          />
        </div>
        <div className="relative container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass p-8 text-center group hover:shadow-gold-glow-lg transition-all duration-500"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient/10 border border-gold-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-gold-300" strokeWidth={1.75} />
                  </div>
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="heading-serif font-bold text-cream text-4xl md:text-5xl text-gold-gradient"
                  />
                  <p className="mt-4 text-text-muted uppercase tracking-wider text-xs md:text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1"
          >
            <SectionTitle
              label="OUR VISION"
              title="The Artisan Behind the Legacy"
              align="left"
            />
            <div className="mt-10 space-y-5 text-text-muted leading-relaxed text-base md:text-lg">
              <p>
                Our founder, a visionary with gold in his veins and artistry in his hands,
                believed that jewelry is more than adornment — it is emotion made tangible,
                memory given form, and love captured in precious metal.
              </p>
              <p>
                Under his guidance, SSKK has grown to become a sanctuary where heritage
                techniques thrive alongside modern innovation. Each artisan in our workshop
                undergoes years of rigorous apprenticeship, mastering the delicate arts of
                filigree, kundan, polki, and stone setting before they are entrusted with
                creating pieces that will be treasured for generations.
              </p>
              <p>
                "We don't just sell jewelry," he often says. "We create companions for
                life's most precious moments. Every piece that leaves our workshop carries
                a piece of our heart and the blessings of countless hours of devotion."
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-purple-900" />
              </div>
              <div>
                <p className="heading-serif text-cream text-xl font-bold">SSKK Founder</p>
                <p className="text-gold-300 text-sm uppercase tracking-wider">
                  Master Jeweler & Visionary
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square overflow-hidden border-2 border-gold-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-background-tertiary to-purple-800" />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.25) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(212, 175, 55, 0.2) 0%, transparent 40%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-36 h-36 mx-auto mb-8 rounded-full gold-gradient flex items-center justify-center shadow-gold-glow-xl">
                    <Users className="w-18 h-18 text-purple-900" strokeWidth={1.5} style={{ width: 72, height: 72 }} />
                  </div>
                  <h3 className="heading-serif text-cream text-2xl md:text-3xl font-bold mb-3">
                    Family of Artisans
                  </h3>
                  <p className="text-text-muted text-base">
                    50+ skilled craftspeople, each a master in their specialty, united by a
                    shared passion for timeless beauty.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold-400/10 -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </section>

      <section className="container section-padding pt-4">
        <SectionTitle
          label="WHY CHOOSE US"
          title="The SSKK Difference"
          subtitle="Three pillars that have made us the trusted choice for discerning jewelry lovers across generations."
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative p-10 bg-gradient-to-b from-background-tertiary to-purple-900/20 border border-purple-700/40 hover:border-gold-400/40 transition-all duration-500 hover:shadow-gold-glow-lg"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className={cn(
                  'w-18 h-18 mb-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 group-hover:shadow-gold-glow',
                  'border-gold-400/40 bg-gold-400/5 group-hover:border-gold-400/70 group-hover:bg-gold-400/10'
                )} style={{ width: 72, height: 72 }}>
                  <Icon className="w-9 h-9 text-gold-300 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                </div>
                <h3 className="heading-serif text-cream text-2xl font-bold mb-5 leading-tight">
                  {value.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="container pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden border-2 border-gold-400/30 p-10 md:p-16 lg:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-background-tertiary to-purple-800/60" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
            }}
          />
          <div className="relative">
            <h2
              className="heading-serif font-bold text-gold-gradient leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="mt-6 text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you're marking a milestone, searching for a gift, or simply treating
              yourself to something extraordinary, we're here to help you find a piece as
              unique as your story.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Button size="lg" asChild>
                <Link to="/collections">
                  Explore Collections
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
