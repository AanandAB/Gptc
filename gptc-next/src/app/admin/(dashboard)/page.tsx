import { getDb } from "@/db";
import { sections, events, galleryImages, announcements, facilities, quickLinks, departments } from "@/db/schema";
import { count } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// server component — renders a client wrapper
export default async function DashboardPage() {
  await requireAdmin();
  const db = getDb();

  const [sc, ec, gc, ac, fc, lc, dc] = await Promise.all([
    db.select({ c: count() }).from(sections).then(r => r[0].c),
    db.select({ c: count() }).from(events).then(r => r[0].c),
    db.select({ c: count() }).from(galleryImages).then(r => r[0].c),
    db.select({ c: count() }).from(announcements).then(r => r[0].c),
    db.select({ c: count() }).from(facilities).then(r => r[0].c),
    db.select({ c: count() }).from(quickLinks).then(r => r[0].c),
    db.select({ c: count() }).from(departments).then(r => r[0].c),
  ]);

  const stats: { label: string; value: number; href: string; color: string; bg: string }[] = [
    { label: "Sections", value: sc, href: "/admin/sections", color: "#047857", bg: "rgba(4,120,87,0.1)" },
    { label: "Events", value: ec, href: "/admin/events", color: "#0d9488", bg: "rgba(13,148,136,0.1)" },
    { label: "Gallery", value: gc, href: "/admin/gallery", color: "#1e40af", bg: "rgba(30,64,175,0.1)" },
    { label: "Announcements", value: ac, href: "/admin/announcements", color: "#d97706", bg: "rgba(217,119,6,0.1)" },
    { label: "Facilities", value: fc, href: "/admin/facilities", color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
    { label: "Links", value: lc, href: "/admin/links", color: "#db2777", bg: "rgba(219,39,119,0.1)" },
    { label: "Departments", value: dc, href: "/admin/departments", color: "#0891b2", bg: "rgba(8,145,178,0.1)" },
  ];
  const total = stats.reduce((s, x) => s + x.value, 0);

  const quickActions = [
    { label: "Add Event", href: "/admin/events?new=1", color: "#0d9488" },
    { label: "Upload Gallery", href: "/admin/gallery?new=1", color: "#1e40af" },
    { label: "Edit Sections", href: "/admin/sections", color: "#047857" },
    { label: "Site Settings", href: "/admin/settings", color: "#7c3aed" },
  ];

  const cardStyle = {
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid var(--border, #e2e8f0)",
    background: "var(--bg-card, #ffffff)",
    textDecoration: "none",
    display: "block",
    transition: "all 0.2s ease",
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px", color: "var(--text-dark, #1e2e30)", fontFamily: "system-ui, sans-serif" }}>
          Dashboard
        </h2>
        <p style={{ fontSize: "13px", color: "var(--text-muted, #94a3b8)", margin: 0 }}>
          Overview of your website content. Total {total} items across {stats.length} categories.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {stats.map(s => (
          <a key={s.label} href={s.href} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: s.bg, fontSize: "20px" }}>
                <span style={{ color: s.color }}>●</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: "30px", fontWeight: 700, margin: "0 0 2px", color: "var(--text-dark, #1e2e30)", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-muted, #94a3b8)", margin: 0 }}>
                {s.label}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px", color: "var(--text-muted, #94a3b8)" }}>
          Quick Actions
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
          {quickActions.map(a => (
            <a
              key={a.label}
              href={a.href}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "12px",
                border: "1px solid var(--border, #e2e8f0)",
                background: "var(--bg-card, #ffffff)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: `${a.color}15`, color: a.color, fontSize: "16px", fontWeight: 700 }}>
                +
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-dark, #1e2e30)" }}>
                {a.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
