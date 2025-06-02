// components/features/about/AboutContent.tsx - 자기소개 마크다운 콘텐츠 렌더링

"use client";

import { motion } from "framer-motion";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import { cn } from "@/lib/utils";

interface AboutContentProps {
  /** 렌더링할 마크다운 콘텐츠 */
  contentMarkdown?: string | null;
  /** 추가 CSS 클래스 */
  className?: string;
}

const AboutContent = ({ 
  contentMarkdown, 
  className,
}: AboutContentProps) => {
  // contentMarkdown이 falsy이거나 빈 문자열일 경우 null 반환
  if (!contentMarkdown || contentMarkdown.trim() === "") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className={cn(
        // 기본 레이아웃 - 더 깔끔하게
        "bg-card border border-border/50 rounded-lg p-8",
        // 그림자 효과 - 더 부드럽게
        "shadow-sm hover:shadow-md transition-all duration-300",
        // 호버 효과 - 더 미묘하게
        "hover:border-border",
        className
      )}
    >
      <MarkdownRenderer content={contentMarkdown} />
    </motion.div>
  );
};

export default AboutContent; 