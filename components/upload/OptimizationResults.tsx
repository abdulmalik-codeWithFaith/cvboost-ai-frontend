"use client";

import { useState } from "react";
import type { ResumeData } from "@/lib/resume-pdf";

export interface OptimizationResult {
    matchScore: number;
    keyChanges: string[];
    resume: ResumeData;
    coverLetter: string;
    emailSubject: string;
}

export default function OptimizationResults({ result }: { result: OptimizationResult }) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const [copiedField, setCopiedField] = useState<"subject" | "letter" | null>(null);

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        setDownloadError(null);
        try {
            const res = await fetch("/api/optimize/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.resume),
            });
            if (!res.ok) throw new Error("PDF generation failed");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${result.resume.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch {
            setDownloadError("Couldn't generate the PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const copyToClipboard = async (text: string, field: "subject" | "letter") => {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1500);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Match score + key changes */}
            <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-on-surface">Original Match Score</h3>
                    <span className="text-2xl font-bold text-primary">
                        {result.matchScore}
                        <span className="text-sm text-on-surface-variant">/100</span>
                    </span>
                </div>
                {result.keyChanges?.length > 0 && (
                    <ul className="flex flex-col gap-2 mt-2">
                        {result.keyChanges.map((change, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-primary text-base mt-0.5">
                                    check_circle
                                </span>
                                {change}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Resume download */}
            <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Optimized Resume
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Tailored to this job, ready to download as a PDF.
                    </p>
                </div>
                <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="bg-primary-container text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 shrink-0"
                >
                    <span className="material-symbols-outlined text-lg">
                        {isDownloading ? "progress_activity" : "download"}
                    </span>
                    {isDownloading ? "Generating..." : "Download PDF"}
                </button>
            </div>
            {downloadError && <p className="text-sm text-red-400 -mt-3">{downloadError}</p>}

            {/* Email subject */}
            <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        Email Subject Line
                    </h3>
                    <button
                        onClick={() => copyToClipboard(result.emailSubject, "subject")}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        {copiedField === "subject" ? "Copied!" : "Copy"}
                    </button>
                </div>
                <p className="text-sm text-on-surface bg-surface-container p-3 rounded-lg">
                    {result.emailSubject}
                </p>
            </div>

            {/* Cover letter */}
            <div className="rounded-2xl bg-surface-container-low border border-white/10 p-5">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">draft</span>
                        Cover Letter
                    </h3>
                    <button
                        onClick={() => copyToClipboard(result.coverLetter, "letter")}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        {copiedField === "letter" ? "Copied!" : "Copy"}
                    </button>
                </div>
                <div className="text-sm text-on-surface whitespace-pre-line leading-relaxed bg-surface-container p-4 rounded-lg max-h-96 overflow-y-auto">
                    {result.coverLetter}
                </div>
            </div>
        </div>
    );
}