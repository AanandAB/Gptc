import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Cog, Users, Wrench } from 'lucide-react'

const facultyMembers = [
  { name: 'RAJESH N P', designation: 'Head of the Department (In-charge)', image: '/faculty/mechanical/RAJESH N P.jpg' },
  { name: 'VINOD A', designation: 'Lecturer', image: '/faculty/mechanical/VINOD A.jpeg' },
  { name: 'DIVESH KUMAR C', designation: 'Lecturer', image: '/faculty/mechanical/DIVESH KUMAR C.jpeg' },
  { name: 'SUJITH KUMAR P', designation: 'Lecturer', image: '/faculty/mechanical/SUJITH KUMAR P.jpeg' },
  { name: 'RATHNAKARAN T', designation: 'Lecturer', image: '/faculty/mechanical/RATHNAKARAN T.jpeg' },
]

const labStaff = [
  { name: 'JOGIL KUMAR K K', designation: 'Demonstrator', image: '/faculty/mechanical/JOGIL KUMAR K K.jpeg' },
  { name: 'NIDHIN V', designation: 'Demonstrator', image: '/faculty/mechanical/NIDHIN V.jpeg' },
  { name: 'ANEESH KUMAR M', designation: 'Workshop Supdt. In-charge', image: '/faculty/mechanical/ANEESH KUMAR M.jpeg' },
  { name: 'SURESH KUMAR P', designation: 'Workshop Instructor', image: '/faculty/mechanical/SURESH KUMAR P.jpeg' },
  { name: 'PRADEEP KUMAR VK', designation: 'Workshop Instructor', image: '/faculty/mechanical/PRADEEP KUMAR VK.jpg' },
  { name: 'JYOTHISH KUMAR M', designation: 'Workshop Instructor', image: '/faculty/mechanical/JYOTHISH KUMAR M.jpeg' },
  { name: 'VARUNKUMAR', designation: 'Trade Instructor — Welding', image: '/faculty/mechanical/VARUNKUMAR.jpeg' },
  { name: 'C K BIJU KUMAR R', designation: 'Trade Instructor — Sheet Metal', image: '/faculty/mechanical/C K BIJU KUMAR R.jpg' },
  { name: 'DEEPAK E', designation: 'Trade Instructor — Machinist', image: '/faculty/mechanical/DEEPAK E.jpeg' },
  { name: 'NIDHEESH P', designation: 'Trade Instructor — Foundry', image: '/faculty/mechanical/NIDHEESH P.jpeg' },
  { name: 'ANOOP K', designation: 'Tradesman — Sheet Metal', image: '/faculty/mechanical/ANOOP K.jpeg' },
  { name: 'SHAJI K P', designation: 'Trade Instructor — Carpentry', image: null },
  { name: 'ANOOP A', designation: 'Trade Instructor — Fitting', image: '/faculty/mechanical/anoop a.jpeg' },
  { name: 'AKSHAY P', designation: 'Tradesman — Fitting', image: '/faculty/mechanical/AKSHAY P.jpeg' },
  { name: 'ROHITH MAVILA', designation: 'Tradesman — Smithy', image: '/faculty/mechanical/ROHITH MAVILA.jpg' },
  { name: 'JIPSON GEORGE', designation: 'Tradesman — Carpentry', image: '/faculty/mechanical/JIPSON GEORGE.jpeg' },
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

export default function MechanicalFacultyPage() {
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
          <Link to="/department/mechanical" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Mechanical Dept.</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src="/logo.png" alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 220 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Cog size={48} />
          </div>
          <h1 className="dept-page__hero-title">Mechanical Engineering</h1>
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
            Lab & Workshop Staff
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
          <Link to="/department/mechanical" className="btn btn--primary">
            <ArrowLeft size={18} />
            Mechanical Engineering Dept.
          </Link>
        </div>
      </section>
    </div>
  )
}
