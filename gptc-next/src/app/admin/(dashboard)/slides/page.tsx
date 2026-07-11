import { getDb } from "@/db";
import { slides } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveSlide, deleteSlide } from "@/app/admin/actions";
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
  const items = await db.select().from(slides).orderBy(asc(slides.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Slides
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveSlide}
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
            name="subtitle"
            defaultValue={editing?.subtitle ?? ""}
            placeholder="Subtitle"
            style={styles.input}
          />
          <ImageField
            name="imageUrl"
            label="Slide Image"
            defaultValue={editing?.imageUrl ?? ""}
          />
          <input
            name="sortOrder"
            type="number"
            defaultValue={editing?.sortOrder ?? 0}
            placeholder="Sort Order"
            style={styles.input}
          />
        </div>
        <div style={styles.flexRow}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Slide"}
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
                Image
              </th>
              <th style={styles.th}>
                Title
              </th>
              <th style={styles.th}>
                Subtitle
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
                  {i.imageUrl ? (
                    <img
                      src={i.imageUrl}
                      alt=""
                      style={{ width: "4rem", height: "2.25rem", objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    <span style={{ color: "var(--text-body, #334155)" }}>—</span>
                  )}
                </td>
                <td style={styles.td}>
                  {i.title || "—"}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.subtitle || "—"}
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
                  <DeleteBtn id={i.id} action={deleteSlide} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
