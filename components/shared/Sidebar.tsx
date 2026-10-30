"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CVBoostLogo } from "@/components/brand";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Upload CV", href: "/upload", icon: "upload_file" },
    { label: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex bg-surface-container-low/80 backdrop-blur-lg fixed h-screen w-64 left-0 top-0 border-r border-white/10 shadow-2xl shadow-black/15 flex-col p-3 gap-2 z-40">
            {/* Logo */}
            <div className="px-3 py-6">
                <CVBoostLogo
                    variant="full"
                    size="md"
                    tagline="Expert Intelligence"
                    href="/dashboard"
                />
            </div>

            {/* Nav Items */}
            <div className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                                ? "bg-primary-container text-white font-medium"
                                : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                                }`}
                        >
                            <span
                                className="material-symbols-outlined text-xl"
                                style={
                                    isActive
                                        ? { fontVariationSettings: "'FILL' 1" }
                                        : {}
                                }
                            >
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Help / Status */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-white/80">AI Model Active</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                    Ready to optimize your CV with target ATS scoring.
                </p>
            </div>
        </nav>
    );
}
