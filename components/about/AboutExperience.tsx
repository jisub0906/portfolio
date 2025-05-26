import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Experience } from "./AboutMeView";

interface AboutExperienceProps {
  experiences: Experience[];
}

const AboutExperience: React.FC<AboutExperienceProps> = ({ experiences }) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
        경력 <span className="h-0.5 w-8 bg-blue-500 rounded ml-2" />
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp, idx) => (
          <Card key={idx} className="border-slate-200 dark:border-slate-700 shadow-sm rounded-xl">
            <CardHeader className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">{exp.company}</span>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{exp.role}</div>
              {exp.description && (
                <div className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line">{exp.description}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AboutExperience; 