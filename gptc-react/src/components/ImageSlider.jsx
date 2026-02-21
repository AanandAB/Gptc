import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80', title: 'Welcome to GPTC Kannur', subtitle: 'Excellence in Technical Education since 1958' },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80', title: 'World-Class Campus', subtitle: 'Modern facilities across 6 engineering departments' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=1200&q=80', title: 'Learn by Doing', subtitle: 'Practical, industry-oriented diploma programmes' },
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80', title: 'State-of-the-Art Labs', subtitle: 'Hands-on experience with modern equipment' },
]

export default function ImageSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  return (
    <section className="slider-section" data-animate="fade-up">
      <div className="container">
        <div className="image-slider" role="region" aria-label="Campus photo slideshow" aria-roledescription="carousel">
          <div className="image-slider__track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div className="image-slider__slide" key={i} role="tabpanel" aria-label={`Slide ${i + 1} of ${slides.length}`}>
                <img src={slide.src} alt={slide.title} loading={i === 0 ? 'eager' : 'lazy'} />
                <div className="image-slider__overlay">
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="image-slider__btn image-slider__btn--prev" onClick={prev} aria-label="Previous slide">
            <ChevronLeft size={22} />
          </button>
          <button className="image-slider__btn image-slider__btn--next" onClick={next} aria-label="Next slide">
            <ChevronRight size={22} />
          </button>
          <div className="image-slider__dots" role="tablist">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`image-slider__dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
          {/* Progress bar */}
          <div className="image-slider__progress">
            <div className="image-slider__progress-bar" key={current} />
          </div>
        </div>
      </div>
    </section>
  )
}
