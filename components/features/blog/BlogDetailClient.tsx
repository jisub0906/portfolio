"use client";

import { useMemo } from "react";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import TableOfContentsClient from "@/components/features/blog/TableOfContentsClient";
import ShareButtonsClient from "@/components/features/blog/ShareButtonsClient";
import type { Heading } from "@/types/blog";
import { cn } from "@/lib/utils";

// PostWithSlugAndContent 타입 정의
interface PostWithSlugAndContent {
  id: string;
  title: string;
  slug: string;
  content_markdown: string;
  // 필요시 다른 필드 추가
  published_at?: string | null;
  summary?: string | null;
}

interface BlogDetailClientProps {
  post: PostWithSlugAndContent;
  className?: string;
}

// MarkdownRenderer와 동일한 slugify 함수 (ID 생성 일치를 위해)
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]/g, '-') // MarkdownRenderer와 동일한 로직
    .replace(/-+/g, '-') // 연속된 하이픈을 하나로 변경
    .replace(/^-|-$/g, ''); // 시작과 끝의 하이픈 제거
};

// 이모지 제거 함수 (MarkdownRenderer와 동일)
const removeEmojis = (text: string): string => {
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
};

// 마크다운에서 제목 추출 함수
const extractHeadings = (markdown: string | null): Heading[] => {
  if (!markdown) return [];
  
  const headings: Heading[] = [];
  const lines = markdown.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // H2 제목 (## ...)
    if (trimmedLine.startsWith('## ')) {
      const text = trimmedLine.substring(3).trim();
      if (text) {
        // 이모지 제거 (MarkdownRenderer와 동일한 로직)
        const cleanText = removeEmojis(text);
        if (cleanText) {
          headings.push({ 
            id: slugify(cleanText), 
            level: 2, 
            text: cleanText 
          });
        }
      }
    }
    // H3 제목 (### ...)
    else if (trimmedLine.startsWith('### ')) {
      const text = trimmedLine.substring(4).trim();
      if (text) {
        // 이모지 제거
        const cleanText = removeEmojis(text);
        if (cleanText) {
          headings.push({ 
            id: slugify(cleanText), 
            level: 3, 
            text: cleanText 
          });
        }
      }
    }
  });
  
  return headings;
};

export default function BlogDetailClient({ post, className }: BlogDetailClientProps) {
  // 제목 추출 (post.content_markdown 변경 시에만 재계산)
  const headings = useMemo(() => extractHeadings(post.content_markdown), [post.content_markdown]);

  return (
    <div className={cn("lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12", className)}>
      {/* 본문 영역 */}
      <article className="lg:col-span-9 xl:col-span-8 prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none py-8">
        <MarkdownRenderer content={post.content_markdown} />
        
        {/* 공유 버튼 영역 */}
        <div className="mt-8 pt-8 border-t border-border not-prose">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            이 글이 유용하셨다면 공유해주세요!
          </h3>
          <ShareButtonsClient postTitle={post.title} />
        </div>
      </article>

      {/* 목차 영역 (데스크톱에서만 표시) */}
      <aside className="hidden lg:block lg:col-span-3 xl:col-span-4 py-8">
        <div className="sticky top-24 space-y-4">
          {headings.length > 0 && (
            <TableOfContentsClient headings={headings} />
          )}
        </div>
      </aside>
    </div>
  );
} 