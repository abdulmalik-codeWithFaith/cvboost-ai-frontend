"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  BarChart3,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Plus,
  ScrollText,
  Search,
  Sparkles,
  Timer,
} from "lucide-react";
import { AccentText, Counter, H, IMG, Photo, Reveal, SectionHeading, SpotlightCard } from "./HomeUI";

export function Features() {
  const bars = [
    { label: "Keyword match", value: 92 },
    { label: "Action verbs", value: 85 },
    { label: "ATS readability", value: 97 },
    { label: "Formatting", value: 90 },
  ];
  const chips = [
    { keyword: "React", ok: true },
    { keyword: "TypeScript", ok: true },
    { keyword: "GraphQL", ok: false },
    { keyword: "CI/CD", ok: true },
    { keyword: "Mentoring", ok: false },
    { keyword: "Accessibility", ok: true },
  ];

  return (
    <section id="features" className="relative scroll-mt-20 border-y border-white/5 bg-[#0b0e16]/60 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What you get"
          title="Everything a recruiter's filter looks for"
          sub="Generative AI that gets your application past automated screening and still reads well to a human."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {/* ATS score */}
          <Reveal className="lg:col-span-2">
            <SpotlightCard className="h-full p-7">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4cd7f6]/10 text-[#4cd7f6]">
                    <BarChart3 size={22} />
                  </span>
                  <h3 className={`${H} mb-2 text-xl font-bold text-white`}>ATS score analysis</h3>
                  <p className="text-sm leading-relaxed text-[#9aa0b4]">
                    See how your CV scores against the job description, with a breakdown of exactly what to fix.
                  </p>
                </div>
                <div className="space-y-3">
                  {bars.map((bar, index) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex justify-between text-xs text-[#b7bccf]">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-primary-container"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Fast */}
          <Reveal delay={0.08}>
            <SpotlightCard className="h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b4c5ff]/10 text-[#b4c5ff]">
                <Timer size={22} />
              </span>
              <p className={`${H} text-5xl font-extrabold text-white`}>
                <Counter to={30} suffix="s" />
              </p>
              <h3 className={`${H} mb-2 mt-2 text-xl font-bold text-white`}>Fast results</h3>
              <p className="text-sm leading-relaxed text-[#9aa0b4]">
                Tailor your materials in seconds and spend the saved time preparing for interviews.
              </p>
            </SpotlightCard>
          </Reveal>

          {/* AI optimization with photo */}
          <Reveal delay={0.04}>
            <SpotlightCard className="h-full">
              <div className="relative h-40 overflow-hidden">
                <Photo src={IMG.feature} alt="Developer working at a laptop" className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-surface/70" />
              </div>
              <div className="p-7 pt-3">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b4c5ff]/10 text-[#b4c5ff]">
                  <Sparkles size={22} />
                </span>
                <h3 className={`${H} mb-2 text-xl font-bold text-white`}>AI optimization</h3>
                <p className="text-sm leading-relaxed text-[#9aa0b4]">
                  Bullet points rewritten with strong action verbs and the keywords the role asks for.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Keyword matching */}
          <Reveal delay={0.08}>
            <SpotlightCard className="h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4cd7f6]/10 text-[#4cd7f6]">
                <Search size={22} />
              </span>
              <h3 className={`${H} mb-2 text-xl font-bold text-white`}>Keyword matching</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#9aa0b4]">
                Spot the keywords you&apos;re missing and work them in naturally.
              </p>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip, index) => (
                  <motion.span
                    key={chip.keyword}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.07, type: "spring", stiffness: 300, damping: 18 }}
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      chip.ok ? "bg-[#4cd7f6]/10 text-[#4cd7f6]" : "border border-dashed border-[#f5b87a]/50 text-[#f5b87a]"
                    }`}
                  >
                    {chip.ok ? "✓ " : "+ "}
                    {chip.keyword}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Cover letter */}
          <Reveal delay={0.12}>
            <SpotlightCard className="h-full p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b4c5ff]/10 text-[#b4c5ff]">
                <ScrollText size={22} />
              </span>
              <h3 className={`${H} mb-2 text-xl font-bold text-white`}>Cover letter generator</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#9aa0b4]">
                A personal letter that connects your experience to the job.
              </p>
              <div className="space-y-2" aria-hidden>
                {[100, 92, 96, 60].map((width, index) => (
                  <motion.div
                    key={index}
                    className="h-2 rounded-full bg-white/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${width}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + index * 0.15 }}
                  />
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Download */}
          <Reveal className="lg:col-span-3" delay={0.05}>
            <SpotlightCard className="p-7">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4cd7f6]/10 text-[#4cd7f6]">
                    <Download size={22} />
                  </span>
                  <div>
                    <h3 className={`${H} mb-1 text-xl font-bold text-white`}>Download-ready</h3>
                    <p className="max-w-xl text-sm leading-relaxed text-[#9aa0b4]">
                      Export in clean, ATS-friendly PDF or DOCX. Simple layouts and standard headings, so parsers read every line.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {["PDF", "DOCX"].map((format, index) => (
                    <motion.div
                      key={format}
                      whileHover={{ y: -4, rotate: index ? 2 : -2 }}
                      className="flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5"
                    >
                      <FileText size={20} className="text-[#b4c5ff]" />
                      <span className="text-xs font-semibold text-white">{format}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: FileText, title: "Upload your CV", desc: "Add your existing resume as PDF or Word. We keep your layout and content intact." },
  { icon: ScrollText, title: "Add the job details", desc: "Paste the job description text. The more detail, the sharper the match." },
  { icon: Sparkles, title: "AI optimizes it", desc: "We score your CV, find keyword gaps and rewrite weak bullets for that role." },
  { icon: Download, title: "Download and apply", desc: "Export the tailored resume and cover letter, then send them off." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });

  return (
    <section id="how-it-works" className="scroll-mt-20 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Simple process" title="Four steps to a tailored application" sub="No templates to fill in and no keywords to guess." />

        <div className="grid items-start gap-14 lg:grid-cols-2">
          <Reveal x={-30} y={0} className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Photo src={IMG.steps} alt="People collaborating on laptops" className="h-[420px] w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-black/30" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161a26]/80 p-4 backdrop-blur-xl"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6]">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Tailored resume ready</p>
                  <p className="text-xs text-[#9aa0b4]">Cover letter included</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <div ref={ref} className="relative pl-2">
            <div aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" />
            <motion.div
              aria-hidden
              style={{ scaleY }}
              className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-primary-container"
            />
            <ol className="space-y-10">
              {STEPS.map((step, index) => (
                <Reveal key={step.title} x={30} y={0} delay={index * 0.05}>
                  <li className="relative flex gap-5">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#10131c]">
                      <span className={`${H} text-lg font-extrabold text-[#b4c5ff]`}>{index + 1}</span>
                    </span>
                    <div className="pt-1.5">
                      <h3 className={`${H} mb-1 flex items-center gap-2 text-lg font-bold text-white`}>
                        <step.icon size={17} className="text-[#4cd7f6]" />
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#9aa0b4]">{step.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

const SAMPLES = [
  {
    role: "Software engineer",
    before: "Worked on backend services and fixed bugs for the team.",
    after: "*Architected* and shipped *Node.js microservices* handling 2M requests a day, cutting *p95 latency by 40%*.",
    from: 48,
    to: 91,
  },
  {
    role: "Marketing manager",
    before: "Responsible for social media and email campaigns.",
    after: "*Grew organic social reach 3x* and lifted *email conversion by 22%* through *A/B-tested lifecycle campaigns*.",
    from: 44,
    to: 89,
  },
  {
    role: "Project manager",
    before: "Managed projects and made sure they were finished on time.",
    after: "*Delivered 12 cross-functional projects* on schedule and *18% under budget* using *Agile* and *stakeholder reporting*.",
    from: 51,
    to: 93,
  },
];

function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, index) =>
        index % 2 ? (
          <mark key={index} className="rounded bg-[#4cd7f6]/15 px-1 text-[#4cd7f6]">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const sample = SAMPLES[index];
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#0b0e16]/60 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Before and after"
          title={
            <>
              Same experience, <AccentText>stronger wording</AccentText>
            </>
          }
          sub="Pick a role to see how a vague bullet becomes one recruiters remember. Example content."
        />

        <Reveal>
          <div role="tablist" aria-label="Example roles" className="mx-auto mb-8 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {SAMPLES.map((item, itemIndex) => (
              <button
                key={item.role}
                role="tab"
                aria-selected={index === itemIndex}
                onClick={() => setIndex(itemIndex)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-[#c3c6d7] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              >
                {index === itemIndex && (
                  <motion.span
                    layoutId="ba-pill"
                    className="absolute inset-0 rounded-full bg-primary-container"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${index === itemIndex ? "text-white" : ""}`}>{item.role}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={sample.role}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid gap-5 md:grid-cols-2"
          >
            <div className="rounded-2xl border border-white/10 bg-[#161a26]/70 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#9aa0b4]">Original</span>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#9aa0b4]">ATS {sample.from}</span>
              </div>
              <p className="text-base leading-relaxed text-[#9aa0b4] line-through decoration-white/20">{sample.before}</p>
            </div>
            <div className="relative rounded-2xl border border-[#4cd7f6]/30 bg-[#161a26]/90 p-6 shadow-[0_0_50px_rgba(76,215,246,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#4cd7f6]">
                  <Sparkles size={14} /> Optimized
                </span>
                <span className="rounded-full bg-[#4cd7f6]/15 px-2.5 py-1 text-xs font-semibold text-[#4cd7f6]">ATS {sample.to}</span>
              </div>
              <p className="text-base leading-relaxed text-white">
                <Highlight text={sample.after} />
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}