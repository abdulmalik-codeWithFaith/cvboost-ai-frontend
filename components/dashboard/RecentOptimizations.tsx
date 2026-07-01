interface Optimization {
    id: string;
    jobTitle: string;
    company: string;
    matchScore: number;
    date: string;
}

interface RecentOptimizationsProps {
    optimizations: Optimization[];
}

export default function RecentOptimizations({
    optimizations,
}: RecentOptimizationsProps) {
    if (optimizations.length === 0) {
        return (
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-text mb-4">
                    Recent Optimizations
                </h2>
                <div className="bg-card rounded-xl p-6 text-text/60">
                    No optimizations yet. Upload a CV to get started.
                </div>
            </section>
        );
    }

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold text-text mb-4">
                Recent Optimizations
            </h2>
            <div className="space-y-3">
                {optimizations.map((item) => (
                    <div
                        key={item.id}
                        className="bg-card rounded-xl p-4 flex items-center justify-between border border-white/5"
                    >
                        <div>
                            <p className="font-medium text-text">{item.jobTitle}</p>
                            <p className="text-sm text-text/60">
                                {item.company} · {item.date}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-accent font-bold text-lg">
                                {item.matchScore}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}