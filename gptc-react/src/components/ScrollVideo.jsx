import React, { useEffect, useRef, useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'

export default function ScrollVideo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const rafRef = useRef(null)

  // Observe when the section enters the viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '100px 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Sync video currentTime to scroll position
  useEffect(() => {
    if (!isVisible || !videoReady) return

    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video || !video.duration) return

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const sectionHeight = section.offsetHeight
        const viewportHeight = window.innerHeight

        // Calculate how far through the section we've scrolled
        // Start: section top hits viewport bottom → End: section bottom hits viewport top
        const totalTravel = sectionHeight + viewportHeight
        const scrolled = viewportHeight - rect.top
        const rawProgress = Math.max(0, Math.min(1, scrolled / totalTravel))

        setProgress(rawProgress)

        // Map scroll progress → video time
        const targetTime = rawProgress * video.duration
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial sync

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, videoReady])

  const handleVideoReady = () => {
    setVideoReady(true)
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted(prev => !prev)
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }

  return (
    <section className="scroll-video" id="campus-tour" ref={sectionRef}>
      {/* Sticky video container */}
      <div className="scroll-video__sticky">
        <div className="scroll-video__wrapper">
          {/* Loading state */}
          {!videoReady && (
            <div className="scroll-video__loading">
              <div className="scroll-video__spinner" />
              <span>Loading campus tour...</span>
            </div>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            className={`scroll-video__player ${videoReady ? 'ready' : ''}`}
            src="/videos/campus-scroll.mp4"
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleVideoReady}
          />

          {/* Overlay gradient */}
          <div className="scroll-video__overlay">
            <div className="scroll-video__content" data-animate="fade-up">
              <span className="scroll-video__label">Campus Tour</span>
              <h2 className="scroll-video__title">
                Experience Our <span className="gradient-text">Campus</span>
              </h2>
              <p className="scroll-video__desc">
                Scroll to explore the campus of Government Polytechnic College Kannur
              </p>
            </div>

            {/* Controls */}
            <div className="scroll-video__controls">
              <button
                className="scroll-video__mute-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="scroll-video__progress">
            <div
              className="scroll-video__progress-bar"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Scroll hint */}
          {progress < 0.05 && videoReady && (
            <div className="scroll-video__hint">
              <div className="scroll-video__hint-mouse">
                <div className="scroll-video__hint-wheel" />
              </div>
              <span>Scroll to play</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
