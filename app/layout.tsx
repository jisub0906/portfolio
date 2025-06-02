import type { Metadata } from "next";
import { inter, plusJakartaSans } from "./fonts";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  title: "지섭의 포트폴리오 (JISUB's Portfolio)",
  description: "다양한 웹사이트 및 애플리케이션 프로젝트들을 전시하고, 기술 역량과 경험을 공유하는 개발자 지섭의 개인 포트폴리오입니다.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="ko" 
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning={true}
    >
      <body className={cn(
        "min-h-screen bg-background font-sans text-foreground antialiased flex flex-col"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
