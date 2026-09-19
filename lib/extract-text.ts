import mammoth from "mammoth";
// Import the inner lib file, not the package root — pdf-parse's index.js has
// a debug-mode code path that tries to read a test PDF from disk on import
// in some bundler contexts. Going straight to lib/pdf-parse.js skips it.
import pdfParse from "pdf-parse/lib/pdf-parse.js";

/**
 * Pulls plain text out of an uploaded resume file so it can be sent to Gemini.
 * Supports PDF, DOCX, and plain text. Throws on unsupported types.
 */
export async function extractTextFromFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const name = file.name.toLowerCase();

    if (name.endsWith(".pdf") || file.type === "application/pdf") {
        const { text } = await pdfParse(buffer);
        return text;
    }

    if (
        name.endsWith(".docx") ||
        file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const { value } = await mammoth.extractRawText({ buffer });
        return value;
    }

    if (name.endsWith(".txt") || file.type === "text/plain") {
        return buffer.toString("utf-8");
    }

    throw new Error(
        "Unsupported file type. Please upload a PDF, DOCX, or TXT resume."
    );
}