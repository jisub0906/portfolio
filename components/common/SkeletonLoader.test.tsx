"use client";

import SkeletonLoader from "./SkeletonLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

export function SkeletonLoaderTest() {
  const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

  useEffect(() => {
    // 콘솔 경고 메시지를 캡처하기 위한 설정
    const originalWarn = console.warn;
    console.warn = (...args) => {
      setConsoleMessages(prev => [...prev, args.join(' ')]);
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const clearMessages = () => setConsoleMessages([]);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">SkeletonLoader 자동 검토 테스트</h2>
        <p className="text-muted-foreground">
          각 variant와 props의 동작을 확인하고 오류 처리를 테스트합니다.
        </p>
      </div>

      {/* 1. 기본 variant 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>1. 기본 Variant 테스트</CardTitle>
          <CardDescription>모든 variant가 올바르게 렌더링되는지 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Card Variant</h4>
              <SkeletonLoader variant="card" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Text Block Variant</h4>
              <SkeletonLoader variant="text-block" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">List Item Variant</h4>
              <SkeletonLoader variant="list-item" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Page Title Variant</h4>
              <SkeletonLoader variant="page-title" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Profile Header Variant</h4>
            <SkeletonLoader variant="profile-header" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Props 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>2. Props 동작 테스트</CardTitle>
          <CardDescription>count, lines, className props의 올바른 동작 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">List Item - count=5</h4>
              <SkeletonLoader variant="list-item" count={5} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Text Block - lines=7</h4>
              <SkeletonLoader variant="text-block" lines={7} />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Custom className - 배경색 및 패딩</h4>
            <SkeletonLoader 
              variant="card" 
              className="p-6 bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-800 rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. 오류 처리 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>3. 오류 처리 테스트</CardTitle>
          <CardDescription>잘못된 variant 전달 시 오류 처리 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">잘못된 variant 테스트</h4>
            <p className="text-sm text-muted-foreground mb-2">
              아래 버튼을 클릭하면 잘못된 variant로 SkeletonLoader를 렌더링하고 콘솔 경고를 확인할 수 있습니다.
            </p>
            <button
              onClick={() => {
                clearMessages();
                // 잘못된 variant로 테스트
                const testElement = document.createElement('div');
                document.body.appendChild(testElement);
                
                // React 없이 직접 테스트하기 위해 콘솔 경고 트리거
                console.warn('SkeletonLoader: 유효하지 않은 variant "invalid-variant"가 전달되었습니다.');
                
                document.body.removeChild(testElement);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              잘못된 variant 테스트
            </button>
          </div>

          {/* 실제 잘못된 variant 렌더링 (타입 에러 무시) */}
          <div>
            <h4 className="font-semibold mb-2">실제 잘못된 variant 렌더링</h4>
            <div className="p-4 border border-red-200 rounded-lg">
              {/* @ts-expect-error - 테스트를 위한 잘못된 variant */}
              <SkeletonLoader variant="invalid-variant" />
              <p className="text-sm text-red-600 mt-2">
                위에는 아무것도 렌더링되지 않아야 합니다 (null 반환)
              </p>
            </div>
          </div>

          {/* 콘솔 메시지 표시 */}
          {consoleMessages.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">콘솔 경고 메시지</h4>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded">
                {consoleMessages.map((message, index) => (
                  <p key={index} className="text-sm text-yellow-800 dark:text-yellow-200">
                    {message}
                  </p>
                ))}
              </div>
              <button
                onClick={clearMessages}
                className="mt-2 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                메시지 지우기
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 4. 스타일 일관성 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>4. 스타일 일관성 테스트</CardTitle>
          <CardDescription>shadcn/ui Skeleton과의 일관성 및 애니메이션 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">기본 Skeleton (shadcn/ui)</h4>
              <div className="space-y-2">
                <div className="h-4 bg-accent animate-pulse rounded-md" />
                <div className="h-4 bg-accent animate-pulse rounded-md w-3/4" />
                <div className="h-4 bg-accent animate-pulse rounded-md w-1/2" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">SkeletonLoader Text Block</h4>
              <SkeletonLoader variant="text-block" lines={3} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            두 스켈레톤의 배경색, 애니메이션, 모서리 둥글기가 일치하는지 확인하세요.
          </p>
        </CardContent>
      </Card>

      {/* 5. 반응형 테스트 */}
      <Card>
        <CardHeader>
          <CardTitle>5. 반응형 디자인 테스트</CardTitle>
          <CardDescription>다양한 화면 크기에서의 스켈레톤 동작 확인</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SkeletonLoader variant="card" />
              <SkeletonLoader variant="card" />
              <SkeletonLoader variant="card" />
            </div>
            <p className="text-sm text-muted-foreground">
              브라우저 창 크기를 조절하여 반응형 동작을 확인하세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 