import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LuxuryPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const LuxuryPreloader: React.FC<LuxuryPreloaderProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 1: Initial progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, minDuration / 25);

    // Switch text to "CRAFTED IN GOLD" halfway through
    const textTimer = setTimeout(() => {
      setStep(2);
    }, minDuration * 0.5);

    // Fade out preloader
    const doneTimer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(textTimer);
      clearTimeout(doneTimer);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="luxury-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0714] text-[#F4D77B] select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading Shubham Swarn Kala Kendra"
        >
          {/* Subtle radial background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/40 via-[#0d0714] to-[#0d0714] pointer-events-none" />

          {/* Luxury Circular Progress */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            {/* Background ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="2"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#goldGradient)"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * progress) / 100}
                strokeLinecap="round"
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4D77B" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#AA7C11" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Emblem / Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-xs text-gold-300 tracking-widest font-semibold">
                {progress}%
              </span>
            </div>
          </div>

          {/* Brand Titles */}
          <div className="text-center px-4 overflow-hidden h-16 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="brand-name"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1"
                >
                  <h1 className="font-serif text-lg md:text-xl font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
                    SHUBHAM SWARN KALA KENDRA
                  </h1>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-cream/60">
                    DOHARIGHAT • MAU
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="crafted-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-serif text-sm md:text-base tracking-[0.4em] uppercase text-gold-300 font-medium">
                    CRAFTED IN GOLD
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LuxuryPreloader;
