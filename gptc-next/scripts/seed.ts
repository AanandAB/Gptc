import { getPlatformProxy } from "wrangler";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../src/db/schema";

async function seed() {
  console.log("Seeding GPTC...");
  const { env } = await getPlatformProxy();
  const db = drizzle(env.DB as any, { schema });

  const { hashPassword } = await import("../src/lib/auth");
  const h = await hashPassword("admin123");

  // Admin
  await db.insert(schema.users).values({ id: crypto.randomUUID(), username: "admin", passwordHash: h, role: "admin" }).onConflictDoNothing();
  console.log("✓ admin");

  // Sections
  for (const s of [
    { slug: "hero", title: "Hero", type: "hero", sortOrder: 1 },
    { slug: "ticker", title: "Ticker", type: "ticker", sortOrder: 2 },
    { slug: "slider", title: "Slider", type: "slider", sortOrder: 3 },
    { slug: "about", title: "About", type: "about", sortOrder: 4 },
    { slug: "principal", title: "Principal", type: "principal", sortOrder: 5 },
    { slug: "vision-mission", title: "Vision & Mission", type: "vision-mission", sortOrder: 6 },
    { slug: "departments", title: "Departments", type: "departments", sortOrder: 7 },
    { slug: "academics", title: "Academics", type: "academics", sortOrder: 8 },
    { slug: "gallery", title: "Gallery", type: "gallery", sortOrder: 9 },
    { slug: "events", title: "Events", type: "events", sortOrder: 10 },
    { slug: "facilities", title: "Facilities", type: "facilities", sortOrder: 11 },
    { slug: "links", title: "Links", type: "links", sortOrder: 12 },
  ]) {
    await db.insert(schema.sections).values({ id: crypto.randomUUID(), ...s, visible: true, content: "" }).onConflictDoNothing();
  }

  // Slides, announcements, facilities, links
  for (const x of [
    { title: "Welcome to GPTC Kannur", subtitle: "Excellence in Technical Education since 1958", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80", sortOrder: 1 },
    { title: "World-Class Campus", subtitle: "Modern facilities across 6 departments", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80", sortOrder: 2 },
    { title: "Learn by Doing", subtitle: "Practical, industry-oriented programmes", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&q=80", sortOrder: 3 },
    { title: "State-of-the-Art Labs", subtitle: "Hands-on experience with modern equipment", imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80", sortOrder: 4 },
  ]) await db.insert(schema.slides).values({ id: crypto.randomUUID(), ...x });

  for (const t of ["📢 Diploma Admission 2025-26 — Spot Admission Dates Announced", "📋 Previous Year Question Papers now available online", "🏆 GPTC Kannur students excel in University Examinations", "📝 Online Grievance Redressal System is now active", "🎓 Short Term Courses — New batches starting soon"])
    await db.insert(schema.announcements).values({ id: crypto.randomUUID(), text: t, active: true, sortOrder: 0 });

  for (const f of [
    { title: "NSS Unit", description: "Active National Service Scheme unit promoting community service.", iconName: "heart-handshake", sortOrder: 1 },
    { title: "Training & Placement Cell", description: "Dedicated placement cell connecting students with industry.", iconName: "briefcase", sortOrder: 2 },
    { title: "NCC", description: "NCC unit fostering discipline and leadership.", iconName: "shield", sortOrder: 3 },
    { title: "Library", description: "Well-stocked with technical books, journals, and digital resources.", iconName: "book-marked", sortOrder: 4 },
    { title: "Laboratories", description: "Modern, fully-equipped labs for all departments.", iconName: "flask-conical", sortOrder: 5 },
    { title: "Internet & IT", description: "High-speed internet and computer labs for digital learning.", iconName: "wifi", sortOrder: 6 },
    { title: "Sports & Games", description: "Sports grounds and indoor facilities for fitness.", iconName: "dumbbell", sortOrder: 7 },
  ]) await db.insert(schema.facilities).values({ id: crypto.randomUUID(), ...f });

  for (const l of [
    { title: "State Board of Technical Education", url: "https://www.sbte.kerala.gov.in/", category: "important" },
    { title: "AICTE", url: "https://www.aicte-india.org/", category: "important" },
    { title: "DTE Kerala", url: "http://www.dtekerala.gov.in/", category: "important" },
    { title: "SPARK", url: "https://www.spark.gov.in/webspark/", category: "important" },
    { title: "Online Grievance Redressal", url: "https://docs.google.com/forms/d/1m0mswh0DsQRnHQqF2MzRSVJg9vU5kkq76XP5hNdZRZc/edit", category: "quick" },
    { title: "Mandatory Disclosure", url: "#", category: "quick" },
  ]) await db.insert(schema.quickLinks).values({ id: crypto.randomUUID(), ...l, sortOrder: 0 });

  // Page content
  await db.insert(schema.pageContent).values({ id: crypto.randomUUID(), slug: "about", title: "About GPTC Kannur", html: "<p>Government Polytechnic College, Kannur is a premier government-run technical education institution in North Kerala, established in 1958.</p>" });
  await db.insert(schema.pageContent).values({ id: crypto.randomUUID(), slug: "principal", title: "Principal's Message", html: '<p>Welcome to Government Polytechnic College, Kannur. Since 1958, we have been committed to quality technical education.</p>' });

  // Site settings
  for (const [k, v] of [["hero_title", "Government Polytechnic College Kannur"], ["hero_subtitle", "Knowledge is Power"], ["established_year", "1958"], ["contact_phone", "0497 283 5106"], ["contact_email", "kannurgptc@gmail.com"]] as [string, string][])
    await db.insert(schema.siteSettings).values({ id: crypto.randomUUID(), key: k, value: v });

  console.log("✅ Seed complete! admin/admin123");
}
seed().catch(e => { console.error(e); process.exit(1); });
