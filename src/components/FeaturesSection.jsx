import { motion } from 'framer-motion'
import { Monitor, Smartphone, Tablet, Target, NotebookPen } from 'lucide-react'
import { REFERENCE_URL, VERIFIED_ON } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

function Badge({ verified }) {
  return verified ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-white uppercase">
      <span className="size-1.5 rounded-full bg-brand" />
      On Bezo.uz
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/40 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-ink/70 uppercase">
      <span className="size-1.5 rounded-full border border-ink/50" />
      Proposed
    </span>
  )
}

/* IELTS test parts with their official approximate durations (minutes). */
const testParts = [
  { name: 'Listening', mins: 30, label: '~30 min' },
  { name: 'Reading', mins: 60, label: '60 min' },
  { name: 'Writing', mins: 60, label: '60 min' },
  { name: 'Speaking', mins: 14, label: '11–14 min' },
]

function TestFormatDemo() {
  return (
    <div className="mt-8" aria-label="IELTS test structure">
      <div className="flex h-14 w-full gap-1 overflow-hidden rounded-xl">
        {testParts.map((p, i) => (
          <motion.div
            key={p.name}
            className={`flex items-end px-2 pb-2 sm:px-3 text-xs font-semibold ${
              i === 1 ? 'bg-brand text-white' : i === 3 ? 'bg-ink text-white' : 'bg-blush text-brand-deep'
            }`}
            style={{ flex: `${p.mins} 1 0%`, minWidth: '4rem', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="truncate">{p.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex gap-1 text-[0.7rem] text-muted">
        {testParts.map((p) => (
          <span key={p.name} className="truncate px-1.5 sm:px-3" style={{ flex: `${p.mins} 1 0%`, minWidth: '4rem' }}>
            {p.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function LessonFlowDemo({ dark = false }) {
  return (
    <ol className="mt-8 flex items-center gap-2 text-sm font-semibold">
      {['Video', 'Material', 'Practice'].map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`rounded-full px-3.5 py-1.5 ${
              i === 2 ? 'bg-brand text-white' : dark ? 'border border-white/20' : 'border border-ink/15 bg-white'
            }`}
          >
            {s}
          </span>
          {i < 2 && <span aria-hidden="true" className={`h-px w-4 sm:w-6 ${dark ? 'bg-white/30' : 'bg-ink/30'}`} />}
        </li>
      ))}
    </ol>
  )
}

function ProgressDemo() {
  const pts = [18, 26, 22, 38, 34, 50, 47, 62]
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * 200} ${70 - y}`).join(' ')
  return (
    <figure className="mt-6">
      <svg viewBox="-4 -4 208 78" className="h-24 w-full overflow-visible" role="img" aria-label="Sample progress chart">
        {[10, 35, 60].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="currentColor" className="text-ink/10" strokeDasharray="2 4" />
        ))}
        <motion.path
          d={d}
          fill="none"
          stroke="#E63946"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <circle cx="200" cy={70 - pts.at(-1)} r="5" fill="#E63946" stroke="#fff" strokeWidth="2.5" />
      </svg>
      <figcaption className="mt-1 text-[0.7rem] tracking-wide text-muted uppercase">Illustration · sample data</figcaption>
    </figure>
  )
}

const proposed = [
  {
    Icon: Target,
    title: 'Goal-based study plan',
    body: 'A weekly plan generated from your target band and test date.',
  },
  {
    Icon: NotebookPen,
    title: 'Mistake review log',
    body: 'Questions you got wrong, collected in one place to revisit later.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative bg-blush/60 py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="features-title"
              index="05"
              eyebrow="Features"
              title={
                <>
                  Practice that feels like <span className="serif-accent text-brand">the real</span> test.
                </>
              }
              intro="Built around the way IELTS is actually structured, so every session moves you closer to test day."
            />
            <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 text-sm text-muted">
              <div className="flex items-center gap-3">
                <Badge verified /> <span>Available on the current platform</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge verified={false} /> <span>Idea for a future phase</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 lg:col-span-8">
          {/* 1 — wide editorial block */}
          <Reveal as="article" className="rounded-3xl bg-white p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-serif text-5xl text-brand italic">01</span>
              <Badge verified />
            </div>
            <h3 className="mt-6 max-w-lg text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              IELTS-format practice, all four parts.
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Mock tests mirror the structure of the real exam, so timing and question types feel familiar on test day.
              The current platform lists 10+ mock tests.
            </p>
            <TestFormatDemo />
          </Reveal>

          {/* 2 + 3 — asymmetric pair */}
          <div className="grid gap-5 md:grid-cols-5">
            <Reveal as="article" className="rounded-3xl bg-ink p-7 text-white md:col-span-3 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-5xl text-brand italic">02</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-ink uppercase">
                  <span className="size-1.5 rounded-full bg-brand" />
                  On Bezo.uz
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">Consistent skill development.</h3>
              <p className="mt-3 leading-relaxed text-white/65">
                Lessons pair a video explanation with study material and practice, so each idea is learned, then used.
              </p>
              <LessonFlowDemo dark />
            </Reveal>

            <Reveal as="article" delay={0.1} className="rounded-3xl bg-white p-7 md:col-span-2 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-5xl text-brand italic">03</span>
                <Badge verified />
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-tight">Progress tracking.</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">Included in the free starting plan.</p>
              <ProgressDemo />
            </Reveal>
          </div>

          {/* 4 — horizontal strip */}
          <Reveal as="article" className="flex flex-col gap-6 rounded-3xl bg-white p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="max-w-md">
              <div className="flex items-center gap-4">
                <span className="font-serif text-5xl text-brand italic">04</span>
                <Badge verified />
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">Flexible access across devices.</h3>
              <p className="mt-2 leading-relaxed text-muted">Practise on your phone, tablet or computer — whenever you have time.</p>
            </div>
            <div className="flex items-end gap-3 text-ink" aria-label="Phone, tablet and desktop">
              <span className="grid h-16 w-11 place-items-center rounded-xl border border-ink/15">
                <Smartphone aria-hidden="true" className="size-5" />
              </span>
              <span className="grid h-20 w-16 place-items-center rounded-xl border border-ink/15">
                <Tablet aria-hidden="true" className="size-6" />
              </span>
              <span className="grid h-24 w-28 place-items-center rounded-xl bg-brand text-white">
                <Monitor aria-hidden="true" className="size-7" />
              </span>
            </div>
          </Reveal>

          {/* Proposed */}
          <Reveal as="aside" aria-label="Proposed features" className="rounded-3xl border-2 border-dashed border-ink/15 p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <Badge verified={false} />
              <p className="text-sm text-muted">Not available yet — ideas for later development phases.</p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {proposed.map(({ Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
                    <Icon aria-hidden="true" className="size-[18px] text-brand" />
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <p className="px-2 text-xs text-muted">
            “On Bezo.uz” features were checked against{' '}
            <a href={REFERENCE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand">
              bezo.uz
            </a>{' '}
            on {VERIFIED_ON}.
          </p>
        </div>
      </div>
    </section>
  )
}
