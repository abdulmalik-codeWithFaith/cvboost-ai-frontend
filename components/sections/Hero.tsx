import Link from "next/link";
import { Zap, ArrowRight, PlayCircle, FileText, CheckCircle } from "lucide-react";
import ShaderCanvas from "./ShaderCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6 md:px-10 overflow-hidden">
      {/* Animated shader background */}
      <div className="absolute inset-0 opacity-40">
        <ShaderCanvas />
      </div>

      {/* Radial glow overlays */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2563eb]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4cd7f6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Left: copy ── */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
            <Zap size={13} className="text-[#4cd7f6]" />
            <span className="text-xs font-semibold text-[#c3c6d7] tracking-wide uppercase">
              AI-Powered Resume Engine
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#b4c5ff]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Optimize Your CV
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#4cd7f6]">
              For Every Job
            </span>
          </h1>

          <p className="text-lg text-[#c3c6d7] leading-relaxed max-w-lg">
            Upload your CV, paste a job description, and instantly generate an
            ATS-optimized resume and personalized cover letter.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#2563eb] to-[#4cd7f6] hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2563eb]/30"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-[#c3c6d7] border border-white/10 hover:bg-white/5 transition-colors">
              <PlayCircle size={16} />
              Watch Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-2 text-xs text-[#8d90a0]">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-[#4cd7f6]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-[#4cd7f6]" />
              Results in seconds
            </span>
          </div>
        </div>

        {/* ── Right: CV card mockup ── */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-[#2563eb]/15 rounded-full blur-3xl pointer-events-none" />

          <div
            className="relative z-10 w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl"
            style={{
              background: "rgba(30, 41, 59, 0.7)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 30px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Card header — original vs optimized */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1d1f28] border border-white/10 flex items-center justify-center">
                  <FileText size={18} className="text-[#b4c5ff]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#b4c5ff]">Senior Developer.pdf</p>
                  <p className="text-xs text-[#8d90a0]">Original CV</p>
                </div>
              </div>

              <ArrowRight size={18} className="text-[#8d90a0]" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center">
                  <CheckCircle size={18} className="text-[#4cd7f6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#4cd7f6]">Optimized.pdf</p>
                  <p className="text-xs text-[#8d90a0]">ATS Ready</p>
                </div>
              </div>
            </div>

            {/* Metric bars */}
            <div className="space-y-3 mb-5">
              {[
                { label: "Keyword Match", pct: 92, width: "92%", barColor: "bg-[#4cd7f6]", textColor: "text-[#4cd7f6]" },
                { label: "Action Verbs", pct: 85, width: "85%", barColor: "bg-[#2563eb]", textColor: "text-[#b4c5ff]" },
                { label: "ATS Readability", pct: 97, width: "97%", barColor: "bg-gradient-to-r from-[#2563eb] to-[#4cd7f6]", textColor: "text-[#e1e2ee]" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex justify-between items-center bg-[#1d1f28]/60 p-3 rounded-lg border border-white/5"
                >
                  <span className="text-xs text-[#c3c6d7]">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-[#272a33] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${m.barColor}`}
                        style={{ width: m.width }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${m.textColor}`}>{m.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI rewrite snippet */}
            <div className="p-4 bg-[#0b0e16] rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4cd7f6]/40 to-transparent" />
              <p className="text-xs text-[#8d90a0] mb-1 uppercase tracking-widest font-semibold">
                AI Rewrite
              </p>
              <p className="text-xs text-[#c3c6d7] italic leading-relaxed">
                &quot;Spearheaded development of scalable microservices, resulting in a
                40% reduction in latency and a 99.9% uptime SLA.&quot;
              </p>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#2563eb] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#2563eb]/40 border border-[#4cd7f6]/30">
              ✦ AI Powered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}