interface CVPreviewComponentProps {
    originalCV: string;
    optimizedCV: string;
}

export default function CVPreviewComponent({
    originalCV,
    optimizedCV,
}: CVPreviewComponentProps) {
    return (
        <div className="glass-panel card-inner-highlight rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        compare
                    </span>
                    <h3 className="text-xl font-semibold text-on-surface">
                        CV Comparison
                    </h3>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-base">download</span>
                    Download Optimized
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-error inline-block" />
                        Original CV
                    </p>
                    <div className="bg-surface-container rounded-xl p-4 min-h-[300px] text-sm text-on-surface-variant font-mono leading-relaxed overflow-auto whitespace-pre-wrap border border-white/5">
                        {originalCV}
                    </div>
                </div>

                {/* Optimized */}
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                        Optimized CV
                    </p>
                    <div className="bg-surface-container rounded-xl p-4 min-h-[300px] text-sm text-on-surface font-mono leading-relaxed overflow-auto whitespace-pre-wrap border border-secondary/10 ai-glow">
                        {optimizedCV}
                    </div>
                </div>
            </div>
        </div>
    );
}