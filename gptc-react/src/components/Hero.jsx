import React, { useEffect, useRef, useCallback } from 'react'
import { Award, GraduationCap, Info } from 'lucide-react'
import CountUp from '../hooks/CountUp'

export default function Hero({ onNavigate }) {
  const particlesRef = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const colors = [
      'rgba(4,120,87,0.6)',
      'rgba(13,148,136,0.5)',
      'rgba(30,64,175,0.4)',
      'rgba(217,119,6,0.4)',
      'rgba(255,255,255,0.3)',
    ]
    let interval
    function createParticle() {
      const p = document.createElement('div')
      p.classList.add('particle')
      const x = Math.random() * 100
      const size = Math.random() * 4 + 1
      const dur = Math.random() * 8 + 6
      const delay = Math.random() * 5
      p.style.left = `${x}%`
      p.style.bottom = '-10px'
      p.style.width = `${size}px`
      p.style.height = `${size}px`
      p.style.animationDuration = `${dur}s`
      p.style.animationDelay = `${delay}s`
      p.style.background = colors[Math.floor(Math.random() * colors.length)]
      p.style.boxShadow = `0 0 ${size * 2}px ${p.style.background}`
      container.appendChild(p)
      setTimeout(() => p.remove(), (dur + delay) * 1000)
    }
    for (let i = 0; i < 40; i++) createParticle()
    interval = setInterval(() => {
      if (document.visibilityState === 'visible') createParticle()
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!heroRef.current || !contentRef.current) return
          const scrollY = window.scrollY || document.documentElement.scrollTop
          const heroH = heroRef.current.offsetHeight
          if (scrollY < heroH) {
            contentRef.current.style.transform = `translateY(${scrollY * 0.35}px)`
            contentRef.current.style.opacity = 1 - (scrollY / heroH) * 0.7
            const shapes = heroRef.current.querySelectorAll('.hero__shape')
            shapes.forEach((s, i) => {
              const speed = 0.05 + i * 0.03
              s.style.transform = `translateY(${scrollY * speed}px)`
            })
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__bg">
        <div
          className="hero__bg-image"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80)` }}
        />
        <div ref={particlesRef} className="hero__particles"></div>
        <div className="hero__gradient"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="hero__float-shapes">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
        <div className="hero__shape hero__shape--4"></div>
        <div className="hero__shape hero__shape--5"></div>
      </div>

      <div className="container hero__content" ref={contentRef}>
        <div className="hero__badge" data-animate="fade-up">
          <Award size={16} />
          <span>Established 1958 • AICTE Approved</span>
        </div>
        <h1 className="hero__title" data-animate="fade-up" data-delay="100">
          Government Polytechnic<br />
          <span className="hero__title-accent">College Kannur</span>
        </h1>
        <p className="hero__tagline" data-animate="fade-up" data-delay="200">
          "Knowledge is Power"
        </p>
        <p className="hero__description" data-animate="fade-up" data-delay="300">
          Empowering youth through excellence in technical education since 1958.
          Shaping valuable resources for industry and society at Thottada, Kannur.
        </p>
        <div className="hero__actions" data-animate="fade-up" data-delay="400">
          <button className="btn btn--primary" onClick={() => onNavigate('departments')}>
            <GraduationCap size={18} />
            Explore Departments
          </button>
          <button className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => onNavigate('about')}>
            <Info size={18} />
            Learn More
          </button>
        </div>
        <div className="hero__stats" data-animate="fade-up" data-delay="500">
          <div className="hero__stat">
            <span className="hero__stat-number"><CountUp end={65} /></span>
            <span className="hero__stat-plus">+</span>
            <span className="hero__stat-label">Years of Excellence</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number"><CountUp end={6} /></span>
            <span className="hero__stat-label">Departments</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number"><CountUp end={1000} /></span>
            <span className="hero__stat-plus">+</span>
            <span className="hero__stat-label">Students</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number"><CountUp end={50} /></span>
            <span className="hero__stat-plus">+</span>
            <span className="hero__stat-label">Expert Faculty</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator" onClick={() => onNavigate('about')}>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
