"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/supabase_portfolio";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Array<Pick<Tables<"blog_categories">, "id" | "name" | "slug">>;
  selectedCategorySlug?: string | null;
  onCategoryChange: (slug: string | null) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategorySlug,
  onCategoryChange,
  className,
}) => {
  // categories 배열이 null, undefined이거나 빈 배열일 경우에도 "전체" 버튼은 표시
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* "전체" 버튼 */}
      <Button
        variant={!selectedCategorySlug ? "default" : "secondary"}
        size="sm"
        onClick={() => onCategoryChange(null)}
      >
        전체
      </Button>

      {/* 카테고리 버튼 목록 */}
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategorySlug === category.slug ? "default" : "secondary"}
          size="sm"
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter; 