import AboutPageClient from "../../components/about/AboutPageClient";
import { Experience, Education } from "@/components/about/AboutMeView";

const aboutMeData = {
  profileImageUrl: "/images/profile.png",
  name: "지섭",
  introduction: [
    "안녕하세요! 저는 프론트엔드와 백엔드 모두에 관심이 많은 풀스택 개발자 지섭입니다.",
    "Next.js, TypeScript, Tailwind CSS, Supabase 등 최신 웹 기술을 활용하여 사용자 경험과 성능을 모두 잡는 것을 목표로 합니다.",
    "문제 해결과 새로운 도전을 즐기며, 협업과 소통을 중시합니다.",
  ],
  experiences: [
    {
      company: "프리렌서",
      role: "Fullstack Developer",
      period: "2025.07 - Present",
      description: "- Next.js 기반 대규모 SaaS 서비스 UI 개발\n- shadcn/ui, Framer Motion을 활용한 인터랙티브 컴포넌트 구현\n- Supabase 연동 및 데이터 시각화"
    },
    // {
    //   company: "OpenSource Community",
    //   role: "Fullstack Contributor",
    //   period: "2022.06 - 2023.02",
    //   description: "- 오픈소스 프로젝트 기여 및 코드 리뷰\n- REST API 및 인증 시스템 설계/구현\n- CI/CD 파이프라인 자동화 경험"
    // },
  ] as Experience[],
  educations: [
    {
      institution: "ICT 인재개발원",
      degree: "Web Developer Course",
      period: "2024.12 - 2025.07"
    },
    // {
    //   institution: "코드스테이츠",
    //   degree: "Software Engineering Bootcamp",
    //   period: "2021.01 - 2021.07"
    // },
  ] as Education[],
  resumeUrl: "/resume.pdf",
};

export default function AboutPage() {
  return <AboutPageClient aboutMeData={aboutMeData} />;
} 