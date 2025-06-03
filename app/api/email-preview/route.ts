// app/api/email-preview/route.ts - 이메일 템플릿 미리보기 (개발용)

import { NextRequest, NextResponse } from "next/server";
import type { ContactNotificationData } from "@/lib/email/brevo";

export async function GET(request: NextRequest) {
  // 프로덕션 환경에서는 접근 차단
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'notification';

  // 샘플 데이터
  const sampleData: ContactNotificationData = {
    name: '김개발',
    email: 'developer@example.com',
    subject: '포트폴리오 프로젝트 협업 문의',
    message: `안녕하세요, JISUB님!

포트폴리오를 보고 연락드립니다. 현재 진행 중인 프로젝트에서 프론트엔드 개발자를 찾고 있는데, JISUB님의 기술 스택과 경험이 저희 프로젝트에 매우 적합할 것 같습니다.

특히 Next.js와 TypeScript를 활용한 프로젝트들이 인상적이었습니다. 혹시 시간이 되시면 간단한 미팅을 통해 프로젝트에 대해 더 자세히 이야기해볼 수 있을까요?

감사합니다.`,
    timestamp: new Date().toISOString(),
  };

  let htmlContent = '';

  if (type === 'notification') {
    // 관리자 알림 이메일 템플릿
    htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: 600; color: #374151; margin-bottom: 5px; display: block; }
            .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #e5e7eb; white-space: pre-wrap; }
            .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">새로운 문의가 접수되었습니다</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">포트폴리오 웹사이트를 통해 문의가 도착했습니다.</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">문의자 이름</span>
                <div class="value">${sampleData.name}</div>
              </div>
              
              <div class="field">
                <span class="label">이메일 주소</span>
                <div class="value">
                  <a href="mailto:${sampleData.email}" style="color: #3b82f6; text-decoration: none;">${sampleData.email}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">문의 제목</span>
                <div class="value">${sampleData.subject || '제목 없음'}</div>
              </div>
              
              <div class="field">
                <span class="label">문의 내용</span>
                <div class="message-box">${sampleData.message}</div>
              </div>
              
              <div class="field">
                <span class="label">접수 시간</span>
                <div class="value">${new Date(sampleData.timestamp).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Seoul'
                })}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>이 이메일은 JISUB 포트폴리오 웹사이트의 연락처 폼을 통해 자동으로 발송되었습니다.</p>
              <p>문의자에게 답변하려면 위의 이메일 주소로 직접 회신해주세요.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  } else if (type === 'auto-reply') {
    // 자동 응답 이메일 템플릿
    htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f0fdf4; padding: 20px; border-radius: 0 0 8px 8px; }
            .highlight { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #10b981; margin: 15px 0; }
            .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #d1fae5; font-size: 14px; color: #374151; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">문의 접수 완료</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">안녕하세요, ${sampleData.name}님!</p>
            </div>
            
            <div class="content">
              <p>JISUB 포트폴리오에 관심을 가져주셔서 감사합니다.</p>
              <p>보내주신 문의가 성공적으로 접수되었습니다.</p>
              
              <div class="highlight">
                <h3 style="margin-top: 0; color: #059669;">접수된 문의 내용</h3>
                <p><strong>제목:</strong> ${sampleData.subject || '제목 없음'}</p>
                <p><strong>접수 시간:</strong> ${new Date(sampleData.timestamp).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Seoul'
                })}</p>
              </div>
              
              <p>빠른 시일 내에 검토 후 답변드리겠습니다. 보통 1-2일 내에 회신드리고 있으니 조금만 기다려주세요.</p>
              
              <p>추가 문의사항이 있으시면 언제든지 연락주세요.</p>
              
              <p>감사합니다.<br>
              JISUB</p>
            </div>
            
            <div class="footer">
              <p>이 이메일은 자동으로 발송된 확인 메일입니다.</p>
              <p>회신이 필요하지 않으며, 별도 답변은 다른 이메일로 발송됩니다.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  } else {
    return NextResponse.json(
      { error: 'Invalid type. Use "notification" or "auto-reply"' },
      { status: 400 }
    );
  }

  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
} 