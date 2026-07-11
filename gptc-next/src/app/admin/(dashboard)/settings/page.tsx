import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { saveSiteSetting } from "@/app/admin/actions";
import { styles } from "@/components/admin/CrudStyles";

export const dynamic = "force-dynamic";

const PREDEFINED = [
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_subtitle", label: "Hero Subtitle" },
  { key: "hero_description", label: "Hero Description" },
  { key: "contact_address", label: "Contact Address" },
  { key: "contact_phone", label: "Contact Phone" },
  { key: "contact_email", label: "Contact Email" },
  { key: "established_year", label: "Established Year" },
  { key: "student_count", label: "Student Count" },
  { key: "faculty_count", label: "Faculty Count" },
  { key: "department_count", label: "Department Count" },
];

export default async function SettingsPage() {
  await requireAdmin();
  const db = getDb();
  const rows = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  rows.forEach((s) => (map[s.key] = s.value));

  return (
    <div>
      <h2 style={{ ...styles.pageTitle, marginBottom: "24px" }}>
        Site Settings
      </h2>

      <div style={{ maxWidth: "42rem", display: "flex", flexDirection: "column", gap: "16px" }}>
        {PREDEFINED.map(({ key, label }) => (
          <form
            action={saveSiteSetting}
            key={key}
            style={styles.card}
          >
            <input type="hidden" name="key" value={key} />
            <label
              style={{ ...styles.label, marginBottom: "8px" }}
            >
              {label}
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                name="value"
                defaultValue={map[key] || ""}
                style={{ ...styles.input, flex: 1 }}
              />
              <button
                type="submit"
                style={styles.btn}
              >
                Save
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
