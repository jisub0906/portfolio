// jest.setup.api.js - API 라우트 테스트를 위한 Jest 설정

// Node.js 환경에서는 브라우저 관련 모킹이 필요하지 않음
// API 라우트 테스트에 필요한 설정만 포함

// 환경 변수 설정 (테스트용)
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// 콘솔 로그 모킹 (테스트 출력을 깔끔하게 유지)
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}; 