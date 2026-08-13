import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  start = 0,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [value, setValue] = React.useState(start);
  const hasAnimated = React.useRef(false);
  const nodeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;

      const obj = { value: start };
      gsap.to(obj, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setValue(obj.value);
        },
      });
    }
  }, [inView, end, duration, start]);

  const displayValue = React.useMemo(() => {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.floor(value).toLocaleString('en-IN');
  }, [value, decimals]);

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      <span ref={nodeRef} aria-live="polite">
        {prefix}
        {displayValue}
        {suffix}
      </span>
    </span>
  );
};

export { AnimatedCounter };
export default AnimatedCounter;
