const metrics = [
    {
        label: "CVs Optimized",
        value: "24",
        icon: "description",
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        label: "Avg. ATS Score",
        value: "87%",
        icon: "analytics",
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        label: "Cover Letters Generated",
        value: "15",
        icon: "contract",
        color: "text-tertiary",
        bg: "bg-tertiary/10",
    },
];

export default function MetricCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric) => (
                <div
                    key={metric.label}
                    className="glass-panel card-inner-highlight rounded-xl p-5 flex flex-col gap-3 group hover:border-primary/30 transition-colors"
                >
                    <div
                        className={`w-10 h-10 rounded-lg ${metric.bg} flex items-center justify-center ${metric.color} group-hover:scale-110 transition-transform`}
                    >
                        <span className="material-symbols-outlined">{metric.icon}</span>
                    </div>
                    <div className="mt-auto">
                        <p className="text-xs text-on-surface-variant mb-1">{metric.label}</p>
                        <p className="text-4xl font-bold text-on-surface">{metric.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}