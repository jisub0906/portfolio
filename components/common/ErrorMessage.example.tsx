"use client";

import React from "react";
import ErrorMessage from "./ErrorMessage";

const ErrorMessageExample: React.FC = () => {
  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ErrorMessage 컴포넌트 예제</h1>
      
      {/* 기본 오류 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">1. 기본 오류 메시지</h2>
        <ErrorMessage message="네트워크 연결에 실패했습니다." />
      </div>

      {/* 제목이 있는 오류 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">2. 제목이 있는 오류 메시지</h2>
        <ErrorMessage 
          title="로그인 실패"
          message="이메일 또는 비밀번호가 올바르지 않습니다." 
        />
      </div>

      {/* 오류 코드가 포함된 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">3. 오류 코드가 포함된 메시지</h2>
        <ErrorMessage 
          title="서버 오류"
          message="서버에서 예상치 못한 오류가 발생했습니다."
          errorCode="ERR_500"
        />
      </div>

      {/* 숫자 오류 코드 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">4. 숫자 오류 코드</h2>
        <ErrorMessage 
          message="요청한 리소스를 찾을 수 없습니다."
          errorCode={404}
        />
      </div>

      {/* 아이콘 없는 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">5. 아이콘 없는 메시지</h2>
        <ErrorMessage 
          message="이것은 아이콘이 없는 오류 메시지입니다."
          showIcon={false}
        />
      </div>

      {/* ReactNode를 사용한 복잡한 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">6. ReactNode를 사용한 복잡한 메시지</h2>
        <ErrorMessage 
          title="파일 업로드 실패"
          message={
            <div>
              <p>다음 파일들의 업로드에 실패했습니다:</p>
              <ul className="list-disc list-inside mt-2">
                <li>document.pdf (파일 크기 초과)</li>
                <li>image.jpg (지원하지 않는 형식)</li>
              </ul>
              <p className="mt-2">
                <strong>해결 방법:</strong> 파일 크기를 10MB 이하로 줄이고, 
                지원하는 형식(PDF, JPG, PNG)으로 변환해주세요.
              </p>
            </div>
          }
          errorCode="UPLOAD_001"
        />
      </div>

      {/* 커스텀 클래스가 적용된 메시지 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">7. 커스텀 스타일이 적용된 메시지</h2>
        <ErrorMessage 
          message="이것은 커스텀 마진이 적용된 오류 메시지입니다."
          className="my-8 border-2"
        />
      </div>

      {/* 빈 메시지 테스트 */}
      <div className="space-y-2">
        <h4 className="font-semibold">빈 메시지 테스트 (아무것도 표시되지 않음)</h4>
        <p className="text-sm text-muted-foreground">아래에는 빈 메시지로 인해 아무것도 렌더링되지 않습니다:</p>
        <ErrorMessage message="" />
        <ErrorMessage message={null as React.ReactNode} />
        <ErrorMessage message={undefined as React.ReactNode} />
        <p className="text-sm text-muted-foreground">위 공간이 비어있다면 정상적으로 동작하는 것입니다.</p>
      </div>

      {/* 사용법 예시 */}
      <div className="space-y-2">
        <h4 className="font-semibold">사용법 예시</h4>
        <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`import ErrorMessage from "@/components/common/ErrorMessage";

// 기본 사용법
<ErrorMessage message="오류가 발생했습니다." />

// 제목과 오류 코드 포함
<ErrorMessage 
  title="로그인 실패"
  message="인증에 실패했습니다."
  errorCode="AUTH_001"
/>

// 아이콘 없이 표시
<ErrorMessage 
  message="알림 메시지"
  showIcon={false}
/>

// ReactNode 메시지
<ErrorMessage 
  message={<div>복잡한 <strong>구조</strong>의 메시지</div>}
/>`}
        </pre>
      </div>

      {/* 오류 처리 테스트 */}
      <div className="space-y-2">
        <h4 className="font-semibold">오류 처리 (잘못된 props)</h4>
        <ErrorMessage message={123 as React.ReactNode} />
        <ErrorMessage title={undefined} message="제목이 undefined인 경우" />
      </div>
    </div>
  );
};

export default ErrorMessageExample; 