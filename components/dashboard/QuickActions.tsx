const actions = [
    {
        label: "Upload New CV",
        description: "PDF, DOCX up to 5MB",
        icon: "upload",
        href: "/upload",
        elevated: true,
    },
    {
        label: "Start Optimization",
        description: "Match against a Job ID",
        icon: "description",
        href: "/upload",
        elevated: false,
    },
    {
        label: "Generate Cover Letter",
        description: "AI-crafted targeting",
        icon: "edit_document",
        href: "/cover-letter",
        elevated: false,
    },
];

export default function QuickActions() {
    return (
        <div className="flex flex-col gap-4">
            {actions.map((action) => (
                <button
                    key={action.label}
                    className={`${action.elevated ? "glass-panel-elevated ai-glow" : "glass-panel"
                        } card-inner-highlight rounded-xl p-5 flex items-center gap-4 text-left group hover:bg-white/5 transition-all active:scale-[0.98]`}
                >
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${action.elevated
                            ? "bg-primary-container text-white shadow-primary/30"
                            : "bg-surface-bright text-primary border border-white/10"
                            }`}
                    >
                        <span className="material-symbols-outlined">{action.icon}</span>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-on-surface mb-0.5">
                            {action.label}
                        </h3>
                        <p className="text-xs text-on-surface-variant">{action.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}