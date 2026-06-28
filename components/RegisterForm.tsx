"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputBase =
    "w-full h-12 bg-[#1d1f28] rounded-lg border border-[#434655] text-[#e1e2ee] pl-11 pr-4 text-sm placeholder:text-[#434655] focus:outline-none focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6]/40 transition-all";

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 bg-[#10131c]/30 backdrop-blur-xl relative">
      {/* Mobile logo */}
      <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
          <FileText size={14} className="text-white" />
        </div>
        <span className="font-bold text-[#b4c5ff] text-base tracking-tight">CVBoost</span>
      </div>

      <div className="w-full max-w-[420px] mt-14 lg:mt-0">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#e1e2ee] mb-1.5" style={{ letterSpacing: "-0.01em" }}>
            Create Account
          </h2>
          <p className="text-[#8d90a0] text-sm">Start optimizing your profile today.</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655]" />
              <input
                type="text"
                placeholder="John Doe"
                className={inputBase}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655]" />
              <input
                type="email"
                placeholder="name@company.com"
                className={inputBase}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputBase} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#434655] hover:text-[#c3c6d7] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#434655]" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputBase} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#434655] hover:text-[#c3c6d7] transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 rounded border-[#434655] bg-[#1d1f28] accent-[#4cd7f6] cursor-pointer shrink-0"
            />
            <label htmlFor="terms" className="text-xs text-[#8d90a0] leading-relaxed cursor-pointer">
              I agree to the{" "}
              <Link href="#" className="text-[#b4c5ff] hover:text-[#4cd7f6] transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#b4c5ff] hover:text-[#4cd7f6] transition-colors">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="button"
              className="w-full h-12 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#2563eb] to-[#03b5d3] hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2563eb]/25 flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-white/10" />
          <span className="mx-4 text-[#434655] text-xs">or</span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full h-12 rounded-lg text-sm font-semibold text-[#e1e2ee] border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Sign in link */}
        <p className="text-center mt-6 text-xs text-[#8d90a0]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#b4c5ff] hover:text-[#4cd7f6] font-medium transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}