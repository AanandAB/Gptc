import { useState, useEffect, useRef } from 'react'

export default function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          function update(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easedProgress * end))

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setCount(end)
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}
