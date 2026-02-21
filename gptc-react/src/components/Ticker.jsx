import React from 'react'
import { Megaphone } from 'lucide-react'

const announcements = [
  '📢 Diploma Admission 2025-26 — Spot Admission Dates Announced',
  '📋 Previous Year Question Papers now available online',
  '🏆 GPTC Kannur students excel in University Examinations',
  '📝 Online Grievance Redressal System is now active',
  '🎓 Short Term Courses — New batches starting soon',
]

export default function Ticker() {
  return (
    <div className="ticker" id="announcements">
      <div className="ticker__label">
        <Megaphone size={16} />
        <span>Announcements</span>
      </div>
      <div className="ticker__track">
        <div className="ticker__content">
          {[...announcements, ...announcements].map((item, i) => (
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
