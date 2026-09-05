import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Navigation, Calendar } from 'lucide-react';
import { Button, SectionTitle } from '@/components/ui';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl, GOOGLE_MAPS_SEARCH } from '@/config/business';
import { JEWELRY_IMAGES } from '@/config/assets';

const SHOWROOM_WHATSAPP_URL = buildWhatsAppUrl("Hello SSKK, I would like to book a appointment / showroom visit to view your jewellery collection in Doharighat.");

export const ShowroomSection: React.FC = () => {
  return (
    <section id="showroom-visit" className="section-padding relative overflow-hidden bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual & Maps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="relative aspect-[16/10] overflow-hidden border border-gold-400/25 shadow-2xl group">
              <img
                src={JEWELRY_IMAGES.necklace}
                alt="Shubham Swarn Kala Kendra Jewellery Showroom Showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05020A] via-[#05020A]/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-medium text-cream">
                <span className="flex items-center gap-1.5 bg-[#0B0515]/90 px-3 py-1.5 border border-gold-400/30">
                  <MapPin size={14} className="text-gold-400" /> {BUSINESS.city}, {BUSINESS.district}
                </span>
                <span className="bg-gold-400/20 text-gold-300 px-3 py-1.5 border border-gold-400/40 uppercase tracking-widest text-[10px] font-semibold">
                  Open Today
                </span>
              </div>
            </div>

            {/* Embedded Google Map iframe fallback */}
            <div className="relative aspect-[16/7] overflow-hidden border border-gold-400/20 bg-[#0A0414]">
              <iframe
                title="SSKK Showroom Location Map"
                src={BUSINESS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.85)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right Showroom Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionTitle
              label="VISIT US"
              title="Visit Our Showroom"
              subtitle="Experience the jewellery in person and let our experts help you find the piece that's right for you."
              align="left"
              className="mb-4"
            />

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-[#0B0515] border border-gold-400/15">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-1">
                    Showroom Address
                  </h4>
                  <p className="text-cream/90 text-sm leading-relaxed font-sans">
                    {BUSINESS.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#0B0515] border border-gold-400/15">
                <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-1">
                    Showroom Hours
                  </h4>
                  <p className="text-cream/90 text-sm font-sans">{BUSINESS.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#0B0515] border border-gold-400/15">
                <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-1">
                    Direct Contact
                  </h4>
                  <p className="text-cream/90 text-sm font-sans">
                    {BUSINESS.phonePrimaryFormatted} &middot; {BUSINESS.phoneSecondaryFormatted}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button asChild variant="primary" size="lg" className="flex-1 min-w-[210px]">
                <a
                  href={SHOWROOM_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> BOOK A SHOWROOM VISIT
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="flex-1 min-w-[190px]">
                <a
                  href={GOOGLE_MAPS_SEARCH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <Navigation size={16} /> GET DIRECTIONS
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
