import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    onNavigate(sectionId)
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand" data-animate="fade-up">
              <div className="footer__logo">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GPTC Kannur" className="navbar__logo-img navbar__logo-img--lg" />
                <div>
                  <h3>Govt. Polytechnic College Kannur</h3>
                  <p className="footer__tagline">Knowledge is Power</p>
                </div>
              </div>
              <p className="footer__about">
                Government Polytechnic College, Kannur is a premier government-run technical
                education institution in North Kerala, offering AICTE-approved diploma programmes
                since 1958.
              </p>
            </div>

            <div className="footer__contact" data-animate="fade-up" data-delay="100">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <MapPin size={16} />
                  <span>Thottada, Kannur,<br/>Kerala 670007, India</span>
                </li>
                <li>
                  <Phone size={16} />
                  <a href="tel:04972835106">0497 283 5106</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:kannurgptc@gmail.com">kannurgptc@gmail.com</a>
                </li>
                <li>
                  <Mail size={16} />
                  <a href="mailto:prl.gpt.knr@dte.kerala.gov.in">prl.gpt.knr@dte.kerala.gov.in</a>
                </li>
              </ul>
            </div>

            <div className="footer__nav" data-animate="fade-up" data-delay="200">
              <h4>Quick Navigation</h4>
              <ul>
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Departments', id: 'departments' },
                  { label: 'Academics', id: 'academics' },
                  { label: 'Gallery', id: 'gallery' },
                  { label: 'Events', id: 'events' },
                  { label: 'Facilities', id: 'facilities' },
                  { label: 'Important Links', id: 'links' },
                ].map((item, i) => (
                  <li key={i}>
                    <a href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__map" data-animate="fade-up" data-delay="300">
              <h4>Find Us</h4>
              <div className="footer__map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.1!2d75.3726!3d11.8712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422f67dfafae1%3A0x25cec79c80bba9bd!2sGovernment%20Polytechnic%20College%2C%20Kannur!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GPTC Kannur Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; 2025 Government Polytechnic College Kannur. All rights reserved.</p>
          <p>
            Designed with <span style={{ color: 'var(--danger)' }}>♥</span> for GPTC Kannur
          </p>
        </div>
      </div>
    </footer>
  )
}
