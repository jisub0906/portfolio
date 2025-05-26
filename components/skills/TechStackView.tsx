'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export type TechStackCategory = {
  category: string;
  skills: {
    name: string;
    icon_url?: string;
    proficiency?: number; // 1-5
  }[];
};

interface TechStackViewProps {
  techStackData: TechStackCategory[];
}

const TechStackView: React.FC<TechStackViewProps> = ({ techStackData }) => {
  return (
    <div className="space-y-10">
      {techStackData.map(({ category, skills }) => (
        <section key={category}>
          <h3 className="text-2xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <Tooltip key={skill.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="p-4 flex flex-col items-center justify-center transition-shadow hover:shadow-lg cursor-pointer">
                      <CardContent className="flex flex-col items-center justify-center">
                        {skill.icon_url ? (
                          <Image
                            src={skill.icon_url}
                            alt={skill.name}
                            width={48}
                            height={48}
                            className="object-contain w-12 h-12 rounded-full"
                          />
                        ) : (
                          <Avatar className="w-12 h-12 mb-0">
                            <AvatarFallback className="text-3xl font-bold">
                              {skill.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <p className="text-sm text-center mt-2">{skill.name}</p>
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
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TechStackView; 