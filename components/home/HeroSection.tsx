import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

export default function HeroSection() {
  return (
    <AnimatedSection
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
      }}
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 text-slate-900 dark:text-slate-100">
          웹 개발자 지섭입니다. <br className="hidden md:block" />
          아이디어를 현실로 만드는 코드를 작성합니다.
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          끊임없는 학습과 도전을 통해 사용자에게 가치 있는 웹 경험을 제공하고자 합니다.
        </p>
        <Link href="/projects">
          <Button variant="default" size="lg">
            내 프로젝트 보기
          </Button>
        </Link>
      </div>
    </AnimatedSection>
  );
} 