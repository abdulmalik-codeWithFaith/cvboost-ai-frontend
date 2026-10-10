import Link from "next/link";
import { FileText, Zap, CheckCircle } from "lucide-react";

const stats = [
  { icon: <Zap size={18} />, label: "Instant Analysis" },
  { icon: <CheckCircle size={18} />, label: "ATS Optimized" },
];

export default function LoginLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#0b0e16] flex-col justify-between p-10 relative z-10 border-r border-white/5 overflow-hidden">
      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-primary-container flex items-center justify-center">
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
          <span className="text-[#b4c5ff]">
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

    </div>
  );
}