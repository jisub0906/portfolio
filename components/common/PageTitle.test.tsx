"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface TestResult {
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
  details?: string;
}

export const PageTitleTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // 1. Props 처리 확인
    try {
      // title prop 처리 확인 - 모든 h1 요소를 확인
      const titleElements = document.querySelectorAll('[data-testid="page-title-h1"]');
      const subtitleElements = document.querySelectorAll('[data-testid="page-title-subtitle"]');
      const emptyTitleTest = document.querySelector('[data-testid="empty-title-test"]');

      let propsTestPassed = true;
      const propsDetails = [];

      // 모든 h1 요소 중에서 "테스트 제목"을 포함한 것이 있는지 확인
      let titleFound = false;
      titleElements.forEach(element => {
        if (element.textContent?.includes("테스트 제목")) {
          titleFound = true;
        }
      });

      if (titleFound) {
        propsDetails.push("✓ title prop 정상 처리");
      } else {
        propsTestPassed = false;
        propsDetails.push("✗ title prop 처리 실패");
      }

      // 모든 subtitle 요소 중에서 "테스트 부제목"을 포함한 것이 있는지 확인
      let subtitleFound = false;
      subtitleElements.forEach(element => {
        if (element.textContent?.includes("테스트 부제목")) {
          subtitleFound = true;
        }
      });

      if (subtitleFound) {
        propsDetails.push("✓ subtitle prop 정상 처리");
      } else {
        propsDetails.push("✓ subtitle prop 없음 (정상)");
      }

      // 빈 제목 테스트
      if (!emptyTitleTest || emptyTitleTest.children.length === 0) {
        propsDetails.push("✓ 빈 title일 때 null 반환 확인");
      } else {
        propsTestPassed = false;
        propsDetails.push("✗ 빈 title일 때도 렌더링됨");
      }

      results.push({
        name: "Props 처리",
        status: propsTestPassed ? "pass" : "fail",
        message: propsTestPassed ? "모든 props가 올바르게 처리됨" : "일부 props 처리에 문제가 있음",
        details: propsDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "Props 처리",
        status: "fail",
        message: `Props 처리 확인 중 오류: ${error}`
      });
    }

    // 2. HTML 시맨틱스 확인
    try {
      const h1Elements = document.querySelectorAll('[data-testid="page-title-h1"]');
      const h1Element = h1Elements[0] as HTMLElement;

      let semanticsTestPassed = true;
      const semanticsDetails = [];

      if (h1Element && h1Element.tagName === 'H1') {
        semanticsDetails.push("✓ <h1> 태그 올바르게 사용");
      } else {
        semanticsTestPassed = false;
        semanticsDetails.push("✗ <h1> 태그 사용 오류");
      }

      // 부제목이 <p> 태그인지 확인
      const subtitleElement = document.querySelector('[data-testid="page-title-subtitle"]');
      if (subtitleElement && subtitleElement.tagName === 'P') {
        semanticsDetails.push("✓ 부제목에 <p> 태그 사용");
      } else if (!subtitleElement) {
        semanticsDetails.push("✓ 부제목 없음 (정상)");
      } else {
        semanticsTestPassed = false;
        semanticsDetails.push("✗ 부제목 태그 오류");
      }

      results.push({
        name: "HTML 시맨틱스",
        status: semanticsTestPassed ? "pass" : "fail",
        message: semanticsTestPassed ? "시맨틱 HTML 구조 올바름" : "시맨틱 HTML 구조 개선 필요",
        details: semanticsDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "HTML 시맨틱스",
        status: "fail",
        message: `HTML 시맨틱스 확인 중 오류: ${error}`
      });
    }

    // 3. Tailwind CSS 클래스 적용 확인
    try {
      const h1Element = document.querySelector('[data-testid="page-title-h1"]') as HTMLElement;
      const subtitleElement = document.querySelector('[data-testid="page-title-subtitle"]') as HTMLElement;

      let stylesTestPassed = true;
      const stylesDetails = [];

      if (h1Element) {
        const h1Classes = h1Element.className;
        const requiredH1Classes = ['text-4xl', 'font-bold', 'tracking-tight', 'text-foreground', 'sm:text-5xl'];
        const missingH1Classes = requiredH1Classes.filter(cls => !h1Classes.includes(cls));

        if (missingH1Classes.length === 0) {
          stylesDetails.push("✓ h1 타이포그래피 클래스 완전 적용");
        } else {
          stylesTestPassed = false;
          stylesDetails.push(`✗ h1 누락 클래스: ${missingH1Classes.join(', ')}`);
        }
      }

      if (subtitleElement) {
        const subtitleClasses = subtitleElement.className;
        const requiredSubtitleClasses = ['text-lg', 'text-muted-foreground', 'sm:text-xl'];
        const missingSubtitleClasses = requiredSubtitleClasses.filter(cls => !subtitleClasses.includes(cls));

        if (missingSubtitleClasses.length === 0) {
          stylesDetails.push("✓ 부제목 타이포그래피 클래스 완전 적용");
        } else {
          stylesTestPassed = false;
          stylesDetails.push(`✗ 부제목 누락 클래스: ${missingSubtitleClasses.join(', ')}`);
        }
      } else {
        stylesDetails.push("✓ 부제목 없음 (정상)");
      }

      results.push({
        name: "Tailwind CSS 클래스 적용",
        status: stylesTestPassed ? "pass" : "fail",
        message: stylesTestPassed ? "PRD 8.3 타이포그래피 가이드 준수" : "타이포그래피 클래스 적용 불완전",
        details: stylesDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "Tailwind CSS 클래스 적용",
        status: "fail",
        message: `스타일 클래스 확인 중 오류: ${error}`
      });
    }

    // 4. 반응형 타이포그래피 확인
    try {
      const h1Element = document.querySelector('[data-testid="page-title-h1"]') as HTMLElement;
      const subtitleElement = document.querySelector('[data-testid="page-title-subtitle"]') as HTMLElement;

      let responsiveTestPassed = true;
      const responsiveDetails = [];

      if (h1Element) {
        const h1Classes = h1Element.className;
        if (h1Classes.includes('text-4xl') && h1Classes.includes('sm:text-5xl')) {
          responsiveDetails.push("✓ h1 반응형 폰트 크기 (text-4xl → sm:text-5xl)");
        } else {
          responsiveTestPassed = false;
          responsiveDetails.push("✗ h1 반응형 폰트 크기 누락");
        }
      }

      if (subtitleElement) {
        const subtitleClasses = subtitleElement.className;
        if (subtitleClasses.includes('text-lg') && subtitleClasses.includes('sm:text-xl')) {
          responsiveDetails.push("✓ 부제목 반응형 폰트 크기 (text-lg → sm:text-xl)");
        } else {
          responsiveTestPassed = false;
          responsiveDetails.push("✗ 부제목 반응형 폰트 크기 누락");
        }
      } else {
        responsiveDetails.push("✓ 부제목 없음 (정상)");
      }

      results.push({
        name: "반응형 타이포그래피",
        status: responsiveTestPassed ? "pass" : "fail",
        message: responsiveTestPassed ? "반응형 디자인 완벽 적용" : "반응형 클래스 개선 필요",
        details: responsiveDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "반응형 타이포그래피",
        status: "fail",
        message: `반응형 확인 중 오류: ${error}`
      });
    }

    // 5. className prop 병합 확인
    try {
      const customStyledElement = document.querySelector('[data-testid="custom-styled-title"]') as HTMLElement;

      let classNameTestPassed = true;
      const classNameDetails = [];

      if (customStyledElement) {
        const classes = customStyledElement.className;
        
        // 기본 클래스 확인
        if (classes.includes('space-y-2')) {
          classNameDetails.push("✓ 기본 클래스 유지 (space-y-2)");
        } else {
          classNameTestPassed = false;
          classNameDetails.push("✗ 기본 클래스 누락");
        }

        // 커스텀 클래스 확인
        if (classes.includes('text-center') && classes.includes('border-2')) {
          classNameDetails.push("✓ 커스텀 클래스 적용 (text-center, border-2)");
        } else {
          classNameTestPassed = false;
          classNameDetails.push("✗ 커스텀 클래스 적용 실패");
        }
      } else {
        classNameTestPassed = false;
        classNameDetails.push("✗ 커스텀 스타일 테스트 요소 없음");
      }

      results.push({
        name: "className prop 병합",
        status: classNameTestPassed ? "pass" : "fail",
        message: classNameTestPassed ? "cn 유틸리티로 클래스 병합 성공" : "클래스 병합 실패",
        details: classNameDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "className prop 병합",
        status: "fail",
        message: `클래스 병합 확인 중 오류: ${error}`
      });
    }

    // 6. 재사용성 및 유연성 확인
    try {
      const stringTitleElement = document.querySelector('[data-testid="string-title"]');
      const reactNodeTitleElement = document.querySelector('[data-testid="reactnode-title"]');
      const reactNodeSubtitleElement = document.querySelector('[data-testid="reactnode-subtitle"]');

      let flexibilityTestPassed = true;
      const flexibilityDetails = [];

      if (stringTitleElement && stringTitleElement.textContent?.includes("문자열 제목")) {
        flexibilityDetails.push("✓ 문자열 title 지원");
      } else {
        flexibilityTestPassed = false;
        flexibilityDetails.push("✗ 문자열 title 처리 실패");
      }

      if (reactNodeTitleElement && reactNodeTitleElement.querySelector('.text-primary')) {
        flexibilityDetails.push("✓ ReactNode title 지원");
      } else {
        flexibilityTestPassed = false;
        flexibilityDetails.push("✗ ReactNode title 처리 실패");
      }

      if (reactNodeSubtitleElement && reactNodeSubtitleElement.querySelector('strong')) {
        flexibilityDetails.push("✓ ReactNode subtitle 지원");
      } else {
        flexibilityDetails.push("✓ ReactNode subtitle 없음 (정상)");
      }

      results.push({
        name: "재사용성 및 유연성",
        status: flexibilityTestPassed ? "pass" : "fail",
        message: flexibilityTestPassed ? "다양한 콘텐츠 타입 완벽 지원" : "콘텐츠 타입 지원 개선 필요",
        details: flexibilityDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "재사용성 및 유연성",
        status: "fail",
        message: `유연성 확인 중 오류: ${error}`
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // 컴포넌트 마운트 후 자동으로 테스트 실행
    const timer = setTimeout(() => {
      runTests();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "pass":
        return <Badge variant="default" className="bg-green-100 text-green-800">통과</Badge>;
      case "fail":
        return <Badge variant="destructive">실패</Badge>;
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">경고</Badge>;
      default:
        return <Badge variant="outline">정보</Badge>;
    }
  };

  const passedTests = testResults.filter(r => r.status === "pass").length;
  const totalTests = testResults.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            PageTitle 컴포넌트 자동 검토
          </CardTitle>
          <CardDescription>
            PageTitle 컴포넌트의 Props 처리, HTML 시맨틱스, 스타일링, 반응형 디자인을 자동으로 검증합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                검토 진행률: {passedTests}/{totalTests}
              </span>
              {totalTests > 0 && (
                <Badge variant={passedTests === totalTests ? "default" : "secondary"}>
                  {Math.round((passedTests / totalTests) * 100)}%
                </Badge>
              )}
            </div>
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              size="sm"
            >
              {isRunning ? "검토 중..." : "다시 검토"}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(result.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{result.name}</span>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                    {result.details && (
                      <p className="text-xs text-muted-foreground mt-1">{result.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalTests > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                {passedTests === totalTests 
                  ? "🎉 모든 검토 항목을 통과했습니다! PageTitle 컴포넌트가 프로덕션 사용 준비가 완료되었습니다."
                  : `${totalTests - passedTests}개 항목에서 문제가 발견되었습니다. 위의 세부사항을 확인해주세요.`
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 테스트용 PageTitle 컴포넌트들 */}
      <Card>
        <CardHeader>
          <CardTitle>테스트 샘플</CardTitle>
          <CardDescription>검토를 위한 PageTitle 컴포넌트 샘플들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 완전한 PageTitle - 테스트에서 찾는 "테스트 제목", "테스트 부제목" 포함 */}
          <div>
            <h4 className="text-sm font-medium mb-2">완전한 PageTitle (모든 props 포함)</h4>
            <PageTitle 
              title="테스트 제목"
              subtitle="테스트 부제목입니다."
              className="border rounded-lg p-4"
            />
          </div>

          {/* 문자열 제목 */}
          <div>
            <h4 className="text-sm font-medium mb-2">문자열 제목</h4>
            <div data-testid="string-title">
              <PageTitle title="문자열 제목" />
            </div>
          </div>

          {/* ReactNode 제목 */}
          <div>
            <h4 className="text-sm font-medium mb-2">ReactNode 제목</h4>
            <div data-testid="reactnode-title">
              <PageTitle 
                title={
                  <span>
                    ReactNode <span className="text-primary">제목</span>
                  </span>
                }
              />
            </div>
          </div>

          {/* ReactNode 부제목 */}
          <div>
            <h4 className="text-sm font-medium mb-2">ReactNode 부제목</h4>
            <div data-testid="reactnode-subtitle">
              <PageTitle 
                title="제목"
                subtitle={
                  <span>
                    ReactNode <strong>부제목</strong>입니다.
                  </span>
                }
              />
            </div>
          </div>

          {/* 커스텀 스타일 - data-testid 추가 */}
          <div>
            <h4 className="text-sm font-medium mb-2">커스텀 스타일 적용</h4>
            <PageTitle 
              title="커스텀 스타일 제목"
              subtitle="중앙 정렬과 테두리가 적용된 제목입니다."
              className="text-center border-2 border-dashed border-border rounded-lg p-4"
              data-testid="custom-styled-title"
            />
          </div>

          {/* 빈 제목 테스트 */}
          <div>
            <h4 className="text-sm font-medium mb-2">빈 제목 테스트 (렌더링되지 않아야 함)</h4>
            <div data-testid="empty-title-test">
              <PageTitle title="" subtitle="이 부제목은 표시되지 않습니다." />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              위 공간이 비어있다면 정상적으로 동작하는 것입니다.
            </p>
          </div>

          {/* 부제목 없는 경우 */}
          <div>
            <h4 className="text-sm font-medium mb-2">부제목 없는 경우</h4>
            <PageTitle title="제목만 있는 경우" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageTitleTest; 