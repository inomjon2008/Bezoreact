import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { brand, navLinks } from '../data/site'
import Button from './ui/Button'
import Socials from './ui/Socials'
import { useComingSoon } from './ui/ComingSoon'

const ease = [0.22, 1, 0.36, 1]

/** Brand mark: the red-sun logo with a slow glow and a playful hover. */
export function Logo({ light = false, size = 'md' }) {
  const img = size === 'lg' ? 'size-16' : 'size-11'
  return (
    <a href="#home" className="group inline-flex items-center gap-2.5" aria-label={`${brand.name} — home`}>
      <motion.span
        className={`relative grid ${img} shrink-0 place-items-center`}
        whileHover={{ rotate: -6, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[18%] animate-pulse rounded-full bg-brand/30 blur-md [animation-duration:3s]"
        />
        <img src="/logo.png" alt="" width="64" height="60" className="relative h-auto w-full drop-shadow-sm" />
      </motion.span>
      <span className={`flex flex-col leading-none ${light ? 'text-white' : 'text-ink'}`}>
        <span className={`font-extrabold tracking-tight ${size === 'lg' ? 'text-2xl' : 'text-[1.05rem]'}`}>{brand.name}</span>
        <span className={`mt-1 text-[0.62rem] font-semibold tracking-[0.2em] uppercase ${light ? 'text-white/45' : 'text-muted'}`}>
          IELTS preparation
        </span>
      </span>
    </a>
  )
}

/** Tracks which section is on screen to highlight its nav link. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const sectionIds = navLinks.map((l) => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { notify } = useComingSoon()
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const active = useActiveSection(sectionIds)

  // solid on scroll; hide when scrolling down, show again when scrolling up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector('a, button')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1280 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: hidden && !open ? -96 : 0 }}
      transition={{ duration: 0.45, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? 'bg-white/90 shadow-[0_1px_0_rgba(23,23,23,0.06),0_10px_30px_-20px_rgba(23,23,23,0.35)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-[76px] items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
          <Logo />
        </motion.div>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link, i) => {
            const isActive = active === link.href.slice(1)
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease }}
              >
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                    isActive ? 'text-brand-deep' : 'text-ink/65 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-blush"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </motion.li>
            )
          })}
        </ul>

        <motion.div
          className="hidden items-center gap-3 xl:flex"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <Socials size="sm" />
          <span aria-hidden="true" className="h-6 w-px bg-line" />
          <Button variant="ghost" size="sm" onClick={() => notify('Login')}>
            Login
          </Button>
          <Button size="sm" arrow onClick={() => notify('Sign-up')}>
            Start Practicing
          </Button>
        </motion.div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'x' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease }}
            className="h-[calc(100dvh-76px)] overflow-y-auto border-t border-line bg-white xl:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + 0.04 * i, ease }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line py-3.5 text-[1.7rem] font-bold tracking-tight"
                  >
                    {link.label}
                    <span className="text-xs font-semibold text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page flex flex-col gap-3 pb-10">
              <Button
                size="lg"
                arrow
                onClick={() => {
                  setOpen(false)
                  notify('Sign-up')
                }}
              >
                Start Practicing
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setOpen(false)
                  notify('Login')
                }}
              >
                Login
              </Button>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted">Follow us</span>
                <Socials />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
