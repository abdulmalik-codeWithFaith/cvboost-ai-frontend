"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import UploadBox from "@/components/upload/UploadBox";
import CVPreview from "@/components/upload/CVPreview";
import JobDescriptionInput from "@/components/upload/JobDescriptionInput";
import OptimizationResults, {
    type OptimizationResult,
} from "@/components/upload/OptimizationResults";

const MIN_JOB_DESCRIPTION_WORDS = 25;

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<OptimizationResult | null>(null);

    const jobDescriptionWordCount = jobDescription.trim()
        ? jobDescription.trim().split(/\s+/).length
        : 0;
    const canOptimize = !!file && jobDescriptionWordCount >= MIN_JOB_DESCRIPTION_WORDS;

    const handleOptimize = async () => {
        if (!canOptimize || !file) return;
        setIsOptimizing(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("cv", file);
            formData.append("jobDescription", jobDescription);

            const res = await fetch("/api/optimize", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.error || "Something went wrong while optimizing your resume.");
            }

            const data: OptimizationResult = await res.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleStartOver = () => {
        setFile(null);
        setJobDescription("");
        setResult(null);
        setError(null);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 flex flex-col pb-24 md:pb-0">
                <header className="hidden md:flex items-center justify-between px-10 py-5 border-b border-white/10 bg-surface-container-low/50 backdrop-blur-sm sticky top-0 z-30">
                    <div>
                        <h2 className="text-2xl font-bold text-on-surface">
                            {result ? "Your Optimized Application" : "Upload Your CV"}
                        </h2>
                        <p className="text-sm text-on-surface-variant">
                            {result
                                ? "Download your tailored resume and copy your cover letter."
                                : "Provide your resume and the job description to begin AI optimization."}
                        </p>
                    </div>
                    {!result && file && (
                        <button
                            onClick={handleOptimize}
                            disabled={!canOptimize || isOptimizing}
                            className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isOptimizing ? (
                                <>
                                    <span className="material-symbols-outlined text-lg animate-spin">
                                        progress_activity
                                    </span>
                                    Optimizing...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                                    Optimize with AI
                                </>
                            )}
                        </button>
                    )}
                    {result && (
                        <button
                            onClick={handleStartOver}
                            className="text-sm text-on-surface-variant hover:text-on-surface flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-lg">refresh</span>
                            Start over
                        </button>
                    )}
                </header>

                <div className="md:hidden px-4 pt-6 pb-3">
                    <h2 className="text-3xl font-bold text-on-surface">
                        {result ? "Your Optimized Application" : "Upload Your CV"}
                    </h2>
                    <p className="text-on-surface-variant mt-2">
                        {result
                            ? "Download your tailored resume and copy your cover letter."
                            : "Provide your resume and the job description to begin the AI optimization process."}
                    </p>
                </div>

                <div className="p-4 md:p-10 max-w-4xl mx-auto w-full flex flex-col gap-8">
                    {result ? (
                        <OptimizationResults result={result} />
                    ) : (
                        <>
                            <UploadBox onFileSelected={setFile} />
                            {file && (
                                <div>
                                    <h3 className="text-xl font-semibold text-on-surface mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">task</span>
                                        Current Document
                                    </h3>
                                    <CVPreview file={file} onRemove={() => setFile(null)} />
                                </div>
                            )}

                            <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

                            {error && (
                                <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                    <span className="material-symbols-outlined text-base mt-0.5">error</span>
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                <span className="text-xs">
                                    Your data is encrypted and securely stored. We never share your CV without
                                    permission.
                                </span>
                            </div>

                            {file && (
                                <button
                                    onClick={handleOptimize}
                                    disabled={!canOptimize || isOptimizing}
                                    className="md:hidden w-full bg-primary-container text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isOptimizing ? (
                                        <>
                                            <span className="material-symbols-outlined text-lg animate-spin">
                                                progress_activity
                                            </span>
                                            Optimizing...
                                        </>
                                    ) : (
                                        "Optimize with AI"
                                    )}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </main>
            <MobileNav />
        </div>
    );
}