// components/features/contact/ContactInfo.tsx - 연락처 정보 표시 컴포넌트

import React from "react";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface ContactItem {
  name: string;
  value: string;
  iconName: "Mail" | "Linkedin" | "Github";
  type: "email" | "link";
  ariaLabel: string;
}

const contactItems: ContactItem[] = [
  {
    name: "Email",
    value: "jisub.portfolio@example.com",
    iconName: "Mail",
    type: "email",
    ariaLabel: "이메일 보내기",
  },
  {
    name: "LinkedIn",
    value: "https://www.linkedin.com/in/jisubdev",
    iconName: "Linkedin",
    type: "link",
    ariaLabel: "LinkedIn 프로필 방문 (새 창)",
  },
  {
    name: "GitHub",
    value: "https://github.com/jisubkim",
    iconName: "Github",
    type: "link",
    ariaLabel: "GitHub 프로필 방문 (새 창)",
  },
];

interface ContactInfoProps {
  className?: string;
  itemClassName?: string;
  iconClassName?: string;
  textClassName?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  className,
  itemClassName,
  iconClassName,
  textClassName,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {contactItems.map((item) => (
        <div
          key={item.name}
          className={cn("flex items-center gap-3", itemClassName)}
        >
          <Icon
            name={item.iconName}
            className={cn(
              "h-5 w-5 flex-shrink-0 text-muted-foreground",
              iconClassName
            )}
          />
          {item.type === "email" ? (
            <a
              href={`mailto:${item.value}`}
              aria-label={item.ariaLabel}
              className={cn(
                "text-sm text-foreground hover:text-primary hover:underline break-all transition-colors",
                textClassName
              )}
            >
              {item.value}
            </a>
          ) : (
            <a
              href={item.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className={cn(
                "text-sm text-foreground hover:text-primary hover:underline break-all transition-colors",
                textClassName
              )}
            >
              {item.name} 프로필
              <Icon
                name="ExternalLink"
                className="ml-1 inline-block h-3.5 w-3.5 flex-shrink-0"
              />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactInfo; 