import { useRef, useEffect } from 'react'

export default function useTilt(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const { max = 15, perspective = 1000, scale = 1.05, speed = 400, easing = "cubic-bezier(.03,.98,.52,.99)" } = options

    node.style.perspective = `${perspective}px`
    node.style.transition = `transform ${speed}ms ${easing}`
    node.style.transformStyle = "preserve-3d"

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -max
      const rotateY = ((x - centerX) / centerX) * max

      node.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    }

    const handleMouseEnter = () => {
      node.style.transition = `transform 50ms ${easing}`
    }

    const handleMouseLeave = () => {
      node.style.transition = `transform ${speed}ms ${easing}`
      node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }

    node.addEventListener('mousemove', handleMouseMove)
    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mousemove', handleMouseMove)
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [options])

  return ref
}
