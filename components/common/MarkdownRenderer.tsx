"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  /** 렌더링할 마크다운 콘텐츠 */
  content: string | null;
  /** 추가 CSS 클래스 */
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // 콘텐츠가 없으면 아무것도 렌더링하지 않음
  if (!content || content.trim() === "") {
    return null;
  }

  // 간단한 마크다운 파싱 (향후 react-markdown 등으로 대체 가능)
  const parseMarkdown = (text: string): string => {
    return text
      // 헤딩
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-8">$1</h1>')
      // 볼드
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      // 이탤릭
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      // 코드 블록
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
      // 인라인 코드
      .replace(/`([^`]*)`/gim, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
      // 링크
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // 리스트
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      // 줄바꿈
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br />');
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div 
      className={cn(
        "prose prose-sm max-w-none",
        "text-foreground",
        "[&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4",
        "[&>ul]:list-disc [&>ul]:pl-6",
        "[&>ol]:list-decimal [&>ol]:pl-6",
        className
      )}
      dangerouslySetInnerHTML={{ __html: `<p class="mb-4">${htmlContent}</p>` }}
    />
  );
} 