import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Shield, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button, SectionTitle, GoldDivider } from '@/components/ui';
import SEO from '@/components/common/SEO';
import { PAGE_SEO } from '@/config/seo';
import { JEWELRY_IMAGES } from '@/config/assets';
import { BUSINESS } from '@/config/business';

const trustPillars = [
  {
    icon: Shield,
    title: 'BIS Hallmarked Gold',
    description:
      'Every gold piece carries the trusted BIS hallmark — a genuine assurance of purity and authenticity.',
  },
  {
    icon: Award,
    title: 'Certified Diamonds',
    description:
      'Diamonds sourced with integrity and accompanied by certification, so you can buy with complete confidence.',
  },
  {
    icon: Gem,
    title: '22K & 18K Purity',
    description:
      'Handcrafted pieces in 22K for traditional bridal wear and 18K for diamond-set contemporary designs.',
  },
  {
    icon: HeartHandshake,
    title: 'Bespoke Custom Designs',
    description:
      'Work directly with our craftsmen to create a one-of-a-kind piece tailored to your taste and occasion.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        canonical={PAGE_SEO.about.canonical}
      />
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[46vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800/60 to-background" />
        <div
          className="absolute inset-0 opacity-28"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 30% 24%, rgba(212, 175, 55, 0.18) 0%, transparent 48%), radial-gradient(ellipse at 72% 82%, rgba(75, 31, 111, 0.42) 0%, transparent 52%)',
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
              className="heading-serif font-semibold text-gold-gradient leading-tight"
              style={{ fontSize: 'clamp(2.75rem, 7.2vw, 5.25rem)' }}
            >
              Our Showroom
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-7 text-cream/72 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              A trusted Doharighat showroom for handcrafted gold and diamond jewellery — serving {BUSINESS.district} and nearby communities with personalized care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-gold-400/22">
              <img
                src={JEWELRY_IMAGES.royalRing}
                alt="Handcrafted 22K gold diamond ring — SSKK signature design"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/22 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6 sm:p-8 md:p-10">
                <div className="text-left">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-5 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
                    <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-gold-300" strokeWidth={1.5} />
                  </div>
                  <p className="heading-serif text-cream text-lg sm:text-xl md:text-2xl font-medium leading-snug max-w-sm">
                    Hand-finished pieces, selected in person at our Doharighat showroom.
                  </p>
                  <GoldDivider className="my-5" width={60} thickness={2} />
                  <p className="text-gold-300/90 uppercase tracking-widest text-[11px] sm:text-xs font-semibold">
                    SSKK · {BUSINESS.city}, {BUSINESS.district}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-36 h-36 border border-gold-400/16 -z-10" />
            <div className="absolute -top-5 -left-5 w-36 h-36 border border-gold-400/16 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SectionTitle
              label="OUR FOCUS"
              title="Craftsmanship, Purity, and Personal Care"
              align="left"
            />
            <div className="mt-8 space-y-4 text-cream/72 leading-relaxed text-base md:text-[17px]">
              <p>
                {BUSINESS.name} is a local {BUSINESS.city} jewellery showroom offering a curated selection of gold rings, bangles, necklaces, bridal sets, and custom gemstone designs.
              </p>
              <p>
                Each piece in our collection is selected for craftsmanship and finish quality. We help customers choose the right jewellery for weddings, engagements, gifting, and everyday wear — with honest guidance and attentive service.
              </p>
              <p>
                Visit us in-store to view our complete collection, discuss custom design requirements, or get a live price quote based on current gold rates and making charges.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/28 to-background" />
        <div className="absolute inset-0 opacity-22">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.11) 0%, transparent 62%)',
            }}
          />
        </div>
        <div className="relative container">
          <SectionTitle
            label="OUR COMMITMENT"
            title="Four Pillars of Trust"
            subtitle="The standards that define every piece and every interaction at our showroom."
          />
          <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5">
            {trustPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass p-7 sm:p-8 group hover:border-gold-400/34 border border-purple-700/32 transition-all duration-500"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 rounded-full bg-gold-400/10 border border-gold-400/26 flex items-center justify-center group-hover:scale-105 transition-transform duration-500" style={{ width: 56, height: 56 }}>
                    <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-gold-300" strokeWidth={1.75} />
                  </div>
                  <h3 className="heading-serif font-semibold text-cream text-base sm:text-lg text-center leading-tight mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-cream/68 text-center text-[13px] sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section-padding pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1"
          >
            <SectionTitle
              label="THE EXPERIENCE"
              title="Visit Our Showroom"
              align="left"
            />
            <div className="mt-8 space-y-4 text-cream/72 leading-relaxed text-base md:text-[17px]">
              <p>
                We invite you to experience our collection in person at our {BUSINESS.city} showroom. View pieces up close, compare designs side by side, and receive individualized attention from our team.
              </p>
              <p>
                Custom design consultations are available by appointment. Bring inspirations, photographs, or heirloom pieces — and we'll work with you on a bespoke creation.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button size="lg" asChild>
                <Link to="/collections">
                  Browse the Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">
                  Get Directions
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square overflow-hidden border border-gold-400/22">
              <img
                src={JEWELRY_IMAGES.birdLocket}
                alt="Handcrafted gold bird locket pendant — artisan-crafted in SSKK workshop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/22 via-transparent to-black/48" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-full h-full border border-gold-400/10 -z-10 translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </section>

      <section className="container pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden border border-gold-400/22 p-8 md:p-14 lg:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/52 via-background-tertiary to-purple-800/50" />
          <div
            className="absolute inset-0 opacity-28"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.13) 0%, transparent 52%), radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.10) 0%, transparent 52%)',
            }}
          />
          <div className="relative">
            <h2
              className="heading-serif font-semibold text-gold-gradient leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 4.6vw, 3.25rem)' }}
            >
              Find a Piece You'll Treasure
            </h2>
            <p className="mt-6 text-cream/72 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our collection online, then visit our showroom to see and select your piece in person. Our team will guide you through every step.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4 sm:gap-5">
              <Button size="lg" asChild>
                <Link to="/collections">
                  Explore Jewellery
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a
                  href={BUSINESS.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp for Inquiry
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default About;
