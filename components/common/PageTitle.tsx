// components/common/PageTitle.tsx - 공용 페이지 제목 컴포넌트

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  /** 페이지의 주 제목 (필수) */
  title: string | ReactNode;
  /** 페이지의 부제목 (선택적) */
  subtitle?: string | ReactNode;
  /** 추가 CSS 클래스 (선택적) */
  className?: string;
  /** 테스트용 data-testid (선택적) */
  "data-testid"?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className,
  "data-testid": dataTestId,
}) => {
  // title이 falsy이면 아무것도 렌더링하지 않음
  if (!title) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)} data-testid={dataTestId}>
      <h1 
        className={cn(
          "text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        )}
        data-testid="page-title-h1"
      >
        {title}
      </h1>
      {subtitle && (
        <p 
          className={cn(
            "text-lg text-muted-foreground sm:text-xl"
          )}
          data-testid="page-title-subtitle"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle; 