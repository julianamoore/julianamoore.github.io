import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const TAGS = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  header: motion.header,
  article: motion.article,
  h2: motion.h2,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof TAGS;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
};

/** Scroll-triggered entrance used across every section for one consistent motion language. */
export function Reveal({ children, as = 'div', delay = 0, y = 26, className, amount = 0.25 }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = TAGS[as];
  const Plain = as;

  if (reduced) return <Plain className={className}>{children}</Plain>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
