# 지섭의 포트폴리오 (JISUB's Portfolio)

개발자 JISUB의 포트폴리오 웹사이트입니다. Next.js, TypeScript, Supabase를 활용하여 구축된 모던한 포트폴리오 플랫폼입니다.

## 🚀 주요 기능

- **프로젝트 쇼케이스**: 개발한 프로젝트들의 상세 정보 및 기술 스택 소개
- **기술 스택 소개**: 보유 기술 및 숙련도 표시
- **자기소개**: 개발자로서의 여정과 경험 공유
- **블로그**: 개발, 기술, 생각 등 다양한 주제의 글 작성 및 검색/필터링
- **연락처**: 문의 폼을 통한 소통 창구 + **이메일 알림 시스템**
- **관리자 기능**: 콘텐츠 관리 시스템

## 🛠 기술 스택

### 프론트엔드
- **Next.js 14** (App Router)
- **TypeScript** (Strict Mode)
- **Tailwind CSS** (스타일링)
- **shadcn/ui** (UI 컴포넌트)
- **Framer Motion** (애니메이션)

### 백엔드 & 데이터베이스
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions)
- **Row Level Security (RLS)** 적용

### 이메일 서비스
- **Brevo** (구 Sendinblue) - 트랜잭션 이메일 발송
- 관리자 알림 및 자동 응답 이메일 지원

### 상태 관리 & 폼
- **Zustand** (전역 상태 관리)
- **React Hook Form** + **Zod** (폼 처리 및 유효성 검증)

### 테스트 & 개발 도구
- **Jest** + **React Testing Library** (단위/통합 테스트)
- **ESLint** + **Prettier** (코드 품질)

## 📁 프로젝트 구조

```
portfolio/
├── app/                    # Next.js App Router 페이지
│   ├── blog/              # 블로그 목록 및 상세 페이지
│   ├── projects/          # 프로젝트 쇼케이스
│   ├── tech-stack/        # 기술 스택 소개
│   └── about/             # 자기소개
├── components/            # 재사용 가능한 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── features/         # 기능별 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/                  # 유틸리티 및 설정
│   └── supabase/         # Supabase 클라이언트 설정
└── types/                # TypeScript 타입 정의
```

## 🎯 블로그 기능

새로 구현된 블로그 페이지(`/blog`)는 다음 기능을 제공합니다:

- **게시물 목록**: 페이지네이션을 통한 효율적인 게시물 탐색
- **카테고리 필터링**: 카테고리별 게시물 분류 및 필터링
- **검색 기능**: 제목, 요약, 본문 내용을 대상으로 한 전문 검색
- **반응형 디자인**: 모바일부터 데스크탑까지 최적화된 UI
- **SEO 최적화**: 동적 메타데이터 생성으로 검색 엔진 최적화
- **로딩 상태**: 스켈레톤 UI를 통한 부드러운 로딩 경험

### 블로그 URL 구조
- `/blog` - 전체 게시물 목록
- `/blog?category=development` - 카테고리별 필터링
- `/blog?q=React` - 검색어 기반 필터링
- `/blog?page=2` - 페이지네이션
- `/blog?category=development&q=React&page=1` - 복합 필터링

## 🚀 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 4. 테스트 실행

```bash
# 단위 테스트
pnpm test

# 테스트 커버리지
pnpm test:coverage
```

## 📊 데이터베이스 스키마

Supabase PostgreSQL 데이터베이스의 주요 테이블:

- `blog_posts` - 블로그 게시물
- `blog_categories` - 블로그 카테고리
- `projects` - 프로젝트 정보
- `tech_stacks` - 기술 스택
- `tech_categories` - 기술 카테고리
- `contacts` - 문의 메시지
- `about_me` - 자기소개 정보

모든 테이블에는 Row Level Security (RLS) 정책이 적용되어 있습니다.

## 🔧 개발 가이드라인

### 코드 스타일
- TypeScript Strict Mode 사용
- ESLint + Prettier 규칙 준수
- 컴포넌트는 기능별로 분리
- 서버/클라이언트 컴포넌트 명확히 구분

### 컴포넌트 작성 원칙
- Props 인터페이스 명시적 정의
- 재사용 가능한 구조로 설계
- 접근성(A11y) 고려
- 반응형 디자인 적용

### 데이터 페칭
- 서버 컴포넌트에서 초기 데이터 로드
- 클라이언트에서 인터랙티브 기능 처리
- 오류 상태 및 로딩 상태 적절히 처리

## 🚀 배포

이 프로젝트는 [Vercel Platform](https://vercel.com)에 배포하는 것을 권장합니다.

배포 전 확인사항:
- 환경 변수 설정
- Supabase RLS 정책 검증
- 테스트 통과 확인

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 포트폴리오 웹사이트의 연락처 페이지를 통해 연락해주세요.

## 📧 이메일 알림 시스템

연락처 폼을 통해 문의가 접수되면 자동으로 이메일 알림이 발송됩니다:

### 기능
- **관리자 알림**: 새로운 문의 접수 시 관리자에게 상세 내용 전송
- **자동 응답**: 문의자에게 접수 확인 이메일 자동 발송
- **HTML 템플릿**: 전문적이고 반응형 이메일 디자인
- **오류 처리**: 이메일 발송 실패 시에도 문의 접수는 정상 처리

### 설정 방법

1. **Brevo 계정 생성** 및 API 키 발급
2. **발신자 이메일 도메인 인증** (SPF, DKIM 설정)
3. **환경 변수 설정**:

```env
# Brevo 이메일 서비스 설정
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=your_verified_sender_email@domain.com
BREVO_SENDER_NAME=JISUB Portfolio
BREVO_ADMIN_EMAIL=your_admin_email@domain.com
```

### 이메일 템플릿 미리보기

개발 환경에서 이메일 템플릿을 미리 볼 수 있습니다:

```bash
# 관리자 알림 이메일 템플릿
http://localhost:3000/api/email-preview?type=notification

# 자동 응답 이메일 템플릿
http://localhost:3000/api/email-preview?type=auto-reply
```

### 이메일 발송 플로우

1. 사용자가 연락처 폼 제출
2. 서버에서 입력값 유효성 검증 (Zod)
3. Supabase 데이터베이스에 문의 내용 저장
4. Brevo API를 통해 이메일 발송 (병렬 처리)
   - 관리자에게 알림 이메일
   - 문의자에게 자동 응답 이메일
5. 사용자에게 성공 메시지 반환

**참고**: 이메일 발송 실패는 전체 문의 접수 프로세스에 영향을 주지 않습니다.
