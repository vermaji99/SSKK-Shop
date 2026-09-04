import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { HeroVideo } from '@/components/cinematic/HeroVideo';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { BUSINESS, WHATSAPP_PREFILLS, buildWhatsAppUrl } from '@/config/business';

const HERO_MOBILE_BREAKPOINT = '(max-width: 639.98px)';
const HERO_MOBILE_MP4 =
  '/Jewellery_commercial_for_SSKK_202608271422_202608311433.mp4';
const HERO_DESKTOP_MP4 =
  '/Jewellery_commercial_for_SSKK_202608271422.mp4';

const HERO_WHATSAPP_URL = buildWhatsAppUrl(WHATSAPP_PREFILLS.hero);

const CinematicHero: React.FC = () => {
  const reducedMotionStore = useUIStore((s) => s.reducedMotion);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = reducedMotionStore || prefersReducedMotion;
  const isMobile = useMediaQuery(HERO_MOBILE_BREAKPOINT);

  const baseDelay = reducedMotion ? 0.08 : 0.22;

  return (
    <section
      id="hero"
      className="relative w-full hero-section-height bg-[#05020A] overflow-hidden isolate select-none"
      aria-label="Premium gold and diamond jewellery showcase"
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <HeroVideo
          reducedMotion={reducedMotion}
          hoverPlay
          onPlaybackEnded={() => {}}
          restartToken={0}
          ariaLabel="Jewellery commercial cinematic showcase — hover to play, tap to play on mobile"
          webmSrcOverride={null}
          mp4SrcOverride={isMobile ? HERO_MOBILE_MP4 : HERO_DESKTOP_MP4}
          sourceMp4FallbackOverride={isMobile ? HERO_MOBILE_MP4 : HERO_DESKTOP_MP4}
        />
      </div>

      <div
        className="absolute inset-0 z-[1] pointer-events-none hero-vignette"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="relative h-full w-full container flex flex-col justify-end md:justify-center pb-10 sm:pb-16 md:pb-12 pt-24 sm:pt-28 md:pt-20"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2.5rem)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: baseDelay,
              duration: reducedMotion ? 0.4 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="eyebrow text-gold uppercase mb-5 sm:mb-7"
              style={{ letterSpacing: '0.32em' }}
            >
              {BUSINESS.name}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: reducedMotion ? baseDelay + 0.05 : baseDelay + 0.14,
              duration: reducedMotion ? 0.45 : 1.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1
              className="editorial-h1 hero-gold-text hero-gold-sheen font-serif font-medium leading-heading-1 whitespace-pre-line"
              style={{
                textShadow:
                  '0 1px 22px rgba(5,2,10,0.82), 0 0 28px rgba(244,215,123,0.06)',
              }}
            >
              Crafted in Gold.{'\n'}Designed for Your Forever.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? baseDelay + 0.12 : baseDelay + 0.48,
              duration: reducedMotion ? 0.4 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 sm:mt-7 max-w-2xl md:max-w-3xl font-sans text-cream/78 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed"
            style={{ letterSpacing: '0.005em' }}
          >
            Timeless jewellery crafted with precision, passion and trusted craftsmanship in Doharighat, Mau.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? baseDelay + 0.2 : baseDelay + 0.78,
              duration: reducedMotion ? 0.4 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 sm:mt-5 flex items-center gap-2 text-cream/55 text-[12px] sm:text-[13px]"
          >
            <MapPin size={14} strokeWidth={1.5} className="text-gold-400/80 shrink-0" />
            <span>
              Sabji Mandi Road &middot; {BUSINESS.city} &middot; {BUSINESS.district}, UP
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reducedMotion ? baseDelay + 0.28 : baseDelay + 1.05,
              duration: reducedMotion ? 0.4 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 max-w-3xl"
          >
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] sm:min-w-[216px]"
            >
              <Link to="/collections">Explore Jewellery</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] sm:min-w-[232px]"
            >
              <Link to="/contact#visit">Book a Showroom Visit</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] border border-gold-400/30 hover:border-gold-400/60 hover:bg-gold-400/[0.07]"
            >
              <a
                href={HERO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp SSKK about jewellery collections"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
                WhatsApp Us
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { CinematicHero };
export default CinematicHero;
