// lib/schemas/contact.ts - 문의하기 폼 공통 스키마

import { z } from "zod";

// 문의하기 폼 스키마 (클라이언트/서버 공통 사용)
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(50, "이름은 50자를 넘을 수 없습니다."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  subject: z
    .string()
    .max(100, "제목은 100자를 넘을 수 없습니다.")
    .optional(),
  message: z
    .string()
    .min(10, "문의 내용은 최소 10자 이상이어야 합니다.")
    .max(5000, "문의 내용은 5000자를 넘을 수 없습니다."),
});

// 타입 추론
export type ContactFormData = z.infer<typeof contactFormSchema>; 