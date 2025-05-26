import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactAnimatedColumns from "@/components/contact/ContactAnimatedColumns";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-background pb-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto pt-16">
        <SectionTitle title="Contact" />
        <ContactAnimatedColumns />
      </div>
    </main>
  );
} 