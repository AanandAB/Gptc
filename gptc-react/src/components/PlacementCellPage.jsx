import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Briefcase, Users, Building, Award, X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  { src: '/placement/Training_9-11.jpg', caption: 'Training Programme – Session 9-11' },
  { src: '/placement/Training_9-11_Full-768x577.jpg', caption: 'Training Programme – Full Batch' },
  { src: '/placement/Training_13-15-768x644.jpg', caption: 'Training Programme – Session 13-15' },
  { src: '/placement/Training_13-15_Full-768x437.jpg', caption: 'Training Programme – Group Photo' },
  { src: '/placement/Sai-Krishna-1536x1086.jpg', caption: 'Campus Placement Drive' },
  { src: '/placement/1111-768x576.jpg', caption: 'Industry Interaction Session' },
  { src: '/placement/11-768x383.jpg', caption: 'Placement Activities' },
  { src: '/placement/988-768x479.jpg', caption: 'Skill Development Workshop' },
  { src: '/placement/56tt-768x994.jpg', caption: 'Career Guidance Seminar' },
  { src: '/placement/13-768x1101.jpg', caption: 'Student Achievement' },
  { src: '/placement/hy-768x762.jpg', caption: 'TPC Event' },
]

export default function PlacementCellPage() {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)
  const carouselRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Lenis smooth scroll
  useEffect(() => {
    window.scrollTo(0, 0)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08, wheelMultiplier: 0.8, touchMultiplier: 1.5,
      smoothWheel: true, smoothTouch: false,
    })
    lenisRef.current = lenis
    function raf(time) { lenis.raf(time); rafIdRef.current = requestAnimationFrame(raf) }
    rafIdRef.current = requestAnimationFrame(raf)
    return () => { if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current); lenis.destroy() }
  }, [])

  // Scroll-reveal
  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Carousel scroll state
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scrollCarousel = useCallback((direction) => {
    const el = carouselRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.7
    el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }, [])

  // Lightbox controls
  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  return (
    <div className="subpage">
      {/* Nav */}
      <nav className="principal-page__nav">
        <div className="container principal-page__nav-inner">
          <Link to="/" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="principal-page__hero">
        <div className="principal-page__hero-bg"></div>
        <div className="principal-page__hero-overlay"></div>
        <div className="container principal-page__hero-content">
          <span className="principal-page__label">Facilities</span>
          <h1 className="principal-page__hero-title">Training & Placement Cell</h1>
          <p className="principal-page__hero-subtitle">Connecting students with industry opportunities, internships, and career guidance</p>
        </div>
      </section>

      {/* Stats */}
      <section className="diploma__stats">
        <div className="container">
          <div className="diploma__stats-grid" data-animate="fade-up">
            <div className="diploma__stat-card">
              <Briefcase size={28} />
              <div>
                <span className="diploma__stat-number">TPC</span>
                <span className="diploma__stat-label">Training & Placement</span>
              </div>
            </div>
            <div className="diploma__stat-card">
              <Users size={28} />
              <div>
                <span className="diploma__stat-number">6</span>
                <span className="diploma__stat-label">Departments Covered</span>
              </div>
            </div>
            <div className="diploma__stat-card">
              <Building size={28} />
              <div>
                <span className="diploma__stat-number">50+</span>
                <span className="diploma__stat-label">Industry Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About TPC */}
      <section className="dept-page__section">
        <div className="container">
          <div className="dept-page__about-content" data-animate="fade-up">
            <h2 className="dept-page__section-title">
              <Award size={24} />
              About the Placement Cell
            </h2>
            <p className="dept-page__lead">
              The Training & Placement Cell (TPC) of Govt. Polytechnic College, Kannur plays a vital role in connecting students with the industry and guiding them towards successful careers.
            </p>
            <p>
              The cell organizes campus recruitment drives, industrial visits, soft skills training programmes, mock interviews, and career guidance sessions throughout the academic year. Leading companies from various sectors visit the campus regularly to recruit our talented diploma engineers.
            </p>
            <p>
              TPC works closely with all six departments to ensure that students are well-prepared for the demands of the industry. The cell maintains strong ties with organizations like Keltron, BSNL, KSEB, Rubco, Western India Plywoods, and numerous private sector companies to facilitate placements and internships.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Carousel Gallery */}
      <section className="dept-page__section dept-page__section--alt">
        <div className="container">
          <h2 className="dept-page__section-title" data-animate="fade-up">
            <Users size={24} />
            Activities & Events Gallery
          </h2>
        </div>
        <div className="tpc-carousel" data-animate="fade-up" data-delay="100">
          {canScrollLeft && (
            <button className="tpc-carousel__arrow tpc-carousel__arrow--left" onClick={() => scrollCarousel(-1)} aria-label="Scroll left">
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="tpc-carousel__track" ref={carouselRef} data-lenis-prevent>
            {galleryImages.map((img, i) => (
              <div className="tpc-carousel__slide" key={i} onClick={() => openLightbox(i)}>
                <img src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, '')}`} alt={img.caption} loading="lazy" />
                <div className="tpc-carousel__caption">
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
          {canScrollRight && (
            <button className="tpc-carousel__arrow tpc-carousel__arrow--right" onClick={() => scrollCarousel(1)} aria-label="Scroll right">
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="placement__lightbox" onClick={closeLightbox}>
          <div className="placement__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="placement__lightbox-close" onClick={closeLightbox} aria-label="Close">
              <X size={24} />
            </button>
            <button className="placement__lightbox-nav placement__lightbox-prev" onClick={prevImage} aria-label="Previous">
              <ChevronLeft size={32} />
            </button>
            <div className="placement__lightbox-img-wrap">
              <img src={`${import.meta.env.BASE_URL}${galleryImages[lightboxIndex].src.replace(/^\//, '')}`} alt={galleryImages[lightboxIndex].caption} />
              <div className="placement__lightbox-caption">
                <span>{lightboxIndex + 1} / {galleryImages.length}</span>
                <span>{galleryImages[lightboxIndex].caption}</span>
              </div>
            </div>
            <button className="placement__lightbox-nav placement__lightbox-next" onClick={nextImage} aria-label="Next">
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="placement__lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className={`placement__lightbox-thumb ${i === lightboxIndex ? 'active' : ''}`}
                onClick={() => setLightboxIndex(i)}
              >
                <img src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, '')}`} alt={img.caption} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Want to explore other facilities?</p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  )
}
