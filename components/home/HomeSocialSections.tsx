"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus, Sparkles, Star } from "lucide-react";
import { AccentText, btnGhost, btnPrimary, Counter, EASE, H, IMG, Photo, Reveal, SectionHeading } from "./HomeUI";

export function Stats() {
  // TODO: replace with real product numbers before launch.
  const stats = [
    { value: 30, suffix: "s", label: "typical turnaround" },
    { value: 6, suffix: "", label: "ATS parsers tested" },
    { value: 2, suffix: "", label: "export formats" },
    { value: 100, suffix: "%", label: "private by default" },
  ];
  return (
    <section className="px-4 py-20 md:px-7">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08} className="text-center">
            <p className={`${H} text-4xl font-extrabold md:text-5xl`}>
              <AccentText>
                <Counter to={stat.value} suffix={stat.suffix} />
              </AccentText>
            </p>
            <p className="mt-1 text-sm text-[#9aa0b4]">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// TODO: replace these placeholder quotes and names with real customer testimonials.
const TESTIMONIALS = [
  { name: "Amara O.", role: "Product designer", img: IMG.p1, quote: "I finally understood why my CV kept getting ignored. Two keyword fixes and I had three interview invites." },
  { name: "Daniel K.", role: "Backend engineer", img: IMG.p2, quote: "The rewrites sounded like me, only sharper. The cover letter draft saved me an entire evening." },
  { name: "Tola A.", role: "Marketing lead", img: IMG.p3, quote: "Seeing the score change as I edited made it feel like a game. I stopped guessing what recruiters wanted." },
];

export function Testimonials() {
  return (
    <section className="px-4 pb-28 md:px-7">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Job seekers who stopped guessing" />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <motion.figure whileHover={{ y: -6 }} className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-[#161a26]/70 p-6 backdrop-blur">
                <div className="flex gap-0.5 text-[#f5c451]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-[#dfe3f5]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3">
                  <Photo src={testimonial.img} alt={`${testimonial.name}, ${testimonial.role}`} className="h-10 w-10 rounded-full object-cover" />
                  <span>
                    <span className="block text-sm font-semibold text-white">{testimonial.name}</span>
                    <span className="text-xs text-[#9aa0b4]">{testimonial.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// TODO: replace plan names, prices and limits with your real pricing.
const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "Try it on a real application.",
    features: ["3 optimizations a month", "ATS score and keyword gaps", "1 cover letter a month", "PDF export"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    monthly: 12,
    yearly: 9,
    blurb: "For an active job search.",
    features: ["Unlimited optimizations", "Unlimited cover letters", "PDF and DOCX export", "Saved job history", "Priority processing"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Career",
    monthly: 29,
    yearly: 22,
    blurb: "For coaches and career changers.",
    features: ["Everything in Pro", "Multiple CV profiles", "LinkedIn summary rewrite", "Interview question prep"],
    cta: "Choose Career",
    featured: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-white/5 bg-[#0b0e16]/60 px-4 py-28 md:px-7">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Pricing" title="Start free, upgrade when you're hiring-season busy" sub="Cancel any time." />

        <Reveal>
          <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1" role="group" aria-label="Billing period">
            {[
              { label: "Monthly", yearly: false },
              { label: "Yearly", yearly: true },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => setYearly(option.yearly)}
                aria-pressed={yearly === option.yearly}
                className="relative rounded-full px-5 py-2 text-sm font-medium text-[#c3c6d7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              >
                {yearly === option.yearly && (
                  <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-primary-container" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className={`relative ${yearly === option.yearly ? "text-white" : ""}`}>
                  {option.label}
                  {option.yearly && <span className="ml-1.5 text-xs text-[#4cd7f6]">save ~25%</span>}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.1}>
              <motion.div whileHover={{ y: -6 }} className={`relative h-full rounded-3xl ${plan.featured ? "border border-primary-container" : ""}`}>
                <div className={`relative flex h-full flex-col rounded-3xl p-7 ${plan.featured ? "bg-[#131726]" : "border border-white/10 bg-[#161a26]/70"}`}>
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-container px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className={`${H} text-xl font-bold text-white`}>{plan.name}</h3>
                  <p className="mt-1 text-sm text-[#9aa0b4]">{plan.blurb}</p>
                  <p className="mb-6 mt-5 flex items-end gap-1">
                    <span className={`${H} flex overflow-hidden text-5xl font-extrabold text-white`}>
                      $
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={yearly ? "y" : "m"}
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -30, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {yearly ? plan.yearly : plan.monthly}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="pb-1.5 text-sm text-[#9aa0b4]">/month</span>
                  </p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#dfe3f5]">
                        <Check size={16} className="mt-0.5 shrink-0 text-[#4cd7f6]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className={plan.featured ? btnPrimary : btnGhost}>
                    <span className="relative">{plan.cta}</span>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Do I need an account to try it?", a: "No. The preview above works without signing up. You only create an account when you want to download the optimized CV and cover letter." },
  { q: "What is an ATS and why does it matter?", a: "An applicant tracking system is software many employers use to filter applications. It reads your CV for keywords and structure before a person sees it, so a CV that doesn't match the job can be filtered out." },
  { q: "Will you invent experience I don't have?", a: "No. Rewrites reshape your real experience with stronger wording and relevant keywords. You review every change before you export." },
  { q: "Which file formats do you support?", a: "You can upload PDF, DOCX or TXT files up to 5 MB, and export as PDF or DOCX." },
  { q: "Is my CV kept private?", a: "Your CV is used only to generate your results. See our Privacy page for how long files are kept and how to delete them." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
      >
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-[#4cd7f6]">
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-5 text-sm leading-relaxed text-[#9aa0b4]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-28 md:px-7">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Reveal>
          <div className="border-t border-white/10">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-4 pb-24 md:px-7">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 px-8 py-20 text-center">
          <Photo src={IMG.cta} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div aria-hidden className="absolute inset-0 bg-[#090e15]/75" />
          <div className="relative z-10">
            <h2 className={`${H} mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white md:text-5xl`}>Ready to land more interviews?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
              Stop guessing what recruiters want. Tailor your application to the job in seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <motion.a
                href="#try"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={btnPrimary}
              >
                Try it now <ArrowRight size={16} />
              </motion.a>
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}