'use client';

import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import AboutMeView, { Experience, Education } from "@/components/about/AboutMeView";
import { motion } from "framer-motion";

interface AboutPageClientProps {
  aboutMeData: {
    profileImageUrl: string;
    name: string;
    introduction: string[];
    experiences: Experience[];
    educations: Education[];
    resumeUrl: string;
  };
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutPageClient: React.FC<AboutPageClientProps> = ({ aboutMeData }) => (
  <main className="min-h-screen w-full bg-background pb-20">
    <motion.div
      className="pt-16 pb-8"
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      transition={{ duration: 0.7, delay: 0 }}
    >
      <SectionTitle title="About Me" />
    </motion.div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      transition={{ duration: 0.7, delay: 0.18 }}
    >
      <AboutMeView {...aboutMeData} />
    </motion.div>
  </main>
);

export default AboutPageClient; 