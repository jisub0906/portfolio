// app/api/contact/route.ts - 연락처 폼 제출 API 핸들러

import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";
import { createApiClient } from "@/lib/supabase/server";
import type { ContactInsert } from "@/types/supabase_portfolio";

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();

    // 서버 측 유효성 검사 (Zod 스키마 재사용)
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "입력값이 유효하지 않습니다.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message }: ContactFormData = validationResult.data;

    // Supabase 클라이언트 초기화 (API 라우트 전용)
    const supabase = createApiClient(request);

    // contacts 테이블에 데이터 저장
    const contactData: ContactInsert = {
      name,
      email,
      subject: subject || null, // 빈 문자열을 null로 변환
      message,
      is_read: false, // 기본값: 읽지 않음
    };

    const { error: dbError } = await supabase
      .schema("portfolio")
      .from('contacts')
      .insert([contactData]);

    if (dbError) {
      console.error('Supabase DB Error:', dbError);
      throw new Error('데이터베이스 저장 중 오류가 발생했습니다.');
    }

    // (선택적) 이메일 알림 로직 - 향후 구현 예정
    // TODO: Implement email notification to admin (e.g., using Resend)
    console.log('새로운 문의 접수:', {
      name,
      email,
      subject: subject || "제목 없음",
      message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString(),
    });

    // 성공 응답 반환
    return NextResponse.json(
      {
        success: true,
        message: "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    
    // TODO: Sentry.captureException(error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}

// OPTIONS 메서드 처리 (CORS 대응)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// 다른 HTTP 메서드에 대한 핸들러 (Method Not Allowed)
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: "Method Not Allowed" },
    { status: 405 }
  );
} 