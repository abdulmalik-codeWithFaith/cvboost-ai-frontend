
const API_URL = process.env.API_URL;

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("API_URL is not set. Check your .env.local file.");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store", // auth calls should never be cached by Next.js
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message || "Something went wrong";

    throw new ApiError(res.status, message, body);
  }

  return body as T;
}