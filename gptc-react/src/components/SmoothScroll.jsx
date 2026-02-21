import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const pathname = useLocation().pathname

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // Slightly faster drop-off for less "drag"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Classic ease-out
      lerp: 0.1,              // Increased for snappier responsiveness (less floaty)
      wheelMultiplier: 1.0,   // Restored to native speed (was artificially slowed down to 0.8)
      touchMultiplier: 2.0,   // Enhanced touch momentum
      smoothWheel: true,
      smoothTouch: false,     // Native scroll is best for mobile
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Global access for other components (optional but helpful)
    window.lenis = lenis

    return () => {
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return children
}
