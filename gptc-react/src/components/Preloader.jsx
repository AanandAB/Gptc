import React from 'react'

export default function Preloader({ loading }) {
  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      <div className="preloader__spinner"></div>
      <div className="preloader__text">GPTC KANNUR</div>
    </div>
  )
}
