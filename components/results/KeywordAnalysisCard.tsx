interface KeywordAnalysisCardProps {
    presentKeywords: string[];
    missingKeywords: string[];
}

export default function KeywordAnalysisCard({
    presentKeywords,
    missingKeywords,
}: KeywordAnalysisCardProps) {
    return (
        <div className="glass-panel card-inner-highlight rounded-xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">key</span>
                <h3 className="text-xl font-semibold text-on-surface">
                    Keyword Analysis
                </h3>
            </div>

            {/* Present Keywords */}
            <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">
                        check_circle
                    </span>
                    Found in your CV ({presentKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                    {presentKeywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>

            {/* Missing Keywords */}
            <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">
                        cancel
                    </span>
                    Missing from your CV ({missingKeywords.length})
                </p>
                <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="px-3 py-1 rounded-full bg-error/10 border border-error/20 text-error text-sm font-medium"
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}