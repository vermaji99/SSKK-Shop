import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, SectionTitle } from '@/components/ui';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

const CONSULTATION_WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_PREFILLS.custom);

export const JewelryExperience: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-[#0B0515] border-t border-gold-400/15">
      <div className="container text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="space-y-6 p-8 sm:p-14 bg-[#0E061B] border border-gold-400/25 shadow-2xl relative"
        >
          <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
            <Sparkles className="w-6 h-6 text-gold-400" />
          </div>

          <SectionTitle
            label="EXCLUSIVITY & CARE"
            title="A Personal Jewellery Experience"
            subtitle=""
            align="center"
            className="mb-2"
          />

          <p className="text-cream/85 text-base sm:text-xl font-serif leading-relaxed italic max-w-2xl mx-auto">
            "Jewellery is more than ornament — it is a reflection of your story, legacy, and love. At SSKK, we take pride in offering private, transparent consultations for every family."
          </p>

          <p className="text-text-muted text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Visit our Doharighat showroom to view piece details in person, discuss custom metal and diamond options, or request direct WhatsApp guidance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg" className="min-w-[220px]">
              <a
                href={CONSULTATION_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                REQUEST CONSULTATION
                <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="min-w-[200px]">
              <Link to="/contact#visit">VISIT SHOWROOM</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JewelryExperience;
