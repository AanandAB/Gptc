"use client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const scrollTo = (sectionId: string) => {
    const win = window as any;
    if (win.lenis) {
      const el = document.getElementById(sectionId);
      if (el) win.lenis.scrollTo(el, { offset: -80, duration: 1.8 });
    }
  };
  return (
    <SmoothScroll>
      <TopBar />
      <Navbar />
      {children}
      <Footer onNavigate={scrollTo} />
    </SmoothScroll>
  );
}
