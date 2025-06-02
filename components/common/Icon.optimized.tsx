// components/common/Icon.optimized.tsx - 번들 크기 최적화된 아이콘 래퍼 컴포넌트

import React, { FC } from "react";
import { LucideProps, HelpCircle } from "lucide-react";

// 프로젝트에서 실제 사용할 아이콘들만 명시적으로 임포트
import {
  Mail, User, Settings, Home, Search, Bell,
  Calendar, Clock, Download, Upload, Edit, Trash,
  Eye, EyeOff, Lock, Unlock, Plus, Minus,
  Check, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Star, Heart, Circle, Share, MoreHorizontal,
  // 필요에 따라 추가 아이콘들을 여기에 임포트
} from "lucide-react";

// 사용할 아이콘들의 매핑 객체 (tree-shaking 최적화)
const iconMap = {
  Mail, User, Settings, Home, Search, Bell,
  Calendar, Clock, Download, Upload, Edit, Trash,
  Eye, EyeOff, Lock, Unlock, Plus, Minus,
  Check, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Star, Heart, Circle, Share, MoreHorizontal,
  HelpCircle, // 기본 대체 아이콘
} as const;

// 타입 정의: iconMap의 키들만 허용
type IconName = keyof typeof iconMap;

interface OptimizedIconProps extends Omit<LucideProps, "name"> {
  name: IconName;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
  decorative?: boolean; // 접근성 제어를 위한 prop 추가
}

const OptimizedIcon: FC<OptimizedIconProps> = ({
  name,
  size = "1em",
  color = "currentColor",
  strokeWidth = 2,
  className,
  decorative = true, // 기본값: 장식용 아이콘
  ...rest
}) => {
  // iconMap에서 해당 아이콘 컴포넌트를 가져옴
  const LucideIcon = iconMap[name];

  // 아이콘을 찾을 수 없는 경우 처리 (타입 시스템으로 인해 발생할 가능성은 낮음)
  if (!LucideIcon || typeof LucideIcon !== "function") {
    console.warn(`Icon not found: ${String(name)}. Rendering default HelpCircle icon.`);
    
    return (
      <HelpCircle
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        aria-hidden={decorative}
        {...rest}
      />
    );
  }

  // 유효한 아이콘인 경우 렌더링
  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={decorative}
      {...rest}
    />
  );
};

export default OptimizedIcon;
export type { IconName, OptimizedIconProps }; 