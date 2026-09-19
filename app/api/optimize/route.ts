import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/extract-text";
import { optimizeResume } from "@/lib/gemini";

// pdf-parse / mammoth / the Gemini SDK all need Node APIs, not the Edge runtime.
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("cv");
        const jobDescription = formData.get("jobDescription");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No CV file provided." }, { status: 400 });
        }
        if (typeof jobDescription !== "string" || jobDescription.trim().length < 40) {
            return NextResponse.json(
                { error: "Please paste the full job description (a couple of sentences won't cut it)." },
                { status: 400 }
            );
        }

        const cvText = await extractTextFromFile(file);
        if (!cvText.trim()) {
            return NextResponse.json(
                {
                    error:
                        "We couldn't read any text from that file. Try a PDF or DOCX export of your resume.",
                },
                { status: 422 }
            );
        }

        const result = await optimizeResume({ cvText, jobDescription });
        return NextResponse.json(result);
    } catch (err) {
        console.error("[/api/optimize] failed:", err);
        const message =
            err instanceof Error ? err.message : "Something went wrong while optimizing your resume.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}