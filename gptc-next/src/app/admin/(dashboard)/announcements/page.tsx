import { getDb } from "@/db";
import { announcements } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveAnnouncement, deleteAnnouncement } from "@/app/admin/actions";
import DeleteBtn from "../delete-button";
import { styles } from "@/components/admin/CrudStyles";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  await requireAdmin();
  const db = getDb();
  const items = await db
    .select()
    .from(announcements)
    .orderBy(asc(announcements.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Announcements
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveAnnouncement}
        style={styles.card}
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <input
            name="text"
            defaultValue={editing?.text ?? ""}
            placeholder="Announcement text"
            required
            style={{ ...styles.input, gridColumn: "1 / -1" }}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={editing?.sortOrder ?? 0}
            placeholder="Sort Order"
            style={styles.input}
          />
        </div>
        <div style={{ ...styles.flexRow, marginBottom: "12px" }}>
          <label
            style={{ ...styles.label, display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input
              type="checkbox"
              name="active"
              defaultChecked={editing ? editing.active : true}
            />
            Active
          </label>
        </div>
        <div style={styles.flexRow}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Announcement"}
          </button>
          {editing && (
            <a
              href="?"
              style={{ ...styles.link, color: "var(--text-secondary)" }}
            >
              Cancel
            </a>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div
        style={{ borderRadius: "12px", border: "1px solid var(--border, #e2e8f0)", overflow: "hidden" }}
      >
        <table style={styles.table}>
          <thead>
            <tr style={{ background: "var(--bg-secondary)" }}>
              <th style={styles.th}>
                Text
              </th>
              <th style={styles.th}>
                Active
              </th>
              <th style={styles.th}>
                Order
              </th>
              <th style={styles.th}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr
                key={i.id}
                style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}
              >
                <td style={{ ...styles.td, maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {i.text}
                </td>
                <td style={styles.td}>
                  <span
                    style={{ fontSize: "12px", color: i.active ? "#16a34a" : "#94a3b8" }}
                  >
                    {i.active ? "Yes" : "No"}
                  </span>
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.sortOrder}
                </td>
                <td style={{ ...styles.td, ...styles.flexRow }}>
                  <a
                    href={`?edit=${i.id}`}
                    style={styles.link}
                  >
                    Edit
                  </a>
                  <DeleteBtn id={i.id} action={deleteAnnouncement} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
