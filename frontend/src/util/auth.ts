// src/util/auth.ts
import { redirect } from "react-router-dom";

export function getToken() {
  return localStorage.getItem("token");
}

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function requireAuth() {
  const token = getToken();
  if (!token) return redirect("/");

  const payload = decodeJwtPayload(token);
  const expMs = (payload?.exp ?? 0) * 1000;

  if (!expMs || Date.now() >= expMs) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return redirect("/");
  }

  return null;
}
