import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Zap, Cpu, Cog, Shirt, Trees, Clock, Users, ArrowRight } from 'lucide-react'

const departments = [
  {
    id: 'dept-civil',
    slug: 'civil',
    icon: Building2,
    title: 'Civil Engineering',
    desc: 'Design, construct, and maintain the infrastructure that shapes our world — from roads and bridges to buildings and water systems.',
    duration: '3 Years',
    seats: '60 Seats',
    hue: 200,
    delay: 100,
  },
  {
    id: 'dept-electrical',
    slug: 'electrical',
    icon: Zap,
    title: 'Electrical Engineering',
    desc: 'Master the science of electrical systems — power generation, transmission, and the electrical machines that drive modern civilization.',
    duration: '3 Years',
    seats: '60 Seats',
    hue: 45,
    delay: 200,
  },
  {
    id: 'dept-electronics',
    slug: 'electronics',
    icon: Cpu,
    title: 'Electronics Engineering',
    desc: 'Explore the world of circuits, semiconductors, communication systems, and embedded electronics shaping the future of technology.',
    duration: '3 Years',
    seats: '60 Seats',
    hue: 150,
    delay: 300,
  },
  {
    id: 'dept-mechanical',
    slug: 'mechanical',
    icon: Cog,
    title: 'Mechanical Engineering',
    desc: 'From thermodynamics to manufacturing — design, analyze, and create mechanical systems that power industries across the globe.',
    duration: '3 Years',
    seats: '60 Seats',
    hue: 10,
    delay: 100,
  },
  {
    id: 'dept-textile',
    slug: 'textile',
    icon: Shirt,
    title: 'Textile Technology',
    desc: 'Dive into the science of fibres, fabrics, and fashion technology — a unique discipline blending art with engineering innovation.',
    duration: '3 Years',
    seats: '60 Seats',
    hue: 280,
    delay: 200,
  },
  {
    id: 'dept-wood',
    slug: 'wood',
    icon: Trees,
    title: 'Wood & Paper Technology',
    desc: 'A rare and specialized discipline focusing on sustainable wood processing, paper manufacturing, and eco-friendly material science.',
    duration: '3 Years',
    seats: '20 Seats',
    hue: 100,
    delay: 300,
  },
]

export default function Departments() {
  return (
    <section className="section departments" id="departments">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">What We Offer</span>
          <h2 className="section__title">Our <span className="gradient-text-slow">Departments</span></h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">Six diverse engineering disciplines nurturing the technical leaders of tomorrow</p>
        </div>
        <div className="departments__grid">
          {departments.map((dept) => {
            const Icon = dept.icon
            return (
              <div className="dept-card" id={dept.id} key={dept.id} data-animate="fade-up" data-delay={dept.delay} style={{ '--dept-hue': dept.hue }}>
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
          })}
        </div>
      </div>
    </section>
  )
}
