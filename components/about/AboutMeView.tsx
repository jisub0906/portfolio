'use client'
import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

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

export interface AboutMeViewProps {
  profileImageUrl: string;
  name: string;
  introduction: string | string[];
  experiences: Experience[];
  educations: Education[];
  resumeUrl?: string;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

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
      {/* Profile & Intro */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 mb-12 bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-md p-6">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0 flex justify-center items-center w-full lg:w-auto">
          <div className="w-40 h-40 relative">
            <Image
              src={profileImageUrl}
              alt={name}
              fill
              className="rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow"
              priority
            />
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">{name}</h1>
          {Array.isArray(introduction)
            ? introduction.map((para, idx) => (
                <p key={idx} className="mb-3 text-lg text-slate-700 dark:text-slate-300">
                  {para}
                </p>
              ))
            : (
                <p className="mb-3 text-lg text-slate-700 dark:text-slate-300">{introduction}</p>
              )}
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="mt-2">
                <Download className="mr-2" /> 이력서 다운로드
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <motion.div
        className="mb-10"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
          경력 <span className="h-0.5 w-8 bg-blue-500 rounded ml-2" />
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-col gap-1 pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">{exp.company}</span>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{exp.role}</div>
                {exp.description && (
                  <div className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line">{exp.description}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
          학력 <span className="h-0.5 w-8 bg-blue-500 rounded ml-2" />
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {educations.map((edu, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-col gap-1 pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">{edu.institution}</span>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{edu.degree}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutMeView; 