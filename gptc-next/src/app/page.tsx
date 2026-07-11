import {
  getSlides,
  getActiveAnnouncements,
  getPublishedEvents,
  getGalleryImages,
  getFacilities,
  getQuickLinks,
  getDepartments,
  getAllSiteSettings,
} from "@/lib/queries";
import HomePageClient from "@/components/HomePageClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    slides,
    announcements,
    events,
    galleryImages,
    facilities,
    links,
    departments,
    settings,
  ] = await Promise.all([
    getSlides(),
    getActiveAnnouncements(),
    getPublishedEvents(),
    getGalleryImages(),
    getFacilities(),
    getQuickLinks(),
    getDepartments(),
    getAllSiteSettings(),
  ]);

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <HomePageClient
      slides={slides}
      announcements={announcements}
      events={events}
      galleryImages={galleryImages}
      facilities={facilities}
      links={links}
      departments={departments}
      settings={settingsMap}
    />
  );
}
