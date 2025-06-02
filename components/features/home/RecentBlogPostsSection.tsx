// components/features/home/RecentBlogPostsSection.tsx - 홈페이지 최근 블로그 게시물 섹션

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/common/Icon";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

// 쿼리에서 선택한 필드만 포함하는 타입 정의
type BlogPostPreview = {
  title: string;
  slug: string;
  summary: string | null;
  published_at: string | null;
  category_id: string | null;
  blog_categories: {
    name: string;
  } | null;
};

export default async function RecentBlogPostsSection() {
  let posts: BlogPostPreview[] = [];

  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .schema("portfolio")
      .from("blog_posts")
      .select(`
        title,
        slug,
        summary,
        published_at,
        category_id,
        blog_categories (
          name
        )
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("블로그 게시물 조회 오류:", error);
      return null;
    }

    posts = data || [];
  } catch (error) {
    console.error("블로그 게시물 페칭 중 오류 발생:", error);
    return null;
  }

  // 게시물이 없는 경우 섹션을 숨김
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto py-16 md:py-20 lg:py-24">
      {/* 섹션 제목 영역 */}
      <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          최신 글
        </h2>
        <Link href="/blog">
          <Button variant="outline" className="mt-4 sm:mt-0">
            블로그 전체 보기
            <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 게시물 목록 그리드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                {/* 카테고리 배지 */}
                {post.blog_categories?.name && (
                  <Badge variant="secondary" className="mb-2 w-fit">
                    {post.blog_categories.name}
                  </Badge>
                )}
                {/* 게시물 제목 */}
                <CardTitle className="text-lg font-semibold leading-snug line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              {/* 게시물 요약 */}
              <CardContent className="flex-grow py-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.summary || "게시물 요약이 없습니다."}
                </p>
              </CardContent>

              {/* 발행일 */}
              <CardFooter>
                <time 
                  dateTime={post.published_at || undefined} 
                  className="text-xs text-muted-foreground"
                >
                  {formatDate(post.published_at)}
                </time>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
} 