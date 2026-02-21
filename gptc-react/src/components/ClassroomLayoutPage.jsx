import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Lenis from 'lenis'
import { ArrowLeft, Calculator, Download, LayoutGrid, RotateCcw } from 'lucide-react'

// ──────────────────────────────────────────────
// ROLL NUMBER PARSER
// Supports formats: CE:1-10, ME:1-8, EL:1-6
// Also: CE:1,3,5,7 or CE:1-5,8,10
// ──────────────────────────────────────────────
function parseRollNumbers(input) {
  if (!input.trim()) return []
  const students = []
  // Split by branch groups (semicolons or separate branch entries)
  const branchGroups = input.split(/[;\n]/).map(s => s.trim()).filter(Boolean)

  for (const group of branchGroups) {
    // Match pattern: BRANCH:numbers or BRANCH:range
    const match = group.match(/^([A-Za-z]+)\s*[:]\s*(.+)$/)
    if (match) {
      const branch = match[1].toUpperCase()
      const numbersPart = match[2]
      const nums = expandNumbers(numbersPart)
      for (const n of nums) {
        students.push(`${branch}-${n}`)
      }
    } else {
      // Try as plain comma-separated list
      const parts = group.split(',').map(s => s.trim()).filter(Boolean)
      for (const part of parts) {
        students.push(part)
      }
    }
  }
  return students
}

function expandNumbers(str) {
  const results = []
  const parts = str.split(',').map(s => s.trim()).filter(Boolean)
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/)
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1])
      const end = parseInt(rangeMatch[2])
      for (let i = start; i <= end; i++) results.push(i)
    } else if (/^\d+$/.test(part)) {
      results.push(parseInt(part))
    }
  }
  return results
}

// ──────────────────────────────────────────────
// LAYOUT GENERATOR
// Creates a seating arrangement from bench config
// ──────────────────────────────────────────────
function generateLayout(config, students) {
  const { roomName, oneSeaterRows, oneSeaterCols, twoSeaterCount, threeSeaterCount } = config
  const layout = { roomName, sections: [], totalSeats: 0 }

  // Section 1: 1-seater benches (grid)
  if (oneSeaterRows > 0 && oneSeaterCols > 0) {
    const section = { type: '1-seater', label: '1-Seater Benches', rows: [], seatsPerBench: 1 }
    for (let r = 0; r < oneSeaterRows; r++) {
      const row = []
      for (let c = 0; c < oneSeaterCols; c++) {
        row.push({ seatIndex: layout.totalSeats, student: null })
        layout.totalSeats++
      }
      section.rows.push(row)
    }
    layout.sections.push(section)
  }

  // Section 2: 2-seater benches (listed in a row)
  if (twoSeaterCount > 0) {
    const section = { type: '2-seater', label: '2-Seater Benches', rows: [], seatsPerBench: 2 }
    const row = []
    for (let i = 0; i < twoSeaterCount; i++) {
      const bench = []
      for (let s = 0; s < 2; s++) {
        bench.push({ seatIndex: layout.totalSeats, student: null })
        layout.totalSeats++
      }
      row.push(bench)
    }
    section.rows.push(row)
    layout.sections.push(section)
  }

  // Section 3: 3-seater benches (listed in a row)
  if (threeSeaterCount > 0) {
    const section = { type: '3-seater', label: '3-Seater Benches', rows: [], seatsPerBench: 3 }
    const row = []
    for (let i = 0; i < threeSeaterCount; i++) {
      const bench = []
      for (let s = 0; s < 3; s++) {
        bench.push({ seatIndex: layout.totalSeats, student: null })
        layout.totalSeats++
      }
      row.push(bench)
    }
    section.rows.push(row)
    layout.sections.push(section)
  }

  // Assign students to seats
  let studentIdx = 0
  for (const section of layout.sections) {
    if (section.type === '1-seater') {
      for (const row of section.rows) {
        for (const seat of row) {
          if (studentIdx < students.length) {
            seat.student = students[studentIdx++]
          }
        }
      }
    } else {
      for (const row of section.rows) {
        for (const bench of row) {
          for (const seat of bench) {
            if (studentIdx < students.length) {
              seat.student = students[studentIdx++]
            }
          }
        }
      }
    }
  }

  return layout
}

// ──────────────────────────────────────────────
// PDF GENERATOR (using html2pdf.js)
// ──────────────────────────────────────────────
function downloadPDF() {
  const element = document.getElementById('classroom-layout')
  if (!element) {
    alert('Please generate a layout first!')
    return
  }

  const opt = {
    margin: [10, 10],
    filename: `GPTC_Classroom_${document.querySelector('.classroom__layout-header h2')?.textContent || 'Seating'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  // Ensure content is fully rendered before capturing
  setTimeout(() => {
    const h2p = window.html2pdf || window.top.html2pdf || html2pdf
    if (h2p) {
      console.log('Generating PDF...')
      h2p().set(opt).from(element).save()
    } else {
      console.warn('html2pdf library not found, using window.print()')
      window.print()
    }
  }, 500)
}

export default function ClassroomLayoutPage() {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  // Form state
  const [roomName, setRoomName] = useState('101')
  const [oneSeaterRows, setOneSeaterRows] = useState(1)
  const [oneSeaterCols, setOneSeaterCols] = useState(2)
  const [twoSeaterCount, setTwoSeaterCount] = useState(2)
  const [threeSeaterCount, setThreeSeaterCount] = useState(2)
  const [rollInput, setRollInput] = useState('CE:1-10;ME:1-8;EL:1-6')
  const [layout, setLayout] = useState(null)
  const [capacityInfo, setCapacityInfo] = useState(null)

  // Calculate capacity
  const calculateCapacity = useCallback(() => {
    const oneSeats = oneSeaterRows * oneSeaterCols * 1
    const twoSeats = twoSeaterCount * 2
    const threeSeats = threeSeaterCount * 3
    const total = oneSeats + twoSeats + threeSeats
    setCapacityInfo({ total, oneSeats, twoSeats, threeSeats })
  }, [oneSeaterRows, oneSeaterCols, twoSeaterCount, threeSeaterCount])

  // Generate layout
  const handleGenerate = useCallback(() => {
    calculateCapacity()
    const students = parseRollNumbers(rollInput)
    const config = { roomName, oneSeaterRows, oneSeaterCols, twoSeaterCount, threeSeaterCount }
    const result = generateLayout(config, students)
    setLayout(result)
  }, [roomName, oneSeaterRows, oneSeaterCols, twoSeaterCount, threeSeaterCount, rollInput, calculateCapacity])

  // Reset
  const handleReset = () => {
    setRoomName('101')
    setOneSeaterRows(1)
    setOneSeaterCols(2)
    setTwoSeaterCount(2)
    setThreeSeaterCount(2)
    setRollInput('CE:1-10;ME:1-8;EL:1-6')
    setLayout(null)
    setCapacityInfo(null)
  }

  return (
    <div className="subpage">
      {/* Nav */}
      <nav className="principal-page__nav">
        <div className="container principal-page__nav-inner">
          <Link to="/" className="principal-page__back">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="principal-page__nav-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GPTC Kannur" className="navbar__logo-img" />
            <span>Govt. Polytechnic College, Kannur</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="principal-page__hero">
        <div className="principal-page__hero-bg"></div>
        <div className="principal-page__hero-overlay"></div>
        <div className="container principal-page__hero-content">
          <span className="principal-page__label">Utility Tool</span>
          <h1 className="principal-page__hero-title">Auto Classroom Layout</h1>
          <p className="principal-page__hero-subtitle">Generate seating arrangements for examination halls</p>
        </div>
      </section>

      {/* Form */}
      <section className="classroom__content">
        <div className="container">
          <div className="classroom__form-card">
            <h2 className="classroom__form-title">
              <LayoutGrid size={24} />
              Classroom Seating Arrangement
            </h2>

            {/* Room Name */}
            <div className="classroom__field">
              <label className="classroom__label">Room No / Name:</label>
              <input
                type="text"
                className="classroom__input classroom__input--sm"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. 101"
              />
            </div>

            {/* 1-seater benches */}
            <div className="classroom__field-group">
              <h3 className="classroom__field-heading">1-seater benches <span>(rows × columns)</span></h3>
              <div className="classroom__inline-fields">
                <div className="classroom__field">
                  <label className="classroom__label">Rows:</label>
                  <input
                    type="number" min="0" max="50"
                    className="classroom__input classroom__input--xs"
                    value={oneSeaterRows}
                    onChange={(e) => setOneSeaterRows(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
                <div className="classroom__field">
                  <label className="classroom__label">Columns:</label>
                  <input
                    type="number" min="0" max="50"
                    className="classroom__input classroom__input--xs"
                    value={oneSeaterCols}
                    onChange={(e) => setOneSeaterCols(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>
            </div>

            {/* 2-seater benches */}
            <div className="classroom__field-group">
              <h3 className="classroom__field-heading">2-seater benches</h3>
              <div className="classroom__field">
                <label className="classroom__label">Count:</label>
                <input
                  type="number" min="0" max="100"
                  className="classroom__input classroom__input--xs"
                  value={twoSeaterCount}
                  onChange={(e) => setTwoSeaterCount(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
            </div>

            {/* 3-seater benches */}
            <div className="classroom__field-group">
              <h3 className="classroom__field-heading">3-seater benches</h3>
              <div className="classroom__field">
                <label className="classroom__label">Count:</label>
                <input
                  type="number" min="0" max="100"
                  className="classroom__input classroom__input--xs"
                  value={threeSeaterCount}
                  onChange={(e) => setThreeSeaterCount(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
            </div>

            {/* Calculate Capacity */}
            <div className="classroom__actions">
              <button className="btn btn--primary btn--sm" onClick={calculateCapacity}>
                <Calculator size={16} />
                Calculate Capacity
              </button>
              {capacityInfo && (
                <div className="classroom__capacity-badge">
                  Total Seats: <strong>{capacityInfo.total}</strong>
                  <span className="classroom__capacity-detail">
                    [1s:{capacityInfo.oneSeats}, 2s:{capacityInfo.twoSeats}, 3s:{capacityInfo.threeSeats}]
                  </span>
                </div>
              )}
            </div>

            {/* Roll Numbers */}
            <div className="classroom__field-group classroom__field-group--wide">
              <h3 className="classroom__field-heading">Roll numbers per branch <span>(comma-separated, ranges allowed):</span></h3>
              <textarea
                className="classroom__textarea"
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value)}
                placeholder="CE:1-10;ME:1-8;EL:1-6"
                rows={4}
              />
              <p className="classroom__hint">
                Format: <code>BRANCH:start-end</code> separated by semicolons. Example: <code>CE:1-10;ME:1-8;EL:1-6</code>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="classroom__actions classroom__actions--main">
              <button className="btn btn--primary" onClick={handleGenerate}>
                <LayoutGrid size={18} />
                Generate Layout
              </button>
              <button className="btn btn--outline" onClick={downloadPDF} disabled={!layout}>
                <Download size={18} />
                Download PDF
              </button>
              <button className="btn btn--outline" onClick={handleReset}>
                <RotateCcw size={18} />
                Reset
              </button>
            </div>
          </div>

          {/* Generated Layout */}
          {layout && (
            <div className="classroom__layout" id="classroom-layout">
              <div className="classroom__layout-header">
                <h2>Room: {layout.roomName}</h2>
                <span className="classroom__layout-total">
                  Total Seats: {layout.totalSeats} | Students Assigned: {parseRollNumbers(rollInput).length}
                </span>
              </div>

              {/* Blackboard */}
              <div className="classroom__blackboard">
                <span>BLACKBOARD</span>
              </div>

              {/* Sections */}
              {layout.sections.map((section, sIdx) => (
                <div className="classroom__section" key={sIdx}>
                  <h3 className="classroom__section-title">{section.label}</h3>

                  {section.type === '1-seater' ? (
                    <div className="classroom__grid classroom__grid--single">
                      {section.rows.map((row, rIdx) => (
                        <div className="classroom__bench-row" key={rIdx}>
                          {row.map((seat, cIdx) => (
                            <div
                              className={`classroom__seat classroom__seat--single ${seat.student ? 'classroom__seat--occupied' : ''}`}
                              key={cIdx}
                            >
                              <span className="classroom__seat-num">{seat.seatIndex + 1}</span>
                              {seat.student && <span className="classroom__seat-student">{seat.student}</span>}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`classroom__grid classroom__grid--multi`}>
                      {section.rows.map((row, rIdx) => (
                        <div className="classroom__bench-row" key={rIdx}>
                          {row.map((bench, bIdx) => (
                            <div
                              className={`classroom__bench classroom__bench--${section.seatsPerBench}`}
                              key={bIdx}
                            >
                              {bench.map((seat, seatIdx) => (
                                <div
                                  className={`classroom__seat ${seat.student ? 'classroom__seat--occupied' : ''}`}
                                  key={seatIdx}
                                >
                                  <span className="classroom__seat-num">{seat.seatIndex + 1}</span>
                                  {seat.student && <span className="classroom__seat-student">{seat.student}</span>}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Summary Table */}
              <div className="classroom__summary">
                <h3>Seating Summary</h3>
                <table className="classroom__summary-table">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>Roll Numbers</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const students = parseRollNumbers(rollInput)
                      const branchMap = {}
                      students.forEach(s => {
                        const parts = s.split('-')
                        const branch = parts[0]
                        if (!branchMap[branch]) branchMap[branch] = []
                        branchMap[branch].push(s)
                      })
                      return Object.entries(branchMap).map(([branch, rolls]) => (
                        <tr key={branch}>
                          <td><strong>{branch}</strong></td>
                          <td>{rolls.join(', ')}</td>
                          <td>{rolls.length}</td>
                        </tr>
                      ))
                    })()}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}><strong>Total Students</strong></td>
                      <td><strong>{parseRollNumbers(rollInput).length}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
