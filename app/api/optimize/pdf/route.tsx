import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument, type ResumeData } from "@/lib/resume-pdf";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const resume = (await req.json()) as ResumeData;
        if (!resume?.fullName || !resume?.experience) {
            return NextResponse.json({ error: "Missing resume data." }, { status: 400 });
        }

        const buffer = await renderToBuffer(<ResumeDocument resume={resume} />);
        const safeName = resume.fullName.trim().replace(/\s+/g, "_") || "Resume";

        return new NextResponse(new Blob([new Uint8Array(buffer)], { type: "application/pdf" }), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${safeName}_Resume.pdf"`,
            },
        });
    } catch (err) {
        console.error("[/api/optimize/pdf] failed:", err);
        return NextResponse.json({ error: "Failed to generate PDF." }, { status: 500 });
    }
}