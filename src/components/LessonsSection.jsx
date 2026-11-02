import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, Check, Clock, Headphones, Mic, PenLine } from 'lucide-react'
import { lessons, readingMinutes } from '../data/lessons'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Reader from './ui/Reader'
import useStoredSet from '../lib/useStoredSet'

const skillMeta = {
  listening: { label: 'Listening', Icon: Headphones },
  reading: { label: 'Reading', Icon: BookOpen },
  writing: { label: 'Writing', Icon: PenLine },
  speaking: { label: 'Speaking', Icon: Mic },
}
const filters = ['all', 'listening', 'reading', 'writing', 'speaking']

export default function LessonsSection() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [done, toggleDone] = useStoredSet('ielts-completed-lessons')

  const list = useMemo(() => (filter === 'all' ? lessons : lessons.filter((l) => l.skill === filter)), [filter])
  const openIndex = list.findIndex((l) => l.id === openId)
  const open = openIndex >= 0 ? list[openIndex] : null
  const close = useCallback(() => setOpenId(null), [])
  const pct = Math.round((done.size / lessons.length) * 100)

  return (
    <section id="lessons" aria-labelledby="lessons-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="lessons-title"
            index="02"
            eyebrow="Lessons"
            title={
              <>
                Read a lesson. <span className="serif-accent text-brand">Use it</span> today.
              </>
            }
            intro="Short text lessons with strategies, examples and tips. Open any lesson and start reading — no sign-up needed."
          />

          {/* personal progress — stored only in this browser */}
          <Reveal delay={0.1} className="w-full max-w-xs">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold">Your progress</span>
              <span className="text-muted tabular-nums">
                {done.size} / {lessons.length} lessons
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-blush">
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">Saved on this device.</p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={0.05} className="mt-12">
          <div role="tablist" aria-label="Filter lessons by skill" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {filters.map((f) => {
              const active = filter === f
              const count = f === 'all' ? lessons.length : lessons.filter((l) => l.skill === f).length
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? 'text-white' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="lesson-filter"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f === 'all' ? 'All' : skillMeta[f].label}{' '}
                    <span className={active ? 'text-white/60' : 'text-muted'}>{count}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* lesson cards */}
        <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 [perspective:1400px]">
          <AnimatePresence mode="popLayout">
            {list.map((lesson, i) => {
              const { label, Icon } = skillMeta[lesson.skill]
              const isDone = done.has(lesson.id)
              return (
                <motion.li
                  layout
                  key={lesson.id}
                  initial={{ opacity: 0, y: 40, rotateX: -18 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="origin-top"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(lesson.id)}
                    className="group flex h-full w-full flex-col rounded-3xl border border-line bg-white p-6 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-28px_rgba(200,32,50,0.45)] sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
                        <Icon aria-hidden="true" className="size-4" />
                        {label}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-semibold text-white">
                          <Check aria-hidden="true" className="size-3" /> Read
                        </span>
                      ) : (
                        <span className="rounded-full bg-blush px-2.5 py-1 text-[0.7rem] font-semibold text-brand-deep">
                          {lesson.level}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 text-[1.45rem] leading-tight font-bold tracking-tight text-balance">{lesson.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">{lesson.summary}</p>
                    <div className="mt-7 flex items-center justify-between border-t border-line pt-5 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Clock aria-hidden="true" className="size-4" /> {readingMinutes(lesson)} min read
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold transition-colors group-hover:text-brand">
                        Read lesson
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Reader
        item={
          open && {
            kicker: `${skillMeta[open.skill].label} · Lesson ${openIndex + 1} of ${list.length}`,
            meta: `${open.level} · ${readingMinutes(open)} min read`,
            title: open.title,
            summary: open.summary,
            body: open.body,
          }
        }
        onClose={close}
        onPrev={openIndex > 0 ? () => setOpenId(list[openIndex - 1].id) : undefined}
        onNext={openIndex >= 0 && openIndex < list.length - 1 ? () => setOpenId(list[openIndex + 1].id) : undefined}
        done={open ? done.has(open.id) : false}
        onToggleDone={open ? () => toggleDone(open.id) : undefined}
      />
    </section>
  )
}
