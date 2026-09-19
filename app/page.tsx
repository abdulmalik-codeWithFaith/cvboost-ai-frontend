"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * CVBoost landing page — single file (app/page.tsx)
 *
 * Deps:  npm i framer-motion lucide-react
 * Fonts: loaded in layout.tsx (Syne = font-heading, Inter = body). Nothing to load here.
 * Images: plain <img> from images.unsplash.com, so no next.config changes needed.
 *         Every image has a gradient fallback if the URL fails to load.
 *
 * Search for "TODO" to find the things you should replace with real data
 * (demo analysis, stats, testimonials, pricing).
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type DragEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Lock,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  UploadCloud,
  Wand2,
  X,
  Zap,
} from "lucide-react";

/* ───────────────────────────── tokens ───────────────────────────── */

const H = "font-heading"; // Syne, from @theme in globals.css
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const btnPrimary =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#2563eb] via-[#7c5cff] to-[#4cd7f6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/30 transition-all hover:-translate-y-0.5 hover:shadow-[#4cd7f6]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cd7f6] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#dfe3f5] backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cd7f6]";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  hero: u("photo-1454165804606-c3d57bc86b40", 1200),
  steps: u("photo-1522202176988-66273c2fd55f", 1000),
  feature: u("photo-1551434678-e076c223a692", 900),
  cta: u("photo-1519389950473-47ba0277781c", 1600),
  p1: u("photo-1494790108377-be9c29b29330", 200),
  p2: u("photo-1500648767791-00dcc994a43e", 200),
  p3: u("photo-1438761681033-6461ffad8d80", 200),
};

/* ───────────────────────────── helpers ───────────────────────────── */

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return <div aria-hidden className={`${className} bg-gradient-to-br from-[#1d2440] to-[#0b0e16]`} />;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={className} />;
}

function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function GradientText({ children }: { children: ReactNode }) {
  return (
    <motion.span
      className="inline-block bg-clip-text pb-1 text-transparent"
      style={{
        backgroundImage: "linear-gradient(90deg,#4cd7f6,#7c5cff,#2563eb,#4cd7f6)",
        backgroundSize: "300% 100%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);
  return <span ref={ref}>{`0${suffix}`}</span>;
}

function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label?: string }) {
  const id = useId().replace(/:/g, "");
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label ?? "Score"} ${score} out of 100`}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#4cd7f6" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={8} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${H} text-2xl font-extrabold text-white`} style={{ fontSize: size * 0.28 }}>
          <Counter to={score} />
        </span>
        {label && <span className="text-[11px] text-[#9aa0b4]">{label}</span>}
      </div>
    </div>
  );
}

function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161a26]/70 backdrop-blur ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x,50%) var(--y,50%), rgba(76,215,246,0.13), transparent 60%)" }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow?: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <Reveal>
          <span className="mb-4 inline-block rounded-full border border-[#4cd7f6]/25 bg-[#4cd7f6]/10 px-3 py-1 text-sm font-medium text-[#4cd7f6]">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`${H} text-3xl font-bold tracking-tight text-white md:text-5xl`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-base leading-relaxed text-[#9aa0b4] md:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
    />
  );
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-[#2563eb]/30 blur-[120px]"
        animate={{ x: [0, 140, 0], y: [0, 70, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-20 h-[460px] w-[460px] rounded-full bg-[#7c5cff]/25 blur-[120px]"
        animate={{ x: [0, -120, 0], y: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[#4cd7f6]/20 blur-[110px]"
        animate={{ x: [0, 100, -60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ───────────────────────────── chrome ───────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#2563eb] via-[#7c5cff] to-[#4cd7f6]"
    />
  );
}

const NAV = [
  { href: "#try", label: "Try it" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="CVBoost home">
      <span
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-[#2563eb] via-[#7c5cff] to-[#4cd7f6] ${
          small ? "h-7 w-7" : "h-8 w-8"
        }`}
      >
        <FileText size={small ? 14 : 16} className="text-white" />
      </span>
      <span className={`${H} text-lg font-bold tracking-tight text-white`}>CVBoost</span>
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 ${
          scrolled ? "border-white/10 bg-[#10131c]/80 shadow-lg shadow-black/20 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#b7bccf] transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#try" className={`${btnPrimary} !px-4 !py-2`}>
            <Shine />
            <span className="relative">Try now</span>
            <ArrowRight size={15} className="relative transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            className="rounded-lg p-2 text-[#dfe3f5] hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#10131c]/95 p-3 backdrop-blur-xl md:hidden"
          >
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-[#dfe3f5] hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ───────────────────────────── hero ───────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const line1 = ["Optimize", "your", "CV"];

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center px-6 pb-24 pt-32 md:px-10">
      <Aurora />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
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
              {line1.map((w, i) => (
                <span key={w} className="mr-3 inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.09, ease: EASE }}
                  >
                    {w}
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
              <GradientText>for every job</GradientText>
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
              <Shine />
              <span className="relative">Try it now</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#how-it-works" className={btnGhost}>
              See how it works
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9aa0b4]"
          >
            {["No credit card", "PDF & Word supported", "Your CV stays private"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#4cd7f6]" />
                {t}
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
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-[#2563eb]/20">
              <Photo src={IMG.hero} alt="Job seeker reviewing a resume on a laptop" className="h-[500px] w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#10131c] via-[#10131c]/30 to-[#2563eb]/30" />
            </div>

            {/* score card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 bottom-8 w-[17rem] rounded-2xl border border-white/10 bg-[#161a26]/80 p-4 shadow-2xl backdrop-blur-xl md:-left-10"
            >
              <div className="mb-3 flex items-center gap-3">
                <ScoreRing score={92} size={64} />
                <div>
                  <p className="text-sm font-semibold text-white">ATS score</p>
                  <p className="text-xs text-[#9aa0b4]">Senior Developer.pdf</p>
                </div>
              </div>
              {[
                { l: "Keyword match", v: 92 },
                { l: "Action verbs", v: 85 },
                { l: "Readability", v: 97 },
              ].map((m, i) => (
                <div key={m.l} className="mb-2 last:mb-0">
                  <div className="mb-1 flex justify-between text-[11px] text-[#b7bccf]">
                    <span>{m.l}</span>
                    <span>{m.v}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#4cd7f6]"
                      initial={{ width: 0 }}
                      animate={{ width: `${m.v}%` }}
                      transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* rewrite card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 top-8 w-60 rounded-2xl border border-white/10 bg-[#161a26]/80 p-4 shadow-2xl backdrop-blur-xl md:-right-8"
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
              className="absolute right-6 top-[46%] rounded-full border border-[#4cd7f6]/30 bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#2563eb]/40"
            >
              +14 keywords
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────── marquee ───────────────────────────── */

function Marquee() {
  const items = ["Workday", "Greenhouse", "Lever", "Taleo", "iCIMS", "SmartRecruiters", "Ashby", "BambooHR"];
  const row = [...items, ...items];
  return (
    <section aria-label="Supported applicant tracking systems" className="border-y border-white/5 bg-[#0b0e16]/60 py-8">
      <p className="mb-5 text-center text-sm text-[#8d90a0]">Built around the parsers recruiters actually use</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex w-max gap-14"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {row.map((n, i) => (
            <span key={`${n}-${i}`} className={`${H} text-xl font-bold text-white/30`}>
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────── try it now ───────────────────────────── */

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
    const w = raw.replace(/[.\-]+$/, "");
    if (w.length < 3 || STOP.has(w)) return;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, n)
    .map(([w]) => w);
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
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
  keywords.forEach((k) => {
    const hit = cvText ? cvText.includes(k) : hash(k + fileName) % 10 < 6;
    (hit ? matched : missing).push(k);
  });
  const ratio = keywords.length ? matched.length / keywords.length : 0.5;
  const before = Math.round(Math.min(88, 34 + ratio * 50));
  const after = Math.min(96, before + 14 + missing.length * 2);
  return { before, after, matched, missing };
}

function TrySection() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);

  const accept = useCallback((f?: File | null) => {
    if (!f) return;
    if (!/\.(pdf|docx?|txt)$/i.test(f.name)) {
      setError("Use a PDF, Word or TXT file.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("That file is over 5 MB. Try a smaller one.");
      return;
    }
    setError("");
    setFile(f);
    setPhase("idle");
    setResult(null);
  }, []);

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
    accept(e.dataTransfer.files?.[0]);
  };

  const canRun = !!file && jd.trim().length >= 40 && phase !== "analyzing";

  const run = async () => {
    if (!file || !canRun) return;
    setPhase("analyzing");
    setResult(null);
    setStage(0);
    let cvText = "";
    if (/\.txt$/i.test(file.name)) cvText = (await file.text()).toLowerCase();
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      await new Promise((r) => setTimeout(r, 800));
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
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4cd7f6]/40 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Live preview"
          title={
            <>
              See your score <GradientText>before you sign up</GradientText>
            </>
          }
          sub="Drop in your CV and paste the job you want. You'll get a match score and the keywords you're missing in seconds."
        />

        <Reveal>
          <div className="relative rounded-3xl p-px">
            {/* animated gradient border */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-3xl"
              style={{
                backgroundImage: "linear-gradient(120deg,#2563eb,#7c5cff,#4cd7f6,#2563eb)",
                backgroundSize: "300% 300%",
                opacity: 0.55,
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative grid gap-0 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#10131c] lg:grid-cols-2">
              {/* form */}
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">1. Upload your CV</p>
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
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
                      onChange={(e) => accept(e.target.files?.[0])}
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
                    onChange={(e) => setJd(e.target.value)}
                    rows={7}
                    placeholder="Paste the full job posting here…"
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-[#e1e2ee] placeholder:text-[#6b7086] focus:border-[#4cd7f6]/60 focus:outline-none focus:ring-2 focus:ring-[#4cd7f6]/20"
                  />
                  <p className="mt-1.5 text-xs text-[#8d90a0]">
                    {jd.trim().length < 40 ? `Add a bit more text (${Math.max(0, 40 - jd.trim().length)} characters to go).` : "Ready when you are."}
                  </p>
                </div>

                <button type="button" onClick={run} disabled={!canRun} className={`${btnPrimary} w-full`}>
                  <Shine />
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
                          className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#7c5cff] to-[#4cd7f6]"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <ul className="space-y-4">
                        {STAGES.map((s, i) => (
                          <li key={s} className={`flex items-center gap-3 text-sm transition-colors ${i <= stage ? "text-white" : "text-[#6b7086]"}`}>
                            {i < stage ? (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#4cd7f6]">
                                <CheckCircle2 size={18} />
                              </motion.span>
                            ) : i === stage ? (
                              <Loader2 size={18} className="animate-spin text-[#b4c5ff]" />
                            ) : (
                              <span className="h-[18px] w-[18px] rounded-full border border-white/15" />
                            )}
                            {s}
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
                          {result.matched.map((k, i) => (
                            <motion.span
                              key={k}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className="inline-flex items-center gap-1 rounded-full bg-[#4cd7f6]/10 px-2.5 py-1 text-xs text-[#4cd7f6]"
                            >
                              <Check size={11} /> {k}
                            </motion.span>
                          ))}
                          {result.matched.length === 0 && <span className="text-xs text-[#8d90a0]">None yet — that&apos;s the gap to close.</span>}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold text-[#b7bccf]">Missing from your CV ({result.missing.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {result.missing.map((k, i) => (
                            <motion.span
                              key={k}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#f5b87a]/50 px-2.5 py-1 text-xs text-[#f5b87a]"
                            >
                              <Plus size={11} /> {k}
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
                            <Shine />
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

/* ───────────────────────────── features (bento) ───────────────────────────── */

function Features() {
  const bars = [
    { l: "Keyword match", v: 92 },
    { l: "Action verbs", v: 85 },
    { l: "ATS readability", v: 97 },
    { l: "Formatting", v: 90 },
  ];
  const chips = [
    { k: "React", ok: true },
    { k: "TypeScript", ok: true },
    { k: "GraphQL", ok: false },
    { k: "CI/CD", ok: true },
    { k: "Mentoring", ok: false },
    { k: "Accessibility", ok: true },
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
                  {bars.map((b, i) => (
                    <div key={b.l}>
                      <div className="mb-1 flex justify-between text-xs text-[#b7bccf]">
                        <span>{b.l}</span>
                        <span>{b.v}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#7c5cff] to-[#4cd7f6]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: "easeOut" }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#161a26] to-transparent" />
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
                {chips.map((c, i) => (
                  <motion.span
                    key={c.k}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300, damping: 18 }}
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      c.ok ? "bg-[#4cd7f6]/10 text-[#4cd7f6]" : "border border-dashed border-[#f5b87a]/50 text-[#f5b87a]"
                    }`}
                  >
                    {c.ok ? "✓ " : "+ "}
                    {c.k}
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
                {[100, 92, 96, 60].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full bg-white/10"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.15 }}
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
                  {["PDF", "DOCX"].map((t, i) => (
                    <motion.div
                      key={t}
                      whileHover={{ y: -4, rotate: i ? 2 : -2 }}
                      className="flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5"
                    >
                      <FileText size={20} className="text-[#b4c5ff]" />
                      <span className="text-xs font-semibold text-white">{t}</span>
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

/* ───────────────────────────── how it works ───────────────────────────── */

const STEPS = [
  { icon: FileText, title: "Upload your CV", desc: "Add your existing resume as PDF or Word. We keep your layout and content intact." },
  { icon: ScrollText, title: "Add the job details", desc: "Paste the job description text. The more detail, the sharper the match." },
  { icon: Sparkles, title: "AI optimizes it", desc: "We score your CV, find keyword gaps and rewrite weak bullets for that role." },
  { icon: Download, title: "Download and apply", desc: "Export the tailored resume and cover letter, then send them off." },
];

function HowItWorks() {
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131c] via-[#10131c]/20 to-[#7c5cff]/20" />
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
              className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-[#2563eb] via-[#7c5cff] to-[#4cd7f6]"
            />
            <ol className="space-y-10">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} x={30} y={0} delay={i * 0.05}>
                  <li className="relative flex gap-5">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#10131c]">
                      <span className={`${H} text-lg font-extrabold text-[#b4c5ff]`}>{i + 1}</span>
                    </span>
                    <div className="pt-1.5">
                      <h3 className={`${H} mb-1 flex items-center gap-2 text-lg font-bold text-white`}>
                        <s.icon size={17} className="text-[#4cd7f6]" />
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#9aa0b4]">{s.desc}</p>
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

/* ───────────────────────────── before / after ───────────────────────────── */

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
      {text.split("*").map((p, i) =>
        i % 2 ? (
          <mark key={i} className="rounded bg-[#4cd7f6]/15 px-1 text-[#4cd7f6]">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function BeforeAfter() {
  const [i, setI] = useState(0);
  const s = SAMPLES[i];
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#0b0e16]/60 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Before and after"
          title={
            <>
              Same experience, <GradientText>stronger wording</GradientText>
            </>
          }
          sub="Pick a role to see how a vague bullet becomes one recruiters remember. Example content."
        />

        <Reveal>
          <div role="tablist" aria-label="Example roles" className="mx-auto mb-8 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {SAMPLES.map((x, idx) => (
              <button
                key={x.role}
                role="tab"
                aria-selected={i === idx}
                onClick={() => setI(idx)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-[#c3c6d7] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              >
                {i === idx && (
                  <motion.span
                    layoutId="ba-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c5cff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${i === idx ? "text-white" : ""}`}>{x.role}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.role}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid gap-5 md:grid-cols-2"
          >
            <div className="rounded-2xl border border-white/10 bg-[#161a26]/70 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#9aa0b4]">Original</span>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#9aa0b4]">ATS {s.from}</span>
              </div>
              <p className="text-base leading-relaxed text-[#9aa0b4] line-through decoration-white/20">{s.before}</p>
            </div>
            <div className="relative rounded-2xl border border-[#4cd7f6]/30 bg-[#161a26]/90 p-6 shadow-[0_0_50px_rgba(76,215,246,0.1)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#4cd7f6]">
                  <Sparkles size={14} /> Optimized
                </span>
                <span className="rounded-full bg-[#4cd7f6]/15 px-2.5 py-1 text-xs font-semibold text-[#4cd7f6]">ATS {s.to}</span>
              </div>
              <p className="text-base leading-relaxed text-white">
                <Highlight text={s.after} />
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ───────────────────────────── stats ───────────────────────────── */

function Stats() {
  // TODO: replace with real product numbers before launch.
  const stats = [
    { n: 30, s: "s", l: "typical turnaround" },
    { n: 6, s: "", l: "ATS parsers tested" },
    { n: 2, s: "", l: "export formats" },
    { n: 100, s: "%", l: "private by default" },
  ];
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08} className="text-center">
            <p className={`${H} text-4xl font-extrabold md:text-5xl`}>
              <GradientText>
                <Counter to={s.n} suffix={s.s} />
              </GradientText>
            </p>
            <p className="mt-1 text-sm text-[#9aa0b4]">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────── testimonials ───────────────────────────── */

// TODO: replace these placeholder quotes and names with real customer testimonials.
const TESTIMONIALS = [
  { name: "Amara O.", role: "Product designer", img: IMG.p1, quote: "I finally understood why my CV kept getting ignored. Two keyword fixes and I had three interview invites." },
  { name: "Daniel K.", role: "Backend engineer", img: IMG.p2, quote: "The rewrites sounded like me, only sharper. The cover letter draft saved me an entire evening." },
  { name: "Tola A.", role: "Marketing lead", img: IMG.p3, quote: "Seeing the score change as I edited made it feel like a game. I stopped guessing what recruiters wanted." },
];

function Testimonials() {
  return (
    <section className="px-6 pb-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Job seekers who stopped guessing" />
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.figure whileHover={{ y: -6 }} className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-[#161a26]/70 p-6 backdrop-blur">
                <div className="flex gap-0.5 text-[#f5c451]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-[#dfe3f5]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3">
                  <Photo src={t.img} alt={`${t.name}, ${t.role}`} className="h-10 w-10 rounded-full object-cover" />
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="text-xs text-[#9aa0b4]">{t.role}</span>
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

/* ───────────────────────────── pricing ───────────────────────────── */

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

function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-white/5 bg-[#0b0e16]/60 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Pricing" title="Start free, upgrade when you're hiring-season busy" sub="Cancel any time." />

        <Reveal>
          <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1" role="group" aria-label="Billing period">
            {[
              { l: "Monthly", v: false },
              { l: "Yearly", v: true },
            ].map((o) => (
              <button
                key={o.l}
                onClick={() => setYearly(o.v)}
                aria-pressed={yearly === o.v}
                className="relative rounded-full px-5 py-2 text-sm font-medium text-[#c3c6d7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4cd7f6]"
              >
                {yearly === o.v && (
                  <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c5cff]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className={`relative ${yearly === o.v ? "text-white" : ""}`}>
                  {o.l}
                  {o.v && <span className="ml-1.5 text-xs text-[#4cd7f6]">save ~25%</span>}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className={`relative h-full rounded-3xl ${p.featured ? "p-px" : ""}`}>
                {p.featured && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-3xl"
                    style={{ backgroundImage: "linear-gradient(120deg,#2563eb,#7c5cff,#4cd7f6,#2563eb)", backgroundSize: "300% 300%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <div className={`relative flex h-full flex-col rounded-3xl p-7 ${p.featured ? "bg-[#131726]" : "border border-white/10 bg-[#161a26]/70"}`}>
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#4cd7f6] px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className={`${H} text-xl font-bold text-white`}>{p.name}</h3>
                  <p className="mt-1 text-sm text-[#9aa0b4]">{p.blurb}</p>
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
                          {yearly ? p.yearly : p.monthly}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="pb-1.5 text-sm text-[#9aa0b4]">/month</span>
                  </p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#dfe3f5]">
                        <Check size={16} className="mt-0.5 shrink-0 text-[#4cd7f6]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className={p.featured ? btnPrimary : btnGhost}>
                    {p.featured && <Shine />}
                    <span className="relative">{p.cta}</span>
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

/* ───────────────────────────── faq ───────────────────────────── */

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
        onClick={() => setOpen((o) => !o)}
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

function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Reveal>
          <div className="border-t border-white/10">
            {FAQS.map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── final CTA ───────────────────────────── */

function FinalCTA() {
  return (
    <section className="px-6 pb-24 md:px-10">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 px-8 py-20 text-center">
          <Photo src={IMG.cta} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(120deg,rgba(37,99,235,.85),rgba(124,92,255,.75),rgba(76,215,246,.6),rgba(37,99,235,.85))",
              backgroundSize: "300% 300%",
              mixBlendMode: "multiply",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <div aria-hidden className="absolute inset-0 bg-[#10131c]/40" />
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
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#10131c] shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

/* ───────────────────────────── footer ───────────────────────────── */

function Footer() {
  const cols = [
    { h: "Product", links: [["Try it", "#try"], ["Features", "#features"], ["How it works", "#how-it-works"], ["Pricing", "#pricing"]] },
    { h: "Account", links: [["Log in", "/login"], ["Sign up", "/register"]] },
    { h: "Company", links: [["Terms", "#"], ["Privacy", "#"], ["Support", "#"], ["Contact", "#"]] },
  ];
  return (
    <footer className="border-t border-white/10 px-6 py-14 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo small />
          <p className="mt-3 max-w-xs text-sm text-[#9aa0b4]">AI that tailors your CV and cover letter to every job you apply for.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <p className="mb-3 text-sm font-semibold text-white">{c.h}</p>
            <ul className="space-y-2">
              {c.links.map(([l, href]) => (
                <li key={l}>
                  {href.startsWith("#") ? (
                    <a href={href} className="text-sm text-[#9aa0b4] transition-colors hover:text-white">
                      {l}
                    </a>
                  ) : (
                    <Link href={href} className="text-sm text-[#9aa0b4] transition-colors hover:text-white">
                      {l}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-[#6b7086]">© {new Date().getFullYear()} CVBoost. All rights reserved.</p>
    </footer>
  );
}

/* ───────────────────────────── page ───────────────────────────── */

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="min-h-screen overflow-x-clip text-on-surface antialiased"
      >
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <TrySection />
          <Features />
          <HowItWorks />
          <BeforeAfter />
          <Stats />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}