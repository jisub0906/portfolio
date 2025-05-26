import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

const GITHUB_URL = "https://github.com/jisub-lee"; // 실제 주소로 교체
const LINKEDIN_URL = "https://linkedin.com/in/jisub-lee"; // 실제 주소로 교체

const Footer: React.FC = () => {
  return (
    <footer className="border-t px-4 py-3 w-full flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
      <div>© 2025 JISUB. All rights reserved.</div>
      <div className="flex gap-1">
        <Button asChild variant="ghost" size="icon" aria-label="GitHub">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </footer>
  );
};

export default Footer; 