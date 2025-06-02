"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

// 코드 하이라이팅을 위한 CSS 임포트 (선택적)
// import "highlight.js/styles/github.css"; // 라이트 테마
// import "highlight.js/styles/github-dark.css"; // 다크 테마

interface EnhancedMarkdownRendererProps {
  /** 렌더링할 마크다운 콘텐츠 */
  content: string | null;
  /** 추가 CSS 클래스 */
  className?: string;
  /** GitHub Flavored Markdown 사용 여부 (기본값: true) */
  enableGfm?: boolean;
  /** 코드 하이라이팅 사용 여부 (기본값: true) */
  enableHighlight?: boolean;
  /** 외부 링크를 새 탭에서 열지 여부 (기본값: true) */
  openLinksInNewTab?: boolean;
}

// 컴포넌트 Props 타입 정의
interface ComponentProps {
  href?: string;
  children?: React.ReactNode;
  inline?: boolean;
  className?: string;
}

export default function EnhancedMarkdownRenderer({
  content,
  className,
  enableGfm = true,
  enableHighlight = true,
  openLinksInNewTab = true,
}: EnhancedMarkdownRendererProps) {
  // 콘텐츠가 없으면 아무것도 렌더링하지 않음
  if (!content || content.trim() === "") {
    return null;
  }

  // remark 플러그인 설정
  const remarkPlugins = [];
  if (enableGfm) {
    remarkPlugins.push(remarkGfm);
  }

  // rehype 플러그인 설정 (타입 오류 해결)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rehypePlugins: any[] = [rehypeSanitize];
  if (enableHighlight) {
    rehypePlugins.push(rehypeHighlight);
  }

  // 커스텀 컴포넌트 설정
  const components = {
    // 링크 컴포넌트 커스터마이징
    a: ({ href, children, ...props }: ComponentProps) => {
      const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");
      
      return (
        <a
          href={href}
          className="text-primary hover:underline transition-colors duration-200"
          {...(isExternal && openLinksInNewTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
        >
          {children}
        </a>
      );
    },

    // 코드 블록 커스터마이징
    pre: ({ children, ...props }: ComponentProps) => (
      <pre
        className="bg-muted border border-border rounded-md p-4 overflow-x-auto my-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    ),

    // 인라인 코드 커스터마이징
    code: ({ inline, children, ...props }: ComponentProps) => {
      if (inline) {
        return (
          <code
            className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="font-mono" {...props}>
          {children}
        </code>
      );
    },

    // 헤딩 커스터마이징 (앵커 링크 지원)
    h1: ({ children, ...props }: ComponentProps) => (
      <h1
        className="text-2xl font-bold mb-4 mt-8 scroll-mt-20"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: ComponentProps) => (
      <h2
        className="text-xl font-semibold mb-4 mt-8 scroll-mt-20"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: ComponentProps) => (
      <h3
        className="text-lg font-semibold mb-3 mt-6 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    ),

    // 리스트 커스터마이징
    ul: ({ children, ...props }: ComponentProps) => (
      <ul className="list-disc pl-6 mb-4 space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: ComponentProps) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: ComponentProps) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),

    // 단락 커스터마이징
    p: ({ children, ...props }: ComponentProps) => (
      <p className="mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),

    // 인용구 커스터마이징
    blockquote: ({ children, ...props }: ComponentProps) => (
      <blockquote
        className="border-l-4 border-primary/30 pl-4 my-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // 테이블 커스터마이징 (GFM 지원)
    table: ({ children, ...props }: ComponentProps) => (
      <div className="overflow-x-auto my-4">
        <table
          className="min-w-full border-collapse border border-border"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: ComponentProps) => (
      <th
        className="border border-border bg-muted px-4 py-2 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: ComponentProps) => (
      <td className="border border-border px-4 py-2" {...props}>
        {children}
      </td>
    ),

    // 수평선 커스터마이징
    hr: ({ ...props }: ComponentProps) => (
      <hr className="my-8 border-border" {...props} />
    ),
  };

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none",
        "text-foreground",
        // prose 클래스 오버라이드 방지
        "[&>*]:text-inherit",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 