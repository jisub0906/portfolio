// components/features/techstack/TechCategorySection.tsx - 기술 카테고리별 스킬 목록 섹션

"use client";

import { useMemo, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import TechStackItem, { TechStackItemType } from "./TechStackItem";
import { Tables } from "@/types/supabase_portfolio";
import { cn } from "@/lib/utils";

// TechCategorySection Props 인터페이스 정의
export interface TechCategorySectionProps {
  categoryName: string;
  techStacks: TechStackItemType[];
  className?: string;
  itemSize?: "sm" | "md" | "lg";
  showProficiency?: boolean;
  variant?: "default" | "compact" | "detailed";
}

/**
 * SVG 콘텐츠를 안전하게 살균하는 함수 (클라이언트 전용)
 * @param svgContent - 살균할 SVG 문자열
 * @returns 살균된 안전한 SVG 문자열
 */
const sanitizeSvg = (svgContent: string): string => {
  if (typeof window !== 'undefined' && DOMPurify?.sanitize) {
    return DOMPurify.sanitize(svgContent, {
      USE_PROFILES: { svg: true, svgFilters: true },
      ALLOWED_TAGS: ['svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'ellipse', 'g', 'defs', 'clipPath', 'mask'],
      ALLOWED_ATTR: ['viewBox', 'width', 'height', 'fill', 'stroke', 'stroke-width', 'd', 'cx', 'cy', 'r', 'x', 'y', 'transform', 'class'],
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe'],
      FORBID_ATTR: ['onload', 'onclick', 'onerror', 'onmouseover', 'onfocus', 'onblur'],
    });
  }
  return svgContent;
};

/**
 * 특정 기술 카테고리에 속하는 기술들을 표시하는 섹션 컴포넌트
 * @param categoryName - 카테고리 이름 (예: "Frontend", "Backend")
 * @param techStacks - 해당 카테고리에 속한 기술 스택 배열
 * @param className - 추가 CSS 클래스
 * @param itemSize - 개별 아이템 크기 (sm, md, lg)
 * @param showProficiency - 숙련도 표시 여부
 * @param variant - 아이템 표시 스타일
 */
const TechCategorySection: React.FC<TechCategorySectionProps> = ({
  categoryName,
  techStacks,
  className,
  itemSize = "md",
  showProficiency = false,
  variant = "default",
}) => {
  const [isClient, setIsClient] = useState(false);
  
  // 클라이언트 마운트 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 기술 스택 배열이 비어있으면 렌더링하지 않음
  if (!techStacks || techStacks.length === 0) {
    return null;
  }

  // SVG 콘텐츠 살균을 클라이언트에서만 처리
  const sanitizedTechStacks = useMemo(() => {
    if (!isClient) {
      // 서버 사이드에서는 원본 데이터 반환
      return techStacks;
    }
    
    // 클라이언트에서만 SVG 살균 처리
    return techStacks.map(tech => ({
      ...tech,
      icon_svg_content: tech.icon_svg_content ? sanitizeSvg(tech.icon_svg_content) : null,
    }));
  }, [techStacks, isClient]);

  // 아이템 크기와 변형에 따른 그리드 클래스 결정
  const getGridClasses = () => {
    if (variant === "detailed") {
      // detailed 변형은 더 넓은 공간 필요
      switch (itemSize) {
        case "sm":
          return "grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8";
        case "lg":
          return "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
        default: // md
          return "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      }
    }

    // default, compact 변형
    switch (itemSize) {
      case "sm":
        return "grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10";
      case "lg":
        return "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      default: // md
        return "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
    }
  };

  return (
    <section className={cn("mb-12", className)}>
      {/* 카테고리 제목 */}
      <h3 className="mb-6 text-2xl font-semibold tracking-tight text-foreground border-b pb-3">
        {categoryName}
      </h3>

      {/* 기술 목록 그리드 컨테이너 */}
      <div className={getGridClasses()}>
        {sanitizedTechStacks.map((tech) => (
          <TechStackItem
            key={tech.id}
            tech={tech}
            size={itemSize}
            showProficiency={showProficiency}
            variant={variant}
          />
        ))}
      </div>
    </section>
  );
};

export default TechCategorySection; 