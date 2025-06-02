"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";
import Icon from "@/components/common/Icon";

interface MarkdownRendererProps {
  /** 렌더링할 마크다운 콘텐츠 */
  content: string | null;
  /** 추가 CSS 클래스 */
  className?: string;
}

// 이모지를 아이콘으로 매핑하는 함수
const getIconForEmoji = (text: string): "Rocket" | "Lightbulb" | "Mail" | "Target" | "Zap" | "Wrench" | "Smartphone" | "Laptop" | "Star" | null => {
  if (text.includes('🚀')) return 'Rocket';
  if (text.includes('💡')) return 'Lightbulb';
  if (text.includes('📫')) return 'Mail';
  if (text.includes('🎯')) return 'Target';
  if (text.includes('⚡')) return 'Zap';
  if (text.includes('🔧')) return 'Wrench';
  if (text.includes('📱')) return 'Smartphone';
  if (text.includes('💻')) return 'Laptop';
  if (text.includes('🌟')) return 'Star';
  return null;
};

// 이모지를 제거하는 함수
const removeEmojis = (text: string): string => {
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
};

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // 콘텐츠가 없으면 아무것도 렌더링하지 않음
  if (!content || content.trim() === "") {
    return null;
  }

  return (
    <div 
      className={cn(
        "prose prose-lg max-w-none dark:prose-invert",
        // 기본 텍스트 스타일
        "text-foreground leading-relaxed",
        // 헤딩 스타일 - 더 깔끔하게
        "prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:text-left prose-h1:pb-4 prose-h1:border-b prose-h1:border-border/30",
        "prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-primary prose-h2:font-bold", 
        "prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-primary/80 prose-h3:font-semibold",
        // 단락 스타일
        "prose-p:mb-6 prose-p:leading-7 prose-p:text-foreground/90",
        // 리스트 스타일 - 더 깔끔하게
        "prose-ul:mb-8 prose-ul:space-y-3",
        "prose-ol:mb-8 prose-ol:space-y-3", 
        "prose-li:leading-7 prose-li:text-foreground/90",
        "prose-li:marker:text-primary",
        // 링크 스타일
        "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-a:duration-200",
        // 강조 텍스트 스타일
        "prose-strong:font-bold prose-strong:text-foreground",
        "prose-em:italic prose-em:text-foreground/80",
        // 코드 스타일
        "prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:text-primary",
        "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:border prose-pre:border-border prose-pre:shadow-sm",
        // 인용문 스타일
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg",
        // 테이블 스타일
        "prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden",
        "prose-th:bg-muted prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border-b prose-th:border-border",
        "prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-border",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // 외부 링크에 target="_blank" 추가
          a: ({ href, children, ...props }) => {
            const isExternal = href && !href.startsWith('/') && !href.startsWith('#');
            return (
              <a
                href={href}
                {...props}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer"
                })}
              >
                {children}
              </a>
            );
          },
          // H1 - 메인 제목 (좌측 정렬)
          h1: ({ children, ...props }) => {
            const id = typeof children === 'string' 
              ? children.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
              : '';
            return (
              <h1 id={id} {...props} className="text-left">
                {children}
              </h1>
            );
          },
          // H2 - 섹션 제목 (아이콘과 함께, 이모지 제거)
          h2: ({ children, ...props }) => {
            const childrenString = React.Children.toArray(children).join('');
            const cleanText = removeEmojis(childrenString);
            const iconName = getIconForEmoji(childrenString);
            
            const id = typeof cleanText === 'string' 
              ? cleanText.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
              : '';
            
            return (
              <div className="mb-8 mt-12">
                <h2 id={id} {...props} className="flex items-center gap-3 text-2xl font-bold text-primary mb-4">
                  {iconName && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={iconName} className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <span className="flex-1">{cleanText}</span>
                </h2>
                <div className="w-12 h-0.5 bg-primary/30 rounded-full mb-6"></div>
              </div>
            );
          },
          // H3 - 하위 제목
          h3: ({ children, ...props }) => {
            const id = typeof children === 'string' 
              ? children.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
              : '';
            return (
              <h3 id={id} {...props} className="flex items-center gap-2 text-xl font-semibold text-primary/80 mb-4">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {children}
              </h3>
            );
          },
          // 리스트 아이템 - 더 깔끔하게
          li: ({ children, ...props }) => {
            return (
              <li {...props} className="my-2 leading-7">
                {children}
              </li>
            );
          },
          // 단락 - 간격 조정
          p: ({ children, ...props }) => {
            return (
              <p {...props} className="mb-6 leading-7 text-foreground/90">
                {children}
              </p>
            );
          },
          // 강조 텍스트 - 더 깔끔하게
          strong: ({ children, ...props }) => {
            return (
              <strong {...props} className="font-bold text-primary">
                {children}
              </strong>
            );
          },
          // 리스트 컨테이너
          ul: ({ children, ...props }) => {
            return (
              <ul {...props} className="space-y-2 my-6 pl-6">
                {children}
              </ul>
            );
          },
          ol: ({ children, ...props }) => {
            return (
              <ol {...props} className="space-y-2 my-6 pl-6">
                {children}
              </ol>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 