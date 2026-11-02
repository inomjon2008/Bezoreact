import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { brand, navLinks, REFERENCE_URL } from '../data/site'
import { Logo } from './Navbar'
import Socials, { socialItems, useSocialAction } from './ui/Socials'
import { useComingSoon } from './ui/ComingSoon'

const ease = [0.22, 1, 0.36, 1]

const col = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease } }),
}

export default function Footer() {
  const { notify } = useComingSoon()
  const action = useSocialAction()
  const year = new Date().getFullYear()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordX = useTransform(scrollYProgress, [0, 1], ['-18%', '0%'])
  const sunY = useTransform(scrollYProgress, [0, 1], [160, 0])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-white">
      {/* rising red sun */}
      <motion.div
        aria-hidden="true"
        style={{ y: sunY }}
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,#ff3b47,#c82032_55%,transparent_72%)] opacity-40 blur-2xl"
      />

      <div className="container-page relative grid gap-12 py-16 sm:py-20 md:grid-cols-12">
        <motion.div className="md:col-span-5" variants={col} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Logo light size="lg" />
          <p className="mt-6 max-w-xs leading-relaxed text-white/55">
            Focused IELTS practice for Listening, Reading, Writing and Speaking.
          </p>
          <Socials dark className="mt-7" />
        </motion.div>

        <motion.nav
          aria-label="Footer"
          className="md:col-span-3"
          variants={col}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Explore</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group inline-flex items-center gap-0 text-white/75 transition-all hover:gap-2 hover:text-white">
                  <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-4" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div className="md:col-span-4" variants={col} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Contact</h2>
          <ul className="mt-5 space-y-3">
            {socialItems.map(({ id, label, Icon }) => (
              <li key={id}>
                <a {...action(id)} className="group inline-flex items-center gap-3 text-white/75 transition-colors hover:text-white">
                  <span className="grid size-9 place-items-center rounded-full bg-white/5 transition-colors group-hover:bg-brand">
                    <Icon className="size-4" />
                  </span>
                  {label}
                  <ArrowUpRight aria-hidden="true" className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={REFERENCE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 pt-2 text-sm text-white/45 transition-colors hover:text-white"
              >
                Reference: bezo.uz <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => notify('The privacy policy page')} className="hover:text-white">
              Privacy Policy
            </button>
            <button type="button" onClick={() => notify('The terms page')} className="hover:text-white">
              Terms
            </button>
            <motion.a
              href="#home"
              aria-label="Back to top"
              whileHover={{ y: -4 }}
              className="grid size-10 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-brand hover:text-white"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* oversized wordmark slides in as the footer scrolls up */}
      <div aria-hidden="true" className="relative overflow-hidden">
        <motion.p
          style={{ x: wordX }}
          className="display -mb-[0.2em] text-center text-[22vw] leading-none whitespace-nowrap text-white/[0.05] select-none lg:text-[16rem]"
        >
          IELTS
        </motion.p>
      </div>
    </footer>
  )
}
