'use client'

import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 text-center"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="mt-1 text-lg text-muted-foreground text-center">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle; 