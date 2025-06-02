"use client";

import { ClientOnly } from "./ClientOnly";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 브라우저 전용 API를 사용하는 컴포넌트 예제
function BrowserOnlyComponent() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // window 객체 사용 (브라우저 전용)
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    // 초기값 설정
    updateWindowWidth();
    updateTime();

    // 이벤트 리스너 등록
    window.addEventListener("resize", updateWindowWidth);
    const timeInterval = setInterval(updateTime, 1000);

    // 클린업
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100">
          브라우저 전용 정보
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          현재 창 너비: {windowWidth}px
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          현재 시간: {currentTime}
        </p>
      </div>
    </div>
  );
}

// localStorage를 사용하는 컴포넌트 예제
function LocalStorageComponent() {
  const [storedValue, setStoredValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    // localStorage 접근 (브라우저 전용)
    const saved = localStorage.getItem("clientonly-demo") || "";
    setStoredValue(saved);
    setInputValue(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("clientonly-demo", inputValue);
    setStoredValue(inputValue);
  };

  const handleClear = () => {
    localStorage.removeItem("clientonly-demo");
    setStoredValue("");
    setInputValue("");
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          localStorage 데모
        </h4>
        <div className="space-y-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="저장할 텍스트를 입력하세요"
            className="w-full p-2 border rounded text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              저장
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear}>
              삭제
            </Button>
          </div>
          {storedValue && (
            <p className="text-sm text-green-700 dark:text-green-300">
              저장된 값: &quot;{storedValue}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// 잘못된 사용법 예제 (hydration 오류 발생 가능)
function ProblematicComponent() {
  // ❌ 이렇게 하면 SSR과 클라이언트 렌더링 결과가 다를 수 있음
  const randomValue = Math.random();
  const currentDate = new Date().toISOString();

  return (
    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
      <h4 className="font-semibold text-red-900 dark:text-red-100">
        ❌ 문제가 있는 컴포넌트
      </h4>
      <p className="text-sm text-red-700 dark:text-red-300">
        랜덤 값: {randomValue}
      </p>
      <p className="text-sm text-red-700 dark:text-red-300">
        생성 시간: {currentDate}
      </p>
      <p className="text-xs text-red-600 dark:text-red-400 mt-2">
        이 컴포넌트는 SSR과 클라이언트에서 다른 값을 생성하여 hydration 오류를 일으킬 수 있습니다.
      </p>
    </div>
  );
}

// ClientOnly 사용법 예제들
export function ClientOnlyExamples() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">ClientOnly 컴포넌트 사용 예제</h2>
        <p className="text-muted-foreground">
          SSR/hydration 오류를 방지하기 위한 클라이언트 전용 렌더링 래퍼
        </p>
      </div>

      {/* 1. 기본 사용법 */}
      <Card>
        <CardHeader>
          <CardTitle>1. 브라우저 API 사용 컴포넌트</CardTitle>
          <CardDescription>
            window, document 등 브라우저 전용 API를 사용하는 컴포넌트를 안전하게 렌더링
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly>
            <BrowserOnlyComponent />
          </ClientOnly>
        </CardContent>
      </Card>

      {/* 2. localStorage 사용 */}
      <Card>
        <CardHeader>
          <CardTitle>2. localStorage 사용 컴포넌트</CardTitle>
          <CardDescription>
            브라우저 저장소에 접근하는 컴포넌트를 안전하게 렌더링
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly>
            <LocalStorageComponent />
          </ClientOnly>
        </CardContent>
      </Card>

      {/* 3. 문제가 있는 컴포넌트 비교 */}
      <Card>
        <CardHeader>
          <CardTitle>3. ClientOnly로 감싼 문제 컴포넌트</CardTitle>
          <CardDescription>
            원래는 hydration 오류를 일으킬 수 있는 컴포넌트를 ClientOnly로 안전하게 처리
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly>
            <ProblematicComponent />
          </ClientOnly>
        </CardContent>
      </Card>

      {/* 4. 사용법 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>4. 사용법 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">✅ ClientOnly를 사용해야 하는 경우:</h4>
            <ul className="text-sm space-y-1 ml-4">
              <li>• window, document, navigator 등 브라우저 전용 API 사용</li>
              <li>• localStorage, sessionStorage 접근</li>
              <li>• Math.random(), Date.now() 등 실행 시마다 다른 값 생성</li>
              <li>• 브라우저 전용 라이브러리 사용 (차트, 지도 등)</li>
              <li>• 클라이언트 사이드에서만 의미 있는 상태나 이벤트</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">💡 사용법:</h4>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`import { ClientOnly } from "@/components/common/ClientOnly";

function MyPage() {
  return (
    <div>
      <h1>서버에서도 렌더링되는 내용</h1>
      <ClientOnly>
        <BrowserOnlyComponent />
      </ClientOnly>
    </div>
  );
}`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-amber-600">⚠️ 주의사항:</h4>
            <ul className="text-sm space-y-1 ml-4">
              <li>• ClientOnly 내부 컴포넌트는 초기 SSR에서 렌더링되지 않음</li>
              <li>• SEO가 중요한 콘텐츠는 ClientOnly로 감싸지 말 것</li>
              <li>• 과도한 사용은 초기 로딩 시 빈 화면을 만들 수 있음</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 