import React, { useState, useEffect, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Trophy, Users } from 'lucide-react'

const galleryImages = [
  { src: '/gallery/Achievement1.jpg', caption: 'Third Prize — Seminar Competition, CALPIO 2026', category: 'achievements', size: 'large' },
  { src: '/gallery/Achievement2.jpg', caption: 'First Prize — Seminar Competition, CALPIO 2026', category: 'achievements', size: 'large' },
  { src: '/gallery/SPORTS.jpeg', caption: 'Inter Poly State Table Tennis — 2nd Runner Up', category: 'sports', size: 'tall' },
]

const categories = [
  { key: 'all', label: 'All Photos', icon: Camera },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
  { key: 'sports', label: 'Sports', icon: Users },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [imageLoaded, setImageLoaded] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [animating, setAnimating] = useState(false)
  const [lightboxLoaded, setLightboxLoaded] = useState(false)
  const thumbsRef = useRef(null)

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const filteredToOriginal = filteredImages.map(img => galleryImages.indexOf(img))

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return
    setAnimating(true)
    setTimeout(() => {
      setActiveCategory(cat)
      setTimeout(() => setAnimating(false), 50)
    }, 200)
  }

  const openLightbox = (filteredIndex) => {
    const originalIndex = filteredToOriginal[filteredIndex]
    setActiveImage(originalIndex)
    setLightboxOpen(true)
    setLightboxLoaded(false)
  }
  const closeLightbox = () => setLightboxOpen(false)

  const goNext = useCallback(() => {
    setLightboxLoaded(false)
    setActiveImage(p => (p + 1) % galleryImages.length)
  }, [])
  const goPrev = useCallback(() => {
    setLightboxLoaded(false)
    setActiveImage(p => (p - 1 + galleryImages.length) % galleryImages.length)
  }, [])

  useEffect(() => {
    if (lightboxOpen && thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[activeImage]
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeImage, lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [lightboxOpen, goNext, goPrev])

  const handleImageLoad = (i) => setImageLoaded(prev => ({ ...prev, [i]: true }))

  return (
    <>
      <section className="section gallery" id="gallery">
        <div className="container">
          <div className="section__header" data-animate="fade-up">
            <span className="section__label">Campus Life</span>
            <h2 className="section__title">Photo <span className="gradient-text-slow">Gallery</span></h2>
            <div className="section__divider"></div>
            <p className="section__subtitle">Achievements, events, and moments from our vibrant campus</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="gallery__filters" data-animate="fade-up" data-delay="100">
            {categories.map(cat => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.key}
                  className={`gallery__filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.key)}
                >
                  <Icon size={14} />
                  {cat.label}
                  {activeCategory === cat.key && (
                    <span className="gallery__filter-count">{filteredImages.length}</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Masonry Grid */}
          <div className={`gallery__masonry ${animating ? 'gallery__masonry--fading' : ''}`}>
            {filteredImages.map((img, i) => (
              <div
                className={`gallery__card gallery__card--${img.size}`}
                key={`${activeCategory}-${i}`}
                data-animate="fade-up"
                data-delay={i * 50}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.caption}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <div className={`gallery__card-skeleton ${imageLoaded[`${activeCategory}-${i}`] ? 'loaded' : ''}`} />
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  onLoad={() => handleImageLoad(`${activeCategory}-${i}`)}
                />
                <div className="gallery__card-overlay">
                  <div className="gallery__card-icon">
                    <Maximize2 size={22} />
                  </div>
                  <div className="gallery__card-info">
                    <span className="gallery__card-caption">{img.caption}</span>
                    <span className="gallery__card-tag">{categories.find(c => c.key === img.category)?.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cinematic Lightbox ── */}
      <div
        className={`gallery-lightbox ${lightboxOpen ? 'active' : ''}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        data-lenis-prevent
      >
        <div className="gallery-lightbox__backdrop" />
        <div className="gallery-lightbox__topbar" onClick={(e) => e.stopPropagation()}>
          <span className="gallery-lightbox__counter">
            {activeImage + 1} <span>/ {galleryImages.length}</span>
          </span>
          <span className="gallery-lightbox__title">
            {galleryImages[activeImage]?.caption}
          </span>
          <button className="gallery-lightbox__close" onClick={closeLightbox} aria-label="Close viewer">
            <X size={20} />
          </button>
        </div>

        <button
          className="gallery-lightbox__arrow gallery-lightbox__arrow--prev"
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="gallery-lightbox__arrow gallery-lightbox__arrow--next"
          onClick={(e) => { e.stopPropagation(); goNext() }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {lightboxOpen && (
          <div className="gallery-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <div className={`gallery-lightbox__image-wrap ${lightboxLoaded ? 'loaded' : ''}`}>
              <div className="gallery-lightbox__spinner" />
              <img
                key={activeImage}
                className="gallery-lightbox__image"
                src={galleryImages[activeImage].src}
                alt={galleryImages[activeImage].caption}
                onLoad={() => setLightboxLoaded(true)}
              />
            </div>
          </div>
        )}

        {lightboxOpen && (
          <div className="gallery-lightbox__thumbstrip" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-lightbox__thumbs" ref={thumbsRef}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  className={`gallery-lightbox__thumb ${i === activeImage ? 'active' : ''}`}
                  onClick={() => { setLightboxLoaded(false); setActiveImage(i) }}
                  aria-label={img.caption}
                >
                  <img src={img.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
