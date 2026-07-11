// @ts-nocheck
"use client";
import React from 'react'
import { Megaphone } from 'lucide-react'

const fallbackAnnouncements = [
  '📢 Diploma Admission 2025-26 — Spot Admission Dates Announced',
  '📋 Previous Year Question Papers now available online',
  '🏆 GPTC Kannur students excel in University Examinations',
  '📝 Online Grievance Redressal System is now active',
  '🎓 Short Term Courses — New batches starting soon',
]

export default function Ticker({ announcements }: { announcements?: { text: string }[] }) {
  const items = (announcements && announcements.length > 0)
    ? announcements.map(a => a.text)
    : fallbackAnnouncements;

  return (
    <div className="ticker" id="announcements">
      <div className="ticker__label">
        <Megaphone size={16} />
        <span>Announcements</span>
      </div>
      <div className="ticker__track">
        <div className="ticker__content">
          {[...items, ...items].map((item, i) => (
            <React.Fragment key={i}>
              <span className="ticker__item">{item}</span>
              <span className="ticker__separator">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
