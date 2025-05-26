'use client';

import React from "react";
import ContactForm from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const EMAIL = "jisub0906@gmail.com"; // 실제 이메일로 교체
const GITHUB_URL = "https://github.com/jisub0906";
const LINKEDIN_URL = "https://www.linkedin.com/in/jisub-lee-283093284/";

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
        <p className="text-base text-muted-foreground">
          프로젝트 문의, 협업 제안, 또는 커피챗도 환영합니다.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary font-medium hover:underline"
              aria-label="이메일 보내기"
            >
              {EMAIL}
            </a>
          </div>
          <div className="flex flex-row items-center gap-2 mt-2">
            <Button asChild variant="outline" size="icon" aria-label="GitHub">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
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