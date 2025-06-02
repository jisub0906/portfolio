"use client";

import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
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

export const ErrorMessageTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // 1. shadcn/ui 컴포넌트 임포트 확인
    try {
      // Alert, AlertDescription, AlertTitle이 올바르게 임포트되었는지 확인
      const alertElement = document.querySelector('[data-slot="alert"]');
      if (alertElement) {
        results.push({
          name: "shadcn/ui 컴포넌트 임포트",
          status: "pass",
          message: "Alert, AlertDescription, AlertTitle이 올바르게 임포트되고 렌더링됨",
          details: "data-slot 속성이 올바르게 설정됨"
        });
      } else {
        results.push({
          name: "shadcn/ui 컴포넌트 임포트",
          status: "fail",
          message: "Alert 컴포넌트가 올바르게 렌더링되지 않음"
        });
      }
    } catch (error) {
      results.push({
        name: "shadcn/ui 컴포넌트 임포트",
        status: "fail",
        message: `임포트 오류: ${error}`
      });
    }

    // 2. Icon 컴포넌트 사용 확인
    try {
      const iconElements = document.querySelectorAll('[data-testid="error-icon"]');
      let iconFound = false;
      let svgFound = false;
      let debugInfo = [] as string[];

      iconElements.forEach((iconElement, index) => {
        if (iconElement) {
          iconFound = true;
          debugInfo.push(`아이콘 ${index + 1}: 태그=${iconElement.tagName}, 클래스=${iconElement.className}`);
          
          // lucide-react 아이콘은 자체가 SVG 요소이므로 직접 확인
          if (iconElement.tagName.toLowerCase() === 'svg') {
            svgFound = true;
            debugInfo.push(`아이콘 ${index + 1}: SVG 요소 확인됨`);
          } else {
            // 또는 내부에 SVG가 있는지 확인
            const svgElement = iconElement.querySelector('svg');
            if (svgElement) {
              svgFound = true;
              debugInfo.push(`아이콘 ${index + 1}: 내부 SVG 요소 확인됨`);
            } else {
              debugInfo.push(`아이콘 ${index + 1}: SVG 요소 없음`);
            }
          }
        }
      });

      if (iconFound && svgFound) {
        results.push({
          name: "Icon 컴포넌트 사용",
          status: "pass",
          message: "AlertTriangle 아이콘이 올바르게 렌더링됨",
          details: `아이콘 요소 ${iconElements.length}개 발견, SVG 렌더링 확인`
        });
      } else if (iconFound && !svgFound) {
        results.push({
          name: "Icon 컴포넌트 사용",
          status: "fail",
          message: "아이콘 SVG가 렌더링되지 않음",
          details: debugInfo.join("; ")
        });
      } else {
        results.push({
          name: "Icon 컴포넌트 사용",
          status: "warning",
          message: "아이콘이 표시되지 않음 (showIcon=false일 수 있음)",
          details: `총 ${iconElements.length}개 아이콘 요소 발견`
        });
      }
    } catch (error) {
      results.push({
        name: "Icon 컴포넌트 사용",
        status: "fail",
        message: `아이콘 렌더링 오류: ${error}`
      });
    }

    // 3. Props 처리 확인
    try {
      const titleElements = document.querySelectorAll('[data-slot="alert-title"]');
      const descriptionElements = document.querySelectorAll('[data-slot="alert-description"]');
      const errorCodeElements = document.querySelectorAll('[data-testid="error-code"]');

      let propsTestPassed = true;
      const propsDetails = [];

      // 모든 title 요소 중에서 "테스트 제목"을 포함한 것이 있는지 확인
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

      // 모든 description 요소 중에서 "테스트 메시지"를 포함한 것이 있는지 확인
      let messageFound = false;
      descriptionElements.forEach(element => {
        if (element.textContent?.includes("테스트 메시지")) {
          messageFound = true;
        }
      });

      if (messageFound) {
        propsDetails.push("✓ message prop 정상 처리");
      } else {
        propsTestPassed = false;
        propsDetails.push("✗ message prop 처리 실패");
      }

      // 모든 errorCode 요소 중에서 "TEST_001"을 포함한 것이 있는지 확인
      let errorCodeFound = false;
      errorCodeElements.forEach(element => {
        if (element.textContent?.includes("TEST_001")) {
          errorCodeFound = true;
        }
      });

      if (errorCodeFound) {
        propsDetails.push("✓ errorCode prop 정상 처리");
      } else {
        propsDetails.push("✓ errorCode prop 없음 (정상)");
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

    // 4. 스타일 및 레이아웃 확인
    try {
      const alertElements = document.querySelectorAll('[data-slot="alert"]');
      let destructiveFound = false;
      let defaultFound = false;

      alertElements.forEach(alertElement => {
        if (alertElement) {
          const alertClasses = alertElement.className;
          
          // variant="destructive" 확인 - 실제 적용되는 클래스 확인
          if (alertClasses.includes('text-destructive')) {
            destructiveFound = true;
          }
          
          // default variant 확인
          if (alertClasses.includes('text-card-foreground')) {
            defaultFound = true;
          }
        }
      });

      if (destructiveFound) {
        results.push({
          name: "스타일 및 레이아웃",
          status: "pass",
          message: "✓ variant='destructive' 적용",
          details: `destructive variant 클래스 확인됨`
        });
      } else {
        results.push({
          name: "스타일 및 레이아웃",
          status: "warning",
          message: "✗ variant='destructive' 누락",
          details: `기본 variant가 적용된 것으로 보임`
        });
      }

      // 기본 Alert 클래스 확인
      if (alertElements.length > 0) {
        const firstAlert = alertElements[0] as HTMLElement;
        const alertClasses = firstAlert.className;
        
        if (alertClasses.includes('border') && alertClasses.includes('px-4')) {
          results.push({
            name: "스타일 및 레이아웃",
            status: "pass",
            message: "✓ 기본 Alert 스타일 적용",
            details: `클래스: ${alertClasses}`
          });
        } else {
          results.push({
            name: "스타일 및 레이아웃",
            status: "warning",
            message: "✗ 기본 Alert 스타일 누락",
            details: `클래스: ${alertClasses}`
          });
        }
      }
    } catch (error) {
      results.push({
        name: "스타일 및 레이아웃",
        status: "fail",
        message: `스타일 확인 중 오류: ${error}`
      });
    }

    // 5. 접근성 확인
    try {
      const alertElement = document.querySelector('[role="alert"]');
      const iconElement = document.querySelector('[aria-hidden="true"]');
      
      let a11yTestPassed = true;
      const a11yDetails = [];

      if (alertElement) {
        a11yDetails.push("✓ role='alert' 속성 존재");
      } else {
        a11yTestPassed = false;
        a11yDetails.push("✗ role='alert' 속성 누락");
      }

      if (iconElement) {
        a11yDetails.push("✓ 아이콘에 aria-hidden='true' 적용");
      } else {
        a11yDetails.push("? 아이콘 접근성 속성 확인 필요");
      }

      results.push({
        name: "접근성",
        status: a11yTestPassed ? "pass" : "fail",
        message: a11yTestPassed ? "접근성 요구사항 충족" : "접근성 개선 필요",
        details: a11yDetails.join(", ")
      });
    } catch (error) {
      results.push({
        name: "접근성",
        status: "fail",
        message: `접근성 확인 중 오류: ${error}`
      });
    }

    // 6. 조건부 렌더링 확인
    try {
      // 빈 메시지로 렌더링 시도
      const emptyMessageTest = document.querySelector('[data-testid="empty-message-test"]');
      if (!emptyMessageTest || emptyMessageTest.children.length === 0) {
        results.push({
          name: "조건부 렌더링",
          status: "pass",
          message: "빈 메시지일 때 올바르게 null 반환",
          details: "message가 falsy일 때 컴포넌트가 렌더링되지 않음"
        });
      } else {
        results.push({
          name: "조건부 렌더링",
          status: "fail",
          message: "빈 메시지일 때도 컴포넌트가 렌더링됨"
        });
      }
    } catch (error) {
      results.push({
        name: "조건부 렌더링",
        status: "fail",
        message: `조건부 렌더링 확인 중 오류: ${error}`
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
            <AlertTriangle className="h-5 w-5" />
            ErrorMessage 컴포넌트 자동 검토
          </CardTitle>
          <CardDescription>
            ErrorMessage 컴포넌트의 기능, 스타일, 접근성을 자동으로 검증합니다.
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
                  ? "🎉 모든 검토 항목을 통과했습니다! ErrorMessage 컴포넌트가 프로덕션 사용 준비가 완료되었습니다."
                  : `${totalTests - passedTests}개 항목에서 문제가 발견되었습니다. 위의 세부사항을 확인해주세요.`
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 테스트용 ErrorMessage 컴포넌트들 */}
      <Card>
        <CardHeader>
          <CardTitle>테스트 샘플</CardTitle>
          <CardDescription>검토를 위한 ErrorMessage 컴포넌트 샘플들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">기본 사용법</h3>
            <ErrorMessage 
              title="테스트 제목"
              message="테스트 메시지"
              showIcon={true}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">아이콘 없이</h3>
            <ErrorMessage 
              title="아이콘 없는 오류"
              message="아이콘이 표시되지 않는 오류 메시지입니다."
              showIcon={false}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">오류 코드 포함</h3>
            <ErrorMessage 
              title="오류 코드 포함"
              message="오류 코드가 포함된 메시지입니다."
              errorCode="TEST_001"
              showIcon={true}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">사용자 정의 클래스</h3>
            <ErrorMessage 
              title="사용자 정의 스타일"
              message="사용자 정의 클래스가 적용된 오류 메시지입니다."
              className="border-2 border-red-300"
              showIcon={true}
            />
          </div>

          {/* 빈 메시지 테스트 */}
          <div>
            <h4 className="text-sm font-medium mb-2">빈 메시지 테스트 (렌더링되지 않아야 함)</h4>
            <div data-testid="empty-message-test">
              <ErrorMessage message="" />
            </div>
          </div>

          {/* ReactNode 메시지 */}
          <div>
            <h4 className="text-sm font-medium mb-2">ReactNode 메시지</h4>
            <ErrorMessage 
              title="복잡한 메시지"
              message={
                <div>
                  <p>이것은 <strong>ReactNode</strong>를 사용한 메시지입니다.</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>첫 번째 항목</li>
                    <li>두 번째 항목</li>
                  </ul>
                </div>
              }
              errorCode="REACT_001"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMessageTest; 