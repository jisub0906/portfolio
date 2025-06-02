// app/projects/[slug]/page.tsx - 개별 프로젝트 상세 페이지

import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetailClient from "@/components/features/projects/ProjectDetailClient";
import Icon from "@/components/common/Icon";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

/**
 * 빌드 시점에 모든 공개된 프로젝트의 정적 페이지를 미리 생성합니다.
 */
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .schema("portfolio")
      .from("projects")
      .select("slug")
      .eq("is_published", true);

    if (error) {
      console.error("generateStaticParams 오류:", error);
      return [];
    }

    return projects?.map((project) => ({
      slug: project.slug,
    })) || [];
  } catch (error) {
    console.error("generateStaticParams 예외:", error);
    return [];
  }
}

/**
 * 각 프로젝트 페이지에 대한 동적 메타데이터를 생성합니다.
 */
export async function generateMetadata(
  { params }: ProjectPageProps
): Promise<Metadata> {
  try {
    const supabase = await createClient();
    const { data: project, error } = await supabase
      .schema("portfolio")
      .from("projects")
      .select("name, summary, main_image_url, slug")
      .eq("slug", params.slug)
      .eq("is_published", true)
      .single();

    if (error || !project) {
      return {
        title: "프로젝트를 찾을 수 없음 | 지섭의 포트폴리오",
        description: "요청하신 프로젝트를 찾을 수 없습니다.",
      };
    }

    const title = `${project.name} | 지섭의 포트폴리오`;
    const description = project.summary || `${project.name} 프로젝트의 상세 정보입니다.`;
    const imageUrl = project.main_image_url || "/images/default-og-image.jpg";
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.jisub.dev"}/projects/${project.slug}`;

    return {
      title,
      description,
      openGraph: {
        title: project.name,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: project.name,
          },
        ],
        type: "article",
        url,
      },
      twitter: {
        card: "summary_large_image",
        title: project.name,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error("generateMetadata 오류:", error);
    return {
      title: "프로젝트 | 지섭의 포트폴리오",
      description: "프로젝트 상세 정보를 확인해보세요.",
    };
  }
}

/**
 * 개별 프로젝트 상세 페이지 컴포넌트
 */
export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  try {
    const supabase = await createClient();
    const { data: project, error } = await supabase
      .schema("portfolio")
      .from("projects")
      .select("*")
      .eq("slug", params.slug)
      .eq("is_published", true)
      .single();

    // 프로젝트가 없거나 게시되지 않은 경우 404 페이지로 전환
    if (error || !project || !project.is_published) {
      notFound();
    }

    return (
      <article className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* 목록으로 돌아가기 링크 */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          프로젝트 목록으로 돌아가기
        </Link>

        {/* 프로젝트 헤더 */}
        <header className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {project.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {project.published_at && (
              <span>게시일: {formatDate(project.published_at)}</span>
            )}
            {project.start_date && (
              <span>시작일: {formatDate(project.start_date)}</span>
            )}
            {project.end_date && (
              <span>완료일: {formatDate(project.end_date)}</span>
            )}
            {project.is_featured && (
              <span className="inline-flex items-center gap-1">
                <Icon name="Star" className="h-3 w-3" />
                추천 프로젝트
              </span>
            )}
          </div>

          {/* 프로젝트 요약 */}
          {project.summary && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.summary}
            </p>
          )}
        </header>

        {/* 구분선 */}
        <hr className="my-6" />

        {/* 프로젝트 상세 내용 */}
        <ProjectDetailClient project={project} />
      </article>
    );
  } catch (error) {
    console.error("프로젝트 상세 페이지 오류:", error);
    notFound();
  }
} 