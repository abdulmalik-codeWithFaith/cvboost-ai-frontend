import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";
import { AuthResponse } from "@/lib/types/auth";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const data = await apiFetch<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const response = NextResponse.json({user:data.user}, {status:201});
        response.cookies.set("accessToken", data.accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 15,
            });
        response.cookies.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return response;
    } catch (err) {
        if (err instanceof ApiError) {
            return NextResponse.json(
                { message: err.message, details: err.details },
                { status: err.status }
            );
        }
        console.error("Register route error:", err);
        return NextResponse.json(
            { message: "Unexpected server error" },
            { status: 500 }
        );
    }
}