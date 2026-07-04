interface MatchScoreCardProps {
    score: number;
    jobTitle: string;
    company: string;
}

export default function MatchScoreCard({
    score,
    jobTitle,
    company,
}: MatchScoreCardProps) {
    const getScoreColor = () => {
        if (score >= 80) return "text-secondary";
        if (score >= 60) return "text-primary";
        return "text-error";
    };

    const getScoreLabel = () => {
        if (score >= 80) return { text: "Excellent Match", icon: "check_circle" };
        if (score >= 60) return { text: "Good Match", icon: "info" };
        return { text: "Needs Improvement", icon: "warning" };
    };

    const label = getScoreLabel();
    const circumference = 2 * Math.PI * 54;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="glass-panel card-inner-highlight rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40" />

            {/* Circular Score */}
            <div className="relative w-36 h-36 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                        cx="60" cy="60" r="54"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                    />
                    <circle
                        cx="60" cy="60" r="54"
                        fill="none"
                        stroke={score >= 80 ? "#4cd7f6" : score >= 60 ? "#b4c5ff" : "#ffb4ab"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${getScoreColor()}`}>
                        {score}%
                    </span>
                    <span className="text-xs text-on-surface-variant">ATS Score</span>
                </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 ${score >= 80
                    ? "bg-secondary/10 border border-secondary/20 text-secondary"
                    : score >= 60
                        ? "bg-primary/10 border border-primary/20 text-primary"
                        : "bg-error/10 border border-error/20 text-error"
                    }`}>
                    <span className="material-symbols-outlined text-base">{label.icon}</span>
                    {label.text}
                </div>
                <h2 className="text-2xl font-bold text-on-surface">{jobTitle}</h2>
                <p className="text-on-surface-variant mt-1">{company}</p>
                <p className="text-sm text-on-surface-variant mt-3">
                    Your CV has been analyzed against the job description. Review the
                    suggestions below to improve your match score.
                </p>
            </div>
        </div>
    );
}