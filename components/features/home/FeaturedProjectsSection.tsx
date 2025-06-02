// components/features/home/FeaturedProjectsSection.tsx - 홈페이지 주요 프로젝트 섹션

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { createClient } from "@/lib/supabase/server";

// 실제로 select하는 필드만 포함하는 타입 정의
type FeaturedProject = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  thumbnail_url: string | null;
};

interface FeaturedProjectsSectionProps {
  className?: string;
}

export default async function FeaturedProjectsSection({ className }: FeaturedProjectsSectionProps) {
  let projects: FeaturedProject[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("portfolio")
      .from("projects")
      .select("id, name, slug, summary, thumbnail_url")
      .eq("is_featured", true)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("주요 프로젝트 조회 중 오류 발생:", error);
      return null;
    }

    projects = data || [];
  } catch (error) {
    console.error("주요 프로젝트 데이터 페칭 실패:", error);
    return null;
  }

  // 주요 프로젝트가 없는 경우 섹션을 렌더링하지 않음
  if (projects.length === 0) {
    return null;
  }

  return (
    <section 
      className={`container mx-auto py-16 md:py-20 lg:py-24 ${className || ""}`}
      aria-label="주요 프로젝트 소개"
    >
      {/* 섹션 제목 영역 */}
      <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          주요 프로젝트
        </h2>
        <Link href="/projects">
          <Button variant="outline" className="mt-4 sm:mt-0">
            모든 프로젝트 보기
            <Icon name="Search" className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 프로젝트 목록 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link 
            href={`/projects/${project.slug}`} 
            key={project.slug}
            aria-label={`${project.name} 프로젝트 상세 보기`}
          >
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
              {/* 프로젝트 썸네일 */}
              {project.thumbnail_url ? (
                <Image
                  src={project.thumbnail_url}
                  alt={`${project.name} 프로젝트 썸네일`}
                  width={500}
                  height={281}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div 
                  className="aspect-video w-full bg-muted flex items-center justify-center"
                  role="img"
                  aria-label={`${project.name} 프로젝트 이미지 없음`}
                >
                  <Icon name="CodeXml" className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              {/* 카드 헤더 */}
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {project.name}
                </CardTitle>
              </CardHeader>

              {/* 카드 콘텐츠 */}
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.summary || "프로젝트 요약이 없습니다."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
} 