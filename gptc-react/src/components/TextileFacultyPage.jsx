import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Shirt, Users, Wrench, Phone, Mail } from 'lucide-react'

const facultyMembers = [
  { 
    name: 'P SIVA KRISHNA', 
    designation: 'Head of the Department (In-charge)', 
    image: '/faculty/textile/P SIVA KRISHNA.jpg',
    mobile: '+91 8019980166',
    email: 'psk@gptckannur.ac.in'
  },
  { 
    name: 'GOLDA HONEY MADHU', 
    designation: 'Lecturer', 
    image: '/faculty/textile/GOLDA HONEY MADHU.jpg',
    mobile: '+91 8547658088',
    email: 'goldamadhu@gmail.com'
  },
  { 
    name: 'ABHINAV VISHNU', 
    designation: 'Guest Lecturer', 
    image: '/faculty/textile/ABHINAV VISHNU.jpg',
    mobile: '+91 7012993944',
    email: 'abhinavvishnu9@gmail.com'
  },
  { 
    name: 'AZHARUDHEEN T', 
    designation: 'Guest Lecturer', 
    image: '/faculty/textile/AZHARUDHEEN T.jpg',
    mobile: '+91 8113097654',
    email: 'psk@gptckannur.ac.in'
  },
]

const labStaff = [
  { 
    name: 'ANEESH KUMAR PD', 
    designation: 'Demonstrator', 
    image: '/faculty/textile/ANEESH KUMAR PD.jpg',
    mobile: '+91 9656821660',
    email: 'aneeshkmr21@gmail.com'
  },
  { 
    name: 'VIVEK K C', 
    designation: 'Demonstrator', 
    image: '/faculty/textile/VIVEK K C.jpg',
    mobile: '+91 9495461686',
    email: 'VKC9080@gmail.com'
  },
  { 
    name: 'KIRAN MK', 
    designation: 'Trade Instructor', 
    image: '/faculty/textile/KIRAN MK.jpg',
    mobile: '+91 8019980166',
    email: 'kiranaravind.mk@gmail.com'
  },
  { 
    name: 'RANJITHKUMAR K', 
    designation: 'Trade Instructor', 
    image: '/faculty/textile/RANJITHKUMAR K.jpg',
    mobile: '+91 7902288746',
    email: 'jithoosrk@gptckannur.ac.in'
  },
  { 
    name: 'VIPINA K', 
    designation: 'Tradesman (Guest)', 
    image: '/faculty/textile/VIPINA K.jpg',
    mobile: '+91 9747939032',
    email: 'vipinak918@gptckannur.ac.in'
  },
  { 
    name: 'SUMESH C', 
    designation: 'Tradesman (Guest)', 
    image: '/faculty/textile/SUMESH C.jpg',
    mobile: '+91 9961257465',
    email: 'sumeshchelankara4@gptckannu'
  },
]

function FacultyCard({ member, index }) {
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="faculty-card faculty-card--with-contact" data-animate="fade-up" data-delay={index * 60}>
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
        <div className="faculty-card__contact">
          {member.mobile && (
            <a href={`tel:${member.mobile}`} className="faculty-card__contact-item">
              <Phone size={14} />
              <span>{member.mobile}</span>
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} className="faculty-card__contact-item">
              <Mail size={14} />
              <span>{member.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TextileFacultyPage() {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

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
          <Link to="/department/textile" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Textile Dept.</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src="/logo.png" alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="dept-page__hero" style={{ '--dept-hue': 330 }}>
        <div className="dept-page__hero-bg"></div>
        <div className="dept-page__hero-overlay"></div>
        <div className="container dept-page__hero-content">
          <div className="dept-page__hero-icon">
            <Shirt size={48} />
          </div>
          <h1 className="dept-page__hero-title">Textile Technology</h1>
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
          <Link to="/department/textile" className="btn btn--primary">
            <ArrowLeft size={18} />
            Textile Technology Dept.
          </Link>
        </div>
      </section>
    </div>
  )
}
