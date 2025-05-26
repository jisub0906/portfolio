import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "./AnimatedSection";

export default function ContactPreview() {
  return (
    <AnimatedSection className="w-full py-20 px-4 bg-gradient-to-b from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <SectionTitle
          title="함께 일하고 싶으신가요?"
        />
        <p className="mt-8 text-lg text-muted-foreground text-center">
          새로운 프로젝트, 협업 기회, 또는 커피 한 잔의 대화도 환영합니다.
        </p>
        <div className="flex justify-center mt-8 w-full">
          <Link href="/contact">
            <Button variant="default" size="lg">
              문의하기
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
} 