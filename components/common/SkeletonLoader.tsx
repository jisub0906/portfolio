// components/common/SkeletonLoader.tsx - 스켈레톤 로딩 UI 컴포넌트

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  variant: 'card' | 'text-block' | 'list-item' | 'page-title' | 'profile-header';
  count?: number;
  className?: string;
  lines?: number;
}

export default function SkeletonLoader({
  variant,
  count = 1,
  className,
  lines = 3,
}: SkeletonLoaderProps) {
  const renderCardSkeleton = () => (
    <div className={cn("space-y-4", className)}>
      {/* 이미지/썸네일 영역 */}
      <Skeleton className="h-48 w-full rounded-md" />
      {/* 제목 라인 */}
      <Skeleton className="h-6 w-3/4 rounded" />
      {/* 본문 라인들 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  );

  const renderTextBlockSkeleton = () => (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => {
        // 첫 번째와 마지막 라인의 너비를 다르게 조절
        let widthClass = "w-full";
        if (index === 0) {
          widthClass = "w-11/12";
        } else if (index === lines - 1) {
          widthClass = "w-3/4";
        }
        
        return (
          <Skeleton 
            key={index} 
            className={cn("h-4 rounded", widthClass)} 
          />
        );
      })}
    </div>
  );

  const renderListItemSkeleton = () => (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          {/* 아바타/아이콘 영역 */}
          <Skeleton className="h-12 w-12 rounded-full" />
          {/* 텍스트 라인들 */}
          <div className="space-y-1 flex-1">
            <Skeleton className="h-4 w-[200px] rounded" />
            <Skeleton className="h-4 w-[150px] rounded" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderPageTitleSkeleton = () => (
    <div className={cn("space-y-3", className)}>
      {/* 메인 제목 */}
      <Skeleton className="h-10 w-1/2 rounded" />
      {/* 부제목 */}
      <Skeleton className="h-6 w-1/3 rounded" />
    </div>
  );

  const renderProfileHeaderSkeleton = () => (
    <div className={cn("flex items-center space-x-4", className)}>
      {/* 프로필 이미지 */}
      <Skeleton className="h-24 w-24 rounded-full" />
      {/* 프로필 정보 */}
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-4 w-48 rounded" />
        <Skeleton className="h-4 w-40 rounded" />
      </div>
    </div>
  );

  // variant에 따른 스켈레톤 렌더링
  switch (variant) {
    case 'card':
      return renderCardSkeleton();
    case 'text-block':
      return renderTextBlockSkeleton();
    case 'list-item':
      return renderListItemSkeleton();
    case 'page-title':
      return renderPageTitleSkeleton();
    case 'profile-header':
      return renderProfileHeaderSkeleton();
    default:
      console.warn(`SkeletonLoader: 유효하지 않은 variant "${variant}"가 전달되었습니다.`);
      return null;
  }
} 