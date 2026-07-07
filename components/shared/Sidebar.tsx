"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Upload CV", href: "/upload", icon: "upload_file" },
    { label: "Results", href: "/results", icon: "analytics" },
    { label: "Cover Letter", href: "/cover-letter", icon: "edit_document" },
    { label: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex bg-surface-container-low/80 backdrop-blur-lg fixed h-screen w-64 left-0 top-0 border-r border-white/10 shadow-2xl flex-col p-3 gap-2 z-40">
            {/* Logo */}
            <div className="flex items-center gap-2 px-2 py-6">
                <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    psychology
                </span>
                <div>
                    <h1 className="font-bold text-primary text-lg leading-tight">
                        CV Optimizer AI
                    </h1>
                    <p className="text-on-surface-variant text-xs">Expert Intelligence</p>
                </div>
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
                                ? "bg-primary-container text-white"
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

            {/* User Profile at bottom */}
            <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-sm font-bold">
                        S
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-on-surface truncate">Sarah Johnson</p>
                        <p className="text-xs text-on-surface-variant truncate">Pro Plan</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}