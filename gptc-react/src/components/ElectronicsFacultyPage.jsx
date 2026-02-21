import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Cpu, Users } from 'lucide-react'

const facultyMembers = [
  { name: 'SURESH BABU', designation: 'Head of Section (In-charge)', image: '/faculty/electronics/SURESH BABU.jpg' },
  { name: 'LIJI C A', designation: 'Lecturer', image: '/faculty/electronics/LIJI C A.jpeg' },
  { name: 'RAJESH O K', designation: 'Lecturer', image: '/faculty/electronics/rajesh o k.jpeg' },
  { name: 'BHAVYA R', designation: 'Lecturer in Electronics (Guest)', image: '/faculty/electronics/BHAVYA R.jpg' },
  { name: 'PRASANTHAN K', designation: 'Lecturer', image: '/faculty/electronics/PRASANTHAN K.jpeg' },
  { name: 'RAMYA K V', designation: 'Lecturer in Computer Engineering (Guest)', image: '/faculty/electronics/RAMYA K V.jpeg' },
  { name: 'JITHIN LAL V K', designation: 'Lecturer', image: '/faculty/electronics/JITHIN LAL V K.jpg' },
]

function FacultyCard({ member, index }) {
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="faculty-card" data-animate="fade-up" data-delay={index * 60}>
      <div className="faculty-card__avatar">
        {member.image ? (
          <img src={`${import.meta.env.BASE_URL}${member.image.replace(/^\//, '')}`} alt={member.name} loading="lazy" />
        ) : (
          <div className="faculty-card__initials">{initials}</div>
        )}
      </div>
      <div className="faculty-card__info">
        <h3 className="faculty-card__name">{member.name}</h3>
        <span className="faculty-card__designation">{member.designation}</span>
      </div>
    </div>
  )
}

export default function ElectronicsFacultyPage() {
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
          <Link to="/department/electronics" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Electronics Dept.</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 150 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Cpu size={48} />
          </div>
          <h1 className="dept-page__hero-title">Electronics Engineering</h1>
          <p className="dept-page__hero-subtitle">Faculty Details</p>
          <div className="dept-page__hero-meta">
            <span><Users size={16} /> {facultyMembers.length} Faculty Members</span>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="dept-page__section">
        <div className="container">
          <h2 className="dept-page__section-title" data-animate="fade-up">
            <Users size={24} />
            Our Faculty
          </h2>
          <div className="faculty-grid">
            {facultyMembers.map((member, i) => (
              <FacultyCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>View department details</p>
          <Link to="/department/electronics" className="btn btn--primary">
            <ArrowLeft size={18} />
            Electronics Engineering Dept.
          </Link>
        </div>
      </section>
    </div>
  )
}
