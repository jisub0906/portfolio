"use client";

import Image from "next/image";
import { memo } from "react";
import Icon from "@/components/common/Icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 기술 스택 아이템 타입 정의 (TechCategorySection과 호환)
export interface TechStackItemType {
  id: string;
  name: string;
  icon_svg_content?: string | null;
  icon_url?: string | null;
  summary?: string | null;
  proficiency_level?: number | null; // 1-5 범위
}

export interface TechStackItemProps {
  tech: TechStackItemType;
  className?: string;
  size?: "sm" | "md" | "lg";
  showProficiency?: boolean;
  variant?: "default" | "compact" | "detailed";
}

/**
 * 개별 기술 스택을 표시하는 아이템 컴포넌트
 * @param tech - 기술 스택 정보
 * @param className - 추가 CSS 클래스
 * @param size - 아이템 크기 (sm: 작음, md: 중간, lg: 큼)
 * @param showProficiency - 숙련도 표시 여부
 * @param variant - 표시 스타일 (default: 기본, compact: 간소화, detailed: 상세)
 */
const TechStackItem: React.FC<TechStackItemProps> = memo(({
  tech,
  className,
  size = "md",
  showProficiency = false,
  variant = "default",
}) => {
  // tech prop이 없으면 렌더링하지 않음
  if (!tech) {
    return null;
  }

  // 크기별 스타일 정의
  const sizeStyles = {
    sm: {
      container: "gap-1.5 p-2",
      iconContainer: "h-8 w-8 p-1.5",
      icon: "h-5 w-5",
      title: "text-xs",
      summary: "text-xs",
      star: "h-2.5 w-2.5",
    },
    md: {
      container: "gap-2.5 p-3",
      iconContainer: "h-12 w-12 p-2",
      icon: "h-8 w-8",
      title: "text-sm",
      summary: "text-xs",
      star: "h-3 w-3",
    },
    lg: {
      container: "gap-3 p-4",
      iconContainer: "h-16 w-16 p-3",
      icon: "h-10 w-10",
      title: "text-base",
      summary: "text-sm",
      star: "h-3.5 w-3.5",
    },
  };

  // 변형별 스타일 정의
  const variantStyles = {
    default: "hover:bg-muted/60 hover:scale-105",
    compact: "hover:bg-muted/40",
    detailed: "hover:bg-muted/70 hover:shadow-md border border-border/50 hover:border-border",
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  // 숙련도 레벨에 따른 색상 결정
  const getProficiencyColor = (level: number) => {
    if (level >= 4) return "text-green-500 fill-green-500";
    if (level >= 3) return "text-blue-500 fill-blue-500";
    if (level >= 2) return "text-yellow-500 fill-yellow-500";
    return "text-orange-500 fill-orange-500";
  };

  // 숙련도 레벨에 따른 텍스트
  const getProficiencyText = (level: number) => {
    if (level >= 4) return "전문가";
    if (level >= 3) return "숙련";
    if (level >= 2) return "중급";
    return "초급";
  };

  return (
    <div
      className={cn(
        "group flex flex-col items-center text-center rounded-lg transition-all duration-300 ease-in-out",
        currentSize.container,
        currentVariant,
        className
      )}
    >
      {/* 아이콘 영역 */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted/70 group-hover:bg-primary/10 transition-colors",
          currentSize.iconContainer
        )}
      >
        {tech.icon_url ? (
          <Image
            src={tech.icon_url}
            alt={`${tech.name} 로고`}
            width={size === "sm" ? 20 : size === "md" ? 32 : 40}
            height={size === "sm" ? 20 : size === "md" ? 32 : 40}
            className={cn(
              "object-contain transition-transform duration-300 group-hover:scale-110",
              currentSize.icon
            )}
            loading="lazy"
            unoptimized={tech.icon_url.endsWith('.svg')}
          />
        ) : tech.icon_svg_content ? (
          <div
            className={cn(
              "text-foreground transition-transform duration-300 group-hover:scale-110 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full",
              currentSize.icon
            )}
            dangerouslySetInnerHTML={{ __html: tech.icon_svg_content }}
            aria-label={`${tech.name} 아이콘`}
          />
        ) : (
          <Icon
            name="CodeXml"
            className={cn(
              "text-muted-foreground transition-transform duration-300 group-hover:scale-110",
              currentSize.icon
            )}
          />
        )}
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col items-center">
        {/* 기술 이름 */}
        <p className={cn(
          "font-semibold text-foreground group-hover:text-primary transition-colors",
          currentSize.title
        )}>
          {tech.name}
        </p>

        {/* 숙련도 표시 (별점) */}
        {showProficiency && tech.proficiency_level && (
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="Star"
                className={cn(
                  currentSize.star,
                  i < tech.proficiency_level!
                    ? getProficiencyColor(tech.proficiency_level!)
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}

        {/* 숙련도 뱃지 (detailed 변형에서만 표시) */}
        {showProficiency && tech.proficiency_level && variant === "detailed" && (
          <Badge 
            variant="outline" 
            className={cn(
              "mt-1.5 text-xs",
              getProficiencyColor(tech.proficiency_level).replace("fill-", "border-")
            )}
          >
            {getProficiencyText(tech.proficiency_level)} ({tech.proficiency_level}/5)
          </Badge>
        )}

        {/* 요약 정보 */}
        {tech.summary && variant !== "compact" && (
          <p className={cn(
            "mt-1 text-muted-foreground line-clamp-2 text-center",
            currentSize.summary
          )}>
            {tech.summary}
          </p>
        )}
      </div>
    </div>
  );
});

TechStackItem.displayName = "TechStackItem";

export default TechStackItem; 