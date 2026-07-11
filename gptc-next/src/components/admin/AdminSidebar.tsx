"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronLeft, LogOut } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/sections", label: "Sections" },
  { href: "/admin/slides", label: "Slider" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/facilities", label: "Facilities" },
  { href: "/admin/links", label: "Links" },
  { href: "/admin/pages", label: "Page Content" },
  { href: "/admin/departments", label: "Departments" },
  { href: "/admin/settings", label: "Settings" },
];

const sidebarBg = "#003135";
const mutedWhite = "rgba(255,255,255,0.08)";

export default function AdminSidebar() {
  const p = usePathname();

  return (
    <aside style={{
      width: "240px", minHeight: "100vh", flexShrink: 0,
      display: "flex", flexDirection: "column",
      background: sidebarBg, borderRight: `1px solid ${mutedWhite}`,
    }}>
      {/* Brand */}
      <div style={{ padding: "20px", borderBottom: `1px solid ${mutedWhite}` }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(145deg, #003135, #024950, #0fa4af)",
            flexShrink: 0,
          }}>
            <Home size={16} color="white" />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "white", lineHeight: 1.25 }}>
              GPTC Admin
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", lineHeight: 1.25 }}>
              Kannur, Kerala
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "2px",
        overflowY: "auto",
      }}>
        {items.map(i => {
          const active = p === i.href || (i.href !== "/admin" && p.startsWith(i.href));
          return (
            <Link
              key={i.href}
              href={i.href}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "8px",
                fontSize: "14px", fontWeight: 500, textDecoration: "none",
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.55)",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ width: "16px", textAlign: "center", fontSize: "12px", flexShrink: 0 }}>
                {active ? "●" : "○"}
              </span>
              <span>{i.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px", borderTop: `1px solid ${mutedWhite}` }}>
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "8px",
            fontSize: "14px", textDecoration: "none",
            color: "rgba(255,255,255,0.45)", marginBottom: "4px",
            transition: "background 0.15s",
          }}
        >
          <ChevronLeft size={16} />
          Back to Website
        </Link>
        <form action="/admin/logout" method="POST">
          <button style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "8px",
            fontSize: "14px", width: "100%", border: "none",
            background: "transparent", cursor: "pointer",
            color: "rgba(255,255,255,0.45)",
            transition: "background 0.15s",
            fontFamily: "inherit",
          }}>
            <LogOut size={16} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
