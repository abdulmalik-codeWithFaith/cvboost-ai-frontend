"use client";

interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

    return (
        <div>
            <h3 className="text-xl font-semibold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Job Description
            </h3>
            <div className="relative">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste the full job description here — the more detail, the better the tailoring..."
                    rows={10}
                    className="w-full rounded-xl bg-surface-container-low border border-white/10 p-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                />
                <span className="absolute bottom-3 right-3 text-xs text-on-surface-variant/60">
                    {wordCount} words
                </span>
            </div>
            {wordCount > 0 && wordCount < 25 && (
                <p className="text-xs text-amber-400 mt-2">
                    Paste a bit more of the posting (responsibilities + requirements) for better results.
                </p>
            )}
        </div>
    );
}