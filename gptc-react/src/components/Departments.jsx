import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Zap, Cpu, Cog, Shirt, Trees, Clock, Users, ArrowRight } from 'lucide-react'
import useTilt from '../hooks/useTilt'

const departments = [
  { id: 'dept-civil', slug: 'civil', icon: Building2, title: 'Civil Engineering', desc: 'Design, construct, and maintain the infrastructure that shapes our world.', duration: '3 Years', seats: '60 Seats', hue: 200, delay: 100 },
  { id: 'dept-electrical', slug: 'electrical', icon: Zap, title: 'Electrical Engineering', desc: 'Master the science of electrical systems driving modern civilization.', duration: '3 Years', seats: '60 Seats', hue: 45, delay: 200 },
  { id: 'dept-electronics', slug: 'electronics', icon: Cpu, title: 'Electronics Engineering', desc: 'Explore circuits, communication systems, and embedded electronics.', duration: '3 Years', seats: '60 Seats', hue: 150, delay: 300 },
  { id: 'dept-mechanical', slug: 'mechanical', icon: Cog, title: 'Mechanical Engineering', desc: 'From thermodynamics to manufacturing — design, analyze, and create.', duration: '3 Years', seats: '60 Seats', hue: 10, delay: 100 },
  { id: 'dept-textile', slug: 'textile', icon: Shirt, title: 'Textile Technology', desc: 'Dive into the science of fibres, fabrics, and fashion technology.', duration: '3 Years', seats: '60 Seats', hue: 280, delay: 200 },
  { id: 'dept-wood', slug: 'wood', icon: Trees, title: 'Wood & Paper Technology', desc: 'A rare discipline focusing on sustainable wood processing and eco-friendly material.', duration: '3 Years', seats: '20 Seats', hue: 100, delay: 300 },
]

function DeptCard({ dept }) {
  const Icon = dept.icon
  const tiltRef = useTilt({ max: 15, scale: 1.05, speed: 400 })

  return (
    <div ref={tiltRef} className="dept-card" id={dept.id} data-animate="fade-up" data-delay={dept.delay} style={{ '--dept-hue': dept.hue }}>
      <div className="dept-card__icon-wrap float-slow" style={{ '--dept-hue': dept.hue }}>
        <Icon />
      </div>
      <h3 className="dept-card__title">{dept.title}</h3>
      <p className="dept-card__desc">{dept.desc}</p>
      <div className="dept-card__meta">
        <span><Clock size={14} /> {dept.duration}</span>
        <span><Users size={14} /> {dept.seats}</span>
      </div>
      <Link to={`/department/${dept.slug}`} className="dept-card__link">
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  )
}

export default function Departments() {
  return (
    <section className="section departments" id="departments">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label float-fast">What We Offer</span>
          <h2 className="section__title">Our <span className="gradient-text-slow">Departments</span></h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">Six diverse engineering disciplines nurturing the technical leaders of tomorrow</p>
        </div>
        <div className="departments__grid">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      </div>
    </section>
  )
}
