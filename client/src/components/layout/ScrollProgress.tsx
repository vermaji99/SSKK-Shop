import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const [isVisible, setIsVisible] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 500 : 100,
    damping: reducedMotion ? 100 : 30,
    mass: reducedMotion ? 1 : 0.5,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent origin-left"
      style={{ opacity: isVisible ? 1 : 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full w-full gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.6)]"
        style={{ scaleX }}
      />
    </motion.div>
  );
}

export default ScrollProgress;
