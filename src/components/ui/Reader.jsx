import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Lightbulb, X } from 'lucide-react'

/** Renders the shared lesson/book block format. */
export function Blocks({ body }) {
  return (
    <div className="flex flex-col gap-5 text-[1.06rem] leading-[1.75] text-ink/85">
      {body.map((b, i) => {
        if (b.h) return <h3 key={i} className="mt-4 text-2xl font-bold tracking-tight text-ink">{b.h}</h3>
        if (b.p) return <p key={i}>{b.p}</p>
        if (b.list)
          return (
            <ul key={i} className="flex flex-col gap-2.5">
              {b.list.map((li) => (
                <li key={li} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          )
        if (b.tip)
          return (
            <aside key={i} className="flex gap-3 rounded-2xl bg-blush p-5 text-[0.98rem]">
              <Lightbulb aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
              <p>
                <strong className="font-semibold text-ink">Tip. </strong>
                {b.tip}
              </p>
            </aside>
          )
        if (b.example)
          return (
            <figure key={i} className="border-l-2 border-ink pl-5">
              <figcaption className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Example</figcaption>
              <p className="mt-2 font-serif text-[1.2rem] leading-snug text-ink italic">{b.example.q}</p>
              <p className="mt-2 text-[0.98rem]">{b.example.a}</p>
            </figure>
          )
        return null
      })}
    </div>
  )
}

/**
 * Full-screen reading view used by Lessons and Books.
 * item: { kicker, title, summary, meta, body }
 */
export default function Reader({ item, onClose, onPrev, onNext, done, onToggleDone, doneLabel = 'Mark as read' }) {
  const panelRef = useRef(null)
  const scrollRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!item) return
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = panelRef.current.querySelectorAll('button, a[href]')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.()
    }
  }, [item, onClose])

  useEffect(() => {
    setProgress(0)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [item?.title])

  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? el.scrollTop / max : 1)
  }

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reader-title"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl outline-none"
          >
            <div className="relative flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-10">
              <span className="truncate text-xs font-semibold tracking-[0.16em] text-brand uppercase">{item.kicker}</span>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/10 hover:bg-blush"
                aria-label="Close"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 origin-left bg-brand"
                style={{ width: '100%', transform: `scaleX(${progress})` }}
              />
            </div>

            <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-y-auto overscroll-contain">
              <article className="mx-auto max-w-[42rem] px-5 py-10 sm:px-10 sm:py-14">
                {item.meta && <p className="text-sm text-muted">{item.meta}</p>}
                <h2 id="reader-title" className="display mt-3 text-4xl text-balance sm:text-5xl">
                  {item.title}
                </h2>
                {item.summary && <p className="mt-5 text-lg leading-relaxed text-muted">{item.summary}</p>}
                <div className="mt-8 h-px bg-line" />
                <div className="mt-8">
                  <Blocks body={item.body} />
                </div>
              </article>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-10">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!onPrev}
                  className="grid size-11 place-items-center rounded-full border border-ink/10 hover:bg-blush disabled:opacity-30"
                  aria-label="Previous"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!onNext}
                  className="grid size-11 place-items-center rounded-full border border-ink/10 hover:bg-blush disabled:opacity-30"
                  aria-label="Next"
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              {onToggleDone && (
                <button
                  type="button"
                  onClick={onToggleDone}
                  aria-pressed={done}
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                    done ? 'bg-ink text-white' : 'bg-brand text-white hover:bg-brand-deep'
                  }`}
                >
                  <Check aria-hidden="true" className="size-4" />
                  {done ? 'Completed' : doneLabel}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
