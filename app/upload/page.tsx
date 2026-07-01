"use client";

import { useState } from "react";
import UploadBox from "@/components/upload/UploadBox";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleContinue = async () => {
        if (!file) return;

        setIsUploading(true);

        // TODO: Replace with real NestJS API call once backend endpoint is ready
        // const formData = new FormData();
        // formData.append("cv", file);
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        //   method: "POST",
        //   body: formData,
        // });

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
        </div>
    );
}