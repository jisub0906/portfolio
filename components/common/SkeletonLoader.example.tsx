// components/common/SkeletonLoader.example.tsx - SkeletonLoader 사용 예제

import SkeletonLoader from "./SkeletonLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SkeletonLoaderExamples() {
  const [isLoading, setIsLoading] = useState(true);

  const toggleLoading = () => setIsLoading(!isLoading);

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">SkeletonLoader 컴포넌트 예제</h2>
        <p className="text-muted-foreground">
          다양한 콘텐츠 유형에 맞는 스켈레톤 로딩 UI 패턴을 제공합니다.
        </p>
        <Button onClick={toggleLoading} variant="outline">
          {isLoading ? "실제 콘텐츠 보기" : "스켈레톤 보기"}
        </Button>
      </div>

      {/* Card Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Card Variant</CardTitle>
          <CardDescription>프로젝트 카드, 블로그 포스트 카드 등에 사용</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoader variant="card" />
          ) : (
            <div className="space-y-4">
              <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-semibold">
                실제 이미지 영역
              </div>
              <h3 className="text-xl font-semibold">실제 프로젝트 제목</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>이것은 실제 프로젝트 설명입니다. 스켈레톤 로더가 이 콘텐츠를 로딩하는 동안 표시됩니다.</p>
                <p>여러 줄의 텍스트가 있을 때 스켈레톤이 어떻게 보이는지 확인할 수 있습니다.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Text Block Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Text Block Variant</CardTitle>
          <CardDescription>긴 텍스트 블록, 기사 내용 등에 사용</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">기본 (3줄)</h4>
            {isLoading ? (
              <SkeletonLoader variant="text-block" />
            ) : (
              <div className="space-y-2 text-muted-foreground">
                <p>이것은 실제 텍스트 블록의 첫 번째 줄입니다.</p>
                <p>두 번째 줄은 조금 더 길 수 있습니다. 스켈레톤 로더가 이런 패턴을 모방합니다.</p>
                <p>마지막 줄은 보통 짧습니다.</p>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-2">커스텀 (5줄)</h4>
            {isLoading ? (
              <SkeletonLoader variant="text-block" lines={5} />
            ) : (
              <div className="space-y-2 text-muted-foreground">
                <p>더 많은 줄이 있는 텍스트 블록입니다.</p>
                <p>두 번째 줄입니다.</p>
                <p>세 번째 줄입니다.</p>
                <p>네 번째 줄입니다.</p>
                <p>다섯 번째 줄입니다.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List Item Variant */}
      <Card>
        <CardHeader>
          <CardTitle>List Item Variant</CardTitle>
          <CardDescription>사용자 목록, 댓글 목록, 알림 목록 등에 사용</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">기본 (1개)</h4>
            {isLoading ? (
              <SkeletonLoader variant="list-item" />
            ) : (
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div className="space-y-1">
                  <p className="font-medium">지섭 개발자</p>
                  <p className="text-sm text-muted-foreground">풀스택 개발자입니다.</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-2">여러 개 (3개)</h4>
            {isLoading ? (
              <SkeletonLoader variant="list-item" count={3} />
            ) : (
              <div className="space-y-4">
                {[
                  { name: "김개발", role: "프론트엔드 개발자", avatar: "KD" },
                  { name: "이백엔드", role: "백엔드 개발자", avatar: "LB" },
                  { name: "박풀스택", role: "풀스택 개발자", avatar: "PF" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Page Title Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Page Title Variant</CardTitle>
          <CardDescription>페이지 헤더, 섹션 제목 등에 사용</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoader variant="page-title" />
          ) : (
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">실제 페이지 제목</h1>
              <p className="text-xl text-muted-foreground">실제 부제목 또는 설명</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Header Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Header Variant</CardTitle>
          <CardDescription>프로필 페이지 상단, 사용자 정보 섹션 등에 사용</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoader variant="profile-header" />
          ) : (
            <div className="flex items-center space-x-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                지섭
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">지섭 (JISUB)</h2>
                <p className="text-muted-foreground">풀스택 개발자</p>
                <p className="text-sm text-muted-foreground">React, Next.js, TypeScript를 주로 사용합니다.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Styling */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styling</CardTitle>
          <CardDescription>className prop을 사용한 커스텀 스타일링</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">배경색 변경</h4>
            <SkeletonLoader 
              variant="text-block" 
              lines={2}
              className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2">여백 조정</h4>
            <SkeletonLoader 
              variant="list-item" 
              count={2}
              className="p-6 border rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* 사용법 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용법 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">✅ 언제 사용하나요?</h4>
            <ul className="text-sm space-y-1 ml-4">
              <li>• 데이터를 서버에서 가져오는 동안</li>
              <li>• 이미지나 콘텐츠가 로딩되는 동안</li>
              <li>• 사용자에게 로딩 상태를 시각적으로 보여주고 싶을 때</li>
              <li>• 지각 성능(Perceived Performance)을 향상시키고 싶을 때</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">💡 기본 사용법:</h4>
            <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`import SkeletonLoader from "@/components/common/SkeletonLoader";

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader variant="card" />
      ) : (
        <ActualContent />
      )}
    </div>
  );
}`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-purple-600">🎨 Props 설명:</h4>
            <div className="text-sm space-y-1">
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">variant</code>: 스켈레톤 유형 (필수)</p>
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">count</code>: 반복 개수 (list-item에서 사용)</p>
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">lines</code>: 텍스트 줄 수 (text-block에서 사용)</p>
              <p><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">className</code>: 추가 스타일링</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 