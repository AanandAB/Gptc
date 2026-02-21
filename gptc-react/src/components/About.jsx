import React from 'react'
import { CheckCircle, MapPin, Calendar, Building, Factory } from 'lucide-react'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section__header" data-animate="fade-up">
          <span className="section__label">About Us</span>
          <h2 className="section__title">The <span className="gradient-text-slow">College</span></h2>
          <div className="section__divider"></div>
        </div>

        <div className="about__grid">
          <div className="about__image-wrapper" data-animate="fade-right">
            <div className="about__image-card">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
                alt="GPTC Kannur Campus"
                loading="lazy"
              />
              <div className="about__image-overlay">
                <span>Est. 1958</span>
              </div>
            </div>
          </div>
          <div className="about__content" data-animate="fade-left">
            <h3 className="about__heading">A Legacy of <span className="gradient-text">Technical Excellence</span></h3>
            <p className="about__text">
              Govt. Polytechnic College, Kannur is situated at <strong>Thottada</strong> in Kannur Corporation.
              Thottada is known as the <strong>Educational Head Quarters</strong> of the Kannur district.
              A lot of educational institutions such as ITI, ITI (Women), ITI Regional Directorate, THS,
              SN College, Chinmaya Institute of Technology, National Institute of Handloom and Textile
              Technology, SN Trust Higher Secondary School, St. Francis EM School etc. are located around the Institution.
            </p>
            <p className="about__text">
              Kannur Government Polytechnic was started in the year <strong>1958</strong> with a view to create
              ample chances for the educated peoples to get technical training and hence to increase the pool
              of specially trained, employed technicians. In the beginning there were 3 year diploma courses
              in Civil Engineering, Mechanical Engineering, Electrical Engineering and Textile Technology.
              Three year diploma in <strong>Wood & Paper Technology</strong> was started later in the year 1982.
              A new diploma course in <strong>Electronics</strong> was started in 1987.
            </p>
            <p className="about__text">
              Kannur is a hub of industries of various kinds. Keltron provides opportunities for Electronics students.
              Traco Cables in Pinarayi absorbs Electronics Engineering graduates. Rubco factory in Thalassery and
              Western India Plywoods Baliapatam provides placement for Wood and Paper Technology. Thottada has
              recently harbored many automobile ventures, increasing the demand for Mechanical branch graduates.
              The college is one of the biggest institutions in Kannur District and provides hostel facility for boys.
            </p>
            <div className="about__highlights">
              {[
                { icon: CheckCircle, text: 'AICTE Approved' },
                { icon: CheckCircle, text: 'SBTE Kerala Affiliated' },
                { icon: CheckCircle, text: 'Government Institution' },
                { icon: CheckCircle, text: '6 Engineering Departments' },
                { icon: Calendar, text: 'Established 1958' },
                { icon: Building, text: 'Boys Hostel Facility' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div className="about__highlight" key={i}>
                    <Icon size={16} />
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
