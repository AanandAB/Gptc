import React from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop({ visible, onClick }) {
  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={onClick}
      aria-label="Back to top"
    >
      <ChevronUp />
    </button>
  )
}
