// components/features/about/ProfileImage.tsx - 프로필 이미지 컴포넌트

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  imageUrl?: string | null;
  altText?: string;
  size?: number;
  className?: string;
}

const ProfileImage = ({
  imageUrl,
  altText = "JISUB 프로필 이미지",
  size = 128,
  className,
}: ProfileImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/50 shadow-lg",
        "bg-gradient-to-br from-background to-muted/30",
        "w-full aspect-[4/5]", // 4:5 비율로 변경하여 더 적절한 세로 길이
        "hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {imageUrl ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={altText}
            width={size}
            height={Math.round(size * 1.25)} // 4:5 비율
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>
      ) : (
        <motion.div 
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            name="UserCircle2"
            className={cn(
              `w-[${size * 0.4}px] h-[${size * 0.4}px]`,
              "text-muted-foreground"
            )}
          />
        </motion.div>
      )}
      
      {/* 미묘한 오버레이 효과 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
};

export default ProfileImage; 