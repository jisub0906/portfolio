"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  debounceDelay?: number;
}

export default function SearchInput({
  className,
  placeholder = "블로그 내 검색...",
  debounceDelay = 300,
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL의 'q' 파라미터 값으로 초기 설정
  const [inputValue, setInputValue] = useState<string>(
    searchParams.get("q") || ""
  );

  // 디바운싱된 검색어
  const [debouncedSearchTerm] = useDebounce(inputValue, debounceDelay);

  // URL 업데이트 로직
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      params.set("q", debouncedSearchTerm);
      // 검색 시 페이지네이션을 1로 초기화
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    const newParamsString = params.toString();
    const newUrl = newParamsString ? `${pathname}?${newParamsString}` : pathname;

    router.replace(newUrl);
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  // 초기화 버튼 핸들러
  const handleClearInput = () => {
    setInputValue("");
  };

  // 키보드 이벤트 핸들러 (Escape 키로 초기화)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && inputValue) {
      handleClearInput();
    }
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      {/* 검색 아이콘 */}
      <Icon
        name="Search"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />

      {/* 입력 필드 */}
      <Input
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10 h-10"
        aria-label="블로그 게시물 검색"
      />

      {/* 초기화 버튼 (입력값이 있을 때만 표시) */}
      {inputValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClearInput}
          aria-label="검색어 지우기"
        >
          <Icon name="X" className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 