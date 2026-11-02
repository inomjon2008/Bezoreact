import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { steps } from '../data/site'
import SectionHeading from './ui/SectionHeading'

export default function HowItWorks() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  return (
    <section id="how" aria-labelledby="how-title" className="bg-ink py-24 text-white sm:py-32">
      <div className="container-page">
        <div className="[&_.eyebrow]:text-white/50 [&_p]:text-white/60">
          <SectionHeading
            id="how-title"
            index="07"
            eyebrow="How It Works"
            title={
              <>
                Three steps. <span className="serif-accent text-brand">Repeat</span> them often.
              </>
            }
          />
        </div>

        <ol ref={listRef} className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {/* Track + animated progress line (horizontal on desktop, vertical on mobile) */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[27px] w-px bg-white/15 md:top-[27px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-[27px] w-px origin-top bg-brand md:hidden"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute top-[27px] right-0 left-0 hidden h-px origin-left bg-brand md:block"
          />

          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6 md:flex-col md:gap-8"
            >
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-white/20 bg-ink text-sm font-bold">
                {step.n}
              </span>
              <div className="md:pr-8">
                <p className="eyebrow text-brand!">Step {step.n}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-[1.7rem]">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-white/60">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
