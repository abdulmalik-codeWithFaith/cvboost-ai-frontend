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
        <div className="flex flex-row gap-2 sm:gap-12 mt-4">
            {actions.map((action) => (
                <button
                    key={action.label}
                    className={`${action.elevated ? "glass-panel-elevated ai-glow" : "glass-panel"
                        } dashboard-quick-action card-inner-highlight rounded-xl p-2 sm:p-5 w-full flex flex-1 min-w-0 flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left group hover:bg-white/5 transition-all active:scale-[0.98]`}
                >
                    <div
                        className={`w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${action.elevated
                            ? "bg-primary-container text-white shadow-lg shadow-primary/18"
                            : "bg-surface-bright text-primary border border-white/10 shadow-lg shadow-black/6"
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg sm:text-2xl">{action.icon}</span>
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-[10px] sm:text-base font-semibold leading-tight text-on-surface mb-0.5 break-words">
                            {action.label}
                        </h3>
                        <p className="hidden sm:block text-xs text-on-surface-variant">{action.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}