"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { label: "Upload", href: "/upload", icon: "upload_file" },
    { label: "Results", href: "/results", icon: "analytics" },
    { label: "Settings", href: "/settings", icon: "settings" },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/90 backdrop-blur-lg border-t border-white/10 flex justify-around items-center p-3 z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center p-2 relative transition-colors ${isActive
                            ? "text-primary font-bold"
                            : "text-on-surface-variant hover:text-primary"
                            }`}
                    >
                        {isActive && (
                            <span className="absolute -top-1 w-8 h-1 bg-primary rounded-full" />
                        )}
                        <span
                            className="material-symbols-outlined text-2xl"
                            style={
                                isActive ? { fontVariationSettings: "'FILL' 1" } : {}
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="text-[10px] mt-1">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}