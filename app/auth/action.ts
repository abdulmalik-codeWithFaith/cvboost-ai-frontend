"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthError, type Session, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string } | null;

type AuthOperation = "sign up" | "sign in";

function getAuthErrorMessage(error: unknown, operation: AuthOperation) {
  if (error instanceof AuthError) {
    if (error.name === "AuthRetryableFetchError") {
      return "The authentication service is unavailable right now. Check your connection and try again.";
    }

    if (
      operation === "sign up" &&
      /user already registered|already exists|email.*already/i.test(
        error.message
      )
    ) {
      return "An account with this email already exists. Sign in instead.";
    }

    switch (error.code) {
      case "email_exists":
      case "user_already_exists":
        return "An account with this email already exists. Sign in instead.";
      case "email_address_invalid":
        return "Enter a valid email address.";
      case "weak_password":
        return "This password is too weak. Choose a stronger password with at least 8 characters.";
      case "signup_disabled":
        return "New account registration is currently disabled. Please contact support.";
      case "email_provider_disabled":
      case "provider_disabled":
        return "Email and password authentication is currently unavailable. Please contact support.";
      case "email_not_confirmed":
        return "This account was created while email confirmation was enabled. Confirm it in Supabase Auth or contact support before signing in.";
      case "invalid_credentials":
        return "The email or password is incorrect.";
      case "user_banned":
        return "This account is currently disabled. Please contact support.";
      case "over_request_rate_limit":
      case "over_email_send_rate_limit":
        return "There have been too many attempts. Please wait a few minutes and try again.";
      case "captcha_failed":
        return "The security check failed. Refresh the page and try again.";
      default:
        return error.message || `We couldn't ${operation}. Please try again.`;
    }
  }

  if (
    error instanceof TypeError &&
    /fetch|network|connection/i.test(error.message)
  ) {
    return "Couldn't reach the authentication service. Check your connection and try again.";
  }

  console.error(`${operation} failed unexpectedly:`, error);
  return `We couldn't ${operation} right now. Please try again. If the problem continues, contact support.`;
}

async function getOrigin() {
  const h = await headers();
  return (
    h.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

export async function signUp(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name) {
    return { error: "Enter your full name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Your password must be at least 8 characters long." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  let user: User | null = null;
  let session: Session | null = null;
  let authError: AuthError | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    user = data.user;
    session = data.session;
    authError = error;
  } catch (error) {
    return { error: getAuthErrorMessage(error, "sign up") };
  }

  if (authError) {
    return { error: getAuthErrorMessage(authError, "sign up") };
  }

  if (user?.identities?.length === 0) {
    return {
      error: "An account with this email already exists. Sign in instead.",
    };
  }

  if (!user) {
    return {
      error: "Supabase didn't return an account. Please try signing up again.",
    };
  }

  if (!session) {
    return {
      error:
        "Your account was created, but Supabase didn't sign you in. Email confirmation may still be enabled in Supabase Auth settings. Disable Confirm email, then sign in.",
    };
  }

  redirect("/dashboard");
}

export async function signIn(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (!password) {
    return { error: "Enter your password." };
  }

  let session: Session | null = null;
  let authError: AuthError | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    session = data.session;
    authError = error;
  } catch (error) {
    return { error: getAuthErrorMessage(error, "sign in") };
  }

  if (authError) {
    return { error: getAuthErrorMessage(authError, "sign in") };
  }

  if (!session) {
    return {
      error:
        "Your credentials were accepted, but no sign-in session was created. Please try again.",
    };
  }

  redirect("/dashboard");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      // Always show Google's account picker so a previous
      // session can't silently hijack the next attempt.
      queryParams: { prompt: "select_account" },
    },
  });

  if (error || !data.url) redirect("/login?error=oauth_failed");

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}