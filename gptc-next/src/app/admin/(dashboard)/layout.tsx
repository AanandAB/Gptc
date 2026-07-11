import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary, #f8fafb)" }}>
      <AdminSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border, #e2e8f0)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "64px" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: "var(--text-dark, #1e2e30)" }}>
                Welcome back, <span style={{ color: "var(--primary, #024950)" }}>{session.username}</span>
              </p>
              <p style={{ fontSize: "12px", margin: "2px 0 0", color: "var(--text-muted, #94a3b8)" }}>
                Government Polytechnic College Kannur
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "12px", borderLeft: "1px solid var(--border, #e2e8f0)" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--gradient-hero, linear-gradient(145deg,#003135,#024950,#0fa4af))",
                  color: "white", fontSize: "12px", fontWeight: 700,
                }}>
                  {session.username.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark, #1e2e30)" }}>
                  {session.username}
                </span>
                <form action="/admin/logout" method="POST">
                  <button style={{
                    width: "32px", height: "32px", border: "none", borderRadius: "8px",
                    background: "transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted, #94a3b8)",
                  }} title="Sign Out">
                    ⇥
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "24px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
