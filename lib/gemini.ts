import { GoogleGenAI, Type } from "@google/genai";

// NOTE: uses the current `@google/genai` SDK (`@google/generative-ai` was
// deprecated and sunset in late 2025 — don't reach for it in new code).

const apiKey = process.env.GEMINI_API_KEY;

let client: GoogleGenAI | null = null;
function getClient() {
    if (!apiKey) {
        throw new Error(
            "GEMINI_API_KEY is not set. Add it to your .env.local file (see .env.local.example)."
        );
    }
    if (!client) {
        client = new GoogleGenAI({ apiKey });
    }
    return client;
}

// gemini-3.5-flash is Google's current GA flash model (mid-2026) — fast and
// cheap, plenty for resume rewriting. Swap to "gemini-3.1-pro-preview" if you
// want higher-quality output at higher price/latency.
const MODEL = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description:
                "0-100 estimate of how well the ORIGINAL (unedited) resume matches the job.",
        },
        keyChanges: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-6 short bullets summarizing what was changed and why.",
        },
        resume: {
            type: Type.OBJECT,
            properties: {
                fullName: { type: Type.STRING },
                title: {
                    type: Type.STRING,
                    description: "Professional headline tailored to the target role.",
                },
                contact: {
                    type: Type.STRING,
                    description:
                        "Original contact line: email / phone / location / links, pipe-separated. Never invent details.",
                },
                summary: {
                    type: Type.STRING,
                    description: "2-4 sentence professional summary tailored to the job.",
                },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                experience: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            role: { type: Type.STRING },
                            company: { type: Type.STRING },
                            dates: { type: Type.STRING },
                            bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ["role", "company", "dates", "bullets"],
                    },
                },
                education: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            degree: { type: Type.STRING },
                            school: { type: Type.STRING },
                            dates: { type: Type.STRING },
                        },
                        required: ["degree", "school", "dates"],
                    },
                },
            },
            required: [
                "fullName",
                "title",
                "contact",
                "summary",
                "skills",
                "experience",
                "education",
            ],
        },
        coverLetter: {
            type: Type.STRING,
            description:
                "Full cover letter, 3-4 paragraphs, plain text with blank lines between paragraphs.",
        },
        emailSubject: {
            type: Type.STRING,
            description: "Short subject line for the job application email.",
        },
    },
    required: ["matchScore", "keyChanges", "resume", "coverLetter", "emailSubject"],
};

export interface OptimizeInput {
    cvText: string;
    jobDescription: string;
}

// Transient errors worth retrying: 503 (overloaded), 429 (rate limited).
// Anything else (bad key, bad request, etc.) should fail immediately.
function isTransientError(err: unknown): boolean {
    const status =
        (err as { status?: number })?.status ??
        (err as { error?: { code?: number } })?.error?.code;
    return status === 503 || status === 429;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_RETRIES = 3;

export async function optimizeResume({ cvText, jobDescription }: OptimizeInput) {
    const ai = getClient();

    const prompt = `You are an expert resume writer and ATS optimization specialist.

You will be given a candidate's CURRENT RESUME (raw extracted text — formatting may be messy)
and a JOB DESCRIPTION they want to apply to.

Your job:
1. Rewrite the resume so it's tailored to the job description: mirror the job's key terms and
   skills where the candidate genuinely has them, quantify achievements where possible, and
   reorder/tighten bullets to foreground what this employer cares about most.
2. NEVER invent experience, employers, dates, degrees, or skills the candidate doesn't have.
   Only rephrase, reorder, and emphasize what's genuinely present in their original resume.
3. Write a tailored, specific cover letter (not generic boilerplate) referencing the role and
   company if named in the job description.
4. Write a short, professional email subject line for submitting this application.
5. Give an honest 0-100 matchScore for how well the ORIGINAL (unedited) resume fit the role.
6. List 3-6 short bullets in keyChanges describing what you changed and why.

CURRENT RESUME:
"""
${cvText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Respond ONLY with JSON matching the provided schema.`;

    let lastError: unknown;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: MODEL,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                    temperature: 0.4,
                },
            });

            const text = response.text;
            if (!text) {
                throw new Error("Gemini returned an empty response.");
            }

            try {
                return JSON.parse(text);
            } catch {
                throw new Error("Gemini returned malformed JSON. Please try again.");
            }
        } catch (err) {
            lastError = err;
            if (!isTransientError(err) || attempt === MAX_RETRIES) {
                break;
            }
            // Exponential backoff: ~1s, 2s, 4s
            await sleep(1000 * 2 ** attempt);
        }
    }

    if (isTransientError(lastError)) {
        throw new Error(
            "Gemini is under heavy load right now. Please try again in a minute."
        );
    }
    throw lastError instanceof Error
        ? lastError
        : new Error("Something went wrong while calling Gemini.");
}