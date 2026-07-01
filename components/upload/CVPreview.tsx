import { FileText, X } from "lucide-react";

interface CVPreviewProps {
    file: File;
    onRemove: () => void;
}

export default function CVPreview({ file, onRemove }: CVPreviewProps) {
    const fileType = file.name.toLowerCase().endsWith(".pdf") ? "PDF" : "DOCX";
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2);

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
        </div>
    );
}