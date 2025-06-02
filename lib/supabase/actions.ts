"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import type { ContactInsert } from "@/types/supabase_portfolio";

/**
 * 연락처 폼 제출 결과 타입
 */
export type ContactFormResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * 연락처 폼 데이터 타입
 */
export type ContactFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

/**
 * 연락처 폼을 제출합니다.
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactFormResult> {
  try {
    // 기본적인 유효성 검사
    const errors: Record<string, string[]> = {};

    if (!formData.name.trim()) {
      errors.name = ["이름을 입력해주세요."];
    }

    if (!formData.email.trim()) {
      errors.email = ["이메일을 입력해주세요."];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = ["올바른 이메일 형식을 입력해주세요."];
    }

    if (!formData.message.trim()) {
      errors.message = ["메시지를 입력해주세요."];
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "입력 정보를 확인해주세요.",
        errors,
      };
    }

    const supabase = await createClient();

    const contactData: ContactInsert = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject?.trim() || null,
      message: formData.message.trim(),
    };

    const { error } = await supabase
      .schema("portfolio")
      .from("contacts")
      .insert(contactData);

    if (error) {
      console.error("Error submitting contact form:", error);
      return {
        success: false,
        message: "메시지 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    // 관리자 페이지 캐시 무효화 (필요시)
    revalidatePath("/admin/contacts");

    return {
      success: true,
      message: "메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.",
    };
  } catch (error) {
    console.error("Unexpected error in submitContactForm:", error);
    return {
      success: false,
      message: "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

/**
 * 연락처 메시지를 읽음으로 표시합니다. (관리자용)
 */
export async function markContactAsRead(contactId: string): Promise<ContactFormResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("portfolio")
      .from("contacts")
      .update({ is_read: true })
      .eq("id", contactId);

    if (error) {
      console.error("Error marking contact as read:", error);
      return {
        success: false,
        message: "읽음 표시 중 오류가 발생했습니다.",
      };
    }

    revalidatePath("/admin/contacts");

    return {
      success: true,
      message: "메시지를 읽음으로 표시했습니다.",
    };
  } catch (error) {
    console.error("Unexpected error in markContactAsRead:", error);
    return {
      success: false,
      message: "예상치 못한 오류가 발생했습니다.",
    };
  }
} 