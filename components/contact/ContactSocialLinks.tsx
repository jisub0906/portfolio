import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import clsx from "clsx";

const GITHUB_URL = "https://github.com/jisub0906";
const LINKEDIN_URL = "https://www.linkedin.com/in/jisub-lee-283093284/";

interface ContactSocialLinksProps {
  className?: string;
}

const ContactSocialLinks: React.FC<ContactSocialLinksProps> = ({ className }) => {
  return (
    <div className={clsx("flex flex-row items-center gap-2", className)}>
      <Button asChild variant="outline" size="icon" aria-label="GitHub">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5" />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5" />
        </a>
      </Button>
    </div>
  );
};

export default ContactSocialLinks; 