import React, { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react'
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

const PrincipalPage = lazy(() => import('./components/PrincipalPage'))
const DiplomaPage = lazy(() => import('./components/DiplomaPage'))
const ClassroomLayoutPage = lazy(() => import('./components/ClassroomLayoutPage'))
const DepartmentPage = lazy(() => import('./components/DepartmentPage'))
const PlacementCellPage = lazy(() => import('./components/PlacementCellPage'))
const MechanicalFacultyPage = lazy(() => import('./components/MechanicalFacultyPage'))
const WoodFacultyPage = lazy(() => import('./components/WoodFacultyPage'))
const TextileFacultyPage = lazy(() => import('./components/TextileFacultyPage'))
const ElectronicsFacultyPage = lazy(() => import('./components/ElectronicsFacultyPage'))
const CivilFacultyPage = lazy(() => import('./components/CivilFacultyPage'))
const ElectricalFacultyPage = lazy(() => import('./components/ElectricalFacultyPage'))

import SmoothScroll from './components/SmoothScroll'

function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [loading, setLoading] = useState(true)

  // ──────────────────────────────────────────────
  // 1. SCROLL HANDLING — Basic UI updates
  // ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY
      setShowBackToTop(scroll > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ──────────────────────────────────────────────
  // 2. PRELOADER & SCROLL LOCK
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (loading) {
      if (window.lenis) window.lenis.stop()
      document.body.style.overflow = 'hidden'
    } else {
      if (window.lenis) window.lenis.start()
      document.body.style.overflow = ''
    }
  }, [loading])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  // ──────────────────────────────────────────────
  // 4. SCROLL-TO FUNCTIONS
  // ──────────────────────────────────────────────
  const scrollToSection = useCallback((sectionId) => {
    if (window.lenis) {
      const el = document.getElementById(sectionId)
      if (el) window.lenis.scrollTo(el, { offset: -80, duration: 1.8 })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 2 })
  }, [])

  // ──────────────────────────────────────────────
  // 5. SCROLL-REVEAL OBSERVER
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

  return (
    <>
      <Preloader loading={loading} />
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

function MainLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)'}}><div className="preloader__spinner"></div></div>}>
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
      </Suspense>
    </>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll>
        <MainLayout />
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
