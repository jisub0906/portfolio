'use client'

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedSectionProps extends React.ComponentPropsWithoutRef<typeof motion.section> {
  children: React.ReactNode;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function AnimatedSection({ children, className, style, ...rest }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      style={style}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      {...rest}
    >
      {children}
    </motion.section>
  );
} 