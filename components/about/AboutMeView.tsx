'use client'
import React from "react";
import { motion } from "framer-motion";
import AboutProfile from "./AboutProfile";
import AboutExperience from "./AboutExperience";
import AboutEducation from "./AboutEducation";

export interface AboutMeViewProps {
  profileImageUrl: string;
  name: string;
  introduction: string | string[];
  experiences: Experience[];
  educations: Education[];
  resumeUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

const AboutMeView: React.FC<AboutMeViewProps> = ({
  profileImageUrl,
  name,
  introduction,
  experiences,
  educations,
  resumeUrl,
}) => {
  return (
    <motion.section
      className="w-full max-w-4xl mx-auto px-4 py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{}}
    >
      <AboutProfile
        profileImageUrl={profileImageUrl}
        name={name}
        introduction={introduction}
        resumeUrl={resumeUrl}
      />
      <AboutExperience experiences={experiences} />
      <AboutEducation educations={educations} />
    </motion.section>
  );
};

export default AboutMeView; 