"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-label="개발자 지섭 소개 및 주요 액션"
      className={cn(
        "container mx-auto flex min-h-[calc(80vh)] flex-col items-center justify-center gap-6 py-12 text-center md:py-20 lg:py-24",
        className
      )}
    >
      {/* 메인 헤드라인 */}
      <motion.h1
        className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        경험으로 증명하는 개발자,{" "}
        <span className="text-primary">지섭</span>입니다.
      </motion.h1>

      {/* 소개 문구 */}
      <motion.p
        className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      >
        사용자 중심의 직관적이고 효율적인 웹 애플리케이션 구축을 목표로 합니다.
        다양한 프로젝트 경험과 깊이 있는 기술 이해를 바탕으로, 아이디어를
        현실로 만들어내는 과정을 즐깁니다.
      </motion.p>

      {/* CTA 버튼 그룹 */}
      <motion.div
        className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
        role="group"
        aria-label="주요 페이지 이동 버튼"
      >
        <Link href="/projects">
          <Button size="lg" className="w-full sm:w-auto">
            프로젝트 보기
          </Button>
        </Link>
        <Link href="/tech-stack">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            기술 스택 보기
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            연락하기
          </Button>
        </Link>
      </motion.div>
    </section>
  );
} 