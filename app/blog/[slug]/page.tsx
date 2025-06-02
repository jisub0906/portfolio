// app/blog/[slug]/page.tsx - 개별 블로그 게시물 상세 페이지

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import BlogDetailClient from "@/components/features/blog/BlogDetailClient";
import PostNavigation from "@/components/features/blog/PostNavigation";
import Icon from "@/components/common/Icon";
import { Badge } from "@/components/ui/badge";
import { createStaticClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// 정적 파라미터 생성
export async function generateStaticParams() {
  try {
    const supabase = createStaticClient();
    const { data: posts } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select("slug")
      .eq("is_published", true);

    return posts?.map((post) => ({ slug: post.slug })) || [];
  } catch (error) {
    console.error("정적 파라미터 생성 오류:", error);
    return [];
  }
}

// 동적 메타데이터 생성
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const supabase = createStaticClient();
    const { data: currentPost, error: currentPostError } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .eq("slug", resolvedParams.slug)
      .eq("is_published", true)
      .single();

    if (currentPostError || !currentPost) {
      return {
        title: "게시물을 찾을 수 없습니다 | 지섭의 블로그",
        description: "요청하신 블로그 게시물을 찾을 수 없습니다.",
      };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${currentPost.title} | 지섭의 블로그`,
      description: currentPost.summary || currentPost.title,
      openGraph: {
        title: currentPost.title,
        description: currentPost.summary || currentPost.title,
        images: currentPost.thumbnail_url
          ? [currentPost.thumbnail_url, ...previousImages]
          : ["/default-og-image.png", ...previousImages],
        type: "article",
        publishedTime: currentPost.published_at || undefined,
        authors: ["JISUB"],
      },
      twitter: {
        card: "summary_large_image",
        title: currentPost.title,
        description: currentPost.summary || currentPost.title,
        images: currentPost.thumbnail_url
          ? [currentPost.thumbnail_url]
          : ["/default-og-image.png"],
      },
    };
  } catch (error) {
    console.error("메타데이터 생성 오류:", error);
    return {
      title: "블로그 | 지섭의 포트폴리오",
      description: "개발 경험과 기술적 통찰을 공유합니다.",
    };
  }
}

// 블로그 게시물 상세 페이지 컴포넌트
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const resolvedParams = await params;
    const supabase = createStaticClient();

    // 현재 게시물 조회
    const { data: currentPost, error: currentPostError } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .eq("slug", resolvedParams.slug)
      .eq("is_published", true)
      .single();

    if (currentPostError || !currentPost) {
      console.error("게시물 조회 오류:", currentPostError);
      notFound();
    }

    // 이전 게시물 조회 (현재 게시물보다 이전에 발행된 것 중 가장 최신)
    const { data: previousPost } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select("title, slug")
      .eq("is_published", true)
      .lt("published_at", currentPost.published_at)
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    // 다음 게시물 조회 (현재 게시물보다 이후에 발행된 것 중 가장 오래된)
    const { data: nextPost } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select("title, slug")
      .eq("is_published", true)
      .gt("published_at", currentPost.published_at)
      .order("published_at", { ascending: true })
      .limit(1)
      .single();

    return (
      <article className="container mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:py-16 space-y-8">
        {/* 블로그 목록으로 돌아가기 링크 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
          aria-label="블로그 목록으로 돌아가기"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" aria-hidden="true" />
          블로그 홈
        </Link>

        {/* 게시물 헤더 */}
        <header className="space-y-4">
          {/* 카테고리 배지 */}
          {currentPost.blog_categories?.name && (
            <Link href={`/blog?category=${currentPost.blog_categories.slug}`}>
              <Badge
                variant="secondary"
                className="mb-3 hover:bg-muted cursor-pointer transition-colors"
              >
                {currentPost.blog_categories.name}
              </Badge>
            </Link>
          )}

          {/* 게시물 제목 */}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-foreground md:text-4xl lg:text-5xl">
            {currentPost.title}
          </h1>

          {/* 발행일 및 태그 */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={currentPost.published_at || undefined}>
              {formatDate(currentPost.published_at)}
            </time>
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="flex items-center gap-1" aria-label="태그">
                <Icon name="Circle" className="inline-block h-2 w-2" aria-hidden="true" />
                <span>{currentPost.tags.join(", ")}</span>
              </div>
            )}
          </div>
        </header>

        {/* 게시물 대표 이미지 */}
        {currentPost.thumbnail_url && (
          <figure className="relative my-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src={currentPost.thumbnail_url}
              alt={`${currentPost.title} 썸네일 이미지`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
            />
          </figure>
        )}

        {/* 블로그 상세 클라이언트 컴포넌트 */}
        <BlogDetailClient
          post={{
            id: currentPost.id,
            title: currentPost.title,
            slug: currentPost.slug,
            content_markdown: currentPost.content_markdown,
          }}
        />

        {/* 이전/다음 글 네비게이션 */}
        <PostNavigation
          previousPost={previousPost || null}
          nextPost={nextPost || null}
          className="mt-12"
        />
      </article>
    );
  } catch (error) {
    console.error("블로그 페이지 오류:", error);
    notFound();
  }
} 