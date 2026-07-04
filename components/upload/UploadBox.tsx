"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import CVPreview from "./CVPreview";

interface UploadBoxProps {
    onFileSelected: (file: File) => void;
}

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_MB = 10;

export default function UploadBox({ onFileSelected }: UploadBoxProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateAndSetFile = (file: File) => {
        setError(null);
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setError("Only PDF and DOCX files are allowed.");
            return;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setError(`File must be smaller than ${MAX_SIZE_MB}MB.`);
            return;
        }
        setSelectedFile(file);
        onFileSelected(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) validateAndSetFile(file);
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndSetFile(file);
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div>
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !selectedFile && inputRef.current?.click()}
                className={`glass-panel rounded-2xl border-2 border-dashed transition-all duration-300 p-12 flex flex-col items-center justify-center text-center min-h-[400px] relative group overflow-hidden ${isDragging
                    ? "border-secondary bg-secondary/5"
                    : "border-outline-variant hover:border-secondary cursor-pointer"
                    }`}
            >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {selectedFile ? (
                    <div className="relative z-10 w-full max-w-md">
                        <CVPreview file={selectedFile} onRemove={handleRemove} />
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 border border-white/5 group-hover:scale-105 transition-transform duration-300 ai-glow">
                            <span
                                className="material-symbols-outlined text-5xl text-secondary"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                cloud_upload
                            </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-on-surface mb-3">
                            Drag & Drop your CV here
                        </h3>
                        <p className="text-on-surface-variant mb-8 max-w-md">
                            or click to browse your files. Our AI engine will immediately begin
                            parsing your experience.
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-2 rounded-full bg-surface-container border border-outline-variant text-sm font-semibold text-tertiary">
                                PDF
                            </span>
                            <span className="px-4 py-2 rounded-full bg-surface-container border border-outline-variant text-sm font-semibold text-tertiary">
                                DOCX
                            </span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-4 opacity-70">
                            Maximum file size: 10MB
                        </p>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>
            {error && (
                <p className="text-error text-sm mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                </p>
            )}
        </div>
    );
}