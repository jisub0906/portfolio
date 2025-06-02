# PageTitle 컴포넌트

## 개요

`PageTitle`은 페이지의 주 제목과 선택적인 부제목을 일관된 타이포그래피 스타일로 표시하는 재사용 가능한 컴포넌트입니다. 프로젝트 전체의 페이지 제목 스타일 통일성을 확보하고 사용의 편의성을 높입니다.

## 주요 특징

- **일관된 타이포그래피**: PRD 8.3 타이포그래피 가이드 준수
- **반응형 디자인**: 화면 크기에 따른 자동 폰트 크기 조절
- **유연한 콘텐츠**: 문자열 또는 ReactNode 지원
- **시맨틱 HTML**: `<h1>`, `<p>` 태그 사용으로 접근성 향상
- **타입 안전성**: TypeScript로 작성되어 타입 안전성 보장

## Props

| Prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `title` | `string \| ReactNode` | ✅ | - | 페이지의 주 제목 |
| `subtitle` | `string \| ReactNode` | ❌ | - | 페이지의 부제목 |
| `className` | `string` | ❌ | - | 추가 CSS 클래스 |

## 사용법

### 기본 사용법

```tsx
import PageTitle from "@/components/common/PageTitle";

function HomePage() {
  return (
    <div>
      <PageTitle title="지섭의 포트폴리오" />
    </div>
  );
}
```

### 제목과 부제목

```tsx
<PageTitle 
  title="프로젝트 쇼케이스"
  subtitle="개발자 JISUB이 참여한 다양한 프로젝트들을 소개합니다."
/>
```

### ReactNode를 사용한 제목

```tsx
<PageTitle 
  title={
    <span>
      기술 스택 <span className="text-primary">& 경험</span>
    </span>
  }
  subtitle="다양한 기술 스택과 개발 경험을 확인해보세요."
/>
```

### 커스텀 스타일링

```tsx
<PageTitle 
  title="블로그"
  subtitle="개발 경험과 기술적 인사이트를 공유합니다."
  className="text-center py-8 border-2 border-dashed border-border rounded-lg"
/>
```

## 스타일 가이드

### 타이포그래피 클래스

**주 제목 (`<h1>`)**:
- 모바일: `text-4xl` (36px)
- 데스크탑: `text-5xl` (48px)
- 폰트 두께: `font-bold`
- 자간: `tracking-tight`
- 색상: `text-foreground`

**부제목 (`<p>`)**:
- 모바일: `text-lg` (18px)
- 데스크탑: `text-xl` (20px)
- 색상: `text-muted-foreground`

### 레이아웃

- 제목과 부제목 사이 간격: `space-y-2` (0.5rem)
- 커스텀 클래스는 최상위 컨테이너에 적용

## 실제 사용 시나리오

### 1. 홈페이지

```tsx
<PageTitle 
  title="안녕하세요, 개발자 JISUB입니다"
  subtitle="창의적인 아이디어와 기술적 전문성으로 더 나은 웹 경험을 만들어갑니다."
/>
```

### 2. 프로젝트 페이지

```tsx
<PageTitle 
  title="프로젝트"
  subtitle="다양한 기술 스택을 활용하여 개발한 프로젝트들을 확인해보세요."
/>
```

### 3. 블로그 페이지

```tsx
<PageTitle 
  title="개발 블로그"
  subtitle="기술적 경험과 인사이트를 공유하는 공간입니다."
/>
```

### 4. 소개 페이지

```tsx
<PageTitle 
  title="About Me"
  subtitle="개발자로서의 여정과 가치관을 소개합니다."
/>
```

## 접근성 (Accessibility)

### 시맨틱 HTML
- `<h1>` 태그 사용으로 페이지 구조 명확화
- 스크린 리더에서 페이지 제목 인식 가능

### 색상 대비
- `text-foreground`: 충분한 색상 대비 보장
- `text-muted-foreground`: 보조 텍스트용 적절한 대비

### 반응형 디자인
- 모든 화면 크기에서 읽기 쉬운 폰트 크기
- 모바일과 데스크탑 최적화

## 오류 처리

### 빈 제목 처리
```tsx
// 다음의 경우 컴포넌트가 렌더링되지 않음 (null 반환)
<PageTitle title="" />
<PageTitle title={null} />
<PageTitle title={undefined} />
```

### 부제목 없음
```tsx
// subtitle이 없으면 해당 부분만 렌더링되지 않음
<PageTitle title="제목만 있는 경우" />
```

## 성능 고려사항

### 최적화 특징
- **Stateless 컴포넌트**: 상태 없이 props만 사용
- **조건부 렌더링**: 불필요한 DOM 생성 방지
- **최소 의존성**: `cn` 유틸리티만 사용
- **Tree-shaking**: Named export로 번들 크기 최적화

### 렌더링 성능
- 빈 제목일 때 `null` 반환으로 DOM 생성 방지
- 부제목이 없을 때 해당 요소 렌더링 생략

## 디자인 시스템 통합

### PRD 8.3 타이포그래피 가이드 준수
- H1 스타일: 대형 제목용 타이포그래피
- 본문/보조 텍스트: 부제목용 스타일
- 일관된 간격과 색상 사용

### Tailwind CSS 활용
- 유틸리티 클래스 기반 스타일링
- 반응형 브레이크포인트 활용
- 디자인 토큰 기반 색상 시스템

## 테스트 가이드

### 시각적 테스트
1. 다양한 제목 길이 테스트
2. ReactNode 콘텐츠 렌더링 확인
3. 반응형 디자인 검증
4. 다크모드 호환성 확인

### 기능 테스트
1. 빈 제목 처리 확인
2. 부제목 조건부 렌더링 확인
3. 커스텀 클래스 적용 확인
4. 타입 안전성 검증

## 관련 컴포넌트

- **ErrorMessage**: 오류 상황에서의 메시지 표시
- **SkeletonLoader**: 로딩 상태에서의 제목 스켈레톤
- **Card**: 콘텐츠 섹션의 제목 표시

## 버전 히스토리

- **v1.0.0**: 초기 버전 생성
  - 기본 제목/부제목 기능
  - 반응형 타이포그래피
  - TypeScript 타입 정의
  - 접근성 고려사항 적용 