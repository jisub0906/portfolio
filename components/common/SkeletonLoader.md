# SkeletonLoader 컴포넌트

## 개요

`SkeletonLoader` 컴포넌트는 데이터 로딩 중에 표시할 수 있는 다양한 사전 정의된 스켈레톤 UI 패턴을 제공하는 재사용 가능한 컴포넌트입니다. `shadcn/ui`의 `Skeleton` 컴포넌트를 내부적으로 사용하여 일관된 스켈레톤 애니메이션 및 스타일을 보장합니다.

## 주요 기능

- **다양한 스켈레톤 패턴**: 5가지 사전 정의된 variant 제공
- **반복 요소 지원**: `count` prop으로 목록 형태 스켈레톤 반복
- **커스터마이징**: `lines`, `className` prop으로 세부 조정
- **타입 안전성**: TypeScript로 완전한 타입 지원
- **일관된 디자인**: shadcn/ui Skeleton 기반으로 통일된 스타일

## Props

```tsx
interface SkeletonLoaderProps {
  variant: 'card' | 'text-block' | 'list-item' | 'page-title' | 'profile-header';
  count?: number;      // 기본값: 1
  className?: string;  // 최상위 컨테이너용
  lines?: number;      // 기본값: 3 (text-block에서 사용)
}
```

### variant 상세 설명

#### 1. `'card'` - 카드형 콘텐츠
- **용도**: 프로젝트 카드, 블로그 포스트 카드, 제품 카드
- **구조**:
  - 이미지/썸네일 영역 (h-48)
  - 제목 라인 (h-6, w-3/4)
  - 본문 라인 3개 (h-4, 다양한 너비)

```tsx
<SkeletonLoader variant="card" />
```

#### 2. `'text-block'` - 텍스트 블록
- **용도**: 긴 텍스트 블록, 기사 내용, 설명문
- **구조**: 여러 줄의 텍스트 라인 (첫 줄과 마지막 줄은 짧게)
- **옵션**: `lines` prop으로 줄 수 조정

```tsx
<SkeletonLoader variant="text-block" lines={5} />
```

#### 3. `'list-item'` - 목록 아이템
- **용도**: 사용자 목록, 댓글 목록, 알림 목록
- **구조**: 아바타/아이콘 + 텍스트 라인 2개
- **옵션**: `count` prop으로 반복 개수 조정

```tsx
<SkeletonLoader variant="list-item" count={3} />
```

#### 4. `'page-title'` - 페이지 제목
- **용도**: 페이지 헤더, 섹션 제목
- **구조**: 메인 제목 (h-10) + 부제목 (h-6)

```tsx
<SkeletonLoader variant="page-title" />
```

#### 5. `'profile-header'` - 프로필 헤더
- **용도**: 프로필 페이지 상단, 사용자 정보 섹션
- **구조**: 프로필 이미지 (원형, h-24 w-24) + 텍스트 정보 3줄

```tsx
<SkeletonLoader variant="profile-header" />
```

## 사용 예제

### 기본 사용법

```tsx
import SkeletonLoader from "@/components/common/SkeletonLoader";

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
}
```

### 조건부 렌더링과 함께

```tsx
function ProjectList({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} variant="card" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### 커스텀 스타일링

```tsx
// 배경색과 패딩 추가
<SkeletonLoader 
  variant="text-block" 
  lines={4}
  className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
/>

// 목록 아이템에 테두리 추가
<SkeletonLoader 
  variant="list-item" 
  count={5}
  className="border rounded-lg p-4"
/>
```

### 실제 사용 시나리오

#### 1. 프로젝트 목록 페이지

```tsx
function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="container mx-auto p-6">
      <SkeletonLoader variant="page-title" />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLoader key={index} variant="card" />
          ))
        ) : (
          projects?.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
```

#### 2. 블로그 포스트 상세 페이지

```tsx
function BlogPostPage({ slug }) {
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <article className="max-w-4xl mx-auto p-6">
        <SkeletonLoader variant="page-title" />
        <div className="mt-8 space-y-4">
          <SkeletonLoader variant="text-block" lines={8} />
          <SkeletonLoader variant="text-block" lines={6} />
          <SkeletonLoader variant="text-block" lines={4} />
        </div>
      </article>
    );
  }

  return <BlogPostContent post={post} />;
}
```

#### 3. 사용자 프로필 페이지

```tsx
function UserProfilePage({ userId }) {
  const { data: user, isLoading } = useUser(userId);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {isLoading ? (
        <>
          <SkeletonLoader variant="profile-header" />
          <div className="mt-8">
            <SkeletonLoader variant="text-block" lines={5} />
          </div>
        </>
      ) : (
        <>
          <UserHeader user={user} />
          <UserBio bio={user.bio} />
        </>
      )}
    </div>
  );
}
```

## 성능 고려사항

### 장점
- **지각 성능 향상**: 사용자가 로딩을 덜 느끼게 함
- **레이아웃 안정성**: 실제 콘텐츠와 유사한 크기로 레이아웃 시프트 방지
- **일관된 UX**: 모든 로딩 상태에서 통일된 경험 제공

### 최적화 팁
- **적절한 개수**: 실제 데이터 개수와 유사하게 스켈레톤 개수 설정
- **크기 매칭**: 실제 콘텐츠와 비슷한 크기로 스켈레톤 조정
- **로딩 시간**: 너무 짧은 로딩(< 200ms)에는 스켈레톤 생략 고려

## 접근성 (A11y)

### 기본 지원
- **스크린 리더**: shadcn/ui Skeleton의 기본 접근성 지원
- **키보드 네비게이션**: 포커스 가능한 요소 없음 (정적 UI)

### 개선 방안
```tsx
// aria-label 추가 (필요시)
<div aria-label="콘텐츠 로딩 중" role="status">
  <SkeletonLoader variant="card" />
</div>

// 로딩 상태 알림
<div aria-live="polite" className="sr-only">
  {isLoading ? "콘텐츠를 불러오는 중입니다." : "콘텐츠 로딩 완료"}
</div>
```

## 오류 처리

### 잘못된 variant 처리
```tsx
// 유효하지 않은 variant 전달 시
<SkeletonLoader variant="invalid-variant" />
// → null 반환 + 콘솔 경고 출력
```

### 타입 안전성
```tsx
// TypeScript에서 잘못된 variant 사용 시 컴파일 오류
<SkeletonLoader variant="wrong" /> // ❌ 타입 오류
<SkeletonLoader variant="card" />  // ✅ 정상
```

## 커스터마이징 가이드

### 새로운 variant 추가
```tsx
// SkeletonLoader.tsx에서 확장
const renderCustomSkeleton = () => (
  <div className={cn("custom-skeleton-structure", className)}>
    {/* 커스텀 스켈레톤 구조 */}
  </div>
);

// switch 문에 케이스 추가
case 'custom':
  return renderCustomSkeleton();
```

### 테마별 스타일링
```tsx
// 다크모드 대응
<SkeletonLoader 
  variant="card"
  className="bg-gray-100 dark:bg-gray-800"
/>

// 브랜드 색상 적용
<SkeletonLoader 
  variant="text-block"
  className="[&_.skeleton]:bg-blue-100 dark:[&_.skeleton]:bg-blue-900"
/>
```

## 관련 컴포넌트

- **Skeleton** (shadcn/ui): 기본 스켈레톤 컴포넌트
- **ClientOnly**: 클라이언트 전용 렌더링 래퍼
- **Icon**: 동적 아이콘 렌더링

## 예제 링크

- [기본 사용법 예제](./SkeletonLoader.example.tsx)
- [테스트 페이지](../../app/test-components/page.tsx)

## 버전 히스토리

- **v1.0.0**: 초기 구현 (5가지 variant 지원)
  - card, text-block, list-item, page-title, profile-header
  - count, lines, className props 지원
  - TypeScript 완전 지원 