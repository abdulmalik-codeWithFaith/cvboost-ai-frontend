"use client";

import { useState } from "react";

const mockLetter = {
  name: "Alex Morgan",
  location: "San Francisco, CA • (555) 123-4567",
  email: "alex.morgan@example.com • linkedin.com/in/alexmorgan",
  date: "October 24, 2024",
  greeting: "Dear Hiring Manager,",
  intro: `I am writing to express my strong interest in the Senior Product Designer position at Acme Corp. With over 6 years of experience driving user-centric design strategies for high-growth tech startups, I am consistently impressed by Acme Corp's commitment to pushing the boundaries of spatial computing. My expertise in building scalable design systems and leading cross-functional teams aligns perfectly with the innovative culture described in your job posting.`,
  body: `In my current role at Vertex Solutions, I spearheaded the redesign of our flagship analytics platform, resulting in a 40% increase in user engagement and a 25% reduction in onboarding time. Key highlights of my relevant experience include:`,
  bullets: [
    "Architected a comprehensive design system utilized by 4 distinct product lines, reducing design-to-development handoff friction.",
    "Mentored a team of 3 junior designers, fostering a culture of continuous learning and rigorous design critique.",
    "Conducted extensive generative user research that directly informed the product roadmap for Q3 and Q4.",
  ],
  closing: `I am eager to bring my blend of strategic design thinking and hands-on execution to the talented team at Acme Corp. Thank you for considering my application. I look forward to the possibility of discussing how my skills and vision can contribute to your upcoming product launches.`,
  signoff: "Sincerely,",
};

export default function CoverLetterEditor() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById("letter-content")?.innerText || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
            Generated Cover Letter
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-2xl">
            Your personalized cover letter, optimized for impact and alignment
            with the job description. Edit directly below or regenerate with new
            parameters.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="glass-panel px-4 py-2.5 rounded-lg text-sm font-semibold text-on-surface hover:text-primary transition-all flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">
              {copied ? "check" : "content_copy"}
            </span>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button className="glass-panel px-4 py-2.5 rounded-lg text-sm font-semibold text-on-surface hover:text-primary transition-all flex items-center gap-2 group">
            <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">
              description
            </span>
            DOCX
          </button>
          <button className="glass-panel px-4 py-2.5 rounded-lg text-sm font-semibold text-on-surface hover:text-primary transition-all flex items-center gap-2 group">
            <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">
              picture_as_pdf
            </span>
            PDF
          </button>
          <button className="bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 ai-glow ml-2">
            <span className="material-symbols-outlined text-lg">
              auto_awesome
            </span>
            Regenerate
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="glass-panel rounded-xl overflow-hidden shadow-2xl relative">
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* Toolbar */}
        <div className="bg-surface-container/80 border-b border-outline-variant p-3 flex flex-wrap items-center gap-2 md:gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-1 border-r border-outline-variant pr-4">
            {["format_bold", "format_italic", "format_underlined"].map((icon) => (
              <button
                key={icon}
                className="p-1.5 rounded text-on-surface-variant hover:bg-white/10 hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 border-r border-outline-variant pr-4">
            {["format_align_left", "format_align_center", "format_align_right"].map((icon) => (
              <button
                key={icon}
                className="p-1.5 rounded text-on-surface-variant hover:bg-white/10 hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {["format_list_bulleted", "format_list_numbered"].map((icon) => (
              <button
                key={icon}
                className="p-1.5 rounded text-on-surface-variant hover:bg-white/10 hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-secondary font-semibold">
            <span className="material-symbols-outlined text-base">check_circle</span>
            AI Optimized (Score: 92%)
          </div>
        </div>

        {/* Document Canvas */}
        <div
          id="letter-content"
          className="p-8 md:p-12 bg-[#05070f]/50 min-h-[600px] leading-relaxed text-on-background"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Contact Info */}
            <div className="editable-block mb-10 text-on-surface-variant text-sm">
              <p className="font-bold text-on-surface mb-1 text-base">
                {mockLetter.name}
              </p>
              <p>{mockLetter.location}</p>
              <p>{mockLetter.email}</p>
              <p className="mt-4">{mockLetter.date}</p>
            </div>

            {/* Greeting */}
            <div className="editable-block">
              <p className="text-on-surface">{mockLetter.greeting}</p>
            </div>

            {/* Intro */}
            <div className="editable-block">
              <p className="text-on-surface">{mockLetter.intro}</p>
            </div>

            {/* Body */}
            <div className="editable-block">
              <p className="text-on-surface">{mockLetter.body}</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 text-on-surface">
                {mockLetter.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>

            {/* Closing */}
            <div className="editable-block">
              <p className="text-on-surface">{mockLetter.closing}</p>
            </div>

            {/* Sign-off */}
            <div className="editable-block mt-8">
              <p className="text-on-surface">{mockLetter.signoff}</p>
              <br />
              <p className="font-bold text-on-surface">{mockLetter.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}