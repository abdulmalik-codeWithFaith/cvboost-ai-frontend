"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import CVPreview from "./CVPreview";

interface UploadBoxProps {
    onFileSelected: (file: File) => void;
}

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_MB = 5;

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

    if (selectedFile) {
        return <CVPreview file={selectedFile} onRemove={handleRemove} />;
    }
    return (
        <div>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging
                    ? "border-primary bg-primary/5"
                    : "border-white/15 hover:border-white/30"
                    }`}
            >
                <Upload className="text-accent mb-3" size={32} />
                <p className="text-text font-medium">
                    Drag & drop your CV here, or click to browse
                </p>
                <p className="text-sm text-text/60 mt-1">PDF or DOCX, up to 5MB</p>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
    );
}