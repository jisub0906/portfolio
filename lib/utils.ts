import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열 또는 null
 * @returns 포맷팅된 날짜 문자열 (예: "2024년 1월 15일") 또는 빈 문자열
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(dateString);
    
    // 유효하지 않은 날짜인지 확인
    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("날짜 포맷팅 오류:", error);
    return "";
  }
}
