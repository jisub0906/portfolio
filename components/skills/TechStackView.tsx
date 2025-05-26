'use client';

import React from "react";
import TechStackCard from "./TechStackCard";

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
    <div className="space-y-12">
      {techStackData.map(({ category, skills }) => (
        <section key={category}>
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {category}
              <span className="h-0.5 w-8 bg-blue-500 rounded ml-2" />
            </h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-6">
            {skills.map((skill) => (
              <TechStackCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TechStackView; 