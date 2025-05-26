import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AboutProfileProps {
  profileImageUrl: string;
  name: string;
  introduction: string | string[];
  resumeUrl?: string;
}

const AboutProfile: React.FC<AboutProfileProps> = ({ profileImageUrl, name, introduction, resumeUrl }) => {
  return (
    <Card className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 mb-12 bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-sm p-6 border-slate-200 dark:border-slate-700">
      <div className="flex-shrink-0 flex justify-center items-center w-full lg:w-auto">
        <div className="w-40 h-40 relative">
          <Image
            src={profileImageUrl}
            alt={name}
            fill
            sizes="(max-width: 1024px) 160px, 160px"
            className="rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow"
            priority
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start text-left px-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">{name}</h1>
        {Array.isArray(introduction)
          ? introduction.map((para, idx) => (
              <p key={idx} className="mb-1 text-lg text-slate-700 dark:text-slate-300">
                {para}
              </p>
            ))
          : (
              <p className="mb-1 text-lg text-slate-700 dark:text-slate-300">{introduction}</p>
            )}
        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="mt-2">
              <Download className="mr-2" /> 이력서 다운로드
            </Button>
          </a>
        )}
      </div>
    </Card>
  );
};

export default AboutProfile; 