import React from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

const MOBILE_BREAKPOINT = '(max-width: 639.98px)';

export const FloatingContact: React.FC = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_PREFILLS.floating);

  const callUrl = `tel:+91${BUSINESS.phonePrimary}`;

  const directionsQuery = encodeURIComponent(BUSINESS.address);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${directionsQuery}`;

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden pointer-events-auto"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        role="region"
        aria-label="Quick contact actions"
      >
        <div className="border-t border-gold-400/20 bg-gradient-to-b from-[#0a0418]/98 to-[#05020A] backdrop-blur-xl shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-3 gap-px bg-gold-400/[0.08]">
            <a
              href={callUrl}
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-[#0a0418]/98 hover:bg-gold-400/5 active:bg-gold-400/10 transition-all duration-300 min-h-[64px]"
              aria-label={`Call ${BUSINESS.phonePrimaryFormatted}`}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gold-400/10 group-hover:bg-gold-400/18 transition-colors">
                <Phone className="w-[17px] h-[17px] text-gold-300" strokeWidth={2} />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-text/90 group-hover:text-gold-300 transition-colors">
                Call
              </span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-[#0a0418]/98 hover:bg-emerald-500/8 active:bg-emerald-500/12 transition-all duration-300 min-h-[64px]"
              aria-label="WhatsApp Shubham Swarn Kala Kendra"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-500/18 group-hover:bg-emerald-500/28 transition-colors">
                <MessageCircle className="w-[18px] h-[18px] text-emerald-400" strokeWidth={2} />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-300/95 group-hover:text-emerald-300 transition-colors">
                WhatsApp
              </span>
            </a>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-[#0a0418]/98 hover:bg-purple-700/15 active:bg-purple-700/20 transition-all duration-300 min-h-[64px]"
              aria-label="Get directions to showroom on Google Maps"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-purple-700/20 group-hover:bg-purple-700/30 transition-colors">
                <MapPin className="w-[17px] h-[17px] text-purple-300" strokeWidth={2} />
              </div>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-text/90 group-hover:text-purple-200 transition-colors">
                Directions
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="hidden sm:flex fixed bottom-7 right-7 z-50 pointer-events-auto items-center justify-center"
      aria-label="WhatsApp Shubham Swarn Kala Kendra"
    >
      <div className="relative">
        <span
          className="absolute -inset-1 rounded-full bg-emerald-500/14 blur-md"
          aria-hidden="true"
        />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border border-emerald-300/30 shadow-[0_12px_32px_-10px_rgba(16,185,129,0.55)] transition-all duration-400 hover:shadow-[0_16px_42px_-8px_rgba(16,185,129,0.68)] hover:-translate-y-0.5">
          <MessageCircle className="w-[26px] h-[26px] text-white" strokeWidth={2} />
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#05020A]" />
      </div>
    </motion.a>
  );
};

export default FloatingContact;
