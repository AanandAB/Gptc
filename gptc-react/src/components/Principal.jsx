import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Principal() {
  return (
    <section className="section principal" id="principal">
      <div className="container">
        <div className="principal__card" data-animate="fade-up">
          <div className="principal__avatar">
            <img
              src="/images/principal.jpg"
              alt="Pramod Chathampally - Principal"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <div className="principal__info">
            <span className="section__label">From the Desk of</span>
            <h3 className="principal__name">Pramod Chathampally</h3>
            <p className="principal__message">
              "Government Polytechnic College, Kannur has been at the forefront of technical education
              in northern Kerala since its inception. We are committed to nurturing technically competent,
              ethically strong, and socially responsible diploma engineers."
            </p>
            <p className="principal__closing">
              — Principal, GPTC Kannur
            </p>
            <Link to="/principal" className="btn btn--outline btn--sm principal__read-more">
              Read Full Message <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
