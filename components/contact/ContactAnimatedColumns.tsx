'use client';

import React from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSocialLinks from "@/components/contact/ContactSocialLinks";
import { motion } from "framer-motion";

export default function ContactAnimatedColumns() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 max-w-4xl w-full mx-auto items-start">
      {/* 왼쪽: 안내 및 연락처 */}
      <motion.div
        className="flex flex-col gap-6 md:pr-10 md:border-r md:border-slate-200 dark:md:border-slate-700 md:h-full"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ContactInfo />
        <ContactSocialLinks className="mt-2" />
      </motion.div>
      {/* 오른쪽: ContactForm */}
      <motion.div
        className="w-full md:pl-10 flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <div className="w-full max-w-lg">
          <ContactForm />
        </div>
      </motion.div>
    </div>
  );
} 