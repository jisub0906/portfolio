"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import Icon from "@/components/common/Icon";
import { Tables } from "@/types/supabase_portfolio";

interface ProjectDetailClientProps {
  project: Tables<"projects">;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="space-y-8">
      {/* 메인 이미지 영역 */}
      {project.main_image_url && (
        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
          <Image
            src={project.main_image_url}
            alt={project.name || "Project main image"}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 스크린샷 캐러셀 */}
      {project.screenshots_urls && project.screenshots_urls.length > 0 && (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">스크린샷</h3>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {project.screenshots_urls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                    <Image
                      src={url}
                      alt={`${project.name} screenshot ${index + 1}`}
                      fill
                      className="object-contain rounded-md"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* 콘텐츠 탭 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="role">나의 역할</TabsTrigger>
          <TabsTrigger value="tech">기술 스택</TabsTrigger>
          <TabsTrigger value="retro">결과 및 회고</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-4">
            {project.description_markdown ? (
              <MarkdownRenderer content={project.description_markdown} />
            ) : (
              <p className="text-muted-foreground italic">프로젝트 개요가 아직 작성되지 않았습니다.</p>
            )}
          </TabsContent>

          <TabsContent value="role" className="space-y-4">
            {project.role_description_markdown ? (
              <MarkdownRenderer content={project.role_description_markdown} />
            ) : (
              <p className="text-muted-foreground italic">역할 설명이 아직 작성되지 않았습니다.</p>
            )}
          </TabsContent>

          <TabsContent value="tech" className="space-y-4">
            {project.tech_stack_description_markdown ? (
              <MarkdownRenderer content={project.tech_stack_description_markdown} />
            ) : (
              <p className="text-muted-foreground italic">기술 스택 설명이 아직 작성되지 않았습니다.</p>
            )}
          </TabsContent>

          <TabsContent value="retro" className="space-y-4">
            {project.results_retrospective_markdown ? (
              <MarkdownRenderer content={project.results_retrospective_markdown} />
            ) : (
              <p className="text-muted-foreground italic">결과 및 회고가 아직 작성되지 않았습니다.</p>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* 외부 링크 버튼 그룹 */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {project.live_demo_url && (
          <Button variant="default" size="sm" asChild>
            <Link
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
              라이브 데모
            </Link>
          </Button>
        )}

        {project.github_repo_url && (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={project.github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="Github" className="mr-2 h-4 w-4" />
              GitHub 저장소
            </Link>
          </Button>
        )}
      </div>

      {/* 프로젝트 메타 정보 */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">프로젝트 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {project.start_date && (
            <div>
              <span className="font-medium text-muted-foreground">시작일:</span>
              <span className="ml-2">{new Date(project.start_date).toLocaleDateString('ko-KR')}</span>
            </div>
          )}
          {project.end_date && (
            <div>
              <span className="font-medium text-muted-foreground">완료일:</span>
              <span className="ml-2">{new Date(project.end_date).toLocaleDateString('ko-KR')}</span>
            </div>
          )}
          {project.published_at && (
            <div>
              <span className="font-medium text-muted-foreground">게시일:</span>
              <span className="ml-2">{new Date(project.published_at).toLocaleDateString('ko-KR')}</span>
            </div>
          )}
          {project.is_featured && (
            <div>
              <span className="font-medium text-muted-foreground">추천 프로젝트:</span>
              <span className="ml-2">⭐ 예</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 