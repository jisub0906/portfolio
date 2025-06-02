# ErrorMessage 컴포넌트

## 개요

`ErrorMessage`는 사용자에게 오류 정보를 명확하고 일관된 방식으로 표시하는 재사용 가능한 컴포넌트입니다. `shadcn/ui`의 `Alert` 컴포넌트를 기반으로 하며, 프로젝트의 디자인 시스템과 일관성을 유지합니다.

## 주요 특징

- **일관된 오류 표시**: `shadcn/ui`의 `Alert` 컴포넌트 기반으로 일관된 스타일 제공
- **유연한 메시지 형태**: 문자열 또는 ReactNode 지원
- **선택적 요소**: 제목, 오류 코드, 아이콘 표시 여부 제어 가능
- **타입 안전성**: TypeScript로 작성되어 타입 안전성 보장
- **접근성**: ARIA 속성과 시맨틱 HTML 구조 지원

## Props

| Prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `message` | `string \| ReactNode` | ✅ | - | 표시할 오류 메시지 내용 |
| `title` | `string` | ❌ | - | 오류 메시지의 제목 |
| `errorCode` | `string \| number` | ❌ | - | 사용자에게 표시할 오류 코드 |
| `className` | `string` | ❌ | - | 추가 CSS 클래스 |
| `showIcon` | `boolean` | ❌ | `true` | 아이콘 표시 여부 |

## 사용법

### 기본 사용법

```tsx
import ErrorMessage from "@/components/common/ErrorMessage";

function MyComponent() {
  return (
    <ErrorMessage message="네트워크 연결에 실패했습니다." />
  );
}
```

### 제목과 함께 사용

```tsx
<ErrorMessage 
  title="로그인 실패"
  message="이메일 또는 비밀번호가 올바르지 않습니다." 
/>
```

### 오류 코드 포함

```tsx
<ErrorMessage 
  title="서버 오류"
  message="서버에서 예상치 못한 오류가 발생했습니다."
  errorCode="ERR_500"
/>
```

### 아이콘 없이 표시

```tsx
<ErrorMessage 
  message="이것은 아이콘이 없는 메시지입니다."
  showIcon={false}
/>
```

### ReactNode를 사용한 복잡한 메시지

```tsx
<ErrorMessage 
  title="파일 업로드 실패"
  message={
    <div>
      <p>다음 파일들의 업로드에 실패했습니다:</p>
      <ul className="list-disc list-inside mt-2">
        <li>document.pdf (파일 크기 초과)</li>
        <li>image.jpg (지원하지 않는 형식)</li>
      </ul>
      <p className="mt-2">
        <strong>해결 방법:</strong> 파일 크기를 10MB 이하로 줄이고, 
        지원하는 형식(PDF, JPG, PNG)으로 변환해주세요.
      </p>
    </div>
  }
  errorCode="UPLOAD_001"
/>
```

### 커스텀 스타일 적용

```tsx
<ErrorMessage 
  message="커스텀 스타일이 적용된 오류 메시지입니다."
  className="my-8 border-2"
/>
```

## 실제 사용 시나리오

### 1. 폼 유효성 검사 오류

```tsx
function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
      {error && (
        <ErrorMessage 
          title="로그인 실패"
          message={error}
          errorCode="AUTH_001"
        />
      )}
      <Button type="submit">로그인</Button>
    </form>
  );
}
```

### 2. API 오류 처리

```tsx
function DataFetcher() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .catch(err => setError(err));
  }, []);

  if (error) {
    return (
      <ErrorMessage 
        title="데이터 로드 실패"
        message={error.message}
        errorCode={error.code}
      />
    );
  }

  return <DataDisplay />;
}
```

### 3. 조건부 렌더링

```tsx
function ConditionalError({ hasError, errorMessage }: Props) {
  // message가 falsy이면 자동으로 null을 반환하므로 조건부 렌더링 불필요
  return (
    <div>
      <h1>페이지 제목</h1>
      <ErrorMessage message={hasError ? errorMessage : ""} />
      <MainContent />
    </div>
  );
}
```

## 디자인 시스템 통합

### 색상

컴포넌트는 `variant="destructive"`를 사용하여 다음 CSS 변수들을 활용합니다:

- `--destructive`: 주요 오류 색상
- `--destructive-foreground`: 오류 텍스트 색상
- `--card`: 배경 색상
- `--card-foreground`: 기본 텍스트 색상

### 아이콘

- 기본적으로 `AlertTriangle` 아이콘 사용
- `Icon` 컴포넌트를 통해 일관된 아이콘 렌더링
- `h-4 w-4` 크기로 표준화

## 접근성 (Accessibility)

- `role="alert"` 속성으로 스크린 리더에서 즉시 알림
- 시맨틱한 HTML 구조 사용
- 적절한 색상 대비 유지
- 키보드 네비게이션 지원

## 성능 고려사항

- **조건부 렌더링**: `message`가 falsy일 때 `null` 반환으로 불필요한 렌더링 방지
- **메모이제이션**: 필요시 `React.memo`로 래핑 가능
- **번들 크기**: 필요한 컴포넌트만 import하여 번들 크기 최적화

## 테스트

### 단위 테스트 예시

```tsx
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('기본 메시지를 렌더링한다', () => {
    render(<ErrorMessage message="테스트 오류" />);
    expect(screen.getByText('테스트 오류')).toBeInTheDocument();
  });

  it('제목과 함께 렌더링한다', () => {
    render(
      <ErrorMessage 
        title="오류 제목"
        message="오류 메시지" 
      />
    );
    expect(screen.getByText('오류 제목')).toBeInTheDocument();
    expect(screen.getByText('오류 메시지')).toBeInTheDocument();
  });

  it('오류 코드를 표시한다', () => {
    render(
      <ErrorMessage 
        message="오류 메시지"
        errorCode="ERR_001" 
      />
    );
    expect(screen.getByText('오류 코드: ERR_001')).toBeInTheDocument();
  });

  it('빈 메시지일 때 렌더링하지 않는다', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });
});
```

## 관련 컴포넌트

- `Alert`: 기반이 되는 shadcn/ui 컴포넌트
- `Icon`: 아이콘 렌더링을 위한 공용 컴포넌트
- `Button`: 오류 해결 액션 버튼과 함께 사용 가능

## 버전 히스토리

- **v1.0.0**: 초기 구현
  - 기본 오류 메시지 표시 기능
  - 제목, 오류 코드, 아이콘 옵션 지원
  - shadcn/ui Alert 컴포넌트 기반 구현 