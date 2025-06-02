// app/projects/loading.tsx - 프로젝트 페이지 로딩 상태

import SkeletonLoader from "@/components/common/SkeletonLoader";

export default function ProjectsLoading() {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8 sm:px-6 md:gap-12 md:py-12 lg:px-8 lg:py-16">
      {/* 페이지 제목 스켈레톤 */}
      <SkeletonLoader variant="page-title" />
      
      {/* 필터/정렬 컨트롤 스켈레톤 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="h-10 w-40 rounded-md bg-muted animate-pulse" />
        <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
      </div>
      
      {/* 프로젝트 카드 그리드 스켈레톤 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonLoader key={i} variant="card" />
        ))}
      </div>
    </div>
  );
} 