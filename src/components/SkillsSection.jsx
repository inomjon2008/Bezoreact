import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BookOpen, Headphones, Mic, PenLine } from 'lucide-react'
import { skills } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import { useComingSoon } from './ui/ComingSoon'

/* ── Unique visual for each skill. Animations run only on hover/focus. ── */

// Longhand properties so the `play-on-hover` class can control play state.
const anim = (name, duration, timing, delay = 0) => ({
  animationName: name,
  animationDuration: `${duration}s`,
  animationTimingFunction: timing,
  animationDelay: `${delay}s`,
  animationIterationCount: 'infinite',
})

function ListeningVisual() {
  const bars = [0.4, 0.75, 0.5, 1, 0.65, 0.85, 0.35, 0.9, 0.55, 0.7, 0.45, 0.8, 0.6, 0.95, 0.5, 0.7]
  return (
    <div className="flex h-20 items-center gap-[5px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="play-on-hover w-[5px] origin-center rounded-full bg-ink transition-colors group-hover:bg-brand"
          style={{
            height: `${h * 100}%`,
            ...anim('wave', 0.8 + (i % 4) * 0.18, 'ease-in-out', i * 0.05),
          }}
        />
      ))}
    </div>
  )
}

function ReadingVisual() {
  const lines = ['100%', '92%', '97%', '78%', '88%']
  return (
    <div className="relative flex h-20 w-full max-w-[220px] flex-col justify-center gap-2.5 overflow-hidden">
      {lines.map((w, i) => (
        <span key={i} className="h-[5px] rounded-full bg-ink/15" style={{ width: w }} />
      ))}
      <span
        className="play-on-hover absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(230,57,70,0.28),transparent)]"
        style={anim('sweep', 1.8, 'ease-in-out')}
      />
    </div>
  )
}

function WritingVisual() {
  return (
    <div className="flex h-20 flex-col justify-center gap-2 font-serif text-[1.35rem] leading-tight">
      <p className="text-ink/80">
        In conclusion, cities should<span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-blink bg-brand" />
      </p>
      <p className="font-sans text-xs font-semibold tracking-[0.14em] text-muted uppercase">Task 2 · min. 250 words</p>
    </div>
  )
}

function SpeakingVisual() {
  return (
    <div className="flex h-20 items-center gap-5">
      <span className="relative grid size-14 place-items-center">
        {[0, 0.6].map((d) => (
          <span
            key={d}
            className="play-on-hover absolute inset-0 rounded-full border-2 border-brand"
            style={{ ...anim('pulse-ring', 1.6, 'ease-out', d), opacity: 0 }}
          />
        ))}
        <span className="relative grid size-12 place-items-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand">
          <Mic aria-hidden="true" className="size-5" />
        </span>
      </span>
      <div className="flex gap-1.5">
        {['Part 1', 'Part 2', 'Part 3'].map((p) => (
          <span key={p} className="rounded-full border border-ink/15 px-2.5 py-1 text-xs font-semibold">
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

const meta = {
  listening: { Icon: Headphones, Visual: ListeningVisual },
  reading: { Icon: BookOpen, Visual: ReadingVisual },
  writing: { Icon: PenLine, Visual: WritingVisual },
  speaking: { Icon: Mic, Visual: SpeakingVisual },
}

export default function SkillsSection() {
  const { notify } = useComingSoon()
  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] })
  // alternate columns drift at different speeds while scrolling
  const driftA = useTransform(scrollYProgress, [0, 1], [40, -40])
  const driftB = useTransform(scrollYProgress, [0, 1], [-10, 10])

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="skills-title"
            index="01"
            eyebrow="IELTS Skills"
            title={
              <>
                Four skills. <span className="serif-accent text-brand">One</span> steady routine.
              </>
            }
          />
          <p className="max-w-sm text-muted lg:pb-3">
            Each skill has its own track, so you can spend more time where you need it most — without losing sight of the
            full test.
          </p>
        </div>

        <ul ref={gridRef} className="mt-16 grid border-t border-l border-line sm:grid-cols-2">
          {skills.map((skill, i) => {
            const { Icon, Visual } = meta[skill.id]
            return (
              <motion.li
                key={skill.id}
                id={`skill-${skill.id}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[340px] flex-col justify-between gap-10 border-r border-b border-line p-7 transition-colors duration-500 hover:bg-blush focus-within:bg-blush sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white transition-colors group-hover:border-brand/30">
                      <Icon aria-hidden="true" className="size-[18px] text-brand" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                      Skill 0{i + 1}
                    </span>
                  </div>
                  <span className="font-serif text-6xl leading-none text-ink/[0.08] italic transition-colors group-hover:text-brand/20">
                    0{i + 1}
                  </span>
                </div>

                <motion.div style={{ y: i % 2 ? driftB : driftA }}>
                  <Visual />
                </motion.div>

                <div>
                  <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{skill.name}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted">{skill.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2" aria-label={`${skill.name} topics`}>
                      {skill.tags.map((t) => (
                        <li key={t} className="rounded-full bg-ink/[0.04] px-3 py-1 text-xs font-medium text-ink/70">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => notify(`${skill.name} lessons`)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand"
                    >
                      View lessons
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </button>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
