import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Skill {
  name: string;
  icon_url?: string;
  proficiency?: number;
}

const TechStackCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          whileHover={{ y: -6, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Card className="p-4 flex flex-col items-center justify-center transition-shadow hover:shadow-md border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-0">
              {skill.icon_url ? (
                <Image
                  src={skill.icon_url}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="object-contain w-12 h-12 rounded-full dark:invert"
                />
              ) : (
                <Avatar className="w-12 h-12 mb-0">
                  <AvatarFallback className="text-2xl font-bold">
                    {skill.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <p className="text-sm font-medium text-center mt-2">{skill.name}</p>
              {typeof skill.proficiency === "number" && (
                <div className="flex items-center justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Star
                      key={level}
                      size={14}
                      className={
                        level <= (skill.proficiency ?? 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }
                      fill={level <= (skill.proficiency ?? 0) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        {skill.name}
      </TooltipContent>
    </Tooltip>
  );
};

export default TechStackCard; 