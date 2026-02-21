import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Trees, Users, Wrench } from 'lucide-react'

const facultyMembers = [
  { name: 'SATHEESH KUMAR T K', designation: 'Head of the Department (In-charge)', image: '/faculty/wood/SATHEESH KUMAR T K.jpg' },
  { name: 'NIDHIN NARAYANAN P', designation: 'Lecturer', image: '/faculty/wood/NIDHIN NARAYANAN P.jpeg' },
  { name: 'VINAYAK K', designation: 'Lecturer', image: '/faculty/wood/VINAYAK K.jpeg' },
  { name: 'DIVYATHEJ M V', designation: 'Guest Lecturer', image: '/faculty/wood/DIVYATHEJ M V.jpeg' },
  { name: 'SHAJIN P RAJ', designation: 'Guest Lecturer', image: '/faculty/wood/SHAJIN P RAJ.jpeg' },
]

const labStaff = [
  { name: 'SINI C P', designation: 'Demonstrator', image: '/faculty/wood/SINI C P.jpeg' },
  { name: 'BIJU K T', designation: 'Demonstrator', image: '/faculty/wood/BIJU K T.jpeg' },
  { name: 'PRAKASAN V', designation: 'Trade Instructor', image: '/faculty/wood/PRAKASAN V.jpeg' },
  { name: 'SAJITH P', designation: 'Trade Instructor', image: '/faculty/wood/SAJITH P.jpeg' },
  { name: 'GOKUL K G', designation: 'Tradesman', image: '/faculty/wood/GOKUL K G.jpeg' },
  { name: 'MUHAMMED ASHARUDHEEN T K', designation: 'Tradesman', image: '/faculty/wood/MUHAMMED ASHARUDHEEN T K.jpeg' },
]

function FacultyCard({ member, index }) {
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="faculty-card" data-animate="fade-up" data-delay={index * 60}>
      <div className="faculty-card__avatar">
        {member.image ? (
          <img src={member.image} alt={member.name} loading="lazy" />
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

export default function WoodFacultyPage() {
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
          <Link to="/department/wood" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Wood & Paper Dept.</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src="/logo.png" alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 35 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Trees size={48} />
          </div>
          <h1 className="dept-page__hero-title">Wood & Paper Technology</h1>
          <p className="dept-page__hero-subtitle">Faculty & Lab Staff Details</p>
          <div className="dept-page__hero-meta">
            <span><Users size={16} /> {facultyMembers.length} Faculty</span>
            <span><Wrench size={16} /> {labStaff.length} Lab Staff</span>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="dept-page__section">
        <div className="container">
          <h2 className="dept-page__section-title" data-animate="fade-up">
            <Users size={24} />
            Faculty Members
          </h2>
          <div className="faculty-grid">
            {facultyMembers.map((member, i) => (
              <FacultyCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Lab Staff Section */}
      <section className="dept-page__section dept-page__section--alt">
        <div className="container">
          <h2 className="dept-page__section-title" data-animate="fade-up">
            <Wrench size={24} />
            Lab Staff Details
          </h2>
          <div className="faculty-grid faculty-grid--staff">
            {labStaff.map((member, i) => (
              <FacultyCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="principal-page__cta">
        <div className="container principal-page__cta-inner">
          <p>View department details</p>
          <Link to="/department/wood" className="btn btn--primary">
            <ArrowLeft size={18} />
            Wood & Paper Technology Dept.
          </Link>
        </div>
      </section>
    </div>
  )
}
