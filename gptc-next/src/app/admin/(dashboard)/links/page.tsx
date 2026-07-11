import { getDb } from "@/db";
import { quickLinks } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveQuickLink, deleteQuickLink } from "@/app/admin/actions";
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
  const items = await db.select().from(quickLinks).orderBy(asc(quickLinks.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Quick Links
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveQuickLink}
        style={styles.card}
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <input
            name="title"
            defaultValue={editing?.title ?? ""}
            placeholder="Title"
            required
            style={styles.input}
          />
          <input
            name="url"
            defaultValue={editing?.url ?? ""}
            placeholder="URL"
            required
            style={styles.input}
          />
          <input
            name="category"
            defaultValue={editing?.category ?? "important"}
            placeholder="Category (important, academic, etc.)"
            style={styles.input}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={editing?.sortOrder ?? 0}
            placeholder="Sort Order"
            style={styles.input}
          />
        </div>
        <div style={{ ...styles.flexRow, marginTop: "12px" }}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Link"}
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
                Title
              </th>
              <th style={styles.th}>
                URL
              </th>
              <th style={styles.th}>
                Category
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
                <td style={styles.td}>
                  {i.title}
                </td>
                <td style={{ ...styles.td, maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-body, #334155)" }}>
                  {i.url}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.category}
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
                  <DeleteBtn id={i.id} action={deleteQuickLink} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
