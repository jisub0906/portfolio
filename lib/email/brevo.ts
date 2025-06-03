// lib/email/brevo.ts - Brevo 이메일 송신 유틸리티

import * as brevo from '@getbrevo/brevo';

// Brevo API 클라이언트 초기화
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export interface ContactNotificationData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

/**
 * 관리자에게 새로운 문의 알림 이메일을 발송합니다.
 */
export async function sendContactNotification(data: ContactNotificationData): Promise<void> {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    // 발신자 정보
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'JISUB Portfolio',
      email: process.env.BREVO_SENDER_EMAIL!,
    };

    // 수신자 정보 (관리자)
    sendSmtpEmail.to = [
      {
        email: process.env.BREVO_ADMIN_EMAIL!,
        name: 'JISUB',
      },
    ];

    // 이메일 제목
    sendSmtpEmail.subject = `[포트폴리오] 새로운 문의: ${data.subject || '제목 없음'}`;

    // HTML 이메일 내용
    sendSmtpEmail.htmlContent = `
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
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <span class="label">이메일 주소</span>
                <div class="value">
                  <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">문의 제목</span>
                <div class="value">${data.subject || '제목 없음'}</div>
              </div>
              
              <div class="field">
                <span class="label">문의 내용</span>
                <div class="message-box">${data.message}</div>
              </div>
              
              <div class="field">
                <span class="label">접수 시간</span>
                <div class="value">${new Date(data.timestamp).toLocaleString('ko-KR', {
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

    // 텍스트 버전 (HTML을 지원하지 않는 이메일 클라이언트용)
    sendSmtpEmail.textContent = `
새로운 문의가 접수되었습니다

문의자 이름: ${data.name}
이메일 주소: ${data.email}
문의 제목: ${data.subject || '제목 없음'}
접수 시간: ${new Date(data.timestamp).toLocaleString('ko-KR')}

문의 내용:
${data.message}

---
이 이메일은 JISUB 포트폴리오 웹사이트의 연락처 폼을 통해 자동으로 발송되었습니다.
    `;

    // 이메일 발송
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('Brevo 이메일 발송 성공:', {
      messageId: result.body.messageId,
      to: data.email,
      subject: data.subject,
    });

  } catch (error) {
    console.error('Brevo 이메일 발송 실패:', error);
    throw new Error('이메일 알림 발송에 실패했습니다.');
  }
}

/**
 * 문의자에게 자동 응답 이메일을 발송합니다.
 */
export async function sendAutoReplyEmail(data: ContactNotificationData): Promise<void> {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    // 발신자 정보
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'JISUB Portfolio',
      email: process.env.BREVO_SENDER_EMAIL!,
    };

    // 수신자 정보 (문의자)
    sendSmtpEmail.to = [
      {
        email: data.email,
        name: data.name,
      },
    ];

    // 이메일 제목
    sendSmtpEmail.subject = `[JISUB Portfolio] 문의 접수 확인 - ${data.subject || '제목 없음'}`;

    // HTML 이메일 내용
    sendSmtpEmail.htmlContent = `
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
              <p style="margin: 10px 0 0 0; opacity: 0.9;">안녕하세요, ${data.name}님!</p>
            </div>
            
            <div class="content">
              <p>JISUB 포트폴리오에 관심을 가져주셔서 감사합니다.</p>
              <p>보내주신 문의가 성공적으로 접수되었습니다.</p>
              
              <div class="highlight">
                <h3 style="margin-top: 0; color: #059669;">접수된 문의 내용</h3>
                <p><strong>제목:</strong> ${data.subject || '제목 없음'}</p>
                <p><strong>접수 시간:</strong> ${new Date(data.timestamp).toLocaleString('ko-KR', {
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

    // 텍스트 버전
    sendSmtpEmail.textContent = `
안녕하세요, ${data.name}님!

JISUB 포트폴리오에 관심을 가져주셔서 감사합니다.
보내주신 문의가 성공적으로 접수되었습니다.

접수된 문의 내용:
- 제목: ${data.subject || '제목 없음'}
- 접수 시간: ${new Date(data.timestamp).toLocaleString('ko-KR')}

빠른 시일 내에 검토 후 답변드리겠습니다. 
보통 1-2일 내에 회신드리고 있으니 조금만 기다려주세요.

추가 문의사항이 있으시면 언제든지 연락주세요.

감사합니다.
JISUB

---
이 이메일은 자동으로 발송된 확인 메일입니다.
회신이 필요하지 않으며, 별도 답변은 다른 이메일로 발송됩니다.
    `;

    // 이메일 발송
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('Brevo 자동 응답 이메일 발송 성공:', {
      messageId: result.body.messageId,
      to: data.email,
    });

  } catch (error) {
    console.error('Brevo 자동 응답 이메일 발송 실패:', error);
    // 자동 응답 실패는 전체 프로세스를 중단시키지 않음
    console.warn('자동 응답 이메일 발송에 실패했지만 문의 접수는 완료되었습니다.');
  }
} 