// app/not-found.tsx - 404 페이지 UI

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { inter, plusJakartaSans } from "./fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata = {
  title: "404 - 페이지를 찾을 수 없습니다 | 지섭의 포트폴리오",
  description: "요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가거나 다른 페이지를 탐색해보세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <html 
      lang="ko" 
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body className={cn(
        "min-h-screen bg-background font-sans text-foreground antialiased"
      )}>
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          {/* 404 아이콘 */}
          <Icon 
            name="Search" 
            className="w-20 h-20 text-primary mb-8"
            aria-hidden="true"
          />
          
          {/* 404 숫자 텍스트 */}
          <p className="text-8xl font-extrabold text-primary md:text-9xl" aria-hidden="true">
            404
          </p>
          
          {/* 제목 */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-heading">
            페이지를 찾을 수 없습니다
          </h1>
          
          {/* 설명 */}
          <p className="mt-4 text-lg text-muted-foreground max-w-md leading-relaxed">
            죄송합니다. 요청하신 페이지를 찾을 수 없거나, 주소가 변경 혹은 삭제되었을 수 있습니다.
          </p>
          
          {/* 버튼 그룹 */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* 홈으로 가기 버튼 */}
            <Link href="/">
              <Button 
                size="lg" 
                className="min-w-[160px]"
                aria-label="홈페이지로 이동"
              >
                <Icon name="Home" className="w-4 h-4 mr-2" aria-hidden="true" />
                홈으로 돌아가기
              </Button>
            </Link>
            
            {/* 프로젝트 보기 버튼 */}
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[160px]"
                aria-label="프로젝트 페이지로 이동"
              >
                <Icon name="CodeXml" className="w-4 h-4 mr-2" aria-hidden="true" />
                프로젝트 보기
              </Button>
            </Link>
            
            {/* 블로그 보기 버튼 */}
            <Link href="/blog">
              <Button 
                variant="outline" 
                size="lg" 
                className="min-w-[160px]"
                aria-label="블로그 페이지로 이동"
              >
                <Icon name="Edit" className="w-4 h-4 mr-2" aria-hidden="true" />
                블로그 보기
              </Button>
            </Link>
          </div>
          
          {/* 추가 도움말 */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              여전히 찾고 계신 내용이 있으신가요?
            </p>
            <Link 
              href="/contact" 
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              aria-label="문의하기 페이지로 이동"
            >
              <Icon name="Mail" className="w-3 h-3" aria-hidden="true" />
              문의하기
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
} 