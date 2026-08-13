import React, { useState } from 'react';
import { Phone, MessageCircle, X, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS } from '@/config/business';

export const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);

  const whatsappUrlPrimary = `https://wa.me/${BUSINESS.whatsappPrimary}?text=${encodeURIComponent(
    'Hello Shubham Swarn Kala Kendra, I am interested in exploring your gold jewelry collection.'
  )}`;
  const whatsappUrlSecondary = `https://wa.me/${BUSINESS.whatsappSecondary}?text=${encodeURIComponent(
    'Hello Shubham Swarn Kala Kendra, I have an inquiry about your jewelry showroom.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 bg-[#170a2b]/95 backdrop-blur-md gold-border p-4 rounded-xl shadow-gold-glow space-y-3 text-cream"
          >
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-gold-400" />
                <span className="font-serif text-xs font-semibold uppercase tracking-wider text-gold-300">
                  Quick Showroom Contact
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-cream/60 hover:text-gold-400 p-1 rounded transition-colors"
                aria-label="Close contact options"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-cream/70 font-light">
              Connect directly with our Doharighat jewelry specialists:
            </p>

            <div className="space-y-2">
              <a
                href={whatsappUrlPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 transition-all text-xs font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div>WhatsApp Us</div>
                  <div className="text-[10px] text-emerald-400/80">{BUSINESS.phonePrimaryFormatted}</div>
                </div>
              </a>

              <a
                href={whatsappUrlSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 transition-all text-xs font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div>WhatsApp Secondary</div>
                  <div className="text-[10px] text-emerald-400/80">{BUSINESS.phoneSecondaryFormatted}</div>
                </div>
              </a>

              <a
                href={`tel:${BUSINESS.phonePrimary}`}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-purple-950/40 border border-gold-500/30 text-gold-300 hover:bg-purple-900/40 transition-all text-xs font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <div>Direct Call</div>
                  <div className="text-[10px] text-gold-400/80">{BUSINESS.phonePrimaryFormatted}</div>
                </div>
              </a>
            </div>

            <div className="pt-1 text-[10px] text-center text-cream/50">
              📍 {BUSINESS.location}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-600 text-purple-950 shadow-gold-glow p-0.5"
        aria-label="Toggle contact popup"
      >
        <div className="w-full h-full rounded-full bg-[#120724] flex items-center justify-center transition-colors group-hover:bg-transparent">
          {open ? (
            <X className="w-6 h-6 text-gold-300 group-hover:text-purple-950 transition-colors" />
          ) : (
            <MessageCircle className="w-6 h-6 text-gold-400 group-hover:text-purple-950 transition-colors" />
          )}
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#120724] animate-pulse" />
      </motion.button>
    </div>
  );
};

export default FloatingContact;
