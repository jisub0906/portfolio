import SectionTitle from "@/components/ui/SectionTitle";
import TechStackView, { TechStackCategory } from "@/components/skills/TechStackView";
import { createClient } from "@/lib/server";

// 서버 컴포넌트
export default async function SkillsPage() {
  const supabase = await createClient();
  // tech_stack 테이블에서 category, name, icon_url 조회
  const { data } = await supabase
    .from("tech_stack")
    .select("category, name, icon_url")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  // 에러 처리 또는 빈 배열 fallback
  const techs = Array.isArray(data) ? data : [];

  // category별로 그룹핑
  const grouped: Record<string, { name: string; icon_url?: string }[]> = {};
  for (const tech of techs) {
    const category = tech.category || "기타";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({ name: tech.name, icon_url: tech.icon_url || undefined });
  }

  // TechStackView가 기대하는 형태로 변환
  const techStackData: TechStackCategory[] = Object.entries(grouped).map(
    ([category, skills]) => ({ category, skills })
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <SectionTitle title="나의 기술 스택 (My Tech Stack)" />
      <div className="w-full mt-10">
        <TechStackView techStackData={techStackData} />
      </div>
    </div>
  );
} 