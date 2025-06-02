export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  portfolio: {
    Tables: {
      about_me: {
        Row: {
          id: number
          profile_image_url: string | null
          content_markdown: string
          resume_pdf_url: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          profile_image_url?: string | null
          content_markdown: string
          resume_pdf_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          profile_image_url?: string | null
          content_markdown?: string
          resume_pdf_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string | null
          content_markdown: string
          thumbnail_url: string | null
          category_id: string | null
          tags: string[] | null
          is_published: boolean
          published_at: string | null
          view_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary?: string | null
          content_markdown: string
          thumbnail_url?: string | null
          category_id?: string | null
          tags?: string[] | null
          is_published?: boolean
          published_at?: string | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string | null
          content_markdown?: string
          thumbnail_url?: string | null
          category_id?: string | null
          tags?: string[] | null
          is_published?: boolean
          published_at?: string | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          is_read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      project_tech_stacks: {
        Row: {
          project_id: string
          tech_stack_id: string
          created_at: string
        }
        Insert: {
          project_id: string
          tech_stack_id: string
          created_at?: string
        }
        Update: {
          project_id?: string
          tech_stack_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tech_stacks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tech_stacks_tech_stack_id_fkey"
            columns: ["tech_stack_id"]
            isOneToOne: false
            referencedRelation: "tech_stacks"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          name: string
          slug: string
          summary: string | null
          description_markdown: string
          role_description_markdown: string | null
          tech_stack_description_markdown: string | null
          results_retrospective_markdown: string | null
          main_image_url: string | null
          thumbnail_url: string | null
          screenshots_urls: string[] | null
          live_demo_url: string | null
          github_repo_url: string | null
          start_date: string | null
          end_date: string | null
          is_featured: boolean | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          summary?: string | null
          description_markdown: string
          role_description_markdown?: string | null
          tech_stack_description_markdown?: string | null
          results_retrospective_markdown?: string | null
          main_image_url?: string | null
          thumbnail_url?: string | null
          screenshots_urls?: string[] | null
          live_demo_url?: string | null
          github_repo_url?: string | null
          start_date?: string | null
          end_date?: string | null
          is_featured?: boolean | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          summary?: string | null
          description_markdown?: string
          role_description_markdown?: string | null
          tech_stack_description_markdown?: string | null
          results_retrospective_markdown?: string | null
          main_image_url?: string | null
          thumbnail_url?: string | null
          screenshots_urls?: string[] | null
          live_demo_url?: string | null
          github_repo_url?: string | null
          start_date?: string | null
          end_date?: string | null
          is_featured?: boolean | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tech_categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tech_stacks: {
        Row: {
          id: string
          name: string
          category_id: string | null
          icon_svg_content: string | null
          icon_url: string | null
          proficiency_level: number | null
          summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id?: string | null
          icon_svg_content?: string | null
          icon_url?: string | null
          proficiency_level?: number | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string | null
          icon_svg_content?: string | null
          icon_url?: string | null
          proficiency_level?: number | null
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tech_stacks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "tech_categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PortfolioSchema = Database[Extract<keyof Database, "portfolio">]

export type Tables<
  TableNameOrOptions extends
    | keyof (PortfolioSchema["Tables"] & PortfolioSchema["Views"])
    | { schema: keyof Database },
  TableName extends TableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[TableNameOrOptions["schema"]]["Tables"] &
        Database[TableNameOrOptions["schema"]]["Views"])
    : never = never,
> = TableNameOrOptions extends { schema: keyof Database }
  ? (Database[TableNameOrOptions["schema"]]["Tables"] &
      Database[TableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : TableNameOrOptions extends keyof (PortfolioSchema["Tables"] &
        PortfolioSchema["Views"])
    ? (PortfolioSchema["Tables"] &
        PortfolioSchema["Views"])[TableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  TableNameOrOptions extends
    | keyof PortfolioSchema["Tables"]
    | { schema: keyof Database },
  TableName extends TableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[TableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = TableNameOrOptions extends { schema: keyof Database }
  ? Database[TableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : TableNameOrOptions extends keyof PortfolioSchema["Tables"]
    ? PortfolioSchema["Tables"][TableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  TableNameOrOptions extends
    | keyof PortfolioSchema["Tables"]
    | { schema: keyof Database },
  TableName extends TableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[TableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = TableNameOrOptions extends { schema: keyof Database }
  ? Database[TableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : TableNameOrOptions extends keyof PortfolioSchema["Tables"]
    ? PortfolioSchema["Tables"][TableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

// 편의를 위한 타입 별칭들
export type Project = Tables<"projects">
export type ProjectInsert = TablesInsert<"projects">
export type ProjectUpdate = TablesUpdate<"projects">

export type TechCategory = Tables<"tech_categories">
export type TechCategoryInsert = TablesInsert<"tech_categories">
export type TechCategoryUpdate = TablesUpdate<"tech_categories">

export type TechStack = Tables<"tech_stacks">
export type TechStackInsert = TablesInsert<"tech_stacks">
export type TechStackUpdate = TablesUpdate<"tech_stacks">

export type ProjectTechStack = Tables<"project_tech_stacks">
export type ProjectTechStackInsert = TablesInsert<"project_tech_stacks">
export type ProjectTechStackUpdate = TablesUpdate<"project_tech_stacks">

export type AboutMe = Tables<"about_me">
export type AboutMeInsert = TablesInsert<"about_me">
export type AboutMeUpdate = TablesUpdate<"about_me">

export type BlogCategory = Tables<"blog_categories">
export type BlogCategoryInsert = TablesInsert<"blog_categories">
export type BlogCategoryUpdate = TablesUpdate<"blog_categories">

export type BlogPost = Tables<"blog_posts">
export type BlogPostInsert = TablesInsert<"blog_posts">
export type BlogPostUpdate = TablesUpdate<"blog_posts">

export type Contact = Tables<"contacts">
export type ContactInsert = TablesInsert<"contacts">
export type ContactUpdate = TablesUpdate<"contacts">

// 조인된 데이터를 위한 확장 타입들
export type ProjectWithTechStacks = Project & {
  tech_stacks: TechStack[]
}

export type TechStackWithCategory = TechStack & {
  category: TechCategory | null
}

export type BlogPostWithCategory = BlogPost & {
  category: BlogCategory | null
} 