"use client";

import React, { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  /** 전체 페이지 수 (1 이상의 정수) */
  totalPages: number;
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 현재 페이지 주변에 표시할 페이지 번호 개수 (기본값: 1) */
  siblingCount?: number;
}

/**
 * 페이지네이션 범위를 생성하는 커스텀 훅
 */
function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1
): (number | string)[] {
  return useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // 첫 페이지 + 생략 + 현재 주변 + 생략 + 마지막 페이지

    // 총 페이지 수가 표시할 페이지 번호보다 적거나 같으면 모든 페이지를 표시
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // 오른쪽 생략 부호만 표시하는 경우
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    // 왼쪽 생략 부호만 표시하는 경우
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    // 양쪽 생략 부호 모두 표시하는 경우
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);
}

export default function PaginationControls({
  totalPages,
  className,
  siblingCount = 1,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 페이지 계산 (URL 파라미터에서 읽어오기)
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    
    // 유효하지 않은 페이지 번호 처리
    if (isNaN(page) || page < 1) return 1;
    if (page > totalPages) return totalPages;
    
    return page;
  }, [searchParams, totalPages]);

  // 페이지네이션 범위 생성
  const paginationRange = usePaginationRange(currentPage, totalPages, siblingCount);

  // totalPages 유효성 검사 (Hook 호출 후에 수행)
  if (!totalPages || totalPages < 1 || !Number.isInteger(totalPages)) {
    console.warn("PaginationControls: totalPages는 1 이상의 정수여야 합니다.");
    return null;
  }

  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 페이지 URL 생성 헬퍼 함수
  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (pageNumber === 1 || pageNumber === "1") {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }
    
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* 페이지 번호 링크들 */}
        {paginationRange.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
} 