// components/common/ErrorMessage.tsx - 공용 오류 메시지 표시 컴포넌트

import React, { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  /** 오류 메시지 내용 (필수) */
  message: string | ReactNode;
  /** 오류 메시지 제목 (선택적) */
  title?: string;
  /** 오류 코드 (선택적) */
  errorCode?: string | number;
  /** 추가 CSS 클래스 (선택적) */
  className?: string;
  /** 아이콘 표시 여부 (기본값: true) */
  showIcon?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title,
  errorCode,
  className,
  showIcon = true,
}) => {
  // message가 falsy이면 아무것도 렌더링하지 않음
  if (!message) {
    return null;
  }

  return (
    <Alert variant="destructive" className={cn(className)} role="alert">
      {showIcon && (
        <AlertTriangle 
          className="h-4 w-4" 
          aria-hidden="true"
          data-testid="error-icon"
        />
      )}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {message}
        {errorCode && (
          <span className="block mt-1 text-xs opacity-80" data-testid="error-code">
            오류 코드: {errorCode}
          </span>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorMessage; 