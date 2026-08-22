"use client";

import Link from "next/link";
import { Mail, Send, ArrowLeft, Info, FileText } from "lucide-react";

export default function ForgotPasswordForm() {
  return (
    <div className="w-full flex items-center justify-center px-6 py-16 relative z-10 min-h-screen">
      {/* Mobile / center logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
          <FileText size={14} className="text-white" />
        </div>
        <span className="font-bold text-[#b4c5ff] text-base tracking-tight">CVBoost</span>
      </div>

      <div className="w-full max-w-[440px]">

        {/* Key icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/30 flex items-center justify-center relative">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-[#2563eb]/10 blur-md" />
            <div className="w-12 h-12 rounded-full bg-[#2563eb]/20 border border-[#b4c5ff]/20 flex items-center justify-center relative z-10">
              <span className="text-2xl">🔑</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-[#e1e2ee] mb-2"
            style={{ letterSpacing: "-0.01em" }}
          >
            Forgot Password?
          </h1>
          <p className="text-[#8d90a0] text-sm leading-relaxed">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655]"
              />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full h-12 bg-[#1d1f28] rounded-lg border border-[#434655] text-[#e1e2ee] pl-11 pr-4 text-sm placeholder:text-[#434655] focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/40 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full h-12 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#2563eb] to-[#03b5d3] hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2563eb]/25 flex items-center justify-center gap-2"
          >
            <Send size={16} />
            Send Reset Link
          </button>
        </div>

        {/* Back to login */}
        <div className="text-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[#b4c5ff] hover:text-[#4cd7f6] font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Login
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 mb-6" />

        {/* Need Help card */}
        <div
          className="rounded-xl p-5 border border-[#2563eb]/20 relative overflow-hidden"
          style={{
            background: "rgba(37, 99, 235, 0.08)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4cd7f6]/30 to-transparent" />

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center shrink-0 mt-0.5">
              <Info size={15} className="text-[#4cd7f6]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#e1e2ee] mb-1">Need Help?</p>
              <p className="text-xs text-[#8d90a0] leading-relaxed">
                If you&apos;re having trouble resetting your password, contact our
                support team at{" "}
                <a
                  href="mailto:support@cvboost.ai"
                  className="text-[#4cd7f6] hover:text-[#b4c5ff] transition-colors underline underline-offset-2"
                >
                  support@cvboost.ai
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom brand */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
              <FileText size={13} className="text-white" />
            </div>
            <span className="font-bold text-[#b4c5ff] text-sm">CVBoost</span>
          </div>
          <p className="text-xs text-[#434655]">AI-Powered Resume Optimization</p>
        </div>
      </div>
    </div>
  );
}