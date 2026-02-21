import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Phone, Mail, Quote, GraduationCap, Lightbulb, Users, Target } from 'lucide-react'

export default function PrincipalPage() {
  // Scroll-reveal observer
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

  return (
    <div className="principal-page">
      {/* Minimal top nav for the page */}
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

      {/* Hero Banner */}
      <section className="principal-page__hero">
        <div className="principal-page__hero-bg"></div>
        <div className="principal-page__hero-overlay"></div>
        <div className="container principal-page__hero-content">
          <span className="principal-page__label">From the Desk of the Principal</span>
          <h1 className="principal-page__hero-title">Pramod Chathampally</h1>
          <p className="principal-page__hero-subtitle">Principal, Govt. Polytechnic College Thottada</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="principal-page__content">
        <div className="container">
          <div className="principal-page__grid">
            {/* Left: Image & Contact Card */}
            <aside className="principal-page__sidebar" data-animate="fade-right">
              <div className="principal-page__photo-card">
                <div className="principal-page__photo-wrapper">
                  <img
                    src={`${import.meta.env.BASE_URL}images/principal.jpg`}
                    alt="Pramod Chathampally - Principal of Govt. Polytechnic College Thottada"
                    className="principal-page__photo"
                  />
                  <div className="principal-page__photo-accent"></div>
                </div>
                <div className="principal-page__photo-info">
                  <h3>Pramod Chathampally</h3>
                  <span className="principal-page__designation">Principal</span>
                  <span className="principal-page__institution">Govt. Polytechnic College Thottada</span>
                </div>
                <div className="principal-page__contact-list">
                  <a href="tel:9400201190" className="principal-page__contact-item">
                    <Phone size={16} />
                    <span>9400201190</span>
                  </a>
                  <a href="mailto:kannurgptc@gmail.com" className="principal-page__contact-item">
                    <Mail size={16} />
                    <span>kannurgptc@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Vision Highlights */}
              <div className="principal-page__highlights">
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="100">
                  <div className="principal-page__highlight-icon">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4>Technical Excellence</h4>
                    <p>Imparting finest quality skill education</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="200">
                  <div className="principal-page__highlight-icon">
                    <Lightbulb size={22} />
                  </div>
                  <div>
                    <h4>Innovation & Research</h4>
                    <p>Encouraging research and innovative thinking</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="300">
                  <div className="principal-page__highlight-icon">
                    <Users size={22} />
                  </div>
                  <div>
                    <h4>Industry Partnerships</h4>
                    <p>Strategic collaborations for real-world readiness</p>
                  </div>
                </div>
                <div className="principal-page__highlight-item" data-animate="fade-up" data-delay="400">
                  <div className="principal-page__highlight-icon">
                    <Target size={22} />
                  </div>
                  <div>
                    <h4>Holistic Development</h4>
                    <p>Nurturing socially responsible leaders</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right: Message Content */}
            <article className="principal-page__message-area" data-animate="fade-up">
              <div className="principal-page__quote-block">
                <Quote size={40} className="principal-page__quote-icon" />
                <h2 className="principal-page__message-title">
                  Empowering Tomorrow's Technologists Today
                </h2>
              </div>

              <div className="principal-page__body">
                <p className="principal-page__lead-text">
                  Govt.Polytechnic College Thottada is a leading institution dedicated to empowering
                  the youth by imparting excellence in technical education and prepare them as a
                  valuable resource for industry and society.
                </p>

                <p>
                  We provide value added technical education, fostering innovative thinking through
                  effective teaching learning process. Our dedicated faculty, cutting edge facilities
                  and industry collaborations ensure students receive a well-rounded education.
                  The institute aims to nurture talented professionals by encouraging research and
                  innovation and develop them into socially responsible leaders, by providing adequate
                  infrastructure to impart finest quality skill education.
                </p>

                <p>
                  With a strong focus on hands-on learning, research, and innovation, our students
                  gain practical skills and real-world experience. Our expert faculty,
                  state-of-the-art infrastructure, and strategic industry partnerships ensure our
                  graduates are job-ready and future-proof.
                </p>

                <p className="principal-page__closing-text">
                  Join us in shaping the next generation of skilled professionals and entrepreneurs,
                  driving Kerala's technological advancement and economic growth.
                </p>
              </div>

              <div className="principal-page__signature">
                <div className="principal-page__signature-line"></div>
                <div className="principal-page__signature-info">
                  <strong>Pramod Chathampally</strong>
                  <span>Principal</span>
                  <span>Govt. Polytechnic College Thottada, Kannur</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Want to know more about our institution?</p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} />
            Back to Homepage
          </Link>
        </div>
      </section>
    </div>
  )
}
