interface Suggestion {
    id: string;
    type: "add" | "improve" | "remove";
    title: string;
    description: string;
}

interface SuggestionsPanelProps {
    suggestions: Suggestion[];
}

const typeStyles = {
    add: {
        icon: "add_circle",
        color: "text-secondary",
        bg: "bg-secondary/10 border-secondary/20",
    },
    improve: {
        icon: "edit",
        color: "text-primary",
        bg: "bg-primary/10 border-primary/20",
    },
    remove: {
        icon: "remove_circle",
        color: "text-error",
        bg: "bg-error/10 border-error/20",
    },
};

export default function SuggestionsPanel({
    suggestions,
}: SuggestionsPanelProps) {
    return (
        <div className="glass-panel card-inner-highlight rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                    lightbulb
                </span>
                <h3 className="text-xl font-semibold text-on-surface">
                    AI Suggestions
                </h3>
                <span className="ml-auto text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
                    {suggestions.length} suggestions
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {suggestions.map((suggestion) => {
                    const style = typeStyles[suggestion.type];
                    return (
                        <div
                            key={suggestion.id}
                            className={`flex items-start gap-4 p-4 rounded-xl border ${style.bg} transition-all hover:scale-[1.01]`}
                        >
                            <span
                                className={`material-symbols-outlined ${style.color} shrink-0 mt-0.5`}
                            >
                                {style.icon}
                            </span>
                            <div>
                                <p className={`font-semibold text-sm ${style.color}`}>
                                    {suggestion.title}
                                </p>
                                <p className="text-sm text-on-surface-variant mt-1">
                                    {suggestion.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}