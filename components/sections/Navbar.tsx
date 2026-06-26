"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 h-[72px] border-b border-white/10 backdrop-blur-xl bg-[#10131c]/70">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
          <FileText size={16} className="text-white" />
        </div>
        <span className="font-bold text-[#b4c5ff] text-lg tracking-tight">CVBoost</span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex gap-8 items-center text-sm">
        <Link href="#features" className="text-[#c3c6d7] hover:text-[#b4c5ff] transition-colors">
          Features
        </Link>
        <Link href="#how-it-works" className="text-[#c3c6d7] hover:text-[#b4c5ff] transition-colors">
          How It Works
        </Link>
        <Link href="#" className="text-[#c3c6d7] hover:text-[#b4c5ff] transition-colors">
          Pricing
        </Link>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg text-sm font-medium text-[#c3c6d7] border border-white/10 hover:bg-white/5 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#2563eb] to-[#4cd7f6] hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}