import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Building2, Users, Wrench } from 'lucide-react'

const facultyMembers = [
  { name: 'SARATH D', designation: 'Head of the Department (In-charge)', image: '/faculty/civil/SARATH D.jpg' },
  { name: 'SMITHA K', designation: 'Lecturer', image: '/faculty/civil/SMITHA K.jpg' },
  { name: 'SWATHI KRISHNA BS', designation: 'Lecturer', image: '/faculty/civil/SWATHI KRISHNA BS.jpg' },
  { name: 'ASEEJA P K', designation: 'Lecturer', image: '/faculty/civil/ASEEJA P K.jpg' },
  { name: 'BINUSREE KS', designation: 'Lecturer', image: '/faculty/civil/BINUSREE KS.jpg' },
  { name: 'AMAL V K', designation: 'Lecturer', image: '/faculty/civil/AMAL V K.jpg' },
]

const labStaff = [
  { name: 'PRAJEESHA T', designation: 'Demonstrator', image: '/faculty/civil/PRAJEESHA T.jpg' },
  { name: 'MEKHA SHANTHAKUMAR', designation: 'Demonstrator', image: '/faculty/civil/MEKHA SHANTHAKUMAR.jpg' },
  { name: 'MURUKADAS K K', designation: 'Trade Instructor', image: '/faculty/civil/MURUKADAS K K.jpg' },
  { name: 'ANEESH K K', designation: 'Trade Instructor', image: '/faculty/civil/ANEESH K K.jpg' },
  { name: 'SURJITH P', designation: 'Tradesman (Guest)', image: '/faculty/civil/SURJITH P.jpg' },
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

export default function CivilFacultyPage() {
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
          <Link to="/department/civil" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Civil Dept.</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src="/logo.png" alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 200 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Building2 size={48} />
          </div>
          <h1 className="dept-page__hero-title">Civil Engineering</h1>
          <p className="dept-page__hero-subtitle">Faculty & Lab Staff Details</p>
          <div className="dept-page__hero-meta">
            <span><Users size={16} /> {facultyMembers.length} Faculty Members</span>
            <span><Wrench size={16} /> {labStaff.length} Lab Staff</span>
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
          <Link to="/department/civil" className="btn btn--primary">
            <ArrowLeft size={18} />
            Civil Engineering Dept.
          </Link>
        </div>
      </section>
    </div>
  )
}
