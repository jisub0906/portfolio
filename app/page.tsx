import type { Metadata } from "next";
import HeroSection from "@/components/features/home/HeroSection";
import FeaturedProjectsSection from "@/components/features/home/FeaturedProjectsSection";
import RecentBlogPostsSection from "@/components/features/home/RecentBlogPostsSection";

export const metadata: Metadata = {
  title: "지섭의 포트폴리오 | 풀스택 개발자",
  description: "풀스택 개발자 지섭의 기술, 프로젝트, 그리고 생각을 공유하는 공간입니다. 최신 웹 기술과 다양한 개발 경험을 확인해보세요.",
  keywords: ["포트폴리오", "풀스택 개발자", "웹 개발", "React", "Next.js", "TypeScript", "프로젝트"],
  openGraph: {
    title: "지섭의 포트폴리오 | 풀스택 개발자",
    description: "풀스택 개발자 지섭의 기술, 프로젝트, 그리고 생각을 공유하는 공간입니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "지섭의 포트폴리오 | 풀스택 개발자",
    description: "풀스택 개발자 지섭의 기술, 프로젝트, 그리고 생각을 공유하는 공간입니다.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <RecentBlogPostsSection />
    </>
  );
}
