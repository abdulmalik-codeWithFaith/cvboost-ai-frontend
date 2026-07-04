<<<<<<< HEAD
=======
import { FileText, X } from "lucide-react";

>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
interface CVPreviewProps {
    file: File;
    onRemove: () => void;
}

export default function CVPreview({ file, onRemove }: CVPreviewProps) {
    const fileType = file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX";
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
<<<<<<< HEAD
    const uploadDate = new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    return (
        <div className="glass-panel rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden ai-glow">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

            {/* File Icon */}
            <div className="w-16 h-20 bg-surface-container-highest rounded border border-white/10 flex items-center justify-center shrink-0 relative">
                <span className="material-symbols-outlined text-4xl text-error">
                    picture_as_pdf
                </span>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-400 text-sm">
                        check
                    </span>
                </div>
            </div>

            {/* File Details */}
            <div className="flex-grow text-center sm:text-left min-w-0">
                <h4 className="font-semibold text-on-surface text-lg truncate">
                    {file.name}
                </h4>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        {uploadDate}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">sd_storage</span>
                        {sizeInMB} MB
                    </span>
                    <span className="flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        Parsed successfully
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
                <button
                    className="p-2 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
                    title="View Document"
                >
                    <span className="material-symbols-outlined">visibility</span>
                </button>
                <button
                    className="p-2 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
                    title="Replace Document"
                >
                    <span className="material-symbols-outlined">sync</span>
                </button>
                <button
                    onClick={onRemove}
                    className="p-2 rounded-lg border border-error/20 text-error/70 hover:bg-error/10 hover:text-error transition-colors"
                    title="Remove Document"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
=======

    return (
        <div className="bg-card border border-white/10 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
                <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                    <FileText className="text-accent" size={24} />
                </div>
                <div className="min-w-0">
                    <p className="font-medium text-text truncate">{file.name}</p>
                    <p className="text-sm text-text/60">
                        {fileType} · {sizeInMB} MB
                    </p>
                </div>
            </div>
            <button
                onClick={onRemove}
                className="text-text/60 hover:text-text transition-colors shrink-0 ml-3"
                aria-label="Remove file"
            >
                <X size={20} />
            </button>
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
        </div>
    );
}