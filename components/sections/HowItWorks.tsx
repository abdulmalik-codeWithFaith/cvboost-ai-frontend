import { FileText, ScrollText, Sparkles, Download } from "lucide-react";

const steps = [
  {
    num: "1",
    borderColor: "border-[#b4c5ff]",
    textColor: "text-[#b4c5ff]",
    glowColor: "bg-[#b4c5ff]/20",
    title: "Upload CV",
    desc: "Upload your existing resume in PDF or Word format.",
    icon: <FileText size={18} />,
  },
  {
    num: "2",
    borderColor: "border-[#4cd7f6]",
    textColor: "text-[#4cd7f6]",
    glowColor: "bg-[#4cd7f6]/20",
    title: "Add Job Details",
    desc: "Paste the link or text of the target job description.",
    icon: <ScrollText size={18} />,
  },
  {
    num: "3",
    borderColor: "border-[#b4c5ff]",
    textColor: "text-[#b4c5ff]",
    glowColor: "bg-[#b4c5ff]/20",
    title: "AI Optimization",
    desc: "Our engine analyzes and rewrites content for maximum ATS impact.",
    icon: <Sparkles size={18} />,
  },
  {
    num: "4",
    borderColor: "border-[#4cd7f6]",
    textColor: "text-[#4cd7f6]",
    glowColor: "bg-[#4cd7f6]/20",
    title: "Download & Apply",
    desc: "Export your perfectly tailored resume and cover letter.",
    icon: <Download size={18} />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4cd7f6] mb-3">
            Simple process
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#b4c5ff] mb-4"
            style={{ letterSpacing: "-0.01em" }}
          >
            How It Works
          </h2>
          <p className="text-[#c3c6d7] max-w-xl mx-auto">
            Four simple steps to a highly competitive job application.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-[#b4c5ff]/20 via-[#4cd7f6]/30 to-[#b4c5ff]/20" />

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div
                className={`relative w-16 h-16 rounded-full bg-[#10131c] border-2 ${s.borderColor} ${s.textColor} flex items-center justify-center z-10`}
              >
                <span className="text-lg font-extrabold">{s.num}</span>
                <div
                  className={`absolute inset-0 ${s.glowColor} rounded-full blur-md -z-10`}
                />
              </div>
              <div>
                <h4 className="font-bold text-[#e1e2ee] mb-1">{s.title}</h4>
                <p className="text-sm text-[#8d90a0] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}