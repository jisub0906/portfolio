// app/tech-stack/page.tsx - 기술 스택 페이지

import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/supabase_portfolio";
import PageTitle from "@/components/common/PageTitle";
import TechCategorySection from "@/components/features/techstack/TechCategorySection";
import { TechStackItemType } from "@/components/features/techstack/TechStackItem";

// 페이지 재검증 주기 설정 (1시간)
export const revalidate = 3600;

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: "기술 스택 | 지섭의 포트폴리오",
  description: "개발자 지섭이 경험하고 활용하는 다양한 프로그래밍 언어, 프레임워크, 도구들을 소개합니다. 프론트엔드부터 백엔드, 데이터베이스까지 폭넓은 기술 스택을 확인해보세요.",
};

// 기술 카테고리와 기술 스택을 함께 포함하는 타입 정의
type TechCategoryWithStacks = Tables<'tech_categories'> & {
  tech_stacks: Array<TechStackItemType>;
};

/**
 * 기술 스택 페이지 컴포넌트
 * Supabase에서 기술 카테고리와 각 카테고리에 속한 기술 스택들을 조회하여 표시
 */
async function TechStackPage() {
  let categorizedTechStacks: TechCategoryWithStacks[] = [];

  try {
    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 기술 카테고리와 각 카테고리에 속한 기술 스택들을 함께 조회
    // 성능 최적화: 필요한 필드만 선택하고 정렬 조건 명시
    const { data, error } = await supabase
      .schema('portfolio')
      .from('tech_categories')
      .select(`
        id,
        name,
        slug,
        sort_order,
        created_at,
        updated_at,
        tech_stacks!tech_stacks_category_id_fkey (
          id,
          name,
          icon_svg_content,
          icon_url,
          summary,
          proficiency_level
        )
      `)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('기술 스택 데이터 조회 실패:', error);
      categorizedTechStacks = [];
    } else {
      // 데이터 타입 변환 및 빈 카테고리 필터링
      categorizedTechStacks = (data || [])
        .filter(category => category.tech_stacks && category.tech_stacks.length > 0)
        .map(category => ({
          ...category,
          tech_stacks: (category.tech_stacks || []).map(tech => ({
            id: tech.id,
            name: tech.name,
            icon_svg_content: tech.icon_svg_content,
            icon_url: tech.icon_url,
            summary: tech.summary,
            proficiency_level: tech.proficiency_level,
          }))
        }));
    }
  } catch (error) {
    console.error('기술 스택 페이지 데이터 페칭 중 오류 발생:', error);
    categorizedTechStacks = [];
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      {/* 페이지 제목 */}
      <PageTitle 
        title="기술 스택" 
        subtitle="제가 경험하고 자신있게 다루는 다양한 기술들입니다." 
      />

      {/* 기술 카테고리 섹션들 */}
      {categorizedTechStacks && categorizedTechStacks.length > 0 ? (
        <div className="mt-10 space-y-12 md:space-y-16">
          {categorizedTechStacks.map((category) => (
            <TechCategorySection
              key={category.id}
              categoryName={category.name}
              techStacks={category.tech_stacks}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted-foreground">
          아직 등록된 기술 스택 정보가 없습니다. 곧 업데이트될 예정입니다.
        </p>
      )}
    </div>
  );
}

export default TechStackPage; 