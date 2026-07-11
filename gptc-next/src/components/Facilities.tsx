// @ts-nocheck
"use client";
import React from 'react'
import { BookMarked, FlaskConical, Wifi, HeartHandshake, Briefcase, Dumbbell, Shield, Microscope, Monitor, Library } from 'lucide-react'

const iconMap: Record<string, any> = {
  'heart-handshake': HeartHandshake, 'briefcase': Briefcase, 'shield': Shield,
  'book-marked': BookMarked, 'flask-conical': FlaskConical, 'wifi': Wifi,
  'dumbbell': Dumbbell, 'book': BookMarked, 'microscope': Microscope,
  'monitor': Monitor, 'library': Library,
};

const fallbackFacilities = [
  { id: 'facility-nss', icon: HeartHandshake, title: 'NSS Unit', desc: 'Active National Service Scheme unit promoting community service, social responsibility, and nation building through voluntary activities.', delay: 100 },
  { id: 'facility-tpc', icon: Briefcase, title: 'Training & Placement Cell (TPC)', desc: 'Dedicated placement cell connecting students with industry opportunities, internships, and career guidance for successful employment.', delay: 150 },
  { id: 'facility-ncc', icon: Shield, title: 'National Cadet Corps (NCC)', desc: 'NCC unit fostering discipline, leadership, and patriotism among students through military training and community development programs.', delay: 200 },
  { id: 'facility-library', icon: BookMarked, title: 'Library', desc: 'Well-stocked with technical books, journals, periodicals, and digital resources for comprehensive learning.', delay: 250 },
  { id: 'facility-labs', icon: FlaskConical, title: 'Laboratories', desc: 'Modern, fully-equipped labs for all departments with latest instruments, machines, and software tools.', delay: 300 },
  { id: 'facility-internet', icon: Wifi, title: 'Internet & IT', desc: 'High-speed internet and computer labs with modern software for digital learning and research.', delay: 350 },
  { id: 'facility-sports', icon: Dumbbell, title: 'Sports & Games', desc: 'Sports grounds and indoor facilities for physical fitness, competitive sports, and extracurricular activities.', delay: 400 },
]

export default function Facilities({ facilities: facilitiesProp }: { facilities?: { title: string; description: string; iconName: string }[] }) {
  const facilities = (facilitiesProp && facilitiesProp.length > 0)
    ? facilitiesProp.map((f, i) => ({
        id: `facility-${i}`,
        icon: iconMap[f.iconName] || BookMarked,
        title: f.title,
        desc: f.description,
        delay: (i + 1) * 50 + 50,
      }))
    : fallbackFacilities;
  return (
    <section className="section facilities" id="facilities">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">Infrastructure</span>
          <h2 className="section__title">Campus Facilities</h2>
          <div className="section__divider"></div>
        </div>

        <div className="facilities__grid">
          {facilities.map((f, i) => {
            const Icon = f.icon
            return (
              <div className="facility-card" id={f.id} key={f.id} data-animate="fade-up" data-delay={f.delay}>
                <Icon />
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
