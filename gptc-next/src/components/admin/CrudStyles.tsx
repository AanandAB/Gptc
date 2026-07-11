"use client";
import React from "react";

export const styles = {
  pageTitle: { fontSize: "22px", fontWeight: 700, marginBottom: "16px", color: "var(--text-dark, #1e2e30)", fontFamily: "system-ui, sans-serif" } as React.CSSProperties,
  card: { padding: "20px", borderRadius: "12px", border: "1px solid var(--border, #e2e8f0)", background: "var(--bg-card, #ffffff)", marginBottom: "20px" } as React.CSSProperties,
  input: { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border, #e2e8f0)", fontSize: "14px", background: "var(--bg-primary, #f8fafb)", color: "var(--text-dark, #1e2e30)", outline: "none", boxSizing: "border-box" as const },
  btn: { padding: "10px 20px", borderRadius: "10px", border: "none", fontSize: "14px", fontWeight: 600, color: "white", cursor: "pointer", background: "var(--gradient-hero, linear-gradient(145deg, #003135, #024950, #0fa4af))" } as React.CSSProperties,
  btnDanger: { padding: "8px 16px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 500, color: "white", cursor: "pointer", background: "#ef4444" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "14px" },
  th: { textAlign: "left" as const, padding: "12px 16px", color: "var(--text-dark, #1e2e30)", fontWeight: 600, borderBottom: "2px solid var(--border, #e2e8f0)" },
  td: { padding: "12px 16px", color: "var(--text-body, #334155)", borderBottom: "1px solid var(--border, #e2e8f0)" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "4px", color: "var(--text-body, #334155)" } as React.CSSProperties,
  link: { fontSize: "14px", color: "var(--primary, #024950)", textDecoration: "none", cursor: "pointer" } as React.CSSProperties,
  muted: { fontSize: "13px", color: "var(--text-muted, #94a3b8)" } as React.CSSProperties,
  flexRow: { display: "flex", alignItems: "center", gap: "12px" } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" } as React.CSSProperties,
};
