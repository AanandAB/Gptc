import React, { useEffect, useState, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImageSlider from './components/ImageSlider'
import Ticker from './components/Ticker'
import About from './components/About'
import Principal from './components/Principal'
import VisionMission from './components/VisionMission'
import Departments from './components/Departments'
import Academics from './components/Academics'
import Gallery from './components/Gallery'
import Events from './components/Events'
import Facilities from './components/Facilities'
import Links from './components/Links'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Preloader from './components/Preloader'

import PrincipalPage from './components/PrincipalPage'
import DiplomaPage from './components/DiplomaPage'
import ClassroomLayoutPage from './components/ClassroomLayoutPage'
import DepartmentPage from './components/DepartmentPage'
import PlacementCellPage from './components/PlacementCellPage'
import MechanicalFacultyPage from './components/MechanicalFacultyPage'
import WoodFacultyPage from './components/WoodFacultyPage'
import TextileFacultyPage from './components/TextileFacultyPage'
import ElectronicsFacultyPage from './components/ElectronicsFacultyPage'
import CivilFacultyPage from './components/CivilFacultyPage'
import ElectricalFacultyPage from './components/ElectricalFacultyPage'




function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)
  const activeSectionRef = useRef('hero')

  // ──────────────────────────────────────────────
  // 1. LENIS SMOOTH SCROLL — Initialize & Cleanup
  // ──────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      // Core smoothness settings
      duration: 1.4,                // Duration of scroll animation (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Exponential ease-out
      lerp: 0.08,                   // Linear interpolation intensity (0.01-0.1) — lower = smoother
      wheelMultiplier: 0.8,         // Reduce wheel sensitivity for smoother feel
      touchMultiplier: 1.5,         // Keep touch responsive on mobile
      smoothWheel: true,            // Enable smooth wheel scrolling
      smoothTouch: false,           // Native touch scroll (feels better on mobile)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    })
    lenisRef.current = lenis

    // Throttled scroll handler — avoids React state spam
    let scrollTicking = false
    lenis.on('scroll', ({ scroll, velocity }) => {
      if (!scrollTicking) {
        scrollTicking = true
        requestAnimationFrame(() => {
          setScrolled(scroll > 50)
          setShowBackToTop(scroll > 600)
          updateActiveSection(scroll)
          scrollTicking = false
        })
      }
    })

    // RAF loop — drives Lenis animation
    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }
    rafIdRef.current = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // ──────────────────────────────────────────────
  // 2. PRELOADER — Stop Lenis during load, start after
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (lenisRef.current) {
      if (loading) {
        lenisRef.current.stop()   // Prevent scrolling while preloader is visible
      } else {
        lenisRef.current.start()  // Enable scrolling after preloader fades
      }
    }
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  // ──────────────────────────────────────────────
  // 3. ACTIVE SECTION TRACKER — Debounced via ref
  // ──────────────────────────────────────────────
  const updateActiveSection = useCallback((scrollY) => {
    const sections = document.querySelectorAll('section[id]')
    let current = 'hero'
    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      const top = rect.top + scrollY - 160
      if (scrollY >= top && scrollY < top + section.offsetHeight) {
        current = section.getAttribute('id')
      }
    })
    // Only update state if actually changed — avoids unnecessary re-renders
    if (activeSectionRef.current !== current) {
      activeSectionRef.current = current
      setActiveSection(current)
    }
  }, [])

  // ──────────────────────────────────────────────
  // 4. SCROLL-TO FUNCTIONS — Use Lenis scrollTo
  // ──────────────────────────────────────────────
  const scrollToSection = useCallback((sectionId) => {
    if (!lenisRef.current) return
    const el = document.getElementById(sectionId)
    if (el) {
      lenisRef.current.scrollTo(el, {
        offset: -80,       // Offset for sticky navbar
        duration: 1.8,     // Smooth duration for nav clicks
        easing: (t) => 1 - Math.pow(1 - t, 4),  // Quart ease-out for nav scrolls
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (!lenisRef.current) return
    lenisRef.current.scrollTo(0, {
      duration: 2.5,       // Longer duration for back-to-top (feels more luxurious)
      easing: (t) => 1 - Math.pow(1 - t, 5),  // Quint ease-out
    })
  }, [])

  // ──────────────────────────────────────────────
  // 5. SCROLL-REVEAL OBSERVER — Triggers on scroll
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0
          setTimeout(() => entry.target.classList.add('in-view'), delay)
          observer.unobserve(entry.target)
        }
      }),
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  // ──────────────────────────────────────────────
  // 6. RENDER
  // ──────────────────────────────────────────────
  return (
    <>
      <Preloader loading={loading} />
      <TopBar />
      <Navbar scrolled={scrolled} activeSection={activeSection} onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <Ticker />
      <ImageSlider />
      <About />

      <Principal />
      <VisionMission />
      <Departments />
      <Academics />
      <Gallery />
      <Events />
      <Facilities />
      <Links />
      <Footer onNavigate={scrollToSection} />
      <BackToTop visible={showBackToTop} onClick={scrollToTop} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/principal" element={<PrincipalPage />} />
        <Route path="/diploma" element={<DiplomaPage />} />
        <Route path="/classroom-layout" element={<ClassroomLayoutPage />} />
        <Route path="/department/:deptSlug" element={<DepartmentPage />} />
        <Route path="/placement-cell" element={<PlacementCellPage />} />
        <Route path="/mechanical-faculty" element={<MechanicalFacultyPage />} />
        <Route path="/wood-faculty" element={<WoodFacultyPage />} />
        <Route path="/textile-faculty" element={<TextileFacultyPage />} />
        <Route path="/electronics-faculty" element={<ElectronicsFacultyPage />} />
        <Route path="/civil-faculty" element={<CivilFacultyPage />} />
        <Route path="/electrical-faculty" element={<ElectricalFacultyPage />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
