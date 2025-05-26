import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

interface Skill {
  name: string;
  icon?: string;
}

interface TechStackPreviewProps {
  skills: Skill[];
}

export default function TechStackPreview({ skills }: TechStackPreviewProps) {
  return (
    <AnimatedSection className="w-full py-20 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <SectionTitle
          title="핵심 기술"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-8 w-full">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center w-24">
              {skill.icon ? (
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="mb-2"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded mb-2 text-xs text-slate-500">
                  {skill.name}
                </div>
              )}
              <span className="text-sm font-medium text-center break-keep">{skill.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 w-full">
          <Link href="/skills">
            <Button variant="outline" size="lg">
              모든 기술 보기
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
} 