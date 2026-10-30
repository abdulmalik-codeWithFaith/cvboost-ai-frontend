"use client";

import type { CSSProperties, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

interface FormSubmitButtonProps {
  children: ReactNode;
  pendingLabel: string;
  className: string;
  style?: CSSProperties;
}

export default function FormSubmitButton({
  children,
  pendingLabel,
  className,
  style,
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={className}
      style={style}
    >
      {pending ? (
        <>
          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
