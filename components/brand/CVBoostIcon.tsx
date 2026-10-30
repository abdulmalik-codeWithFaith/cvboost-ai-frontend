import React from "react";

export interface CVBoostIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
  fillBackground?: boolean;
}

/**
 * CVBoostIcon - Vector SVG representation of the CVBoost 3-layered document mark.
 * Staggered stacked CV pages with folded dog-ear corner and document lines.
 */
export function CVBoostIcon({
  size = 32,
  className = "",
  color = "#4fa1f9",
  fillBackground = false,
  ...props
}: CVBoostIconProps) {
  return (
    <svg
      viewBox="0 0 112 140"
      width={size}
      height={typeof size === "number" ? Math.round((size * 140) / 112) : size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Optional subtle page fills */}
      {fillBackground && (
        <>
          <path d="M21 3H107V119H99V13H21V3Z" fill="currentColor" fillOpacity="0.04" />
          <path d="M11 11H97V127H89V21H11V11Z" fill="currentColor" fillOpacity="0.06" />
          <path d="M3 19V137H89V42L66 19H3Z" fill="currentColor" fillOpacity="0.1" />
        </>
      )}

      {/* Back Document Outline */}
      <path
        d="M21 3H107C108.1 3 109 3.9 109 5V117C109 118.1 108.1 119 107 119H99"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Middle Document Outline */}
      <path
        d="M11 11H97C98.1 11 99 11.9 99 13V125C99 126.1 98.1 127 97 127H89"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front Document Main Body */}
      <path
        d="M3 19V135C3 136.1 3.9 137 5 137H87C88.1 137 89 136.1 89 135V42L66 19H5C3.9 19 3 19.9 3 21Z"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front Document Dog-ear Fold */}
      <path
        d="M66 19V42H89"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front Document Lines */}
      {/* Header contact / role lines */}
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="33"
        x2="48"
        y2="33"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="42"
        x2="48"
        y2="42"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* CV Content horizontal body lines */}
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="57"
        x2="76"
        y2="57"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="66"
        x2="76"
        y2="66"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="75"
        x2="76"
        y2="75"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="84"
        x2="76"
        y2="84"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="93"
        x2="76"
        y2="93"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Short bullet item */}
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="102"
        x2="31"
        y2="102"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Bottom section line */}
      <line
        className="cvboost-logo-line"
        x1="14"
        y1="119"
        x2="49"
        y2="119"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default CVBoostIcon;
