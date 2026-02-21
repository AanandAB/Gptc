import React from 'react'
import { Phone, Mail, ShieldAlert } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="top-bar" id="top-bar">
      <div className="container top-bar__inner">
        <div className="top-bar__left">
          <a href="tel:04972835106" className="top-bar__item">
            <Phone className="icon-sm" />
            <span>0497 283 5106</span>
          </a>
          <a href="mailto:kannurgptc@gmail.com" className="top-bar__item">
            <Mail className="icon-sm" />
            <span>kannurgptc@gmail.com</span>
          </a>
        </div>
        <div className="top-bar__right">
          <a href="https://www.polyadmission.org/" target="_blank" rel="noopener noreferrer" className="top-bar__badge">
            Admissions Open
          </a>
          <a href="https://antiragging.in/" target="_blank" rel="noopener noreferrer" className="top-bar__item top-bar__anti-ragging">
            <ShieldAlert className="icon-sm" />
            <span>Anti-Ragging Helpline: 1800-180-5522</span>
          </a>
        </div>
      </div>
    </div>
  )
}
