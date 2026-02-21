import React from 'react'
import { ExternalLink, Link, Shield, ShieldAlert, Phone, Mail, ChevronRight } from 'lucide-react'

export default function Links() {
  return (
    <section className="section links" id="links">
      <div className="container">
        <div className="links__grid">
          <div className="links__column" data-animate="fade-up" data-delay="100">
            <h3 className="links__heading">
              <ExternalLink size={16} />
              Important Links
            </h3>
            <ul className="links__list">
              <li><a href="https://www.sbte.kerala.gov.in/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> State Board of Technical Education</a></li>
              <li><a href="https://www.polyadmission.org/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Admission to Polytechnic Colleges</a></li>
              <li><a href="http://www.dtekerala.gov.in/index.php/en/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> DTE Kerala</a></li>
              <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> AICTE</a></li>
              <li><a href="http://www.highereducation.kerala.gov.in/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Higher Education Department</a></li>
              <li><a href="https://www.spark.gov.in/webspark/" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> SPARK</a></li>
              <li><a href="https://ddfs.dtekerala.gov.in/ddfs/login.do" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> DDFS</a></li>
            </ul>
          </div>

          <div className="links__column" data-animate="fade-up" data-delay="200">
            <h3 className="links__heading">
              <Link size={16} />
              Quick Links
            </h3>
            <ul className="links__list">
              <li><a href="https://docs.google.com/forms/d/1m0mswh0DsQRnHQqF2MzRSVJg9vU5kkq76XP5hNdZRZc/edit" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Online Grievance Redressal</a></li>
              <li><a href="#"><ChevronRight size={14} /> Extension of Approval (EOA)</a></li>
              <li><a href="#"><ChevronRight size={14} /> Mandatory Disclosure</a></li>
              <li><a href="#"><ChevronRight size={14} /> Feedback</a></li>
              <li><a href="#committees"><ChevronRight size={14} /> Committees</a></li>
            </ul>
          </div>

          <div className="links__column links__column--highlight" data-animate="fade-up" data-delay="300">
            <h3 className="links__heading">
              <Shield size={16} />
              Anti-Ragging
            </h3>
            <div className="links__anti-ragging">
              <div className="links__ar-badge">
                <ShieldAlert size={40} />
              </div>
              <h4>National Anti-Ragging Helpline</h4>
              <p className="links__ar-phone">
                <Phone size={16} />
                1800-180-5522
              </p>
              <p className="links__ar-email">
                <Mail size={16} />
                helpline@antiragging.in
              </p>
              <a href="https://antiragging.in/" target="_blank" rel="noopener noreferrer" className="btn btn--danger btn--sm">
                Report Ragging
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
