// components/features/blog/PostNavigation.tsx - 이전/다음 블로그 게시물 네비게이션

import Link from "next/link";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

export interface PostLinkInfo {
  title: string;
  slug: string;
}

interface PostNavigationProps {
  previousPost?: PostLinkInfo | null;
  nextPost?: PostLinkInfo | null;
  className?: string;
}

const PostNavigation = ({ previousPost, nextPost, className }: PostNavigationProps) => {
  // 이전 글과 다음 글이 모두 없으면 아무것도 렌더링하지 않음
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav
      className={cn(
        "mt-12 flex flex-col items-stretch gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between",
        className
      )}
      aria-label="블로그 게시물 네비게이션"
    >
      {/* 이전 글 링크 영역 */}
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className="group flex w-full flex-col items-start gap-1.5 rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-md sm:max-w-[45%]"
          aria-label={`이전 글: ${previousPost.title}`}
        >
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-primary">
            이전 글
          </div>
          <div className="flex items-center gap-2">
            <Icon
              name="MoveLeft"
              className="h-4 w-4 text-muted-foreground group-hover:text-primary"
              aria-hidden="true"
            />
            <span className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary">
              {previousPost.title}
            </span>
          </div>
        </Link>
      ) : (
        // 이전 글이 없고 다음 글만 있을 경우 레이아웃 유지용 빈 div
        <div className="hidden sm:block sm:max-w-[45%] w-full" aria-hidden="true"></div>
      )}

      {/* 다음 글 링크 영역 */}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex w-full flex-col items-end gap-1.5 rounded-lg border border-border bg-card p-4 text-right shadow-sm transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-md sm:max-w-[45%]"
          aria-label={`다음 글: ${nextPost.title}`}
        >
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-primary">
            다음 글
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary">
              {nextPost.title}
            </span>
            <Icon
              name="MoveRight"
              className="h-4 w-4 text-muted-foreground group-hover:text-primary"
              aria-hidden="true"
            />
          </div>
        </Link>
      ) : (
        // 다음 글이 없고 이전 글만 있을 경우 레이아웃 유지용 빈 div
        <div className="hidden sm:block sm:max-w-[45%] w-full" aria-hidden="true"></div>
      )}
    </nav>
  );
};

export default PostNavigation; 