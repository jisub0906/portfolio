import React from "react";
import { Mail } from "lucide-react";

const EMAIL = "jisub0906@gmail.com";

const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base text-muted-foreground">
        프로젝트 문의, 협업 제안, 또는 커피챗도 환영합니다.
      </p>
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-primary" />
        <a
          href={`mailto:${EMAIL}`}
          className="text-primary font-medium hover:underline"
          aria-label="이메일 보내기"
        >
          {EMAIL}
        </a>
      </div>
    </div>
  );
};

export default ContactInfo; 