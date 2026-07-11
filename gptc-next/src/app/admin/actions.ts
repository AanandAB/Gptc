"use server";

import { getDb } from "@/db";
import { sections, slides, announcements, events, galleryImages, facilities, quickLinks, pageContent, departments, siteSettings, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hashPassword, verifyPassword, createSession, destroySession, requireAdmin, getSession } from "@/lib/auth";

function str(fd: FormData, k: string): string | undefined { const v = fd.get(k); const t = typeof v === "string" ? v.trim() : ""; return t === "" ? undefined : t; }
function num(fd: FormData, k: string): number | undefined { const v = str(fd, k); return v == null ? undefined : (Number.isFinite(+v) ? +v : undefined); }
function bool(fd: FormData, k: string): boolean { return fd.get(k) != null; }

export async function loginAction(prev: any, fd: FormData) {
  const u = str(fd, "username"), p = str(fd, "password");
  if (!u || !p) return { error: "Username and password required" };
  const db = getDb();
  const rows = await db.select().from(users).where(eq(users.username, u)).limit(1);
  const user = rows[0];
  if (!user || !(await verifyPassword(p, user.passwordHash))) return { error: "Invalid credentials" };
  await createSession(user.id, user.username, user.role);
  redirect("/admin");
}

export async function logoutAction() { await destroySession(); redirect("/admin/login"); }

// Generic CRUD helpers
async function save(table: any, fd: FormData, data: Record<string, any>) {
  await requireAdmin(); const db = getDb(); const id = str(fd, "id");
  if (id) { await db.update(table).set(data).where(eq(table.id, id)); }
  else { await db.insert(table).values({ id: crypto.randomUUID(), ...data }); }
}
async function del(table: any, id: string) { await requireAdmin(); const db = getDb(); await db.delete(table).where(eq(table.id, id)); }

export async function saveSection(fd: FormData) {
  await save(sections, fd, { slug: str(fd, "slug")!, title: str(fd, "title")!, type: str(fd, "type")!, sortOrder: num(fd, "sortOrder") ?? 0, visible: bool(fd, "visible"), content: str(fd, "content") ?? "" });
  revalidatePath("/admin/sections"); redirect("/admin/sections");
}
export async function deleteSection(id: string) { await del(sections, id); revalidatePath("/admin/sections"); }

export async function reorderSections(fd: FormData) {
  await requireAdmin(); const db = getDb(); const order = JSON.parse(str(fd, "order")!);
  for (let i = 0; i < order.length; i++) await db.update(sections).set({ sortOrder: i }).where(eq(sections.id, order[i]));
  revalidatePath("/admin/sections");
}

export async function saveSlide(fd: FormData) { await save(slides, fd, { title: str(fd, "title") ?? "", subtitle: str(fd, "subtitle") ?? "", imageUrl: str(fd, "imageUrl")!, sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/slides"); redirect("/admin/slides"); }
export async function deleteSlide(id: string) { await del(slides, id); revalidatePath("/admin/slides"); }

export async function saveAnnouncement(fd: FormData) { await save(announcements, fd, { text: str(fd, "text")!, active: bool(fd, "active"), sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/announcements"); redirect("/admin/announcements"); }
export async function deleteAnnouncement(id: string) { await del(announcements, id); revalidatePath("/admin/announcements"); }

export async function saveEvent(fd: FormData) { const t = str(fd, "title")!; await save(events, fd, { title: t, slug: str(fd, "slug") ?? t.toLowerCase().replace(/[^a-z0-9]+/g, "-"), description: str(fd, "description") ?? "", excerpt: str(fd, "excerpt") ?? "", featureImage: str(fd, "featureImage"), eventDate: str(fd, "eventDate"), published: bool(fd, "published") }); revalidatePath("/admin/events"); redirect("/admin/events"); }
export async function deleteEvent(id: string) { await del(events, id); revalidatePath("/admin/events"); }

export async function saveGalleryImage(fd: FormData) { await save(galleryImages, fd, { imageUrl: str(fd, "imageUrl")!, caption: str(fd, "caption") ?? "", category: str(fd, "category") ?? "general", size: str(fd, "size") ?? "medium", sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/gallery"); redirect("/admin/gallery"); }
export async function deleteGalleryImage(id: string) { await del(galleryImages, id); revalidatePath("/admin/gallery"); }

export async function saveFacility(fd: FormData) { await save(facilities, fd, { title: str(fd, "title")!, description: str(fd, "description") ?? "", iconName: str(fd, "iconName")!, sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/facilities"); redirect("/admin/facilities"); }
export async function deleteFacility(id: string) { await del(facilities, id); revalidatePath("/admin/facilities"); }

export async function saveQuickLink(fd: FormData) { await save(quickLinks, fd, { title: str(fd, "title")!, url: str(fd, "url")!, category: str(fd, "category") ?? "important", sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/links"); redirect("/admin/links"); }
export async function deleteQuickLink(id: string) { await del(quickLinks, id); revalidatePath("/admin/links"); }

export async function savePageContent(fd: FormData) { await save(pageContent, fd, { slug: str(fd, "slug")!, title: str(fd, "title") ?? "", html: str(fd, "html") ?? "", featureImage: str(fd, "featureImage"), featureImageAlt: str(fd, "featureImageAlt") }); revalidatePath("/admin/pages"); redirect("/admin/pages"); }
export async function deletePageContent(id: string) { await del(pageContent, id); revalidatePath("/admin/pages"); }

export async function saveDepartment(fd: FormData) { await save(departments, fd, { slug: str(fd, "slug")!, title: str(fd, "title")!, subtitle: str(fd, "subtitle") ?? "", hue: num(fd, "hue") ?? 200, duration: str(fd, "duration") ?? "3 Years", intake: num(fd, "intake") ?? 60, description: str(fd, "description") ?? "", about: str(fd, "about") ?? "[]", vision: str(fd, "vision") ?? "", mission: str(fd, "mission") ?? "[]", pso: str(fd, "pso") ?? "[]", peo: str(fd, "peo") ?? "[]", featureImage: str(fd, "featureImage"), sortOrder: num(fd, "sortOrder") ?? 0 }); revalidatePath("/admin/departments"); redirect("/admin/departments"); }
export async function deleteDepartment(id: string) { await del(departments, id); revalidatePath("/admin/departments"); }

export async function saveSiteSetting(fd: FormData) { const db = getDb(); const key = str(fd, "key")!, value = str(fd, "value") ?? ""; const ex = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1); if (ex.length) { await db.update(siteSettings).set({ value }).where(eq(siteSettings.id, ex[0].id)); } else { await db.insert(siteSettings).values({ id: crypto.randomUUID(), key, value }); } revalidatePath("/admin/settings"); redirect("/admin/settings"); }
