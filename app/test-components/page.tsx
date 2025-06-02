// app/test-components/page.tsx - shadcn/ui 컴포넌트 테스트 페이지

import { Button } from "@/components/ui/button";
import { ProjectWithTechStacks, Tables } from "@/types/supabase_portfolio";
import ProjectList from "@/components/features/projects/ProjectList";
import ProjectDetailClient from "@/components/features/projects/ProjectDetailClient";
import Link from "next/link";
import { TechCategorySection, TechStackItem } from "@/components/features/techstack";
import type { TechStackItemType } from "@/components/features/techstack";

// ClientOnly 테스트를 위한 간단한 브라우저 전용 컴포넌트
function SimpleBrowserComponent() {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
      <h4 className="font-semibold text-blue-900 dark:text-blue-100">
        🌐 클라이언트 전용 컴포넌트
      </h4>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        현재 URL: {typeof window !== 'undefined' ? window.location.href : 'SSR 중...'}
      </p>
      <p className="text-sm text-blue-700 dark:text-blue-300">
        User Agent: {typeof navigator !== `undefined` ? navigator.userAgent.slice(0, 50) + `...` : `SSR 중...`}
      </p>
    </div>
  );
}

// ProjectCard 테스트용 샘플 데이터
const sampleProjects: ProjectWithTechStacks[] = [
  {
    id: "1",
    name: "포트폴리오 웹사이트",
    slug: "portfolio-website",
    summary: "Next.js와 Supabase를 활용한 개인 포트폴리오 웹사이트입니다. 반응형 디자인과 다크 모드를 지원하며, 블로그 기능과 프로젝트 쇼케이스를 포함합니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://portfolio.example.com",
    github_repo_url: "https://github.com/user/portfolio",
    start_date: "2024-01-01",
    end_date: "2024-03-01",
    is_featured: true,
    is_published: true,
    published_at: "2024-03-01T00:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z",
    tech_stacks: [
      { id: "1", name: "Next.js", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 5, summary: null, created_at: "", updated_at: "" },
      { id: "2", name: "TypeScript", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 5, summary: null, created_at: "", updated_at: "" },
      { id: "3", name: "Supabase", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 4, summary: null, created_at: "", updated_at: "" },
      { id: "4", name: "Tailwind CSS", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 5, summary: null, created_at: "", updated_at: "" },
    ]
  },
  {
    id: "2",
    name: "E-commerce 플랫폼",
    slug: "ecommerce-platform",
    summary: "React와 Node.js로 구축한 풀스택 전자상거래 플랫폼입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: null, // 썸네일 없는 경우 테스트
    screenshots_urls: null,
    live_demo_url: null,
    github_repo_url: "https://github.com/user/ecommerce",
    start_date: "2023-06-01",
    end_date: "2023-12-01",
    is_featured: false,
    is_published: true,
    published_at: "2023-12-01T00:00:00Z",
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2023-12-01T00:00:00Z",
    tech_stacks: [
      { id: "5", name: "React", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 5, summary: null, created_at: "", updated_at: "" },
      { id: "6", name: "Node.js", category_id: null, icon_svg_content: null, icon_url: null, proficiency_level: 4, summary: null, created_at: "", updated_at: "" },
    ]
  },
  {
    id: "3",
    name: "모바일 앱 프로젝트",
    slug: "mobile-app-project",
    summary: null, // 요약 없는 경우 테스트
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    screenshots_urls: null,
    live_demo_url: null,
    github_repo_url: null,
    start_date: "2023-01-01",
    end_date: "2023-05-01",
    is_featured: true,
    is_published: true,
    published_at: "2023-05-01T00:00:00Z",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-05-01T00:00:00Z",
    tech_stacks: [] // 기술 스택 없는 경우 테스트
  }
];

// 테스트용 더미 데이터
const mockProjects: ProjectWithTechStacks[] = [
  {
    id: "1",
    name: "포트폴리오 웹사이트",
    slug: "portfolio-website",
    summary: "Next.js와 Supabase를 활용한 개인 포트폴리오 웹사이트입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://example.com",
    github_repo_url: "https://github.com/example/portfolio",
    start_date: null,
    end_date: null,
    is_featured: true,
    is_published: true,
    published_at: "2024-01-01T00:00:00Z",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    tech_stacks: [
      {
        id: "1",
        name: "Next.js",
        category_id: "frontend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "React 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "TypeScript",
        category_id: "language",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "타입 안전한 JavaScript",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "E-커머스 플랫폼",
    slug: "ecommerce-platform",
    summary: "React와 Node.js로 구축한 온라인 쇼핑몰 플랫폼입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://example.com/shop",
    github_repo_url: "https://github.com/example/ecommerce",
    start_date: "2023-09-01",
    end_date: "2023-12-01",
    is_featured: false,
    is_published: true,
    published_at: "2023-12-01T00:00:00Z",
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2023-12-01T00:00:00Z",
    tech_stacks: [
      {
        id: "4",
        name: "React",
        category_id: "frontend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 5,
        summary: "사용자 인터페이스 구축을 위한 JavaScript 라이브러리",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "5",
        name: "Node.js",
        category_id: "backend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "JavaScript 런타임 환경",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "6",
        name: "MongoDB",
        category_id: "database",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "NoSQL 문서 데이터베이스",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "모바일 앱",
    slug: "mobile-app",
    summary: "React Native로 개발한 크로스 플랫폼 모바일 애플리케이션입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: null,
    github_repo_url: "https://github.com/example/mobile-app",
    start_date: "2023-06-01",
    end_date: "2023-08-01",
    is_featured: true,
    is_published: true,
    published_at: "2023-08-01T00:00:00Z",
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2023-08-01T00:00:00Z",
    tech_stacks: [
      {
        id: "7",
        name: "React Native",
        category_id: "mobile",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "크로스 플랫폼 모바일 앱 개발 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "TypeScript",
        category_id: "language",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "타입 안전성을 제공하는 JavaScript 확장",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "8",
        name: "Firebase",
        category_id: "backend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "Google의 모바일 및 웹 애플리케이션 개발 플랫폼",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "데이터 분석 대시보드",
    slug: "data-dashboard",
    summary: "Python과 Django를 활용한 실시간 데이터 분석 대시보드입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://example.com/dashboard",
    github_repo_url: "https://github.com/example/dashboard",
    start_date: "2023-03-01",
    end_date: "2023-05-01",
    is_featured: false,
    is_published: true,
    published_at: "2023-05-01T00:00:00Z",
    created_at: "2023-03-01T00:00:00Z",
    updated_at: "2023-05-01T00:00:00Z",
    tech_stacks: [
      {
        id: "9",
        name: "Python",
        category_id: "language",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "다목적 프로그래밍 언어",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "10",
        name: "Django",
        category_id: "backend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "Python 웹 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "11",
        name: "PostgreSQL",
        category_id: "database",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "오픈소스 관계형 데이터베이스",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "5",
    name: "블로그 플랫폼",
    slug: "blog-platform",
    summary: "Vue.js와 Express.js로 구축한 개인 블로그 플랫폼입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://example.com/blog",
    github_repo_url: "https://github.com/example/blog",
    start_date: "2022-12-01",
    end_date: "2023-02-01",
    is_featured: false,
    is_published: true,
    published_at: "2023-02-01T00:00:00Z",
    created_at: "2022-12-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
    tech_stacks: [
      {
        id: "12",
        name: "Vue.js",
        category_id: "frontend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "프로그레시브 JavaScript 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "13",
        name: "Express.js",
        category_id: "backend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "Node.js 웹 애플리케이션 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "6",
        name: "MongoDB",
        category_id: "database",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "NoSQL 문서 데이터베이스",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "6",
    name: "게임 개발 프로젝트",
    slug: "game-project",
    summary: "Unity와 C#을 사용한 2D 인디 게임 개발 프로젝트입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: null,
    github_repo_url: "https://github.com/example/game",
    start_date: "2022-09-01",
    end_date: "2022-11-01",
    is_featured: true,
    is_published: true,
    published_at: "2022-11-01T00:00:00Z",
    created_at: "2022-09-01T00:00:00Z",
    updated_at: "2022-11-01T00:00:00Z",
    tech_stacks: [
      {
        id: "14",
        name: "Unity",
        category_id: "game",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 2,
        summary: "크로스 플랫폼 게임 엔진",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "15",
        name: "C#",
        category_id: "language",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "Microsoft에서 개발한 객체지향 프로그래밍 언어",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "7",
    name: "AI 챗봇",
    slug: "ai-chatbot",
    summary: "Python과 TensorFlow를 활용한 자연어 처리 챗봇입니다.",
    description_markdown: "상세 설명...",
    role_description_markdown: null,
    tech_stack_description_markdown: null,
    results_retrospective_markdown: null,
    main_image_url: null,
    thumbnail_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    screenshots_urls: null,
    live_demo_url: "https://example.com/chatbot",
    github_repo_url: "https://github.com/example/chatbot",
    start_date: "2022-06-01",
    end_date: "2022-08-01",
    is_featured: false,
    is_published: true,
    published_at: "2022-08-01T00:00:00Z",
    created_at: "2022-06-01T00:00:00Z",
    updated_at: "2022-08-01T00:00:00Z",
    tech_stacks: [
      {
        id: "9",
        name: "Python",
        category_id: "language",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 4,
        summary: "다목적 프로그래밍 언어",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "16",
        name: "TensorFlow",
        category_id: "ai",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 2,
        summary: "머신러닝 및 딥러닝 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "17",
        name: "Flask",
        category_id: "backend",
        icon_svg_content: null,
        icon_url: null,
        proficiency_level: 3,
        summary: "Python 마이크로 웹 프레임워크",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ],
  },
];

// ProjectDetailClient 테스트용 더미 프로젝트
const mockDetailProject: Tables<"projects"> = {
  id: "detail-test",
  name: "포트폴리오 웹사이트 상세",
  slug: "portfolio-detail",
  summary: "Next.js와 Supabase를 활용한 개인 포트폴리오 웹사이트의 상세 정보입니다.",
  description_markdown: `# 프로젝트 개요

이 프로젝트는 **Next.js**와 **Supabase**를 활용하여 개발한 개인 포트폴리오 웹사이트입니다.

## 주요 기능
- 프로젝트 쇼케이스
- 블로그 시스템
- 연락처 폼
- 관리자 대시보드

### 기술적 특징
- 서버 사이드 렌더링 (SSR)
- 타입 안전성 (TypeScript)
- 반응형 디자인
- SEO 최적화`,
  role_description_markdown: `## 나의 역할

이 프로젝트에서 **풀스택 개발자**로서 다음과 같은 역할을 담당했습니다:

### 프론트엔드 개발
- React/Next.js를 사용한 UI 컴포넌트 개발
- Tailwind CSS를 활용한 반응형 디자인 구현
- TypeScript를 통한 타입 안전성 확보

### 백엔드 개발
- Supabase를 활용한 데이터베이스 설계
- API 엔드포인트 구현
- 인증 시스템 구축

### DevOps
- Vercel을 통한 배포 자동화
- GitHub Actions CI/CD 파이프라인 구축`,
  tech_stack_description_markdown: `## 사용 기술

### 프론트엔드
- **Next.js 15**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성을 위한 정적 타입 언어
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트 라이브러리

### 백엔드
- **Supabase**: PostgreSQL 기반 BaaS 플랫폼
- **Row Level Security**: 데이터 보안을 위한 정책 기반 접근 제어

### 개발 도구
- **ESLint & Prettier**: 코드 품질 및 일관성 유지
- **Husky**: Git hooks를 통한 코드 품질 검증
- **GitHub**: 버전 관리 및 협업

### 배포 및 호스팅
- **Vercel**: 프론트엔드 배포 플랫폼
- **Supabase**: 백엔드 서비스 호스팅`,
  results_retrospective_markdown: `## 결과 및 회고

### 프로젝트 성과
- ✅ 반응형 디자인으로 모든 디바이스에서 최적화된 사용자 경험 제공
- ✅ TypeScript 도입으로 런타임 오류 90% 감소
- ✅ Lighthouse 성능 점수 95점 이상 달성
- ✅ SEO 최적화로 검색 엔진 노출도 향상

### 기술적 성취
- **성능 최적화**: Next.js의 Image 컴포넌트와 동적 임포트를 활용하여 초기 로딩 시간 40% 단축
- **접근성 개선**: WCAG 2.1 AA 레벨 준수로 모든 사용자가 접근 가능한 웹사이트 구현
- **보안 강화**: Supabase RLS 정책을 통한 데이터 보안 강화

### 배운 점
1. **서버 컴포넌트의 활용**: Next.js 13+ App Router의 서버 컴포넌트를 통해 성능과 SEO를 동시에 개선할 수 있었습니다.
2. **타입 안전성의 중요성**: TypeScript 도입으로 개발 생산성과 코드 품질이 크게 향상되었습니다.
3. **사용자 중심 설계**: 실제 사용자 피드백을 바탕으로 UX를 지속적으로 개선하는 것의 중요성을 깨달았습니다.

### 향후 개선 계획
- [ ] 다국어 지원 (i18n) 추가
- [ ] 다크 모드 테마 구현
- [ ] 프로젝트 검색 및 필터링 기능 고도화
- [ ] 실시간 알림 시스템 도입`,
  main_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
  thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  screenshots_urls: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop",
  ],
  live_demo_url: "https://portfolio-demo.vercel.app",
  github_repo_url: "https://github.com/jisub/portfolio",
  start_date: "2024-01-01",
  end_date: "2024-03-01",
  is_featured: true,
  is_published: true,
  published_at: "2024-03-01T00:00:00Z",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-03-01T00:00:00Z",
};

// 테스트용 더미 데이터 (숙련도 포함)
const frontendTechs: TechStackItemType[] = [
  {
    id: "1",
    name: "React",
    icon_svg_content: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89-1.87-.84-1.87-1.89.84-1.89 1.87-1.89z" fill="#61DAFB"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#61DAFB" stroke-width="2" fill="none"/>
    </svg>`,
    summary: "사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리",
    proficiency_level: 5,
  },
  {
    id: "2",
    name: "Next.js",
    icon_url: "https://nextjs.org/static/favicon/favicon-32x32.png",
    summary: "React 기반의 풀스택 웹 프레임워크",
    proficiency_level: 4,
  },
  {
    id: "3",
    name: "TypeScript",
    summary: "JavaScript에 정적 타입을 추가한 프로그래밍 언어",
    proficiency_level: 4,
  },
  {
    id: "4",
    name: "Tailwind CSS",
    summary: "유틸리티 우선 CSS 프레임워크",
    proficiency_level: 5,
  },
  {
    id: "5",
    name: "Vue.js",
    summary: "프로그레시브 JavaScript 프레임워크",
    proficiency_level: 3,
  },
  {
    id: "6",
    name: "Angular",
    summary: "TypeScript 기반 웹 애플리케이션 프레임워크",
    proficiency_level: 2,
  },
];

const backendTechs: TechStackItemType[] = [
  {
    id: "7",
    name: "Node.js",
    summary: "JavaScript 런타임 환경",
    proficiency_level: 4,
  },
  {
    id: "8",
    name: "Supabase",
    summary: "오픈소스 Firebase 대안",
    proficiency_level: 4,
  },
  {
    id: "9",
    name: "PostgreSQL",
    summary: "고급 오픈소스 관계형 데이터베이스",
    proficiency_level: 3,
  },
  {
    id: "10",
    name: "Python",
    summary: "다목적 프로그래밍 언어",
    proficiency_level: 3,
  },
  {
    id: "11",
    name: "Django",
    summary: "Python 웹 프레임워크",
    proficiency_level: 2,
  },
];

export default function TestComponentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <div>
        <h1 className="text-3xl font-bold mb-8">컴포넌트 테스트 페이지</h1>
        
        {/* 프로젝트 상세 페이지 테스트 링크 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">프로젝트 상세 페이지 테스트</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              실제 프로젝트 상세 페이지를 테스트하려면 아래 링크를 클릭하세요:
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/projects/portfolio-website">
                  포트폴리오 웹사이트 상세 페이지
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects/ecommerce-platform">
                  E-commerce 플랫폼 상세 페이지
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects/mobile-app-project">
                  모바일 앱 프로젝트 상세 페이지
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              * 실제 데이터가 없으면 404 페이지가 표시됩니다.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">ProjectList 컴포넌트</h2>
          <ProjectList initialProjects={mockProjects} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">ProjectDetailClient 컴포넌트</h2>
          <ProjectDetailClient project={mockDetailProject} />
        </section>
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          🚀 업그레이드된 기술 스택 컴포넌트 테스트
        </h1>
        <p className="text-lg text-muted-foreground">
          숙련도 표시, 다양한 변형, 향상된 UI/UX를 포함한 TechCategorySection과 TechStackItem 컴포넌트
        </p>
      </div>

      {/* 기본 변형 (숙련도 없음) */}
      <TechCategorySection
        categoryName="Frontend Technologies (기본)"
        techStacks={frontendTechs}
      />

      <TechCategorySection
        categoryName="Backend Technologies (기본)"
        techStacks={backendTechs}
      />

      {/* 숙련도 표시 변형 */}
      <TechCategorySection
        categoryName="Frontend Technologies (숙련도 표시)"
        techStacks={frontendTechs}
        showProficiency={true}
      />

      <TechCategorySection
        categoryName="Backend Technologies (숙련도 표시)"
        techStacks={backendTechs}
        showProficiency={true}
      />

      {/* Compact 변형 */}
      <TechCategorySection
        categoryName="Frontend Technologies (Compact 변형)"
        techStacks={frontendTechs}
        variant="compact"
        showProficiency={true}
      />

      {/* Detailed 변형 */}
      <TechCategorySection
        categoryName="Backend Technologies (Detailed 변형)"
        techStacks={backendTechs}
        variant="detailed"
        showProficiency={true}
      />

      {/* 크기별 테스트 */}
      <TechCategorySection
        categoryName="Small Size (숙련도 포함)"
        techStacks={frontendTechs.slice(0, 4)}
        itemSize="sm"
        showProficiency={true}
      />

      <TechCategorySection
        categoryName="Large Size (Detailed 변형)"
        techStacks={backendTechs.slice(0, 3)}
        itemSize="lg"
        variant="detailed"
        showProficiency={true}
      />

      {/* 개별 아이템 테스트 */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-foreground border-b pb-3">
          개별 TechStackItem 테스트 (업그레이드된 기능)
        </h2>
        
        {/* 크기별 테스트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Small Size</h3>
            <div className="flex flex-wrap gap-4">
              {frontendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  size="sm"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medium Size</h3>
            <div className="flex flex-wrap gap-4">
              {frontendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  size="md"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Large Size</h3>
            <div className="flex flex-wrap gap-4">
              {frontendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  size="lg"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 변형별 테스트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default 변형</h3>
            <div className="space-y-4">
              {backendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  variant="default"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Compact 변형</h3>
            <div className="space-y-4">
              {backendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  variant="compact"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Detailed 변형</h3>
            <div className="space-y-4">
              {backendTechs.slice(0, 3).map((tech) => (
                <TechStackItem
                  key={tech.id}
                  tech={tech}
                  variant="detailed"
                  showProficiency={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 숙련도별 테스트 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">숙련도별 표시 테스트</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {frontendTechs.map((tech) => (
              <TechStackItem
                key={tech.id}
                tech={tech}
                showProficiency={true}
                variant="detailed"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 빈 상태 테스트 */}
      <TechCategorySection
        categoryName="Empty Category (Should not render)"
        techStacks={[]}
      />

      {/* 기능 설명 */}
      <section className="space-y-6 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-foreground">
          🎯 새로운 기능들
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">숙련도 표시</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 1-5 레벨 별점 시스템</li>
              <li>• 레벨별 색상 구분 (초급: 주황, 중급: 노랑, 숙련: 파랑, 전문가: 초록)</li>
              <li>• Detailed 변형에서 텍스트 뱃지 추가 표시</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">다양한 변형</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Default: 기본 호버 효과와 스케일링</li>
              <li>• Compact: 간소화된 표시 (요약 숨김)</li>
              <li>• Detailed: 테두리, 그림자, 뱃지 포함</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">향상된 디자인</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 원형 아이콘 컨테이너</li>
              <li>• 부드러운 애니메이션 효과</li>
              <li>• 반응형 그리드 레이아웃</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">보안 및 성능</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• DOMPurify를 통한 SVG 살균</li>
              <li>• React.memo를 통한 렌더링 최적화</li>
              <li>• useMemo를 통한 SVG 처리 최적화</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 