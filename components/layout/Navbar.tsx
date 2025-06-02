"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

// 네비게이션 링크 데이터 정의
const navLinks = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/tech-stack", label: "기술 스택" },
  { href: "/about", label: "자기소개" },
  { href: "/blog", label: "블로그" },
  { href: "/contact", label: "연락처" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* 로고/사이트명 */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icon name="CodeXml" className="h-6 w-6" />
          <span className="font-bold">JISUB&apos;s Portfolio</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 오른쪽 영역 */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* 테마 토글 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="테마 전환"
          >
            <Icon
              name={theme === "dark" ? "Sun" : "Moon"}
              className="h-5 w-5"
            />
          </Button>

          {/* 모바일 메뉴 */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="메뉴 열기"
                >
                  <Icon name="Menu" className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Icon name="CodeXml" className="h-6 w-6" />
                    <span>JISUB&apos;s Portfolio</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-2 py-1 text-lg transition-colors hover:text-foreground/80",
                          pathname === link.href
                            ? "text-foreground font-semibold"
                            : "text-foreground/60"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                {/* 모바일 메뉴 하단 테마 토글 */}
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    <Icon
                      name={theme === "dark" ? "Sun" : "Moon"}
                      className="mr-2 h-4 w-4"
                    />
                    {theme === "dark" ? "라이트 모드" : "다크 모드"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 