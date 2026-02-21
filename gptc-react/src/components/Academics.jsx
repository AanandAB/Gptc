import React from 'react'
import { BookOpen, Rocket, Monitor, FileText } from 'lucide-react'

const programs = [
  {
    icon: BookOpen,
    title: 'Diploma Programmes',
    desc: 'Three-year full-time diploma programmes in 6 engineering disciplines after 10th standard (SSLC).',
    tag: 'Full Time • 3 Years',
    delay: 100,
  },
  {
    icon: Rocket,
    title: 'Short Term Courses',
    desc: 'Industry-oriented short-term skill development courses to enhance employability and technical skills.',
    tag: 'Skill Development',
    delay: 200,
  },
  {
    icon: Monitor,
    title: 'Moodle LMS',
    desc: 'Online learning management system for digital course materials, assignments, and interactive learning.',
    link: 'https://gptkannur.infrastruct.in/',
    linkText: 'Access Moodle →',
    delay: 300,
  },
  {
    icon: FileText,
    title: 'Question Papers',
    desc: 'Access previous year university examination question papers for all departments and semesters.',
    link: 'https://drive.google.com/drive/folders/1GJ61yptfG601LmjCy908sG6llr6UX81e',
    linkText: 'Download Papers →',
    delay: 400,
  },
]

export default function Academics() {
  return (
    <section className="section academics" id="academics">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Academics</span>
          <h2 className="section__title">Programmes & Resources</h2>
          <div className="section__divider"></div>
        </div>

        <div className="academics__grid">
          {programs.map((prog, i) => {
            const Icon = prog.icon
            return (
              <div className="academic-card" key={i} data-animate="fade-up" data-delay={prog.delay}>
                <div className="academic-card__icon">
                  <Icon />
                </div>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                {prog.tag && <span className="academic-card__tag">{prog.tag}</span>}
                {prog.link && (
                  <a href={prog.link} target="_blank" rel="noopener noreferrer" className="academic-card__link">
                    {prog.linkText}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
