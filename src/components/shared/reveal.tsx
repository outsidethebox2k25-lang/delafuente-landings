'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const easeEditorial = [0.22, 0.61, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

export const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  variants?: Variants;
};

export function Reveal({ children, delay = 0, variants = fadeUp, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '-60px' }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  delay = 0.1,
  ...rest
}: HTMLMotionProps<'div'> & { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '-60px' }}
      variants={stagger(delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = motion.div;
