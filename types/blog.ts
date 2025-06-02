// types/blog.ts - 블로그 관련 타입 정의

export interface Heading {
  id: string;    // HTML 제목 태그에 설정될 ID (예: 'introduction')
  level: number; // 제목 레벨 (예: 2 for H2, 3 for H3)
  text: string;  // 제목 텍스트
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  category_id?: string;
  tags?: string[];
  featured_image?: string;
  meta_description?: string;
  reading_time?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
} 