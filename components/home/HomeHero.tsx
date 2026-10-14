"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Sparkles } from "lucide-react";
import { AccentText, btnGhost, btnPrimary, EASE, H, IMG, Photo, ScoreRing } from "./HomeUI";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const line1 = ["Optimize", "your", "CV"];

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center px-4 pb-24 pt-32 md:px-7">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4cd7f6] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4cd7f6]" />
            </span>
            <span className="text-xs font-medium text-[#c3c6d7]">Free preview — no account needed</span>
          </motion.div>

          <h1 className={`${H} text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl`}>
            <span className="block">
              {line1.map((word, index) => (
                <span key={word} className="mr-3 inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.09, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <AccentText>for every job</AccentText>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="max-w-lg text-lg leading-relaxed text-[#b7bccf]"
          >
            Upload your CV, paste a job description, and get an ATS-optimized resume and a personalized cover letter. Try it
            right now, no sign-up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-2 flex flex-wrap gap-3"
          >
            <a href="#try" className={btnPrimary}>
              <span className="relative">Try it now</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link href="/login" className={btnGhost}>
              Login
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9aa0b4]"
          >
            {["No credit card", "PDF & Word supported", "Your CV stays private"].map((text) => (
              <li key={text} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#4cd7f6]" />
                {text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div style={{ y: imgY }} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-[#2563eb]/12">
              <Photo src={IMG.hero} alt="Job seeker reviewing a resume on a laptop" className="h-125 w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* score card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 bottom-8 w-68 rounded-2xl border border-white/10 bg-[#161a26]/80 p-4 shadow-2xl shadow-black/15 backdrop-blur-xl md:-left-10"
            >
              <div className="mb-3 flex items-center gap-3">
                <ScoreRing score={92} size={64} />
                <div>
                  <p className="text-sm font-semibold text-white">ATS score</p>
                  <p className="text-xs text-[#9aa0b4]">Senior Developer.pdf</p>
                </div>
              </div>
              {[
                { label: "Keyword match", value: 92 },
                { label: "Action verbs", value: 85 },
                { label: "Readability", value: 97 },
              ].map((metric, index) => (
                <div key={metric.label} className="mb-2 last:mb-0">
                  <div className="mb-1 flex justify-between text-[11px] text-[#b7bccf]">
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-primary-container"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1.2, delay: 1 + index * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* rewrite card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-8 w-60 rounded-2xl border border-white/10 bg-[#161a26]/80 p-4 shadow-2xl shadow-black/15 backdrop-blur-xl md:-right-8"
            >
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#4cd7f6]">
                <Sparkles size={13} /> AI rewrite
              </p>
              <p className="text-xs italic leading-relaxed text-[#c3c6d7]">
                &quot;Spearheaded scalable microservices, cutting latency by 40% and hitting a 99.9% uptime SLA.&quot;
              </p>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-6 top-[46%] rounded-full border border-[#4cd7f6]/30 bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#2563eb]/24"
            >
              +14 keywords
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ["Workday", "Greenhouse", "Lever", "Taleo", "iCIMS", "SmartRecruiters", "Ashby", "BambooHR"];
  const row = [...items, ...items];
  return (
    <section aria-label="Supported applicant tracking systems" className="border-y border-white/5 bg-[#0b0e16]/60 py-8">
      <p className="mb-5 text-center text-sm text-[#8d90a0]">Built around the parsers recruiters actually use</p>
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {row.map((name, index) => (
            <span key={`${name}-${index}`} className={`${H} text-xl font-bold text-white/30`}>
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}