"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const params = useSearchParams();
  const error = params.get("error");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid var(--border-color, #e2e8f0)",
    fontSize: "14px",
    background: "var(--bg-primary, #f8fafb)",
    color: "var(--text-dark, #1e2e30)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "linear-gradient(135deg, var(--bg-dark, #003135) 0%, var(--primary-dark, #003135) 50%, var(--primary, #024950) 100%)" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Card */}
        <div style={{ borderRadius: "16px", overflow: "hidden", background: "var(--bg-card, #ffffff)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
          {/* Header */}
          <div style={{ padding: "32px 32px 0", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", margin: "0 auto 16px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gradient-hero, linear-gradient(145deg, #003135, #024950, #0fa4af))" }}>
              <Shield size={28} color="white" />
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px", color: "var(--text-dark, #1e2e30)", fontFamily: "system-ui, sans-serif" }}>
              Admin Panel
            </h1>
            <p style={{ fontSize: "13px", margin: "0 0 24px", color: "var(--text-muted, #94a3b8)" }}>
              Government Polytechnic College Kannur
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: "0 32px 32px" }}>
            <form action="/api/auth/login" method="POST" onSubmit={() => setLoading(true)}>
              {/* Username */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-body, #334155)" }}>
                  Username
                </label>
                <input name="username" required style={inputStyle} placeholder="Enter your username" autoComplete="username" />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px", color: "var(--text-body, #334155)" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input name="password" type={showPw ? "text" : "password"} required style={{ ...inputStyle, paddingRight: "44px" }} placeholder="Enter your password" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} tabIndex={-1}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "var(--text-muted, #94a3b8)", padding: "4px" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error === "invalid" && (
                <div style={{ padding: "12px 16px", borderRadius: "12px", fontSize: "13px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.1)", color: "#dc2626" }}>
                  <Shield size={16} />
                  Invalid credentials
                </div>
              )}
              {error === "missing" && (
                <div style={{ padding: "12px 16px", borderRadius: "12px", fontSize: "13px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.1)", color: "#dc2626" }}>
                  <Shield size={16} />
                  Please enter username and password.
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px", border: "none",
                  fontSize: "14px", fontWeight: 600, color: "white", cursor: loading ? "wait" : "pointer",
                  background: "var(--gradient-hero, linear-gradient(145deg, #003135, #024950, #0fa4af))",
                  opacity: loading ? 0.6 : 1, boxShadow: "0 4px 14px rgba(0,49,53,0.3)",
                }}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "12px", marginTop: "24px", color: "var(--text-muted, #94a3b8)" }}>
              Default: <code style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", background: "var(--bg-primary, #f1f5f9)" }}>admin</code> / <code style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", background: "var(--bg-primary, #f1f5f9)" }}>admin123</code>
            </p>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "11px", marginTop: "20px", color: "rgba(255,255,255,0.4)" }}>
          &copy; 2025 GPTC Kannur
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #003135, #024950)" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.2)", borderTopColor: "white", animation: "spin 0.8s linear infinite" }} />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
