import Link from "next/link";
import { FileText } from "lucide-react";

const footerLinks = ["Terms", "Privacy", "Support", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2563eb] to-[#4cd7f6] flex items-center justify-center">
            <FileText size={14} className="text-white" />
          </div>
          <span className="font-bold text-[#b4c5ff] text-sm">CVBoost</span>
          <span className="text-[#434655] text-xs ml-2">
            © {new Date().getFullYear()} CVBoost. All rights reserved.
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-[#8d90a0]">
          {footerLinks.map((l) => (
            <Link key={l} href="#" className="hover:text-[#c3c6d7] transition-colors">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}