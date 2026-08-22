// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api";
import { setAuthCookies } from "@/lib/auth-cookies";
import type { AuthResponse } from "@/lib/types/auth";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const data = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = NextResponse.json({ user: data.user }, { status: 200 });

    return setAuthCookies(response, data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { message: err.message, details: err.details },
        { status: err.status }
      );
    }

    console.error("Login route error:", err);
    return NextResponse.json(
      { message: "Unexpected server error" },
      { status: 500 }
    );
  }
}