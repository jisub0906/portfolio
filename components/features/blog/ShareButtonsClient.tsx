"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/Icon";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareButtonsClientProps {
  postTitle: string;
  className?: string;
}

const ShareButtonsClient: React.FC<ShareButtonsClientProps> = ({
  postTitle,
  className,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    if (!currentUrl) return;

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(postTitle);

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=450");
  };

  const handleCopyLink = async () => {
    if (!navigator.clipboard) {
      toast.error("클립보드 접근이 지원되지 않는 환경입니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("게시물 링크가 복사되었습니다!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("링크 복사에 실패했습니다.");
    }
  };

  // currentUrl이 설정되지 않았으면 렌더링하지 않음
  if (!currentUrl) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("twitter")}
        aria-label="트위터에 공유"
      >
        <Icon name="Twitter" className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("facebook")}
        aria-label="페이스북에 공유"
      >
        <Icon name="Facebook" className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("linkedin")}
        aria-label="LinkedIn에 공유"
      >
        <Icon name="Linkedin" className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        aria-label="게시물 링크 복사"
      >
        <Icon name={copied ? "CheckCircle2" : "Copy"} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ShareButtonsClient; 