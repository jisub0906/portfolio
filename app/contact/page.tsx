// app/contact/page.tsx - 연락처 페이지

import { Metadata } from "next";
import PageTitle from "@/components/common/PageTitle";
import ContactInfo from "@/components/features/contact/ContactInfo";
import ContactForm from "@/components/features/contact/ContactForm";

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: "연락하기 | 지섭의 포트폴리오",
  description: "개발자 지섭에게 프로젝트 문의, 협업 제안, 또는 기타 궁금한 점을 전달하세요. 다양한 연락 방법을 제공합니다.",
};

const ContactPage = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <PageTitle 
        title="Contact Me" 
        subtitle="프로젝트 의뢰, 기술 컨설팅, 또는 커피챗 등 어떤 이야기든 환영합니다. 아래 편하신 방법으로 연락주세요." 
        className="mb-12 text-center" 
      />
      
      <div className="grid grid-cols-1 gap-12 rounded-lg border bg-card p-6 shadow-sm md:grid-cols-2 md:p-8 lg:gap-16 lg:p-10 items-start">
        {/* 좌측: 연락처 정보 영역 */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            직접 연락하기
          </h2>
          <p className="text-muted-foreground">
            아래 정보를 통해 직접 연락하실 수 있습니다.
          </p>
          <ContactInfo iconClassName="text-primary" />
        </div>
        
        {/* 우측: 문의 양식 영역 */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            메시지 보내기
          </h2>
          <p className="text-muted-foreground">
            또는, 아래 양식을 통해 간편하게 메시지를 남겨주세요.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 