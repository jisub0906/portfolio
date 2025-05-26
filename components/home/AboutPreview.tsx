import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "./AnimatedSection";

export default function AboutPreview() {
  return (
    <AnimatedSection className="w-full bg-muted/60 py-20 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <SectionTitle
          title="저에 대하여"
          subtitle="끊임없이 성장하는 개발자입니다."
        />
        <p className="mt-8 text-lg text-muted-foreground text-center">
          저는 N년차 웹 개발자로, 사용자 중심의 인터랙티브한 웹 애플리케이션 개발에 열정을 가지고 있습니다.<br className="hidden md:block" />
          최신 기술을 배우고 적용하는 것을 즐기며, 팀과의 협업을 통해 더 나은 결과를 만들어내는 데 보람을 느낍니다.
        </p>
        <div className="flex justify-center mt-8 w-full">
          <Link href="/about">
            <Button variant="outline" size="lg">
              더 알아보기
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
} 