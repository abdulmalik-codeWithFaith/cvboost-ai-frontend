"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, FileText, Menu, Moon, Sun, X } from "lucide-react";
import { btnPrimary, EASE, H } from "./HomeUI";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-primary-container"
    />
  );
}

const NAV = [
  { href: "#try", label: "Try it" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="CVBoost home">
      <span
        className={`flex items-center justify-center rounded-lg bg-primary-container ${
          small ? "h-7 w-7" : "h-8 w-8"
        }`}
      >
        <FileText size={small ? 14 : 16} className="text-white" />
      </span>
      <span className={`${H} text-lg font-bold tracking-tight text-white`}>CVBoost</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("cvboost-theme", nextTheme);
    } catch {
    }
    setTheme(nextTheme);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 ${
          scrolled ? "border-white/10 bg-[#10131c]/80 shadow-lg shadow-black/12 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[#b7bccf] transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#dfe3f5] transition-colors hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="rounded-lg p-2 text-[#dfe3f5] hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#10131c]/95 p-3 backdrop-blur-xl md:hidden"
          >
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-[#dfe3f5] hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#try"
              onClick={() => setOpen(false)}
              className={`${btnPrimary} mt-2 w-full !justify-center !px-4 !py-2`}
            >
              <span className="relative">Try now</span>
              <ArrowRight size={15} className="relative" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function Footer() {
  const columns = [
    { heading: "Product", links: [["Try it", "#try"], ["Features", "#features"], ["How it works", "#how-it-works"], ["Pricing", "#pricing"]] },
    { heading: "Account", links: [["Log in", "/login"], ["Sign up", "/register"]] },
    { heading: "Company", links: [["Terms", "#"], ["Privacy", "#"], ["Support", "#"], ["Contact", "#"]] },
  ];
  return (
    <footer className="border-t border-white/10 px-6 py-14 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo small />
          <p className="mt-3 max-w-xs text-sm text-[#9aa0b4]">AI that tailors your CV and cover letter to every job you apply for.</p>
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-3 text-sm font-semibold text-white">{column.heading}</p>
            <ul className="space-y-2">
              {column.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <a href={href} className="text-sm text-[#9aa0b4] transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="text-sm text-[#9aa0b4] transition-colors hover:text-white">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-[#6b7086]">© {new Date().getFullYear()} CVBoost. All rights reserved.</p>
    </footer>
  );
}