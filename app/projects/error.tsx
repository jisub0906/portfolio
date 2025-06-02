"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProjectsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 에러 추적 서비스로 전송)
    console.error("프로젝트 페이지 에러:", error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 sm:px-6 md:gap-12 md:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="AlertTriangle" className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">프로젝트를 불러올 수 없습니다</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          프로젝트 데이터를 가져오는 중 문제가 발생했습니다. 
          잠시 후 다시 시도해주세요.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset} variant="default">
            <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            <Icon name="Home" className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
} 