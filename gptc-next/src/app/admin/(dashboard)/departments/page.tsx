import { getDb } from "@/db";
import { departments } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveDepartment, deleteDepartment } from "@/app/admin/actions";
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
  const items = await db.select().from(departments).orderBy(asc(departments.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Departments
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveDepartment}
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
            name="subtitle"
            defaultValue={editing?.subtitle ?? ""}
            placeholder="Subtitle"
            style={styles.input}
          />
          <input
            name="hue"
            type="number"
            defaultValue={editing?.hue ?? 200}
            placeholder="Hue (0-360)"
            style={styles.input}
          />
          <input
            name="duration"
            defaultValue={editing?.duration ?? "3 Years"}
            placeholder="Duration"
            style={styles.input}
          />
          <input
            name="intake"
            type="number"
            defaultValue={editing?.intake ?? 60}
            placeholder="Intake"
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
        <div style={{ marginBottom: "12px" }}>
          <ImageField
            name="featureImage"
            label="Feature Image"
            defaultValue={editing?.featureImage ?? ""}
          />
        </div>
        <div style={{ ...styles.flexRow, marginTop: "12px" }}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Department"}
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
                Slug
              </th>
              <th style={styles.th}>
                Title
              </th>
              <th style={styles.th}>
                Duration
              </th>
              <th style={styles.th}>
                Intake
              </th>
              <th style={styles.th}>
                Hue
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
                  {i.duration}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.intake}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.hue}
                </td>
                <td style={{ ...styles.td, ...styles.flexRow }}>
                  <a
                    href={`?edit=${i.id}`}
                    style={styles.link}
                  >
                    Edit
                  </a>
                  <DeleteBtn id={i.id} action={deleteDepartment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
