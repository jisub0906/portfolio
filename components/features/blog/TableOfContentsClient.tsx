"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/types/blog";

interface TableOfContentsClientProps {
  headings: Heading[];
  className?: string;
  containerSelector?: string;
  debounceMs?: number; // 디바운싱 지연 시간 (기본값: 100ms)
}

export default function TableOfContentsClient({
  headings,
  className,
  containerSelector,
  debounceMs = 100,
}: TableOfContentsClientProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // 디바운싱된 activeId 업데이트
  const updateActiveId = useCallback((id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setActiveId(id);
    }, debounceMs);
  }, [debounceMs]);

  // 제목 레벨에 따른 들여쓰기 클래스 반환
  const getIndentClass = useCallback((level: number): string => {
    switch (level) {
      case 2: return "";
      case 3: return "pl-3";
      case 4: return "pl-6";
      case 5: return "pl-9";
      case 6: return "pl-12";
      default: return "";
    }
  }, []);

  // 제목 레벨에 따른 기본 스타일 클래스 반환
  const getBaseStyleClass = useCallback((level: number): string => {
    switch (level) {
      case 2: return "font-semibold";
      case 3: return "font-medium";
      case 4: return "font-normal";
      case 5: return "font-normal text-xs";
      case 6: return "font-normal text-xs";
      default: return "font-medium";
    }
  }, []);

  // 부드러운 스크롤 핸들러
  const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    
    const id = href.substring(1); // '#' 제거
    const targetElement = document.getElementById(id);
    
    if (targetElement) {
      // 즉시 activeId 업데이트 (클릭 시 즉각적인 피드백)
      setActiveId(id);
      
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // URL 해시 업데이트
      window.history.pushState(null, '', `#${id}`);
    }
  }, []);

  // 활성 링크 하이라이팅을 위한 IntersectionObserver 설정
  useEffect(() => {
    if (headings.length === 0) return;

    // 기존 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 기존 timeout 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // IntersectionObserver 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 현재 보이는 제목들 중에서 가장 상단에 가까운 것을 찾기
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // 가장 상단에 가까운 제목을 활성화
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
          });
          
          updateActiveId(topEntry.target.id);
        } else {
          // 보이는 제목이 없을 때는 첫 번째 제목을 활성화
          const firstHeading = headings[0];
          if (firstHeading) {
            updateActiveId(firstHeading.id);
          }
        }
      },
      {
        root: containerSelector ? document.querySelector(containerSelector) : null,
        rootMargin: '-80px 0px -60% 0px', // 상단 80px 아래, 하단 60% 위 영역에서 감지
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1], // 더 세밀한 감지
      }
    );

    // 모든 제목 요소들을 observe
    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [headings, containerSelector, updateActiveId]);

  // 제목이 없으면 렌더링하지 않음
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <nav 
      className={cn(
        "sticky top-20 max-h-[calc(100vh-5rem-3.5rem-2rem)] overflow-y-auto p-1 text-sm",
        className
      )}
      aria-labelledby="toc-heading"
    >
      <h2 
        id="toc-heading" 
        className="mb-2 text-base font-semibold uppercase tracking-tight text-foreground"
      >
        On This Page
      </h2>
      
      <ul className="space-y-1.5">
        {headings.map(heading => {
          const isActive = activeId === heading.id;
          const indentClass = getIndentClass(heading.level);
          const baseStyleClass = getBaseStyleClass(heading.level);
          
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={handleLinkClick}
                className={cn(
                  "block hover:text-primary transition-colors duration-200",
                  indentClass,
                  baseStyleClass,
                  heading.level >= 3 && "border-l-2 border-transparent hover:border-primary/50",
                  isActive 
                    ? "text-primary border-l-2 border-primary font-semibold" 
                    : "text-muted-foreground",
                  heading.level >= 3 && isActive && "border-primary"
                )}
                title={heading.text} // 긴 제목의 경우 툴팁으로 전체 텍스트 표시
              >
                <span className="block truncate">
                  {heading.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 