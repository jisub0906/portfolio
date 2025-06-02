"use client";

import { useEffect, useState, type ReactNode } from "react";

interface EnhancedClientOnlyProps {
  children: ReactNode;
  placeholder?: ReactNode; // SSR 시 보여줄 플레이스홀더 (선택적)
  fallback?: ReactNode; // 대체 UI (placeholder의 별칭)
  delay?: number; // 렌더링 지연 시간 (ms, 기본값: 0)
}

export function EnhancedClientOnly({ 
  children, 
  placeholder, 
  fallback, 
  delay = 0 
}: EnhancedClientOnlyProps): ReactNode | null {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setHasMounted(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setHasMounted(true);
    }
  }, [delay]);

  if (!hasMounted) {
    // placeholder 또는 fallback 중 하나를 사용 (placeholder 우선)
    return (placeholder ?? fallback ?? null) as ReactNode;
  }

  return <>{children}</>;
}

// 클라이언트 마운트 상태를 확인하는 커스텀 훅
export function useIsClientMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

// 사용 예제들
export const ClientOnlyExamples = {
  // 기본 사용법
  Basic: () => (
    <EnhancedClientOnly>
      <div>클라이언트에서만 렌더링</div>
    </EnhancedClientOnly>
  ),

  // 플레이스홀더와 함께
  WithPlaceholder: () => (
    <EnhancedClientOnly 
      placeholder={<div className="animate-pulse bg-gray-200 h-20 rounded" />}
    >
      <div>실제 콘텐츠</div>
    </EnhancedClientOnly>
  ),

  // 지연 렌더링
  WithDelay: () => (
    <EnhancedClientOnly 
      delay={500}
      fallback={<div>로딩 중...</div>}
    >
      <div>500ms 후 렌더링</div>
    </EnhancedClientOnly>
  ),

  // 복잡한 플레이스홀더
  WithSkeletonLoader: () => (
    <EnhancedClientOnly 
      placeholder={
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      }
    >
      <div>스켈레톤 로더 후 실제 콘텐츠</div>
    </EnhancedClientOnly>
  ),
}; 