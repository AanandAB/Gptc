import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "@/lib/auth";

const COOKIE = "gptc_session";
const MAX_AGE = 86400;
const SECRET = "gptc-dev-secret-2025";

function te(s: string) { return new TextEncoder().encode(s); }
function b64url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let b = ""; for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]);
  return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signToken(payload: any) {
  const key = await crypto.subtle.importKey("raw", te(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const data = te(JSON.stringify(payload));
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return b64url(data.buffer) + "." + b64url(sig);
}

export async function POST(req: Request) {
  const fd = await req.formData();
  const u = fd.get("username") as string;
  const p = fd.get("password") as string;

  if (!u || !p) {
    return NextResponse.redirect(new URL("/admin/login?error=missing", req.url));
  }

  const db = getDb();
  const rows = await db.select().from(users).where(eq(users.username, u)).limit(1);
  const user = rows[0];

  if (!user || !(await verifyPassword(p, user.passwordHash))) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", req.url));
  }

  const payload = {
    userId: user.id, username: user.username, role: user.role,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE,
  };
  const token = await signToken(payload);

  const res = NextResponse.redirect(new URL("/admin", req.url), 302);
  res.cookies.set(COOKIE, token, {
    httpOnly: true, secure: false, sameSite: "lax", maxAge: MAX_AGE, path: "/",
  });
  return res;
}
