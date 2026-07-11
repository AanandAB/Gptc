import { getDb } from "@/db";
import { pageContent } from "@/db/schema";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { savePageContent, deletePageContent } from "@/app/admin/actions";
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
  const items = await db.select().from(pageContent).orderBy(asc(pageContent.slug));
  const { edit } = await searchParams;
  const editing = edit ? items.find((i) => i.id === edit) : null;

  return (
    <div>
      <h2 style={styles.pageTitle}>
        Page Content
      </h2>

      {/* ADD / EDIT FORM */}
      <form
        action={savePageContent}
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
        <div style={{ marginBottom: "12px" }}>
          <textarea
            name="html"
            defaultValue={editing?.html ?? ""}
            placeholder="HTML Content"
            rows={8}
            style={styles.input}
          />
        </div>
        <div style={{ ...styles.flexRow, marginTop: "12px" }}>
          <button type="submit" style={styles.btn}>
            {editing ? "Update" : "Add Page"}
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
                Feature Image
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
                <td style={{ ...styles.td, maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-body, #334155)" }}>
                  {i.featureImage || "—"}
                </td>
                <td style={{ ...styles.td, ...styles.flexRow }}>
                  <a
                    href={`?edit=${i.id}`}
                    style={styles.link}
                  >
                    Edit
                  </a>
                  <DeleteBtn id={i.id} action={deletePageContent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
