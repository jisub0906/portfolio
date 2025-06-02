# ClientOnly 컴포넌트

## 개요

`ClientOnly` 컴포넌트는 자식 요소들이 오직 클라이언트 사이드에서만 렌더링되도록 보장하는 래퍼 컴포넌트입니다. Next.js App Router 환경에서 SSR/hydration 오류를 방지하기 위해 사용됩니다.

## 주요 기능

- **SSR 시 렌더링 방지**: 서버 사이드 렌더링 중에는 `null`을 반환
- **클라이언트 마운트 감지**: `useEffect`를 통해 클라이언트 마운트 상태 추적
- **Hydration 오류 방지**: 서버와 클라이언트 간 렌더링 결과 불일치 해결

## 사용법

### 기본 사용법

```tsx
import { ClientOnly } from "@/components/common/ClientOnly";

function MyComponent() {
  return (
    <div>
      <h1>서버에서도 렌더링되는 내용</h1>
      <ClientOnly>
        <BrowserOnlyComponent />
      </ClientOnly>
    </div>
  );
}
```

### 브라우저 API 사용 컴포넌트

```tsx
function WindowSizeComponent() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return <div>창 크기: {windowSize.width} x {windowSize.height}</div>;
}

// 사용
<ClientOnly>
  <WindowSizeComponent />
</ClientOnly>
```

### localStorage 사용 컴포넌트

```tsx
function UserPreferences() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={() => handleThemeChange('dark')}>
        다크 모드
      </button>
    </div>
  );
}

// 사용
<ClientOnly>
  <UserPreferences />
</ClientOnly>
```

## 사용해야 하는 경우

### ✅ ClientOnly를 사용해야 하는 상황

- **브라우저 전용 API 사용**
  - `window`, `document`, `navigator` 객체 접근
  - `localStorage`, `sessionStorage` 사용
  - 브라우저 이벤트 리스너 등록

- **실행 시마다 다른 값 생성**
  - `Math.random()`, `Date.now()` 등
  - 클라이언트별로 다른 고유 ID 생성

- **브라우저 전용 라이브러리**
  - 차트 라이브러리 (Chart.js, D3.js 등)
  - 지도 라이브러리 (Google Maps, Leaflet 등)
  - 브라우저 전용 UI 라이브러리

- **클라이언트 상태 의존적 컴포넌트**
  - 사용자 인터랙션에 따른 동적 UI
  - 클라이언트 사이드 라우팅 상태

### ❌ ClientOnly를 사용하지 말아야 하는 경우

- **SEO가 중요한 콘텐츠**
  - 메인 텍스트, 제목, 메타 정보
  - 검색 엔진이 인덱싱해야 하는 내용

- **초기 로딩 성능이 중요한 UI**
  - 핵심 네비게이션 요소
  - 주요 CTA 버튼

- **접근성이 중요한 콘텐츠**
  - 스크린 리더가 읽어야 하는 내용
  - 키보드 네비게이션 필수 요소

## 동작 원리

```tsx
export function ClientOnly({ children }: ClientOnlyProps): ReactNode | null {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // 클라이언트에서만 실행
  }, []);

  if (!hasMounted) {
    return null; // SSR 시 아무것도 렌더링하지 않음
  }

  return <>{children}</>; // 클라이언트에서만 children 렌더링
}
```

1. **초기 상태**: `hasMounted = false`
2. **SSR 단계**: `null` 반환 (아무것도 렌더링하지 않음)
3. **클라이언트 마운트**: `useEffect` 실행으로 `hasMounted = true`
4. **리렌더링**: `children` 렌더링

## 주의사항

### 1. 초기 로딩 시 빈 공간

```tsx
// 이렇게 하면 초기에 빈 공간이 보임
<ClientOnly>
  <ImportantContent />
</ClientOnly>

// 대신 이렇게 구조화
<div>
  <StaticContent /> {/* 즉시 보이는 내용 */}
  <ClientOnly>
    <DynamicContent /> {/* 나중에 로드되는 내용 */}
  </ClientOnly>
</div>
```

### 2. SEO 영향

```tsx
// ❌ SEO에 중요한 내용을 ClientOnly로 감싸지 마세요
<ClientOnly>
  <h1>페이지 제목</h1>
  <p>중요한 설명 텍스트</p>
</ClientOnly>

// ✅ SEO 무관한 인터랙티브 요소만 감싸세요
<div>
  <h1>페이지 제목</h1>
  <p>중요한 설명 텍스트</p>
  <ClientOnly>
    <InteractiveWidget />
  </ClientOnly>
</div>
```

### 3. 과도한 사용 방지

```tsx
// ❌ 모든 것을 ClientOnly로 감싸지 마세요
<ClientOnly>
  <Header />
  <Navigation />
  <MainContent />
  <Footer />
</ClientOnly>

// ✅ 필요한 부분만 선택적으로 사용
<Header />
<Navigation />
<MainContent>
  <StaticContent />
  <ClientOnly>
    <DynamicChart />
  </ClientOnly>
</MainContent>
<Footer />
```

## 성능 고려사항

- **번들 크기**: ClientOnly 자체는 매우 가벼움 (~100 bytes)
- **렌더링 성능**: 추가 리렌더링 1회 발생 (마운트 시)
- **사용자 경험**: 초기 로딩 시 레이아웃 시프트 가능성

## 대안 방법

### 1. 조건부 렌더링

```tsx
function MyComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && <BrowserOnlyComponent />}
    </div>
  );
}
```

### 2. dynamic import (Next.js)

```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('./BrowserOnlyComponent'),
  { ssr: false }
);

function MyComponent() {
  return <DynamicComponent />;
}
```

## 타입 정의

```tsx
interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnly({ children }: ClientOnlyProps): ReactNode | null
```

## 관련 컴포넌트

- **Icon**: 아이콘 렌더링 (SSR 안전)
- **ThemeProvider**: 테마 관리 (next-themes 사용)

## 예제 링크

- [기본 사용법 예제](./ClientOnly.example.tsx)
- [테스트 페이지](../../app/test-components/page.tsx) 