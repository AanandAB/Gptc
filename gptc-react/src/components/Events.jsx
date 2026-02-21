import React from 'react'
import { HeartHandshake, Trophy, Palette, ArrowRight } from 'lucide-react'

const events = [
  {
    icon: HeartHandshake,
    title: "NSS 7 Day Camp — 'Lakshya'",
    category: 'NSS',
    desc: 'A week-long NSS special camp focusing on community service, social awareness, and personality development of students.',
    day: '27',
    month: 'DEC',
    hue: 200,
    featured: true,
    delay: 100,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
  },
  {
    icon: Trophy,
    title: 'Annual Sports Day',
    category: 'Sports',
    desc: 'Annual athletic meet featuring inter-departmental competitions in track & field, team sports, and more.',
    day: '15',
    month: 'JAN',
    hue: 120,
    featured: false,
    delay: 200,
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&q=80',
  },
  {
    icon: Palette,
    title: 'Arts & Cultural Fest',
    category: 'Cultural',
    desc: 'A vibrant celebration of talent showcasing music, dance, drama, and literary competitions across departments.',
    day: '10',
    month: 'FEB',
    hue: 40,
    featured: false,
    delay: 300,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
  },
]

export default function Events() {
  return (
    <section className="section events" id="events">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Campus Life</span>
          <h2 className="section__title">Events & Activities</h2>
          <div className="section__divider"></div>
        </div>

        <div className="events__grid">
          {events.map((ev, i) => (
            <div
              className={`event-card ${ev.featured ? 'event-card--featured' : ''}`}
              key={i}
              data-animate="fade-up"
              data-delay={ev.delay}
            >
              <div className="event-card__image">
                {ev.image ? (
                  <img src={ev.image} alt={ev.title} loading="lazy" />
                ) : (
                  <div className="event-card__image-placeholder" style={{ '--ev-hue': ev.hue }}>
                    <ev.icon size={48} />
                  </div>
                )}
                <div className="event-card__date">
                  <span className="event-card__day">{ev.day}</span>
                  <span className="event-card__month">{ev.month}</span>
                </div>
              </div>
              <div className="event-card__body">
                <span className="event-card__category">{ev.category}</span>
                <h3 className="event-card__title">{ev.title}</h3>
                <p className="event-card__desc">{ev.desc}</p>
                <a href="#" className="event-card__link">
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
