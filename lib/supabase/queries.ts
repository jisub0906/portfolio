import { createClient } from "./server";
import type {
  ProjectWithTechStacks,
  TechCategory,
  TechStackWithCategory,
  BlogPostWithCategory,
  BlogCategory,
  AboutMe,
} from "@/types/supabase_portfolio";

/**
 * 공개된 프로젝트 목록을 가져옵니다.
 */
export async function getPublishedProjects(): Promise<ProjectWithTechStacks[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("projects")
    .select(`
      *,
      project_tech_stacks (
        tech_stacks (*)
      )
    `)
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching published projects:", error);
    return [];
  }

  return data.map((project) => ({
    ...project,
    tech_stacks: project.project_tech_stacks.map((pts) => pts.tech_stacks).filter(Boolean),
  })) as ProjectWithTechStacks[];
}

/**
 * 특정 슬러그로 프로젝트를 가져옵니다.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectWithTechStacks | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("projects")
    .select(`
      *,
      project_tech_stacks (
        tech_stacks (*)
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }

  return {
    ...data,
    tech_stacks: data.project_tech_stacks.map((pts) => pts.tech_stacks).filter(Boolean),
  } as ProjectWithTechStacks;
}

/**
 * 주요 프로젝트들을 가져옵니다.
 */
export async function getFeaturedProjects(): Promise<ProjectWithTechStacks[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("projects")
    .select(`
      *,
      project_tech_stacks (
        tech_stacks (*)
      )
    `)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }

  return data.map((project) => ({
    ...project,
    tech_stacks: project.project_tech_stacks.map((pts) => pts.tech_stacks).filter(Boolean),
  })) as ProjectWithTechStacks[];
}

/**
 * 카테고리별로 정렬된 기술 스택을 가져옵니다.
 */
export async function getTechStacksWithCategories(): Promise<TechStackWithCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("tech_stacks")
    .select(`
      *,
      tech_categories (*)
    `)
    .order("name");

  if (error) {
    console.error("Error fetching tech stacks:", error);
    return [];
  }

  return data.map((techStack) => ({
    ...techStack,
    category: techStack.tech_categories,
  })) as TechStackWithCategory[];
}

/**
 * 기술 카테고리 목록을 가져옵니다.
 */
export async function getTechCategories(): Promise<TechCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("tech_categories")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching tech categories:", error);
    return [];
  }

  return data;
}

/**
 * 자기소개 정보를 가져옵니다.
 */
export async function getAboutMe(): Promise<AboutMe | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("about_me")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Error fetching about me:", error);
    return null;
  }

  return data;
}

/**
 * 공개된 블로그 게시물 목록을 가져옵니다.
 */
export async function getPublishedBlogPosts(): Promise<BlogPostWithCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("blog_posts")
    .select(`
      *,
      blog_categories (*)
    `)
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching published blog posts:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    category: post.blog_categories,
  })) as BlogPostWithCategory[];
}

/**
 * 특정 슬러그로 블로그 게시물을 가져옵니다.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithCategory | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("blog_posts")
    .select(`
      *,
      blog_categories (*)
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }

  return {
    ...data,
    category: data.blog_categories,
  } as BlogPostWithCategory;
}

/**
 * 블로그 카테고리 목록을 가져옵니다.
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("blog_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }

  return data;
}

/**
 * 특정 카테고리의 블로그 게시물을 가져옵니다.
 */
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema("portfolio")
    .from("blog_posts")
    .select(`
      *,
      blog_categories!inner (*)
    `)
    .eq("is_published", true)
    .eq("blog_categories.slug", categorySlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts by category:", error);
    return [];
  }

  return data.map((post) => ({
    ...post,
    category: post.blog_categories,
  })) as BlogPostWithCategory[];
}

/**
 * 블로그 게시물 조회수를 증가시킵니다.
 */
export async function incrementBlogPostViewCount(slug: string): Promise<void> {
  const supabase = await createClient();
  
  // 현재 조회수를 가져옵니다
  const { data: currentPost, error: fetchError } = await supabase
    .schema("portfolio")
    .from("blog_posts")
    .select("view_count")
    .eq("slug", slug)
    .single();

  if (fetchError || !currentPost) {
    console.error("Error fetching current view count:", fetchError);
    return;
  }

  // 조회수를 1 증가시킵니다
  const { error: updateError } = await supabase
    .schema("portfolio")
    .from("blog_posts")
    .update({ 
      view_count: (currentPost.view_count || 0) + 1 
    })
    .eq("slug", slug);

  if (updateError) {
    console.error("Error incrementing blog post view count:", updateError);
  }
}

// 프로젝트 관련 쿼리
export async function getProjects() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .schema('portfolio')
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
} 