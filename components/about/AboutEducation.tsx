import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Education } from "./AboutMeView";

interface AboutEducationProps {
  educations: Education[];
}

const AboutEducation: React.FC<AboutEducationProps> = ({ educations }) => {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
        학력 <span className="h-0.5 w-8 bg-blue-500 rounded ml-2" />
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {educations.map((edu, idx) => (
          <Card key={idx} className="border-slate-200 dark:border-slate-700 shadow-sm rounded-xl">
            <CardHeader className="flex flex-col gap-1 pb-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">{edu.institution}</span>
                <span className="text-sm text-muted-foreground">{edu.period}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{edu.degree}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AboutEducation; 