// lib/auth-cookies.ts

import { NextResponse } from "next/server";
import type { AuthResponse } from "@/lib/types/auth";

export function setAuthCookies(response: NextResponse, data: AuthResponse) {
  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15 min — placeholder until we confirm real token expiry
  });

  response.cookies.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days — same caveat
  });

  return response;
}