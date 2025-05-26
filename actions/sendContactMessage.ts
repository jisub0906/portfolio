"use server";

import { z } from "zod";
import { createClient } from "@/lib/server";

// zod 스키마 (ContactForm과 동일, subject는 optional)
const contactSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  email: z.string().email("유효한 이메일을 입력해 주세요."),
  message: z.string().min(5, "메시지를 입력해 주세요."),
  subject: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = contactSchema.safeParse(body);
    if (!parse.success) {
      return Response.json({ success: false, message: "유효성 검사에 실패했습니다.", errors: parse.error.flatten() }, { status: 400 });
    }
    const { name, email, message, subject } = parse.data;
    const supabase = await createClient();
    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        message,
        subject: subject || null,
        is_read: false,
      },
    ]);
    if (error) {
      return Response.json({ success: false, message: "메시지 전송에 실패했습니다." }, { status: 500 });
    }
    return Response.json({ success: true, message: "메시지가 성공적으로 전송되었습니다." });
  } catch (e) {
    return Response.json({ success: false, message: "메시지 전송에 실패했습니다." }, { status: 500 });
  }
} 