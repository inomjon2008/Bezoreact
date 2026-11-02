import { motion, useTransform } from 'framer-motion'

/**
 * Pure-CSS 3D open book (no WebGL) inspired by a floating red hardcover:
 * - red cover with visible thickness
 * - two page blocks with striped page edges
 * - four pages that turn on a gentle loop
 * - soft ground shadow + red reflection
 * The whole book tilts with the pointer (px/py) and with page scroll (scroll 0..1).
 * Styles live in index.css under “3D open book”.
 */

const ease = [0.22, 1, 0.36, 1]

function PageText({ title, lines = 14 }) {
  return (
    <div className="book-text">
      {title && <p className="book-title">{title}</p>}
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} style={{ width: `${[96, 100, 92, 98, 88, 100, 94, 70][i % 8]}%` }} />
      ))}
    </div>
  )
}

export default function OpenBook3D({ px, py, scroll }) {
  // pointer + scroll → rotation of the whole book
  const rotX = useTransform([py, scroll], ([y, s]) => 56 - y * 6 + s * 18)
  const rotZ = useTransform([px, scroll], ([x, s]) => -24 + x * 7 - s * 22)
  const rotY = useTransform(px, (x) => x * 6)
  const lift = useTransform(scroll, (s) => s * -60)
  const shadowScale = useTransform(scroll, (s) => 1 - s * 0.35)

  return (
    <div className="book-scene" aria-hidden="true">
      {/* ground shadow + reflection glow */}
      <motion.div className="book-ground" style={{ scale: shadowScale }} />

      <motion.div
        className="book-float"
        style={{ y: lift }}
        initial={{ scale: 0.82, rotate: -6 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease }}
      >
        <div className="book-bob">
        <motion.div className="book" style={{ rotateX: rotX, rotateZ: rotZ, rotateY: rotY }}>
          {/* hardcover */}
          <div className="book-cover">
            <span className="book-cover-edge book-cover-edge--front" />
            <span className="book-cover-edge book-cover-edge--side" />
          </div>

          {/* left page block */}
          <div className="book-block book-block--left">
            <div className="book-face">
              <PageText title="Reading Passage 1" />
            </div>
            <span className="book-edge book-edge--front" />
            <span className="book-edge book-edge--side" />
          </div>

          {/* right page block */}
          <div className="book-block book-block--right">
            <div className="book-face">
              <PageText title="Questions 1–13" />
            </div>
            <span className="book-edge book-edge--front" />
            <span className="book-edge book-edge--side" />
          </div>

          {/* turning pages */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="book-page" style={{ '--i': i }}>
              <div className="book-page-face book-page-face--front">
                <PageText lines={12} />
              </div>
              <div className="book-page-face book-page-face--back">
                <PageText lines={12} />
              </div>
            </div>
          ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
