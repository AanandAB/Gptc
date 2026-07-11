import { getDb } from "@/db";
import { events } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveEvent, deleteEvent } from "@/app/admin/actions";
import DeleteBtn from "../delete-button";
import ImageField from "@/components/admin/ImageField";
import { styles } from "@/components/admin/CrudStyles";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  await requireAdmin();
  const db = getDb();
  const items = await db.select().from(events).orderBy(asc(events.eventDate));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Events
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveEvent}
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
            name="slug"
            defaultValue={editing?.slug ?? ""}
            placeholder="Slug"
            style={styles.input}
          />
          <input
            name="eventDate"
            type="date"
            defaultValue={editing?.eventDate ?? ""}
            placeholder="Event Date"
            style={styles.input}
          />
          <ImageField
            name="featureImage"
            label="Feature Image"
            defaultValue={editing?.featureImage ?? ""}
          />
          <input
            name="excerpt"
            defaultValue={editing?.excerpt ?? ""}
            placeholder="Excerpt (short description)"
            style={{ ...styles.input, gridColumn: "1 / -1" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <textarea
            name="description"
            defaultValue={editing?.description ?? ""}
            placeholder="Full description"
            rows={3}
            style={styles.input}
          />
        </div>
        <div style={{ ...styles.flexRow, marginBottom: "12px" }}>
          <label
            style={{ ...styles.label, display: "flex", alignItems: "center", gap: "8px" }}
          >
            <input
              type="checkbox"
              name="published"
              defaultChecked={editing ? editing.published : false}
            />
            Published
          </label>
        </div>
        <div style={styles.flexRow}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Event"}
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
                Slug
              </th>
              <th style={styles.th}>
                Date
              </th>
              <th style={styles.th}>
                Published
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
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.slug}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.eventDate || "—"}
                </td>
                <td style={styles.td}>
                  <span
                    style={{ fontSize: "12px", color: i.published ? "#16a34a" : "#94a3b8" }}
                  >
                    {i.published ? "Yes" : "No"}
                  </span>
                </td>
                <td style={{ ...styles.td, ...styles.flexRow }}>
                  <a
                    href={`?edit=${i.id}`}
                    style={styles.link}
                  >
                    Edit
                  </a>
                  <DeleteBtn id={i.id} action={deleteEvent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
