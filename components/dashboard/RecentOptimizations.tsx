interface Optimization {
    id: string;
    jobTitle: string;
    company: string;
    matchScore: number;
    date: string;
    status: "high" | "mid" | "low";
}

interface RecentOptimizationsProps {
    optimizations: Optimization[];
}

const scoreStyles = {
    high: {
        wrapper: "bg-secondary/10 border border-secondary/20 text-secondary",
        icon: "check_circle",
    },
    mid: {
        wrapper: "bg-primary/10 border border-primary/20 text-primary",
        icon: "info",
    },
    low: {
        wrapper: "bg-error/10 border border-error/20 text-error",
        icon: "warning",
    },
};

export default function RecentOptimizations({
    optimizations,
}: RecentOptimizationsProps) {
    return (
        <section className="glass-panel card-inner-highlight rounded-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-surface-container-low/50">
                <div>
                    <h3 className="text-xl font-semibold text-on-surface">
                        Recent Optimizations
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                        Your latest targeted resumes
                    </p>
                </div>
                <button className="glass-panel px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant flex items-center gap-2 hover:text-on-surface transition-colors">
                    View All
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-white/10 bg-surface-bright/30">
                            {["Job Title / Company", "ATS Score", "Date", "Actions"].map(
                                (h) => (
                                    <th
                                        key={h}
                                        className={`py-3 px-5 text-xs text-on-surface-variant uppercase tracking-wider font-semibold ${h === "Actions" ? "text-right" : ""
                                            }`}
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {optimizations.map((item) => {
                            const style = scoreStyles[item.status];
                            return (
                                <tr key={item.id} className="interactive-row group">
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-md bg-surface-bright flex items-center justify-center text-on-surface-variant">
                                                <span className="material-symbols-outlined">work</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                                                    {item.jobTitle}
                                                </p>
                                                <p className="text-xs text-on-surface-variant">
                                                    {item.company}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <div
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.wrapper}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {style.icon}
                                            </span>
                                            {item.matchScore}% Match
                                        </div>
                                    </td>
                                    <td className="py-4 px-5">
                                        <p className="text-sm text-on-surface-variant">{item.date}</p>
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-200">
                                            <button className="p-2 text-on-surface-variant hover:text-primary rounded-md hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-xl">
                                                    download
                                                </span>
                                            </button>
                                            <button className="p-2 text-on-surface-variant hover:text-secondary rounded-md hover:bg-white/5 transition-colors">
                                                <span className="material-symbols-outlined text-xl">
                                                    visibility
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}