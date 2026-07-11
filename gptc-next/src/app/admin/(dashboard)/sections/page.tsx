import { getDb } from "@/db";
import { sections } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveSection, deleteSection } from "@/app/admin/actions";
import DeleteBtn from "../delete-button";
import SectionReorder from "./reorder";
import { styles } from "@/components/admin/CrudStyles";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  await requireAdmin();
  const db = getDb();
  const items = await db.select().from(sections).orderBy(asc(sections.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Sections
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveSection}
        style={styles.card}
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <input
            name="slug"
            defaultValue={editing?.slug ?? ""}
            placeholder="slug"
            required
            style={styles.input}
          />
          <input
            name="title"
            defaultValue={editing?.title ?? ""}
            placeholder="Title"
            required
            style={styles.input}
          />
          <input
            name="type"
            defaultValue={editing?.type ?? ""}
            placeholder="Type (hero, about, etc.)"
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
            name="content"
            defaultValue={editing?.content ?? ""}
            placeholder="Content (JSON or text)"
            rows={3}
            style={styles.input}
          />
        </div>
        <div style={styles.flexRow}>
          <label
            style={{ ...styles.label, display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input
              type="checkbox"
              name="visible"
              defaultChecked={editing ? editing.visible : true}
            />
            Visible
          </label>
        </div>
        <div style={{ ...styles.flexRow, marginTop: "12px" }}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Section"}
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

      {/* DRAG-DROP REORDER */}
      <SectionReorder items={items} />

      {/* TABLE */}
      <div
        style={{ borderRadius: "12px", border: "1px solid var(--border, #e2e8f0)", overflow: "hidden" }}
      >
        <table style={styles.table}>
          <thead>
            <tr style={{ background: "var(--bg-secondary)" }}>
              <th style={styles.th}>
                Slug
              </th>
              <th style={styles.th}>
                Title
              </th>
              <th style={styles.th}>
                Type
              </th>
              <th style={styles.th}>
                Order
              </th>
              <th style={styles.th}>
                Visible
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
                  {i.slug}
                </td>
                <td style={styles.td}>
                  {i.title}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.type}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.sortOrder}
                </td>
                <td style={styles.td}>
                  <span
                    style={{ fontSize: "12px", color: i.visible ? "#16a34a" : "#94a3b8" }}
                  >
                    {i.visible ? "Yes" : "No"}
                  </span>
                </td>
                <td style={{ ...styles.td, ...styles.flexRow }}>
                  <a
                    href={`?edit=${i.id}`}
                    style={styles.link}
                  >
                    Edit
                  </a>
                  <DeleteBtn id={i.id} action={deleteSection} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
