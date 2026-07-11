import { getDb } from "@/db";
import { galleryImages } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { saveGalleryImage, deleteGalleryImage } from "@/app/admin/actions";
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
  const items = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.sortOrder));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Gallery
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={saveGalleryImage}
        style={styles.card}
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div style={{ marginBottom: "12px" }}>
          <ImageField
            name="imageUrl"
            label="Image"
            defaultValue={editing?.imageUrl ?? ""}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <input
            name="caption"
            defaultValue={editing?.caption ?? ""}
            placeholder="Caption"
            style={styles.input}
          />
          <input
            name="category"
            defaultValue={editing?.category ?? "general"}
            placeholder="Category (general, events, campus, etc.)"
            style={styles.input}
          />
          <select
            name="size"
            defaultValue={editing?.size ?? "medium"}
            style={styles.input}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="wide">Wide</option>
            <option value="tall">Tall</option>
          </select>
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
            {editing ? "Update" : "Add Image"}
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
                Caption
              </th>
              <th style={styles.th}>
                Category
              </th>
              <th style={styles.th}>
                Size
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
                      alt={i.caption || ""}
                      style={{ width: "4rem", height: "2.5rem", objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    <span style={{ color: "var(--text-body, #334155)" }}>—</span>
                  )}
                </td>
                <td style={{ ...styles.td, maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {i.caption || "—"}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.category}
                </td>
                <td style={{ ...styles.td, color: "var(--text-body, #334155)" }}>
                  {i.size}
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
                  <DeleteBtn id={i.id} action={deleteGalleryImage} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
