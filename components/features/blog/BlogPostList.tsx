"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import SearchInput from "@/components/features/blog/SearchInput";
import CategoryFilter from "@/components/features/blog/CategoryFilter";
import BlogPostCard from "@/components/features/blog/BlogPostCard";
import PaginationControls from "@/components/features/blog/PaginationControls";
import { Tables, BlogPostWithCategory } from "@/types/supabase_portfolio";
import { cn } from "@/lib/utils";

// BlogPostList Props 인터페이스
interface BlogPostListProps {
  posts: BlogPostWithCategory[];
  allCategories: Array<Pick<Tables<"blog_categories">, "id" | "name" | "slug">>;
  totalPages: number;
  className?: string;
}

export default function BlogPostList({
  posts,
  allCategories,
  totalPages,
  className,
}: BlogPostListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategorySlug = searchParams.get("category") || null;
  const currentSearchQuery = searchParams.get("q") || "";

  // 카테고리 변경 핸들러
  const handleCategoryChange = (slug: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (!slug || slug === "") {
      newParams.delete("category");
    } else {
      newParams.set("category", slug);
    }
    
    // 카테고리 변경 시 1페이지로 이동
    newParams.set("page", "1");
    
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  // 현재 선택된 카테고리 이름 찾기
  const selectedCategoryName = currentCategorySlug
    ? allCategories.find((c) => c.slug === currentCategorySlug)?.name || currentCategorySlug
    : null;

  return (
    <div className={cn("space-y-8", className)}>
      {/* 상단 컨트롤 영역 */}
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
        <SearchInput 
          className="w-full md:max-w-xs" 
          placeholder="게시물 제목 또는 내용 검색..." 
        />
        <CategoryFilter 
          categories={allCategories} 
          selectedCategorySlug={currentCategorySlug} 
          onCategoryChange={handleCategoryChange} 
        />
      </div>

      {/* 결과 상태 표시 영역 */}
      {(currentSearchQuery || currentCategorySlug) && posts.length > 0 && (
        <p className="text-sm text-muted-foreground">
          &apos;{currentSearchQuery}
          {currentSearchQuery && currentCategorySlug ? " & " : ""}
          {currentCategorySlug ? `카테고리: ${selectedCategoryName}` : ""}&apos; 검색 결과: {posts.length}건
        </p>
      )}

      {/* 게시물 그리드 영역 */}
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <SearchX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {currentSearchQuery || currentCategorySlug
                ? "선택하신 조건에 맞는 게시물이 없습니다."
                : "아직 게시된 글이 없습니다."}
            </p>
          </div>
        ) : (
          posts.map((post) => <BlogPostCard post={post} key={post.id} />)
        )}
      </div>

      {/* 페이지네이션 영역 */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <PaginationControls totalPages={totalPages} />
        </div>
      )}
    </div>
  );
} 