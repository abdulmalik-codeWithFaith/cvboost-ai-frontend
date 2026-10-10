"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView } from "framer-motion";

export const H = "font-heading";
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const btnPrimary =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary-container px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/18 transition-all hover:-translate-y-0.5 hover:shadow-[#4cd7f6]/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cd7f6] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#dfe3f5] backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cd7f6]";

const imageUrl = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const IMG = {
  hero: imageUrl("photo-1454165804606-c3d57bc86b40", 1200),
  steps: imageUrl("photo-1522202176988-66273c2fd55f", 1000),
  feature: imageUrl("photo-1551434678-e076c223a692", 900),
  cta: imageUrl("photo-1519389950473-47ba0277781c", 1600),
  p1: imageUrl("photo-1494790108377-be9c29b29330", 200),
  p2: imageUrl("photo-1500648767791-00dcc994a43e", 200),
  p3: imageUrl("photo-1438761681033-6461ffad8d80", 200),
};

export function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return <div aria-hidden className={`${className} bg-surface-container-lowest`} />;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={className} />;
}

export function Reveal({
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

export function AccentText({ children }: { children: ReactNode }) {
  return <span className="inline-block pb-1 text-primary">{children}</span>;
}

export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = value.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);
  return <span ref={ref}>{`0${suffix}`}</span>;
}

export function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label?: string }) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label ?? "Score"} ${score} out of 100`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={8} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--accent)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
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

export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161a26]/70 backdrop-blur ${className}`}>
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
}) {
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