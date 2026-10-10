"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function GoogleIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // CVBoost Design System: var(--bg) / var(--surface) / var(--border) / var(--text)
  // are set by the theme provider on :root / [data-theme="dark"] (see design.md section 7).
  const inputBase =
    "w-full h-13.25 bg-(--bg) rounded-[22px] border border-[var(--border)] text-(--text) pl-12 pr-4 text-[14px] font-normal placeholder:text-(--text-muted) focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const nameParts = formData.name.trim().split(/\s+/).filter(Boolean);
    const [firstName, ...rest] = nameParts;
    const lastName = rest.length > 0 ? rest.join(" ") : undefined;

    if (!firstName) {
      setError("Please enter your name.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      firstName,
      ...(lastName && { lastName }),
    };

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Register request failed:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 bg-(--bg) relative min-h-screen lg:min-h-0">
      {/* Mobile logo */}
      <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-(--accent) flex items-center justify-center">
          <FileText size={14} className="text-(--accentFg)" />
        </div>
        <span
          className="font-heading font-semibold text-(--text) text-[20px]"
          style={{ letterSpacing: "-0.4px" }}
        >
          CVBoost
        </span>
      </div>

      <div className="w-full max-w-105 my-auto pt-10 lg:pt-0">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2
            className="font-heading font-medium text-(--text) mb-2"
            style={{
              fontSize: "32px",
              lineHeight: 1.5,
              letterSpacing: "-1.28px",
            }}
          >
            Create account
          </h2>
          <p
            className="font-body text-(--text-muted) text-[14px]"
            style={{ letterSpacing: "-0.14px" }}
          >
            Tell us a little about yourself to get started.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-body text-[13px] font-medium text-(--text-muted) mb-2"
            >
              Full name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
              />
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-body text-[13px] font-medium text-(--text-muted) mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block font-body text-[13px] font-medium text-(--text-muted) mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`${inputBase} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text) transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-body text-[13px] font-medium text-(--text-muted) mb-2"
            >
              Confirm password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${inputBase} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text) transition-colors"
                aria-label={
                  showConfirm
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 mt-0.5 rounded border-outline-variant bg-(--bg) accent-(--accent) cursor-pointer shrink-0"
            />
            <label
              htmlFor="terms"
              className="font-body text-[13px] text-(--text-muted) leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-(--text) hover:text-(--accent) transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-(--text) hover:text-(--accent) transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Error message — only rendered when there's something to show */}
          {error && (
            <p
              role="alert"
              className="font-body text-[14px] text-warning -mt-1"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full h-13.25 rounded-full font-body font-medium text-[15px] text-(--accentFg) bg-(--accent) hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ letterSpacing: "-0.3px" }}
            >
              {isLoading ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="grow border-t border-outline-variant" />
          <span className="mx-4 font-body text-(--text-muted) text-[13px]">
            or
          </span>
          <div className="grow border-t border-outline-variant" />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          className="w-full h-13.25 rounded-full font-body text-[15px] font-medium text-(--text) border border-outline-variant bg-(--surface) hover:bg-(--border)/20 transition-colors flex items-center justify-center gap-3"
          style={{ letterSpacing: "-0.3px" }}
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Sign in link */}
        <p className="text-center mt-6 font-body text-[13px] text-(--text-muted)">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--accent) hover:opacity-80 font-medium transition-opacity"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
