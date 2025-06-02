// components/features/blog/BlogPostCard.tsx - 블로그 목록용 게시물 카드 컴포넌트

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPostWithCategory } from "@/types/supabase_portfolio";
import { formatDate, cn } from "@/lib/utils";

// BlogPostCard Props 인터페이스
interface BlogPostCardProps {
  post: BlogPostWithCategory;
  className?: string;
}

export default function BlogPostCard({ post, className }: BlogPostCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className={cn("block h-full group", className)}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-0.5">
        {/* 썸네일 이미지 영역 (선택적) */}
        {post.thumbnail_url && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image 
              src={post.thumbnail_url} 
              alt={post.title || 'Blog post thumbnail'} 
              fill 
              className="object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        )}
        
        {/* 내용 영역 */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          {/* 상단 정보 영역 */}
          <div>
            {/* 카테고리 배지 */}
            {post.category?.name && (
              <Badge variant="outline" className="mb-2 text-xs font-medium">
                {post.category.name}
              </Badge>
            )}
            
            {/* 제목 */}
            <h3 className="text-base sm:text-lg font-semibold leading-snug tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            {/* 요약 */}
            {post.summary && (
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-3">
                {post.summary}
              </p>
            )}
          </div>
          
          {/* 하단 정보 영역 */}
          <div className="mt-3">
            <time 
              dateTime={post.published_at || undefined} 
              className="text-xs text-muted-foreground"
            >
              {formatDate(post.published_at)}
            </time>
          </div>
        </div>
      </Card>
    </Link>
  );
} 