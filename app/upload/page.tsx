"use client";

import { useState } from "react";
<<<<<<< HEAD
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import UploadBox from "@/components/upload/UploadBox";
import CVPreview from "@/components/upload/CVPreview";
=======
import UploadBox from "@/components/upload/UploadBox";
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleContinue = async () => {
        if (!file) return;
<<<<<<< HEAD
        setIsUploading(true);
        // TODO: Replace with real NestJS API call
=======

        setIsUploading(true);

        // TODO: Replace with real NestJS API call once backend endpoint is ready
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
        // const formData = new FormData();
        // formData.append("cv", file);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        //   method: "POST",
        //   body: formData,
        // });
<<<<<<< HEAD
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsUploading(false);
        alert(`Mock upload complete: ${file.name}`);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 flex flex-col pb-24 md:pb-0">
                {/* Desktop Header */}
                <header className="hidden md:flex items-center justify-between px-10 py-5 border-b border-white/10 bg-surface-container-low/50 backdrop-blur-sm sticky top-0 z-30">
                    <div>
                        <h2 className="text-2xl font-bold text-on-surface">Upload Your CV</h2>
                        <p className="text-sm text-on-surface-variant">
                            Provide your current resume to begin AI optimization.
                        </p>
                    </div>
                    {file && (
                        <button
                            onClick={handleContinue}
                            disabled={isUploading}
                            className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isUploading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">
                                        progress_activity
                                    </span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">
                                        arrow_forward
                                    </span>
                                    Continue to Optimize
                                </>
                            )}
                        </button>
                    )}
                </header>

                {/* Mobile Header */}
                <div className="md:hidden px-4 pt-6 pb-3">
                    <h2 className="text-3xl font-bold text-on-surface">Upload Your CV</h2>
                    <p className="text-on-surface-variant mt-2">
                        Provide your current resume to begin the AI optimization process.
                    </p>
                </div>

                {/* Content */}
                <div className="p-4 md:p-10 max-w-4xl mx-auto w-full flex flex-col gap-8">
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

                    {/* Security note */}
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        <span className="text-xs">
                            Your data is encrypted and securely stored. We never share your CV without permission.
                        </span>
                    </div>

                    {/* Mobile continue button */}
                    {file && (
                        <button
                            onClick={handleContinue}
                            disabled={isUploading}
                            className="md:hidden w-full bg-primary-container text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isUploading ? "Uploading..." : "Continue to Optimize"}
                        </button>
                    )}
                </div>
            </main>
            <MobileNav />
=======

        // Temporary simulated delay so the UI feels real
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsUploading(false);
        alert(`Mock upload complete for: ${file.name}`);
    };

    return (
        <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-text mb-2">Upload Your CV</h1>
            <p className="text-text/70 mb-8">
                Upload a PDF or DOCX file to get started with your ATS optimization.
            </p>

            <UploadBox onFileSelected={setFile} />

            {file && (
                <button
                    onClick={handleContinue}
                    disabled={isUploading}
                    className="mt-6 w-full bg-primary text-white font-medium py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? "Uploading..." : "Continue"}
                </button>
            )}
>>>>>>> 2fb61ef3a092a06e240d924a1c893b64aa0fe816
        </div>
    );
}