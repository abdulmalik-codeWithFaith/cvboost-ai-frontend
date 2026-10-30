"use client";

import React from "react";
import { CVBoostLogo } from "@/components/brand";

interface MobileHeaderProps {
  rightElement?: React.ReactNode;
}

export function MobileHeader({ rightElement }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface-container-low/90 backdrop-blur-md sticky top-0 z-30 mb-4">
      <CVBoostLogo variant="logo" size="sm" href="/dashboard" />
      {rightElement && <div>{rightElement}</div>}
    </header>
  );
}

export default MobileHeader;

