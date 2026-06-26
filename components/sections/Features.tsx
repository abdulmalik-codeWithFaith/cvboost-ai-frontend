import { BarChart2, Sparkles, ScrollText, Search, Download, Timer } from "lucide-react";

const features = [
  {
    icon: <BarChart2 size={22} />,
    color: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    title: "ATS Score Analysis",
    desc: "Instantly see how well your CV matches the job description against industry-standard ATS algorithms.",
  },
  {
    icon: <Sparkles size={22} />,
    color: "text-[#b4c5ff]",
    bg: "bg-[#b4c5ff]/10",
    title: "AI Optimization",
    desc: "Automatically rewrite bullet points with strong action verbs and relevant keywords tailored to the role.",
  },
  {
    icon: <ScrollText size={22} />,
    color: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    title: "Cover Letter Gen",
    desc: "Generate a highly personalized cover letter that bridges the gap between your experience and the job.",
  },
  {
    icon: <Search size={22} />,
    color: "text-[#b4c5ff]",
    bg: "bg-[#b4c5ff]/10",
    title: "Keyword Matching",
    desc: "Identify missing crucial keywords from the job description and seamlessly integrate them into your profile.",
  },
  {
    icon: <Download size={22} />,
    color: "text-[#4cd7f6]",
    bg: "bg-[#4cd7f6]/10",
    title: "Download Ready",
    desc: "Export your optimized resume in universally accepted, perfectly formatted PDF or DOCX formats.",
  },
  {
    icon: <Timer size={22} />,
    color: "text-[#b4c5ff]",
    bg: "bg-[#b4c5ff]/10",
    title: "Fast Results",
    desc: "Transform your application materials in seconds. Spend more time preparing for interviews.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-28 px-6 md:px-10 bg-[#0b0e16]/60 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4cd7f6] mb-3">
            What you get
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#b4c5ff] mb-4"
            style={{ letterSpacing: "-0.01em" }}
          >
            Precision Tools for Professionals
          </h2>
          <p className="text-[#c3c6d7] max-w-2xl mx-auto leading-relaxed">
            Leverage advanced generative AI to ensure your application bypasses
            automated filters and impresses human recruiters.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-white/8 hover:border-white/20 transition-all duration-300 cursor-default"
              style={{
                background: "rgba(29, 31, 40, 0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className={`w-11 h-11 rounded-lg ${f.bg} flex items-center justify-center mb-5 ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-[#e1e2ee] mb-2">{f.title}</h3>
              <p className="text-sm text-[#8d90a0] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}