"use client";

import React, { useEffect, useState, useCallback } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Principal from "@/components/Principal";
import VisionMission from "@/components/VisionMission";
import Departments from "@/components/Departments";
import Academics from "@/components/Academics";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Facilities from "@/components/Facilities";
import Links from "@/components/Links";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

import type { Slide, Announcement, Event, GalleryImage, Facility, QuickLink, Department } from "@/db/schema";

interface HomePageClientProps {
  slides: Slide[];
  announcements: Announcement[];
  events: Event[];
  galleryImages: GalleryImage[];
  facilities: Facility[];
  links: QuickLink[];
  departments: Department[];
  settings: Record<string, string>;
}

export default function HomePageClient({
  slides,
  announcements,
  events: eventsData,
  galleryImages,
  facilities: facilitiesData,
  links,
  departments: departmentsData,
  settings,
}: HomePageClientProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loading) {
      if ((window as any).lenis) (window as any).lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if ((window as any).lenis) (window as any).lenis.start();
      document.body.style.overflow = "";
    }
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const win = window as any;
    if (win.lenis) {
      const el = document.getElementById(sectionId);
      if (el) win.lenis.scrollTo(el, { offset: -80, duration: 1.8 });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    const win = window as any;
    if (win.lenis) win.lenis.scrollTo(0, { duration: 2 });
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt((entry.target as HTMLElement).dataset.delay || "0");
            setTimeout(() => entry.target.classList.add("in-view"), delay);
            observer.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <SmoothScroll>
      <Preloader loading={loading} />
      <TopBar />
      <Navbar />
      <Hero onNavigate={scrollToSection} />
      <Ticker announcements={announcements} />
      <ImageSlider slides={slides} />
      <About />
      <Principal />
      <VisionMission />
      <Departments departments={departmentsData} />
      <Academics />
      <Gallery images={galleryImages} />
      <Events events={eventsData} />
      <Facilities facilities={facilitiesData} />
      <Links links={links} />
      <Footer onNavigate={scrollToSection} />
      <BackToTop visible={showBackToTop} onClick={scrollToTop} />
    </SmoothScroll>
  );
}
