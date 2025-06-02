// app/blog/page.tsx - 블로그 목록 및 검색/필터 페이지

import { Metadata } from "next";
import BlogPostList from "@/components/features/blog/BlogPostList";
import PageTitle from "@/components/common/PageTitle";
import { createClient, createStaticClient } from "@/lib/supabase/server";
import { BlogPostWithCategory } from "@/types/supabase_portfolio";

// 페이지당 게시물 수
const ITEMS_PER_PAGE = 6;

// 페이지 Props 인터페이스
interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
}

// 문자열을 정수로 파싱하는 유틸리티 함수 (범위 검증 포함)
function parseToInt(value: string | undefined, defaultValue: number, min = 1, max?: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < min) return defaultValue;
  if (max && parsed > max) return max;
  return parsed;
}

// 검색어 이스케이프 함수 (SQL 인젝션 방지)
function escapeSearchQuery(query: string): string {
  return query.replace(/[%_\\]/g, '\\$&').trim();
}

// 동적 메타데이터 생성
export async function generateMetadata(
  { searchParams }: BlogPageProps
): Promise<Metadata> {
  const params = await searchParams;
  const category = params?.category;
  const searchQuery = params?.q;

  let title = "블로그 | 지섭의 포트폴리오";
  let description = "개발, 기술, 생각 등 다양한 주제에 대한 JISUB의 글들을 만나보세요.";

  // 카테고리가 있는 경우 카테고리명을 조회하여 제목에 추가
  if (category) {
    try {
      const supabase = createStaticClient();
      const { data: categoryData } = await supabase
        .schema("portfolio")
        .from("blog_categories")
        .select("name")
        .eq("slug", category)
        .single();

      if (categoryData) {
        title = `'${categoryData.name}' 카테고리 글 목록 | 지섭의 포트폴리오`;
        description = `${categoryData.name} 카테고리의 블로그 글들을 확인해보세요.`;
      }
    } catch (error) {
      console.error("카테고리 메타데이터 조회 오류:", error);
    }
  }

  // 검색어가 있는 경우 제목에 추가
  if (searchQuery) {
    const searchTitle = category 
      ? `'${searchQuery}' 검색 결과 (${category}) | 지섭의 포트폴리오`
      : `'${searchQuery}' 검색 결과 | 지섭의 포트폴리오`;
    title = searchTitle;
    description = `'${searchQuery}' 검색 결과를 확인해보세요.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/blog",
    },
  };
}

// 블로그 페이지 컴포넌트
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params?.category;
  const searchQuery = params?.q;
  
  try {
    const supabase = await createClient();

    // 전체 카테고리 목록 조회
    const { data: allCategoriesData, error: allCategoriesError } = await supabase
      .schema("portfolio")
      .from("blog_categories")
      .select("id, name, slug")
      .order("name", { ascending: true });

    if (allCategoriesError) {
      console.error("카테고리 조회 오류:", allCategoriesError);
      throw allCategoriesError;
    }

    // 블로그 게시물 조회 쿼리 구성 (카테고리 필터링 최적화)
    let query = supabase
      .schema("portfolio")
      .from("blog_posts")
      .select("*, category:blog_categories!inner(id, name, slug, created_at, updated_at)", { count: "exact" })
      .eq("is_published", true);

    // 카테고리 필터링 (JOIN을 통한 최적화)
    if (category) {
      query = query.eq("category.slug", category);
    }

    // 검색어 필터링 (이스케이프 처리)
    if (searchQuery) {
      const escapedQuery = escapeSearchQuery(searchQuery);
      query = query.or(
        `title.ilike.%${escapedQuery}%,summary.ilike.%${escapedQuery}%,content_markdown.ilike.%${escapedQuery}%`
      );
    }

    // 정렬
    query = query.order("published_at", { ascending: false });

    // 총 게시물 수 조회 (페이지네이션 계산용)
    const { count: totalPostsCount, error: countError } = await query;
    
    if (countError) {
      console.error("게시물 수 조회 오류:", countError);
      throw countError;
    }

    // 총 페이지 수 계산
    const totalPages = Math.ceil((totalPostsCount || 0) / ITEMS_PER_PAGE);
    
    // 페이지 번호 유효성 검증 (총 페이지 수 기반)
    const currentPage = parseToInt(params?.page, 1, 1, totalPages || 1);

    // 페이지네이션 적용
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    query = query.range(offset, offset + ITEMS_PER_PAGE - 1);

    // 데이터 조회 실행
    const { data: postsData, error: postsError } = await query;

    if (postsError) {
      console.error("게시물 조회 오류:", postsError);
      throw postsError;
    }

    // 페이지 제목 및 부제목 동적 설정
    let pageTitle = "블로그";
    let pageSubtitle = "개발, 기술, 생각 등 다양한 주제에 대한 글들을 만나보세요.";

    if (category && allCategoriesData) {
      const categoryName = allCategoriesData.find((c) => c.slug === category)?.name;
      if (categoryName) {
        pageTitle = `${categoryName} 카테고리`;
        pageSubtitle = `${categoryName} 관련 글들을 확인해보세요.`;
      }
    }

    if (searchQuery) {
      pageTitle = `'${searchQuery}' 검색 결과`;
      pageSubtitle = category 
        ? `${category} 카테고리에서 '${searchQuery}' 검색 결과입니다.`
        : `'${searchQuery}' 검색 결과입니다.`;
    }

    // BlogPostWithCategory 타입으로 변환
    const transformedPosts: BlogPostWithCategory[] = (postsData || []).map((post) => ({
      ...post,
      category: post.category || null,
    }));

    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <PageTitle title={pageTitle} subtitle={pageSubtitle} />
        <BlogPostList
          posts={transformedPosts}
          allCategories={allCategoriesData || []}
          totalPages={totalPages}
        />
      </div>
    );
  } catch (error) {
    console.error("블로그 페이지 오류:", error);
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <PageTitle title="블로그" />
        <p className="text-center text-destructive">
          블로그 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }
} 