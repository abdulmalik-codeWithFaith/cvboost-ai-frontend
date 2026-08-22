import Link from "next/link";
import { FileText, Zap, CheckCircle } from "lucide-react";

const stats = [
  { icon: <Zap size={18} />, label: "Instant Analysis" },
  { icon: <CheckCircle size={18} />, label: "ATS Optimized" },
];

export default function LoginLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#0b0e16] flex-col justify-between p-10 relative z-10 border-r border-white/5 overflow-hidden">
      {/* Decorative glow blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2563eb]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#03b5d3]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,197,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,197,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <Link href="/" className="group">
          <span className="font-bold text-[#b4c5ff] text-xl tracking-tight group-hover:text-white transition-colors">
            CVBoost
          </span>
        </Link>
      </div>

      {/* Headline + copy */}
      <div className="relative z-10 max-w-md">
        <h1
          className="text-5xl font-extrabold text-[#e1e2ee] mb-6 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Elevate Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4c5ff] to-[#4cd7f6]">
            Career Profile
          </span>
        </h1>
        <p className="text-[#c3c6d7] text-lg leading-relaxed">
          Join thousands of professionals landing their dream roles with
          AI-driven resume and cover letter optimization. Expert intelligence,
          precision targeting.
        </p>
      </div>

      {/* Stats row */}
      <div className="relative z-10 flex gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-[#c3c6d7] text-sm font-semibold">
            <span className="text-[#4cd7f6]">{s.icon}</span>
            {s.label}
          </div>
        ))}
      </div>

      {/* Decorative radial gradient layer */}
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#2563eb]/10 to-transparent pointer-events-none mix-blend-screen rounded-tl-full opacity-50" />
    </div>
  );
}