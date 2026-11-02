import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

const ComingSoonContext = createContext({ notify: () => {} })

/**
 * Lightweight notice used by buttons whose destination (sign-up, login,
 * lessons…) belongs to a future development phase.
 */
export function ComingSoonProvider({ children }) {
  const [message, setMessage] = useState(null)
  const timer = useRef()

  const notify = useCallback((feature = 'This feature') => {
    setMessage(`${feature} is coming in the next release. For now, explore the page or try the demo question.`)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 5000)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <ComingSoonContext.Provider value={{ notify }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              role="status"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl bg-ink px-4 py-3.5 text-sm text-white shadow-2xl"
            >
              <Sparkles aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
              <p className="leading-snug">{message}</p>
              <button
                type="button"
                onClick={() => setMessage(null)}
                className="-mr-1 rounded-full p-1 text-white/60 hover:text-white"
                aria-label="Dismiss notice"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ComingSoonContext.Provider>
  )
}

export const useComingSoon = () => useContext(ComingSoonContext)
