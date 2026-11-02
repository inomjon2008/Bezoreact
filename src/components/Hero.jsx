import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Button from './ui/Button'
import { StaggerWords } from './ui/Reveal'
import { useComingSoon } from './ui/ComingSoon'
import { skills } from '../data/site'
import OpenBook3D from './OpenBook3D'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const { notify } = useComingSoon()
  const reduce = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    const update = () => setFinePointer(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // scroll-linked motion: the book tilts and rises, the copy drifts up and fades
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const scroll = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const copyY = useTransform(scroll, [0, 1], [0, -90])
  const copyOpacity = useTransform(scroll, [0, 0.75], [1, 0])
  const sphereY = useTransform(scroll, [0, 1], [0, -180])
  const ringY = useTransform(scroll, [0, 1], [0, -40])

  const parallax = finePointer && !reduce
  const onPointerMove = (e) => {
    if (!parallax) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }
  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pt-[104px] pb-12 sm:pt-32 lg:pt-36 lg:pb-16"
    >
      {/* soft editorial grid in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(23,23,23,0.045)_1px,transparent_1px)] [background-size:calc(100%/6)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div className="lg:col-span-7" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            IELTS preparation &amp; practice
          </motion.span>

          <h1
            id="hero-title"
            className="display mt-6 text-[clamp(2.25rem,10vw,4.5rem)] lg:text-[3.9rem] xl:text-[4.6rem]"
          >
            <StaggerWords text="Your IELTS Goal." className="block" delay={0.1} />
            <span className="block">
              <StaggerWords text="One Step" delay={0.3} />{' '}
              <StaggerWords text="Closer." wordClassName="serif-accent text-brand pr-[0.06em]" delay={0.44} />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl text-pretty"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            Prepare smarter, practice consistently, and build the confidence you need for your IELTS journey.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease }}
          >
            <Button size="lg" arrow onClick={() => notify('Free sign-up')}>
              Start for Free
            </Button>
            <Button size="lg" variant="outline" href="#skills">
              Explore the Platform
            </Button>
          </motion.div>

          <motion.ul
            aria-label="Skills covered"
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-sm font-medium text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {skills.map((s, i) => (
              <li key={s.id} className="flex items-center gap-5">
                <a href={`#skill-${s.id}`} className="transition-colors hover:text-brand">
                  {s.name}
                </a>
                {i < skills.length - 1 && <span aria-hidden="true" className="size-1 rounded-full bg-brand/50" />}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            aria-hidden="true"
            style={{ y: sphereY }}
            className="absolute top-[2%] right-[6%] size-[16%] max-w-24"
          >
            <div className="gloss-red animate-float aspect-square w-full rounded-full shadow-[0_24px_40px_-16px_rgba(200,32,50,0.6)]" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ y: ringY }}
            className="absolute bottom-[14%] left-[2%] size-[11%] max-w-16"
          >
            <div className="animate-float-slow aspect-square w-full rounded-full border-[6px] border-brand/80 [animation-delay:-4s]" />
          </motion.div>
          <OpenBook3D px={px} py={py} scroll={scroll} />
        </div>
      </div>
    </section>
  )
}
