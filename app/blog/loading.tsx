// app/blog/loading.tsx - 블로그 페이지 로딩 상태

import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      {/* 페이지 제목 스켈레톤 */}
      <div className="text-center mb-8">
        <Skeleton className="h-12 w-48 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
        <div className="w-24 h-1 mx-auto mt-6">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>

      {/* 컨트롤 영역 스켈레톤 */}
      <div className="space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
          <Skeleton className="h-10 w-full md:max-w-xs" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* 게시물 그리드 스켈레톤 */}
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 스켈레톤 */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
} 