import { getDb } from "@/db";
import { facilities } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveFacility, deleteFacility } from "@/app/admin/actions";
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
  const items = await db.select().from(facilities).orderBy(asc(facilities.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Facilities
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveFacility}
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
            name="iconName"
            defaultValue={editing?.iconName ?? ""}
            placeholder="Icon Name (lucide icon)"
            required
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
        <div style={{ marginBottom: "12px" }}>
          <textarea
            name="description"
            defaultValue={editing?.description ?? ""}
            placeholder="Description"
            rows={3}
            style={styles.input}
          />
        </div>
        <div style={{ ...styles.flexRow, marginTop: "12px" }}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Facility"}
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
                Description
              </th>
              <th style={styles.th}>
                Icon
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
                  {i.description}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.iconName}
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
                  <DeleteBtn id={i.id} action={deleteFacility} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
