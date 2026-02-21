import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, GraduationCap, Users, BookOpen } from 'lucide-react'

const courses = [
  { sl: 1, name: 'Civil Engineering', intake: 60 },
  { sl: 2, name: 'Mechanical Engineering', intake: 60 },
  { sl: 3, name: 'Electrical & Electronics Engineering', intake: 60 },
  { sl: 4, name: 'Electronics Engineering', intake: 60 },
  { sl: 5, name: 'Textile Technology', intake: 60 },
  { sl: 6, name: 'Wood and Paper Technology', intake: 40 },
]

const totalIntake = courses.reduce((sum, c) => sum + c.intake, 0)

export default function DiplomaPage() {
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
    <div className="subpage">
      {/* Nav */}
      <nav className="principal-page__nav">
        <div className="container principal-page__nav-inner">
          <Link to="/" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src="/logo.png" alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="principal-page__hero">
        <div className="principal-page__hero-bg"></div>
        <div className="principal-page__hero-overlay"></div>
        <div className="container principal-page__hero-content">
          <span className="principal-page__label">Academic Courses</span>
          <h1 className="principal-page__hero-title">Diploma Programmes</h1>
          <p className="principal-page__hero-subtitle">Three-year full-time diploma courses after 10th standard (SSLC)</p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="diploma__stats">
        <div className="container">
          <div className="diploma__stats-grid" data-animate="fade-up">
            <div className="diploma__stat-card">
              <BookOpen size={28} />
              <div>
                <span className="diploma__stat-number">{courses.length}</span>
                <span className="diploma__stat-label">Programmes</span>
              </div>
            </div>
            <div className="diploma__stat-card">
              <Users size={28} />
              <div>
                <span className="diploma__stat-number">{totalIntake}</span>
                <span className="diploma__stat-label">Total Intake</span>
              </div>
            </div>
            <div className="diploma__stat-card">
              <GraduationCap size={28} />
              <div>
                <span className="diploma__stat-number">3</span>
                <span className="diploma__stat-label">Years Duration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="diploma__content">
        <div className="container">
          <div className="diploma__table-wrapper" data-animate="fade-up">
            <table className="diploma__table" id="diploma-table">
              <thead>
                <tr>
                  <th className="diploma__th-sl">Sl No</th>
                  <th className="diploma__th-course">Courses</th>
                  <th className="diploma__th-intake">Intake</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <tr key={course.sl} data-animate="fade-up" data-delay={i * 80}>
                    <td className="diploma__td-sl">{course.sl}</td>
                    <td className="diploma__td-course">{course.name}</td>
                    <td className="diploma__td-intake">{course.intake}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="diploma__total-label">Total Intake</td>
                  <td className="diploma__total-value">{totalIntake}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>Interested in joining our programmes?</p>
          <a href="https://www.polyadmission.org/" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Apply for Admission ↗
          </a>
        </div>
      </section>
    </div>
  )
}
