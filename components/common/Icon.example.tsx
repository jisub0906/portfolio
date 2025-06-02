// components/common/Icon.example.tsx - Icon 컴포넌트 사용 예제

import Icon from "./Icon";
import { Button } from "@/components/ui/button";

// 기본 사용법 예제
export function IconExamples() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Icon 컴포넌트 사용 예제</h2>
      
      {/* 1. 기본 사용법 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">1. 기본 사용법</h3>
        <div className="flex gap-4 items-center">
          <Icon name="Mail" />
          <Icon name="User" />
          <Icon name="Settings" />
          <Icon name="Home" />
        </div>
      </section>

      {/* 2. 크기 조정 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">2. 크기 조정</h3>
        <div className="flex gap-4 items-center">
          <Icon name="Star" size={16} />
          <Icon name="Star" size={24} />
          <Icon name="Star" size={32} />
          <Icon name="Star" size="2em" />
        </div>
      </section>

      {/* 3. 색상 변경 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">3. 색상 변경</h3>
        <div className="flex gap-4 items-center">
          <Icon name="Heart" color="red" />
          <Icon name="Heart" color="blue" />
          <Icon name="Heart" className="text-green-500" />
          <Icon name="Heart" className="text-purple-500" />
        </div>
      </section>

      {/* 4. 선 두께 조정 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">4. 선 두께 조정</h3>
        <div className="flex gap-4 items-center">
          <Icon name="Circle" strokeWidth={1} />
          <Icon name="Circle" strokeWidth={2} />
          <Icon name="Circle" strokeWidth={3} />
          <Icon name="Circle" strokeWidth={4} />
        </div>
      </section>

      {/* 5. 버튼과 함께 사용 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">5. 버튼과 함께 사용</h3>
        <div className="flex gap-4">
          <Button>
            <Icon name="Download" size={16} />
            다운로드
          </Button>
          <Button variant="outline">
            <Icon name="Share" size={16} />
            공유
          </Button>
          <Button size="icon">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </section>

      {/* 6. 일반적인 아이콘 목록 */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">6. 자주 사용되는 아이콘들</h3>
        <div className="grid grid-cols-6 gap-4">
          {[
            "Mail", "User", "Settings", "Home", "Search", "Star",
            "Heart", "Circle", "Download", "Share", "Edit", "MoreHorizontal",
            "AlertTriangle", "CheckCircle", "XCircle", "Info", "HelpCircle"
          ].map((iconName) => (
            <div key={iconName} className="flex flex-col items-center gap-1 p-2 border rounded">
              <Icon name={iconName as any} size={20} />
              <span className="text-xs text-center">{iconName}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// TypeScript 타입 안전성 예제
export function TypeSafeIconUsage() {
  // ✅ 올바른 사용법 - TypeScript가 자동완성 제공
  const validIcon = <Icon name="Mail" size={24} />;
  
  // ❌ 잘못된 사용법 - TypeScript 오류 발생
  // const invalidIcon = <Icon name="NonExistentIcon" />;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">TypeScript 타입 안전성</h3>
      <p className="text-sm text-muted-foreground">
        Icon 컴포넌트는 TypeScript를 통해 유효한 아이콘 이름만 허용합니다.
        IDE에서 자동완성을 통해 사용 가능한 아이콘을 확인할 수 있습니다.
      </p>
      {validIcon}
    </div>
  );
} 