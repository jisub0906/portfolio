// app/global-error.tsx - 전역 프로덕션 오류 처리 UI

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { inter, plusJakartaSans } from "./fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 오류 로깅 - 초기에는 콘솔 로깅, 추후 Sentry 연동 예정
    console.error("Global Error Boundary Caught:", error);
    // TODO: Sentry.captureException(error);
    
    // 오류 발생 시 추가 컨텍스트 정보 로깅
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
      url: typeof window !== 'undefined' ? window.location.href : 'N/A'
    });
  }, [error]);

  return (
    <html 
      lang="ko" 
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body className={cn(
        "min-h-screen bg-background font-sans text-foreground antialiased"
      )}>
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          {/* 오류 아이콘 */}
          <Icon 
            name="AlertTriangle" 
            className="w-16 h-16 text-destructive mb-6"
            aria-hidden="true"
          />
          
          {/* 오류 제목 */}
          <h1 className="text-3xl font-bold text-destructive mb-4 font-heading">
            죄송합니다, 문제가 발생했습니다.
          </h1>
          
          {/* 오류 설명 */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md text-center leading-relaxed">
            예기치 않은 오류로 인해 요청을 처리할 수 없습니다. 잠시 후 다시 시도해 보시거나, 문제가 지속되면 지원팀에 문의해 주십시오.
          </p>
          
          {/* 오류 다이제스트 표시 (선택적) */}
          {error.digest && (
            <p className="text-sm text-muted-foreground mb-8 font-mono">
              오류 코드: {error.digest}
            </p>
          )}
          
          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 다시 시도 버튼 */}
            <Button 
              onClick={() => reset()} 
              size="lg"
              className="min-w-[120px]"
              aria-label="페이지 다시 시도"
            >
              다시 시도
            </Button>
            
            {/* 홈으로 가기 버튼 */}
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[120px]"
                aria-label="홈페이지로 이동"
              >
                홈으로 가기
              </Button>
            </Link>
          </div>
          
          {/* 추가 도움말 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              문제가 계속 발생하시나요?
            </p>
            <Link 
              href="/contact" 
              className="text-sm text-primary hover:underline"
              aria-label="문의하기 페이지로 이동"
            >
              지원팀에 문의하기
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
} 