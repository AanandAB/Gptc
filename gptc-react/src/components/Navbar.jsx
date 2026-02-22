import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Track scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      if (isHome) {
        const sections = document.querySelectorAll('section[id]')
        let current = 'hero'
        sections.forEach(section => {
          const rect = section.getBoundingClientRect()
          const top = rect.top + window.scrollY - 160
          if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
            current = section.getAttribute('id')
          }
        })
        setActiveSection(current)
      } else {
        setActiveSection(null)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) { setMenuOpen(false); setOpenDropdown(null) } }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setOpenDropdown(null) } }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const scrollTo = useCallback((e, sectionId) => {
    e.preventDefault()
    setMenuOpen(false)
    setOpenDropdown(null)

    if (!isHome) {
      navigate('/')
      // Need a slight delay to let the page render before scrolling
      setTimeout(() => {
        if (window.lenis) {
          const el = document.getElementById(sectionId)
          if (el) window.lenis.scrollTo(el, { offset: -80, duration: 1.8 })
        }
      }, 300)
    } else {
      if (window.lenis) {
        const el = document.getElementById(sectionId)
        if (el) window.lenis.scrollTo(el, { offset: -80, duration: 1.8 })
      }
    }
  }, [isHome, navigate])

  const toggleDropdown = useCallback((name) => {
    if (window.innerWidth <= 768) setOpenDropdown(prev => prev === name ? null : name)
  }, [])

  const goToPage = useCallback((path) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    setOpenDropdown(null)
    navigate(path)
  }, [navigate])

  const isActive = (ids) => ids.some(id => activeSection === id)

  return (
    <>
      <div className={`navbar__overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!isHome ? 'navbar--subpage' : ''}`} id="navbar" role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          <a href="#" className="navbar__brand" onClick={(e) => scrollTo(e, 'hero')} aria-label="GPTC Kannur - Go to homepage">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GPTC Kannur" className="navbar__logo-img" />
            <div className="navbar__brand-text">
              <span className="navbar__title">Govt. Polytechnic College</span>
              <span className="navbar__subtitle">Kannur, Kerala</span>
            </div>
          </a>

          <ul className={`navbar__menu ${menuOpen ? 'active' : ''}`} id="nav-menu" role="menubar" data-lenis-prevent>
            <li role="none">
              <button className={`navbar__link ${isHome && activeSection === 'hero' ? 'active' : ''}`} onClick={(e) => scrollTo(e, 'hero')} role="menuitem">Home</button>
            </li>

            <li className={`navbar__dropdown ${openDropdown === 'about' ? 'open' : ''}`} role="none">
              <button className={`navbar__link ${isHome && isActive(['about','principal','vision']) ? 'active' : ''}`} onClick={() => toggleDropdown('about')} aria-haspopup="true" aria-expanded={openDropdown === 'about'} role="menuitem">
                About Us <ChevronDown className="icon-xs" />
              </button>
              <ul className="navbar__dropdown-menu" role="menu">
                <li role="none"><button onClick={(e) => scrollTo(e, 'about')} role="menuitem">The College</button></li>
                <li role="none"><button onClick={goToPage('/principal')} role="menuitem">The Principal</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'vision')} role="menuitem">Vision &amp; Mission</button></li>
              </ul>
            </li>

            <li className={`navbar__dropdown ${openDropdown === 'departments' ? 'open' : ''}`} role="none">
              <button className={`navbar__link ${isHome && activeSection === 'departments' ? 'active' : ''}`} onClick={() => toggleDropdown('departments')} aria-haspopup="true" aria-expanded={openDropdown === 'departments'} role="menuitem">
                Departments <ChevronDown className="icon-xs" />
              </button>
              <ul className="navbar__dropdown-menu" role="menu">
                <li role="none"><button onClick={goToPage('/department/civil')} role="menuitem">Civil Engineering</button></li>
                <li role="none"><button onClick={goToPage('/department/electrical')} role="menuitem">Electrical Engineering</button></li>
                <li role="none"><button onClick={goToPage('/department/electronics')} role="menuitem">Electronics Engineering</button></li>
                <li role="none"><button onClick={goToPage('/department/mechanical')} role="menuitem">Mechanical Engineering</button></li>
                <li role="none"><button onClick={goToPage('/department/textile')} role="menuitem">Textile Technology</button></li>
                <li role="none"><button onClick={goToPage('/department/wood')} role="menuitem">Wood &amp; Paper Technology</button></li>
              </ul>
            </li>

            <li className={`navbar__dropdown ${openDropdown === 'academics' ? 'open' : ''}`} role="none">
              <button className={`navbar__link ${isHome && activeSection === 'academics' ? 'active' : ''}`} onClick={() => toggleDropdown('academics')} aria-haspopup="true" aria-expanded={openDropdown === 'academics'} role="menuitem">
                Academics <ChevronDown className="icon-xs" />
              </button>
              <ul className="navbar__dropdown-menu" role="menu">
                <li role="none"><button onClick={goToPage('/diploma')} role="menuitem">Diploma Programmes</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'academics')} role="menuitem">Short Term Courses</button></li>
                <li role="none"><button onClick={goToPage('/classroom-layout')} role="menuitem">Auto Classroom Layout</button></li>
                <li role="none"><a href="https://gptkannur.infrastruct.in/" target="_blank" rel="noopener noreferrer" role="menuitem">Moodle LMS ↗</a></li>
                <li role="none"><a href="https://drive.google.com/drive/folders/1GJ61yptfG601LmjCy908sG6llr6UX81e" target="_blank" rel="noopener noreferrer" role="menuitem">Previous Year Papers ↗</a></li>
              </ul>
            </li>

            <li className={`navbar__dropdown ${openDropdown === 'facilities' ? 'open' : ''}`} role="none">
              <button className={`navbar__link ${isHome && activeSection === 'facilities' ? 'active' : ''}`} onClick={() => toggleDropdown('facilities')} aria-haspopup="true" aria-expanded={openDropdown === 'facilities'} role="menuitem">
                Facilities <ChevronDown className="icon-xs" />
              </button>
              <ul className="navbar__dropdown-menu" role="menu">
                <li role="none"><button onClick={(e) => scrollTo(e, 'facility-nss')} role="menuitem">NSS</button></li>
                <li role="none"><button onClick={goToPage('/placement-cell')} role="menuitem">Training &amp; Placement Cell (TPC)</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'facility-ncc')} role="menuitem">National Cadet Corps (NCC)</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'facility-library')} role="menuitem">Library</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'facility-labs')} role="menuitem">Laboratories</button></li>
                <li role="none"><button onClick={(e) => scrollTo(e, 'facility-sports')} role="menuitem">Sports &amp; Games</button></li>
              </ul>
            </li>

            <li role="none">
              <button className={`navbar__link ${isHome && activeSection === 'events' ? 'active' : ''}`} onClick={(e) => scrollTo(e, 'events')} role="menuitem">Events</button>
            </li>

            <li role="none">
              <button className={`navbar__link ${isHome && activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => scrollTo(e, 'contact')} role="menuitem">Contact</button>
            </li>
          </ul>

          <button className={`navbar__toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </>
  )
}
