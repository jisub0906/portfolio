"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/features/projects/ProjectCard";
import { ProjectWithTechStacks } from "@/types/supabase_portfolio";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  initialProjects: ProjectWithTechStacks[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  // 상태 변수 정의
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // 모든 프로젝트에서 사용된 고유 태그 목록 추출
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialProjects.forEach((project) => {
      if (project.tech_stacks) {
        project.tech_stacks.forEach((techStack) => {
          tagSet.add(techStack.name);
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [initialProjects]);

  // 필터링 및 정렬된 프로젝트 목록 계산
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...initialProjects];

    // 태그 필터링
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) => {
        if (!project.tech_stacks) return false;
        return project.tech_stacks.some((techStack) =>
          selectedTags.includes(techStack.name)
        );
      });
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "latest":
          return new Date(b.published_at || b.created_at).getTime() - 
                 new Date(a.published_at || a.created_at).getTime();
        case "oldest":
          return new Date(a.published_at || a.created_at).getTime() - 
                 new Date(b.published_at || b.created_at).getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialProjects, selectedTags, sortOption]);

  // 페이지네이션된 프로젝트 목록 계산
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProjects.slice(startIndex, endIndex);
  }, [filteredAndSortedProjects, currentPage, itemsPerPage]);

  // 페이지네이션 관련 변수 계산
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  // 핸들러 함수들
  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 빈 상태 처리
  if (initialProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="CodeXml" className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">등록된 프로젝트가 아직 없습니다</h3>
        <p className="text-muted-foreground">
          새로운 프로젝트가 추가되면 여기에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 컨트롤 영역 */}
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
        {/* 태그 필터 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="justify-start" aria-label="기술 스택 필터 선택">
              <Icon name="Filter" className="mr-2 h-4 w-4" />
              기술 스택 필터
              {selectedTags.length > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {selectedTags.length}
                </span>
              )}
              <Icon name="ChevronDown" className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>기술 스택 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagChange(tag)}
                aria-label={`${tag} 필터 ${selectedTags.includes(tag) ? '해제' : '적용'}`}
              >
                {tag}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 정렬 드롭다운 */}
        <Select onValueChange={handleSortChange} defaultValue={sortOption}>
          <SelectTrigger className="w-[180px]" aria-label="정렬 기준 선택">
            <Icon name="SortDesc" className="mr-2 h-4 w-4" />
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
            <SelectItem value="name-asc">이름 오름차순</SelectItem>
            <SelectItem value="name-desc">이름 내림차순</SelectItem>
          </SelectContent>
        </Select>

        {/* 선택된 필터 표시 */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Button
                key={tag}
                variant="secondary"
                size="sm"
                onClick={() => handleTagChange(tag)}
                className="h-7 px-2 text-xs"
              >
                {tag}
                <Icon name="X" className="ml-1 h-3 w-3" />
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* 결과 개수 표시 */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedTags.length > 0 
            ? `필터링된 ${filteredAndSortedProjects.length}개의 프로젝트 (전체 ${initialProjects.length}개 중)`
            : `총 ${filteredAndSortedProjects.length}개의 프로젝트`
          }
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            {currentPage} / {totalPages} 페이지
          </p>
        )}
      </div>

      {/* 프로젝트 그리드 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredAndSortedProjects.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Icon name="Search" className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              선택하신 조건에 맞는 프로젝트가 없습니다
            </h3>
            <p className="text-muted-foreground mb-4">
              다른 기술 스택을 선택하거나 필터를 초기화해보세요.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedTags([]);
                setCurrentPage(1);
              }}
            >
              필터 초기화
            </Button>
          </div>
        ) : (
          paginatedProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className={cn(
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {/* 페이지 번호들 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // 현재 페이지 주변의 페이지만 표시
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className={cn(
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
} 