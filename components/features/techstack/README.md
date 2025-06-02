# TechStack Components

기술 스택을 표시하기 위한 React 컴포넌트 모음입니다.

## 🚀 주요 업그레이드 (v2.0)

### 새로운 기능
- **숙련도 표시**: 1-5 레벨 별점 시스템과 색상 구분
- **다양한 변형**: Default, Compact, Detailed 스타일
- **향상된 디자인**: 원형 아이콘 컨테이너와 부드러운 애니메이션
- **프로덕션급 보안**: DOMPurify를 통한 SVG 살균
- **성능 최적화**: React.memo와 useMemo를 통한 렌더링 최적화

## 컴포넌트 목록

### 1. TechCategorySection
특정 기술 카테고리에 속하는 기술들을 그룹으로 표시하는 섹션 컴포넌트입니다.

#### Props
- `categoryName: string` - 카테고리 이름 (필수)
- `techStacks: TechStackItemType[]` - 기술 스택 배열 (필수)
- `className?: string` - 추가 CSS 클래스 (선택)
- `itemSize?: "sm" | "md" | "lg"` - 아이템 크기 (선택, 기본값: "md")
- `showProficiency?: boolean` - 숙련도 표시 여부 (선택, 기본값: false)
- `variant?: "default" | "compact" | "detailed"` - 표시 스타일 (선택, 기본값: "default")

#### 사용 예시
```tsx
import { TechCategorySection } from "@/components/features/techstack";

const frontendTechs = [
  {
    id: "1",
    name: "React",
    icon_url: "https://example.com/react-icon.png",
    summary: "사용자 인터페이스 라이브러리",
    proficiency_level: 5
  }
];

<TechCategorySection
  categoryName="Frontend"
  techStacks={frontendTechs}
  itemSize="md"
  showProficiency={true}
  variant="detailed"
/>
```

### 2. TechStackItem
개별 기술 스택을 표시하는 아이템 컴포넌트입니다.

#### Props
- `tech: TechStackItemType` - 기술 스택 정보 (필수)
- `className?: string` - 추가 CSS 클래스 (선택)
- `size?: "sm" | "md" | "lg"` - 아이템 크기 (선택, 기본값: "md")
- `showProficiency?: boolean` - 숙련도 표시 여부 (선택, 기본값: false)
- `variant?: "default" | "compact" | "detailed"` - 표시 스타일 (선택, 기본값: "default")

#### 사용 예시
```tsx
import { TechStackItem } from "@/components/features/techstack";

<TechStackItem
  tech={{
    id: "1",
    name: "React",
    icon_url: "https://example.com/react-icon.png",
    summary: "사용자 인터페이스 라이브러리",
    proficiency_level: 5
  }}
  size="md"
  showProficiency={true}
  variant="detailed"
/>
```

## 타입 정의

### TechStackItemType
```tsx
interface TechStackItemType {
  id: string;
  name: string;
  icon_svg_content?: string | null;
  icon_url?: string | null;
  summary?: string | null;
  proficiency_level?: number | null; // 1-5 범위
}
```

## 주요 특징

### 🔒 보안
- **DOMPurify 적용**: SVG 콘텐츠에 대한 XSS 방지
- **안전한 아이콘 렌더링**: 신뢰할 수 있는 소스의 아이콘만 표시
- **엄격한 살균 정책**: script, object, embed 태그 완전 차단

### ⚡ 성능
- **메모이제이션**: SVG 살균 과정을 useMemo로 최적화
- **React.memo**: TechStackItem 컴포넌트 리렌더링 최적화
- **Lazy Loading**: 이미지 지연 로딩 적용
- **조건부 렌더링**: 빈 배열 시 컴포넌트 렌더링 생략

### 📱 반응형 디자인
- **다양한 크기**: sm, md, lg 크기 옵션
- **반응형 그리드**: 화면 크기에 따른 자동 조정
- **호버 효과**: 부드러운 애니메이션과 상호작용
- **변형별 최적화**: 각 변형에 맞는 그리드 레이아웃

### ♿ 접근성
- **시맨틱 HTML**: 적절한 헤딩 태그와 구조
- **Alt 텍스트**: 이미지에 대한 의미있는 설명
- **ARIA 라벨**: 스크린리더 지원
- **키보드 네비게이션**: 포커스 관리

## 숙련도 시스템

### 레벨 정의
- **5점 (전문가)**: 초록색 - 해당 기술의 전문가 수준
- **4점 (숙련)**: 파랑색 - 능숙하게 사용 가능
- **3점 (중급)**: 노랑색 - 기본적인 사용 가능
- **2점 (초급)**: 주황색 - 학습 중이거나 기초 수준
- **1점**: 주황색 - 입문 수준

### 표시 방식
- **별점**: 모든 변형에서 기본 표시
- **텍스트 뱃지**: Detailed 변형에서 추가 표시
- **색상 구분**: 레벨에 따른 시각적 구분

## 변형 스타일

### Default
- 기본 호버 효과와 스케일링
- 배경색 변경과 아이콘 확대
- 모든 정보 표시

### Compact
- 간소화된 표시
- 요약 정보 숨김
- 작은 공간에 적합

### Detailed
- 테두리와 그림자 효과
- 숙련도 뱃지 추가 표시
- 더 넓은 공간 사용

## 크기별 그리드 레이아웃

### Small (sm)
- 모바일: 3열 (Detailed: 2열)
- 태블릿: 4-6열 (Detailed: 3-4열)
- 데스크탑: 8-10열 (Detailed: 6-8열)

### Medium (md) - 기본값
- 모바일: 2열 (Detailed: 1열)
- 태블릿: 3-4열 (Detailed: 2-3열)
- 데스크탑: 5-6열 (Detailed: 4-5열)

### Large (lg)
- 모바일: 1열
- 태블릿: 2-3열 (Detailed: 2열)
- 데스크탑: 4-5열 (Detailed: 3-4열)

## 아이콘 처리 우선순위

1. **icon_url**: Next.js Image 컴포넌트로 최적화된 렌더링
2. **icon_svg_content**: DOMPurify로 살균된 SVG 직접 렌더링
3. **기본 아이콘**: CodeXml 아이콘 표시

## 사용 시 주의사항

1. **SVG 콘텐츠**: 신뢰할 수 있는 소스에서만 사용
2. **이미지 최적화**: SVG 파일의 경우 `unoptimized` 속성 적용
3. **빈 배열 처리**: 빈 techStacks 배열 시 컴포넌트가 렌더링되지 않음
4. **숙련도 범위**: proficiency_level은 1-5 범위로 제한
5. **성능 고려**: 대량의 아이템 표시 시 가상화 고려

## 테스트

테스트 페이지에서 다양한 사용 예시를 확인할 수 있습니다:
```
/test-components
```

### 테스트 항목
- 기본 변형 테스트
- 숙련도 표시 테스트
- 크기별 테스트
- 변형별 테스트
- 빈 상태 테스트
- 성능 테스트

## 마이그레이션 가이드 (v1 → v2)

### 주요 변경사항
1. **Props 구조 변경**: 개별 props → `tech` 객체
2. **새로운 Props 추가**: `showProficiency`, `variant`
3. **타입 정의 변경**: `proficiency_level` 필드 추가

### 마이그레이션 예시
```tsx
// v1 (이전)
<TechStackItem
  id="1"
  name="React"
  icon_url="..."
  summary="..."
  size="md"
/>

// v2 (현재)
<TechStackItem
  tech={{
    id: "1",
    name: "React",
    icon_url: "...",
    summary: "...",
    proficiency_level: 5
  }}
  size="md"
  showProficiency={true}
  variant="default"
/>
``` 