// components/layout/Footer.tsx - 웹사이트 푸터

import React from "react";
import Icon from "@/components/common/Icon";

// 소셜 미디어 링크 데이터 정의
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/jisub0906",
    iconName: "Github" as const,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jisub-lee-283093284/",
    iconName: "Linkedin" as const,
  },
  {
    name: "Email",
    href: "/contact",
    iconName: "Mail" as const,
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 md:flex-row md:py-10">
        {/* 저작권 텍스트 */}
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} JISUB&apos;s Portfolio. All rights reserved.
        </p>

        {/* 소셜 링크 영역 */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={`${link.name} ${link.href.startsWith("http") ? "profile (opens in a new tab)" : "page"}`}
              className="transition-colors"
            >
              <Icon
                name={link.iconName}
                className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 