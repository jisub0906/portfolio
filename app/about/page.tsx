// app/about/page.tsx - 자기소개 페이지

import Link from "next/link";
import { Metadata } from "next";
import PageTitle from "@/components/common/PageTitle";
import ProfileImage from "@/components/features/about/ProfileImage";
import AboutContent from "@/components/features/about/AboutContent";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { createStaticClient } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase_portfolio";

/**
 * Supabase에서 자기소개 데이터를 가져오는 함수
 */
async function fetchAboutData(): Promise<Tables<"about_me"> | null> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .schema("portfolio")
      .from("about_me")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("자기소개 데이터 조회 오류:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("자기소개 데이터 페칭 중 예외 발생:", error);
    return null;
  }
}

// 동적 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await fetchAboutData();
  
  const defaultDescription = "개발자 지섭의 개발 여정, 경험, 가치관, 그리고 기술에 대한 열정을 소개합니다. 저에 대해 더 자세히 알아보세요.";
  
  return {
    title: "자기소개 | 지섭의 포트폴리오",
    description: defaultDescription,
    keywords: ["개발자", "지섭", "JISUB", "포트폴리오", "자기소개", "프론트엔드", "백엔드", "풀스택"],
    authors: [{ name: "JISUB" }],
    openGraph: {
      title: "자기소개 | 지섭의 포트폴리오",
      description: defaultDescription,
      type: "profile",
      siteName: "지섭의 포트폴리오",
      locale: "ko_KR",
      images: aboutData?.profile_image_url ? [
        {
          url: aboutData.profile_image_url,
          width: 1200,
          height: 630,
          alt: "JISUB 프로필 사진",
        }
      ] : [
        {
          url: "/images/default-og-image.jpg", // 기본 OG 이미지 경로
          width: 1200,
          height: 630,
          alt: "지섭의 포트폴리오",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "자기소개 | 지섭의 포트폴리오",
      description: defaultDescription,
      images: aboutData?.profile_image_url ? [aboutData.profile_image_url] : ["/images/default-og-image.jpg"],
    },
  };
}

/**
 * 자기소개 페이지 컴포넌트 (서버 컴포넌트)
 */
export default async function AboutPage() {
  const aboutData = await fetchAboutData();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16 min-h-screen">
      <PageTitle 
        title="About Me" 
        subtitle="저의 이야기와 개발에 대한 생각을 공유합니다." 
      />
      
      <div className="mt-12">
        {!aboutData ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-4">
                자기소개 정보가 준비 중입니다.
              </p>
              <p className="text-sm text-muted-foreground">
                곧 업데이트하겠습니다.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12 items-start">
            {/* 프로필 이미지 및 정보 영역 */}
            <div className="lg:col-span-1 flex flex-col items-center text-center lg:items-stretch lg:text-left space-y-6 lg:sticky lg:top-24">
              {/* 프로필 이미지 */}
              <div className="w-full max-w-[240px] mx-auto lg:max-w-none">
                <ProfileImage 
                  imageUrl={aboutData.profile_image_url} 
                  altText="JISUB 프로필 사진" 
                  size={240} 
                />
              </div>
              
              {/* 이력서 다운로드 버튼 */}
              {aboutData.resume_pdf_url && (
                <div className="w-full max-w-[240px] mx-auto lg:max-w-none">
                  <Link 
                    href={aboutData.resume_pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download 
                    className="block"
                  >
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="w-full h-12 transition-all duration-300"
                    >
                      <Icon name="Download" className="mr-3 h-5 w-5" />
                      이력서 다운로드
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Quick Info 카드 */}
              <div className="w-full max-w-[240px] mx-auto lg:max-w-none p-6 bg-muted/50 rounded-lg border border-border/50">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Info" className="w-5 h-5 text-primary" />
                  Quick Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-md bg-background/50 border border-border/30">
                    <span className="text-lg">🎯</span>
                    <span className="text-muted-foreground font-medium">풀스택 개발자</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-md bg-background/50 border border-border/30">
                    <span className="text-lg">💻</span>
                    <span className="text-muted-foreground font-medium">React & Next.js 전문</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-md bg-background/50 border border-border/30">
                    <span className="text-lg">🚀</span>
                    <span className="text-muted-foreground font-medium">사용자 경험 중심</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 자기소개 본문 영역 */}
            <div className="lg:col-span-4">
              <AboutContent contentMarkdown={aboutData.content_markdown} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 