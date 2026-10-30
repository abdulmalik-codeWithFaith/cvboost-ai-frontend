"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CVBoostIcon } from "./CVBoostIcon";

export type LogoVariant = "icon" | "logo" | "full" | "badge";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
export type LogoTone = "auto" | "dark" | "light";

export interface CVBoostLogoProps {
  /**
   * "icon": renders just the logo mark
   * "logo": renders logo mark + name "CVBOOST"
   * "full": renders logo mark + name + tagline
   * "badge": renders the complete card badge with original pale-blue container
   */
  variant?: LogoVariant;
  size?: LogoSize;
  tagline?: string;
  href?: string | null;
  tone?: LogoTone;
  useImage?: boolean;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const sizeConfig: Record<
  LogoSize,
  {
    iconSize: number;
    textClass: string;
    taglineClass: string;
    gap: string;
    imgWidth: number;
    imgHeight: number;
  }
> = {
  xs: {
    iconSize: 20,
    textClass: "text-sm tracking-tight",
    taglineClass: "text-[10px]",
    gap: "gap-1.5",
    imgWidth: 96,
    imgHeight: 22,
  },
  sm: {
    iconSize: 24,
    textClass: "text-base tracking-tight",
    taglineClass: "text-[11px]",
    gap: "gap-2",
    imgWidth: 120,
    imgHeight: 28,
  },
  md: {
    iconSize: 32,
    textClass: "text-xl tracking-tight",
    taglineClass: "text-xs",
    gap: "gap-2.5",
    imgWidth: 150,
    imgHeight: 35,
  },
  lg: {
    iconSize: 40,
    textClass: "text-2xl tracking-tight",
    taglineClass: "text-sm",
    gap: "gap-3",
    imgWidth: 180,
    imgHeight: 42,
  },
  xl: {
    iconSize: 48,
    textClass: "text-3xl tracking-tight",
    taglineClass: "text-base",
    gap: "gap-3.5",
    imgWidth: 220,
    imgHeight: 52,
  },
};

export function CVBoostLogo({
  variant = "logo",
  size = "md",
  tagline = "AI Resume & Career Intelligence",
  href = "/",
  tone = "auto",
  useImage = false,
  className = "",
  iconClassName = "",
  priority = false,
  onClick,
}: CVBoostLogoProps) {
  const cfg = sizeConfig[size];

  // Text color based on tone
  const textColorClass =
    tone === "light"
      ? "text-[#193655]"
      : tone === "dark"
      ? "text-white"
      : "text-white dark:text-white";

  const taglineColorClass =
    tone === "light"
      ? "text-[#475569]"
      : tone === "dark"
      ? "text-[#94a3b8]"
      : "text-[#9aa0b4] dark:text-[#9aa0b4]";

  // Badge variant: renders the full original logo card with ice-blue container
  if (variant === "badge") {
    const badgeContent = (
      <div
        className={`inline-flex items-center gap-3 rounded-2xl bg-[#eaf3fc] px-4 py-2.5 shadow-sm border border-[#d2e4f7] transition-transform hover:scale-[1.02] ${className}`}
      >
        <CVBoostIcon size={cfg.iconSize} color="#4fa1f9" className={iconClassName} />
        <div>
          <span className={`font-serif italic font-bold text-[#193655] ${cfg.textClass}`}>
            CVBOOST
          </span>
          {tagline && (
            <p className={`text-[#3b597d] font-sans font-medium ${cfg.taglineClass}`}>
              {tagline}
            </p>
          )}
        </div>
      </div>
    );

    return href ? (
      <Link
        href={href}
        aria-label="CVBoost Home"
        className="inline-flex select-none"
        onClick={onClick}
      >
        {badgeContent}
      </Link>
    ) : (
      badgeContent
    );
  }

  // Content for icon-only, standard logo, or full (with tagline)
  const content = (
    <div className={`inline-flex items-center ${cfg.gap} select-none ${className}`}>
      {/* Icon Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        {useImage ? (
          <Image
            src="/brand/logo-icon.png"
            alt="CVBoost logo mark"
            width={cfg.iconSize}
            height={Math.round((cfg.iconSize * 140) / 112)}
            priority={priority}
            className={`object-contain ${iconClassName}`}
          />
        ) : (
          <CVBoostIcon
            size={cfg.iconSize}
            color="#4fa1f9"
            className={`transition-transform duration-200 group-hover:scale-105 ${iconClassName}`}
          />
        )}
      </div>

      {/* Brand Name & Tagline */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            {useImage ? (
              <Image
                src={tone === "light" ? "/brand/logo.png" : "/brand/logo-darkmode.png"}
                alt="CVBoost"
                width={cfg.imgWidth}
                height={cfg.imgHeight}
                priority={priority}
                className="object-contain"
              />
            ) : (
              <span
                className={`font-serif italic font-black ${textColorClass} ${cfg.textClass} tracking-wider transition-colors`}
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
                  letterSpacing: "0.04em",
                }}
              >
                CVBOOST
              </span>
            )}
          </div>

          {variant === "full" && tagline && (
            <span
              className={`mt-1 font-sans font-medium tracking-normal ${taglineColorClass} ${cfg.taglineClass}`}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        aria-label="CVBoost Home"
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default CVBoostLogo;
