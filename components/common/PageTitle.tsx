// components/common/PageTitle.tsx - 공용 페이지 제목 컴포넌트

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  /** 페이지의 주 제목 (필수) */
  title: string;
  /** 페이지의 부제목 (선택적) */
  subtitle?: string;
  /** 추가 CSS 클래스 (선택적) */
  className?: string;
  /** 테스트용 data-testid (선택적) */
  "data-testid"?: string;
}

const PageTitle = ({ title, subtitle, className, "data-testid": dataTestId }: PageTitleProps) => {
  // title이 falsy이면 아무것도 렌더링하지 않음
  if (!title) {
    return null;
  }

  return (
    <motion.div 
      className={cn("text-center mb-8", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid={dataTestId}
    >
      <motion.h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        data-testid="page-title-h1"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p 
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          data-testid="page-title-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* 장식적인 구분선 */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mt-6"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default PageTitle; 