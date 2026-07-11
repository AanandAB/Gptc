import { getDb } from "@/db";
import {
  slides,
  announcements,
  events,
  galleryImages,
  facilities,
  quickLinks,
  pageContent,
  departments,
  siteSettings,
} from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getSlides() {
  const db = getDb();
  return db.select().from(slides).orderBy(asc(slides.sortOrder));
}

export async function getActiveAnnouncements() {
  const db = getDb();
  return db
    .select()
    .from(announcements)
    .where(eq(announcements.active, true))
    .orderBy(asc(announcements.sortOrder));
}

export async function getPublishedEvents() {
  const db = getDb();
  return db
    .select()
    .from(events)
    .where(eq(events.published, true))
    .orderBy(asc(events.eventDate));
}

export async function getGalleryImages() {
  const db = getDb();
  return db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.sortOrder));
}

export async function getFacilities() {
  const db = getDb();
  return db
    .select()
    .from(facilities)
    .orderBy(asc(facilities.sortOrder));
}

export async function getQuickLinks() {
  const db = getDb();
  return db
    .select()
    .from(quickLinks)
    .orderBy(asc(quickLinks.sortOrder));
}

export async function getPageContent(slug: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(pageContent)
    .where(eq(pageContent.slug, slug))
    .limit(1);
  return rows[0] || null;
}

export async function getDepartments() {
  const db = getDb();
  return db
    .select()
    .from(departments)
    .orderBy(asc(departments.sortOrder));
}

export async function getAllSiteSettings() {
  const db = getDb();
  return db.select().from(siteSettings);
}
