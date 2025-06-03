import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase_portfolio";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

// API 라우트에서 사용할 수 있는 클라이언트 (Request 객체 기반)
export const createApiClient = (request: Request) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get('cookie');
          if (!cookieHeader) return [];
          
          return cookieHeader.split(';').map(cookie => {
            const [name, value] = cookie.trim().split('=');
            return { name, value };
          });
        },
        setAll() {
          // API 라우트에서는 쿠키 설정이 제한적
          // 필요시 Response 헤더에서 처리
        },
      },
    },
  );
};

// 연락처 폼 제출 전용 클라이언트 (서비스 키 사용, RLS 우회)
export const createContactFormClient = () => {
  // 서비스 키가 있으면 사용하고, 없으면 익명 키 사용
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // 연락처 폼에서는 쿠키 설정 불필요
        },
      },
    },
  );
};

// generateStaticParams에서 사용할 수 있는 클라이언트 (cookies 없이)
export const createStaticClient = () => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // 정적 생성 시에는 쿠키 설정 불가
        },
      },
    },
  );
};
