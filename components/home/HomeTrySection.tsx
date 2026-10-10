"use client";

import { useCallback, useState, type DragEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  FileText,
  Loader2,
  Lock,
  Plus,
  RotateCcw,
  ShieldCheck,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { AccentText, btnPrimary, EASE, Reveal, ScoreRing, SectionHeading } from "./HomeUI";

type Phase = "idle" | "analyzing" | "done";
type Result = { before: number; after: number; matched: string[]; missing: string[] };

const STAGES = ["Reading your CV", "Extracting skills and experience", "Matching against the job", "Rewriting bullet points"];

const SAMPLE_JD = `We're hiring a Senior Frontend Engineer to build our customer dashboard. You'll design React and TypeScript components, improve performance and accessibility, and work with product designers and backend engineers. Requirements: 5+ years of experience with React, TypeScript, REST APIs, testing, CI/CD and agile teams. Bonus: Next.js, GraphQL and mentoring experience.`;

const STOP = new Set(
  "the and for with you your our will are that this from have has been their they who what when where about into over such than then also more most other some can not but all any its out use using used work working team teams role join looking build must able including within across strong good great new years year experience experienced ability bonus requirements responsibilities skills etc per".split(
    " "
  )
);

function extractKeywords(jd: string, n = 10) {
  const counts = new Map<string, number>();
  (jd.toLowerCase().match(/[a-z][a-z+#.\-]{2,}/g) ?? []).forEach((raw) => {
    const word = raw.replace(/[.\-]+$/, "");
    if (word.length < 3 || STOP.has(word)) return;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, n)
    .map(([word]) => word);
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index++) result = (result * 31 + value.charCodeAt(index)) | 0;
  return Math.abs(result);
}

/**
 * TODO: replace with your real analysis endpoint, e.g.
 *   const fd = new FormData(); fd.append("cv", file); fd.append("jd", jd);
 *   const res = await fetch("/api/analyze", { method: "POST", body: fd });
 *   return (await res.json()) as Result;
 *
 * Until then this is a lightweight preview: it pulls keywords from the job
 * description and checks them against the CV text when the upload is a .txt
 * file. For PDF/Word uploads it can't read the file in the browser, so the
 * match split is a stable estimate derived from the file name.
 */
function buildPreview(jd: string, cvText: string, fileName: string): Result {
  const keywords = extractKeywords(jd);
  const matched: string[] = [];
  const missing: string[] = [];
  keywords.forEach((keyword) => {
    const hit = cvText ? cvText.includes(keyword) : hash(keyword + fileName) % 10 < 6;
    (hit ? matched : missing).push(keyword);
  });
  const ratio = keywords.length ? matched.length / keywords.length : 0.5;
  const before = Math.round(Math.min(88, 34 + ratio * 50));
  const after = Math.min(96, before + 14 + missing.length * 2);
  return { before, after, matched, missing };
}

export default function HomeTrySection() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);

  const accept = useCallback((fileToAccept?: File | null) => {
    if (!fileToAccept) return;
    if (!/\.(pdf|docx?|txt)$/i.test(fileToAccept.name)) {
      setError("Use a PDF, Word or TXT file.");
      return;
    }
    if (fileToAccept.size > 5 * 1024 * 1024) {
      setError("That file is over 5 MB. Try a smaller one.");
      return;
    }
    setError("");
    setFile(fileToAccept);
    setPhase("idle");
    setResult(null);
  }, []);

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDrag(false);
    accept(event.dataTransfer.files?.[0]);
  };

  const canRun = !!file && jd.trim().length >= 40 && phase !== "analyzing";

  const run = async () => {
    if (!file || !canRun) return;
    setPhase("analyzing");
    setResult(null);
    setStage(0);
    let cvText = "";
    if (/\.txt$/i.test(file.name)) cvText = (await file.text()).toLowerCase();
    for (let index = 0; index < STAGES.length; index++) {
      setStage(index);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    setResult(buildPreview(jd, cvText, file.name));
    setPhase("done");
  };

  const reset = () => {
    setFile(null);
    setJd("");
    setPhase("idle");
    setResult(null);
    setError("");
  };

  return (
    <section id="try" className="relative scroll-mt-20 px-6 py-28 md:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-outline-variant" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Live preview"
          title={
            <>
              See your score <AccentText>before you sign up</AccentText>
            </>
          }
          sub="Drop in your CV and paste the job you want. You'll get a match score and the keywords you're missing in seconds."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-outline-variant">
            <div className="relative grid gap-0 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#10131c] lg:grid-cols-2">
              {/* form */}
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">1. Upload your CV</p>
                  <label
                    onDragOver={(event) => {
                      event.preventDefault();
                      setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-[#4cd7f6] ${
                      drag ? "border-[#4cd7f6] bg-[#4cd7f6]/10" : "border-white/15 bg-white/[0.03] hover:border-white/30"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="sr-only"
                      onChange={(event) => accept(event.target.files?.[0])}
                    />
                    <AnimatePresence mode="wait" initial={false}>
                      {file ? (
                        <motion.div
                          key="file"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-3"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4cd7f6]/15 text-[#4cd7f6]">
                            <FileText size={20} />
                          </span>
                          <span className="text-left">
                            <span className="block max-w-[14rem] truncate text-sm font-semibold text-white">{file.name}</span>
                            <span className="text-xs text-[#9aa0b4]">{(file.size / 1024).toFixed(0)} KB · click to replace</span>
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[#b4c5ff]"
                          >
                            <UploadCloud size={30} />
                          </motion.span>
                          <span className="text-sm font-medium text-white">Drop your CV here or click to browse</span>
                          <span className="text-xs text-[#9aa0b4]">PDF, DOCX or TXT · up to 5 MB</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                  {error && (
                    <p role="alert" className="mt-2 text-xs text-[#ff9b8a]">
                      {error}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="jd" className="text-sm font-semibold text-white">
                      2. Paste the job description
                    </label>
                    <button type="button" onClick={() => setJd(SAMPLE_JD)} className="text-xs font-medium text-[#4cd7f6] hover:underline">
                      Use a sample
                    </button>
                  </div>
                  <textarea
                    id="jd"
                    value={jd}
                    onChange={(event) => setJd(event.target.value)}
                    rows={7}
                    placeholder="Paste the full job posting here…"
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-[#e1e2ee] placeholder:text-[#6b7086] focus:border-[#4cd7f6]/60 focus:outline-none focus:ring-2 focus:ring-[#4cd7f6]/20"
                  />
                  <p className="mt-1.5 text-xs text-[#8d90a0]">
                    {jd.trim().length < 40 ? `Add a bit more text (${Math.max(0, 40 - jd.trim().length)} characters to go).` : "Ready when you are."}
                  </p>
                </div>

                <button type="button" onClick={run} disabled={!canRun} className={`${btnPrimary} w-full`}>
                  {phase === "analyzing" ? (
                    <>
                      <Loader2 size={16} className="relative animate-spin" />
                      <span className="relative">Analyzing…</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} className="relative" />
                      <span className="relative">Analyze my CV</span>
                    </>
                  )}
                </button>
              </div>

              {/* result panel */}
              <div className="relative border-t border-white/10 bg-[#0b0e16]/70 p-6 md:p-8 lg:border-l lg:border-t-0" aria-live="polite">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[380px] flex-col items-center justify-center gap-5 text-center"
                    >
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-white/15">
                        <motion.div
                          aria-hidden
                          className="absolute inset-2 rounded-full border border-[#4cd7f6]/30"
                          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <BarChart3 size={30} className="text-[#4cd7f6]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Your results show up here</p>
                        <p className="mt-1 max-w-xs text-sm text-[#9aa0b4]">
                          ATS score, matched and missing keywords, and what to change first.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {phase === "analyzing" && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[380px] flex-col justify-center gap-6"
                    >
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-primary-container"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <ul className="space-y-4">
                        {STAGES.map((stageLabel, index) => (
                          <li key={stageLabel} className={`flex items-center gap-3 text-sm transition-colors ${index <= stage ? "text-white" : "text-[#6b7086]"}`}>
                            {index < stage ? (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#4cd7f6]">
                                <CheckCircle2 size={18} />
                              </motion.span>
                            ) : index === stage ? (
                              <Loader2 size={18} className="animate-spin text-[#b4c5ff]" />
                            ) : (
                              <span className="h-[18px] w-[18px] rounded-full border border-white/15" />
                            )}
                            {stageLabel}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {phase === "done" && result && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6"
                    >
                      <div className="flex items-center justify-around gap-4">
                        <div className="text-center">
                          <ScoreRing score={result.before} size={104} />
                          <p className="mt-2 text-xs text-[#9aa0b4]">Your CV now</p>
                        </div>
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 }}
                          className="text-[#4cd7f6]"
                        >
                          <ArrowRight size={22} />
                        </motion.span>
                        <div className="text-center">
                          <ScoreRing score={result.after} size={104} />
                          <p className="mt-2 text-xs text-[#4cd7f6]">After optimizing</p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold text-[#b7bccf]">Keywords found ({result.matched.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {result.matched.map((keyword, index) => (
                            <motion.span
                              key={keyword}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                              className="inline-flex items-center gap-1 rounded-full bg-[#4cd7f6]/10 px-2.5 py-1 text-xs text-[#4cd7f6]"
                            >
                              <Check size={11} /> {keyword}
                            </motion.span>
                          ))}
                          {result.matched.length === 0 && <span className="text-xs text-[#8d90a0]">None yet — that&apos;s the gap to close.</span>}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold text-[#b7bccf]">Missing from your CV ({result.missing.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {result.missing.map((keyword, index) => (
                            <motion.span
                              key={keyword}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                              className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#f5b87a]/50 px-2.5 py-1 text-xs text-[#f5b87a]"
                            >
                              <Plus size={11} /> {keyword}
                            </motion.span>
                          ))}
                          {result.missing.length === 0 && <span className="text-xs text-[#8d90a0]">Nothing critical is missing.</span>}
                        </div>
                        {result.missing[0] && (
                          <p className="mt-3 text-xs leading-relaxed text-[#9aa0b4]">
                            Start by working &ldquo;{result.missing[0]}&rdquo; into your summary and most recent role.
                          </p>
                        )}
                      </div>

                      {/* locked deliverables */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div aria-hidden className="select-none space-y-1.5 text-xs leading-relaxed text-[#c3c6d7] blur-[5px]">
                          <p>Dear Hiring Manager,</p>
                          <p>
                            I&apos;m excited to apply for the role. My background in building fast, accessible interfaces lines up
                            closely with what you&apos;re looking for, and here is how I would contribute in the first 90 days…
                          </p>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0b0e16]/60 p-3 text-center">
                          <Lock size={16} className="text-[#b4c5ff]" />
                          <p className="text-xs font-medium text-white">Optimized CV + cover letter are ready</p>
                          <Link href="/register" className={`${btnPrimary} !px-4 !py-2 !text-xs`}>
                            <span className="relative">Create free account to download</span>
                          </Link>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={reset}
                        className="mx-auto inline-flex items-center gap-1.5 text-xs text-[#9aa0b4] hover:text-white"
                      >
                        <RotateCcw size={12} /> Try another CV
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-[#8d90a0]">
          <ShieldCheck size={13} /> Preview scores are estimates. Sign up for the full analysis.
        </p>
      </div>
    </section>
  );
}