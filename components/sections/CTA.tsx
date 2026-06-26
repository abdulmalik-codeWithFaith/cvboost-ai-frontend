import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-10 border-t border-white/5">
      <div
        className="max-w-4xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden border border-white/10"
        style={{
          background: "rgba(30, 41, 59, 0.6)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 60px rgba(6,182,212,0.08)",
        }}
      >
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4cd7f6]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2563eb]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4cd7f6]/40 to-transparent" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4cd7f6] mb-3">
            Get started today
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#b4c5ff] mb-5"
            style={{ letterSpacing: "-0.01em" }}
          >
            Ready to Land More Interviews?
          </h2>
          <p className="text-[#c3c6d7] max-w-xl mx-auto mb-8 leading-relaxed">
            Stop guessing what recruiters want. Let CVBoost tailor your
            application for guaranteed impact — in seconds.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563eb] to-[#4cd7f6] hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-xl shadow-[#2563eb]/25 text-base"
          >
            Start Optimizing — It&apos;s Free
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}