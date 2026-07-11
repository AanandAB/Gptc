import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const sections = sqliteTable("sections", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  content: text("content").default(""),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const slides = sqliteTable("slides", {
  id: text("id").primaryKey(),
  title: text("title").notNull().default(""),
  subtitle: text("subtitle").notNull().default(""),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const announcements = sqliteTable("announcements", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  excerpt: text("excerpt").notNull().default(""),
  featureImage: text("feature_image"),
  eventDate: text("event_date"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: text("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption").notNull().default(""),
  category: text("category").notNull().default("general"),
  size: text("size").default("medium"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const facilities = sqliteTable("facilities", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  iconName: text("icon_name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const quickLinks = sqliteTable("quick_links", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull().default("important"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const pageContent = sqliteTable("page_content", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull().default(""),
  html: text("html").notNull().default(""),
  featureImage: text("feature_image"),
  featureImageAlt: text("feature_image_alt"),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const departments = sqliteTable("departments", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  hue: integer("hue").notNull().default(200),
  duration: text("duration").notNull().default("3 Years"),
  intake: integer("intake").notNull().default(60),
  description: text("description").notNull().default(""),
  about: text("about").notNull().default("[]"),
  vision: text("vision").notNull().default(""),
  mission: text("mission").notNull().default("[]"),
  pso: text("pso").notNull().default("[]"),
  peo: text("peo").notNull().default("[]"),
  featureImage: text("feature_image"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull().default(""),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export type User = typeof users.$inferSelect;
export type Section = typeof sections.$inferSelect;
export type Slide = typeof slides.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;
export type Event = typeof events.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type Facility = typeof facilities.$inferSelect;
export type QuickLink = typeof quickLinks.$inferSelect;
export type PageContent = typeof pageContent.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
