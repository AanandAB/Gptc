// @ts-nocheck
// Edge-compatible auth (Web Crypto PBKDF2 + HMAC sessions)
const ITER = 100_000, KEYLEN = 32;

function b64(buffer) { const bytes = new Uint8Array(buffer); let b = ""; for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]); return btoa(b); }
function b64url(buffer) { return b64(buffer).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function b64ToBytes(s) { const bin = atob(b64urlToB64(s)); const b = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i); return b; }
function b64urlToB64(s) { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return s; }
function te(s) { return new TextEncoder().encode(s); }

async function derive(pw, salt, iter) {
  const key = await crypto.subtle.importKey("raw", te(pw), { name: "PBKDF2" }, false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, key, KEYLEN * 8);
}

export async function hashPassword(pw) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(pw, salt, ITER);
  return `pbkdf2$${ITER}$${b64(salt.buffer)}$${b64(hash)}`;
}

export async function verifyPassword(pw, stored) {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iter = parseInt(parts[1]), salt = b64ToBytes(parts[2]), expected = b64ToBytes(parts[3]);
  const actual = new Uint8Array(await derive(pw, salt, iter));
  let diff = expected.length ^ actual.length;
  for (let i = 0; i < expected.length && i < actual.length; i++) diff |= expected[i] ^ actual[i];
  return diff === 0;
}

// ── Session ──
const COOKIE = "gptc_session", MAX_AGE = 86400;
const SECRET = (typeof process !== "undefined" && process.env?.AUTH_SECRET) || "gptc-dev-secret-2025";

async function sign(payload) {
  const key = await crypto.subtle.importKey("raw", te(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const data = te(JSON.stringify(payload));
  const sig = await crypto.subtle.sign("HMAC", key, data);
  return `${b64url(data.buffer)}.${b64url(sig)}`;
}

async function verify(token) {
  try {
    const [pb, sb] = token.split("."); if (!pb || !sb) return null;
    const key = await crypto.subtle.importKey("raw", te(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const data = te(JSON.stringify(JSON.parse(atob(b64urlToB64(pb)))));
    const valid = await crypto.subtle.verify("HMAC", key, b64ToBytes(sb), data);
    if (!valid) return null;
    const p = JSON.parse(atob(b64urlToB64(pb)));
    return p.exp < Math.floor(Date.now() / 1000) ? null : p;
  } catch { return null; }
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(userId, username, role) {
  const payload = { userId, username, role, exp: Math.floor(Date.now() / 1000) + MAX_AGE };
  const token = await sign(payload);
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: MAX_AGE, path: "/" });
}

export async function getSession() {
  const tok = (await cookies()).get(COOKIE)?.value;
  return tok ? verify(tok) : null;
}

export async function destroySession() { (await cookies()).delete(COOKIE); }

export async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  return s;
}
