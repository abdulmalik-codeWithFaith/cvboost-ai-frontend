import Link from "next/link";
import { FileText, Zap, Target, Award } from "lucide-react";

const features = [
  {
    icon: <Zap size={16} />,
    color: "text-[#4cd7f6]",
    border: "border-[#4cd7f6]/20",
    bg: "bg-[#4cd7f6]/10",
    label: "Instant AI-driven optimization",
  },
  {
    icon: <Target size={16} />,
    color: "text-[#b4c5ff]",
    border: "border-[#b4c5ff]/20",
    bg: "bg-[#b4c5ff]/10",
    label: "Deep ATS compatibility scoring",
  },
  {
    icon: <Award size={16} />,
    color: "text-[#bec6e0]",
    border: "border-[#bec6e0]/20",
    bg: "bg-[#bec6e0]/10",
    label: "Tailored to executive & tech roles",
  },
];

export default function RegisterLeftPanel() {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-[#0b0e16] p-10 flex-col justify-between border-r border-white/5 overflow-hidden">
      {/* BG abstract glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#2563eb]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#4cd7f6]/8 blur-[120px]" />
      </div>

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
      <div className="relative z-10">
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <span className="font-bold text-[#b4c5ff] text-lg tracking-tight group-hover:text-white transition-colors">
            CVBoost
          </span>
        </Link>
      </div>

      {/* Headline + features */}
      <div className="relative z-10 mb-10">
        <h1
          className="text-5xl font-extrabold text-[#e1e2ee] mb-6 leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          Elevate Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4c5ff] to-[#4cd7f6]">
            Career Trajectory
          </span>
        </h1>
        <p className="text-[#c3c6d7] text-lg leading-relaxed max-w-md mb-8">
          Join thousands of high-achieving professionals using our expert
          intelligence to bypass ATS filters and secure top-tier interviews.
        </p>

        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full ${f.bg} flex items-center justify-center border ${f.border} ${f.color}`}
              >
                {f.icon}
              </div>
              <span className="text-[#e1e2ee] font-medium text-sm">{f.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 p-5 rounded-xl bg-[#10131c]/50 border border-white/8 backdrop-blur-sm">
        <p className="text-[#c3c6d7] italic text-sm leading-relaxed mb-4">
          &quot;The precision of the targeted keyword suggestions directly led to my
          interview at a FAANG company. It feels like an unfair advantage.&quot;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#272a33] border border-white/10 flex items-center justify-center">
            <span className="text-xs font-bold text-[#b4c5ff]">SJ</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#e1e2ee]">Sarah J.</p>
            <p className="text-xs text-[#8d90a0]">Senior Product Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}