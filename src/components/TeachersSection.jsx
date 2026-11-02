import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { teachers, REFERENCE_URL } from '../data/site'
import Reveal from './ui/Reveal'
import { TelegramIcon, useSocialAction } from './ui/Socials'

const ease = [0.22, 1, 0.36, 1]

function TeacherCard({ t, index }) {
  const reduce = useReducedMotion()
  const action = useSocialAction()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['10%', '90%'])

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 70, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease }}
      className="[perspective:1200px]"
    >
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c0c0c] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
      >
        {/* photo — revealed with a wipe as it scrolls into view */}
        <div className="relative aspect-[384/280] overflow-hidden [container-type:inline-size]">
          <motion.img
            src={t.photo}
            alt={`${t.name}, IELTS support teacher`}
            loading="lazy"
            initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.15 + index * 0.12, ease }}
            className="absolute inset-0 size-full object-cover object-top grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_35%,rgba(12,12,12,0.55)_65%,#0c0c0c_100%)]" />
          <motion.span
            aria-hidden="true"
            style={{ left: glareX }}
            className="pointer-events-none absolute -top-1/2 h-[200%] w-20 -translate-x-1/2 rotate-12 bg-white/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* sits exactly over the photo's corner */}
          <span className="absolute top-[3.6cqw] left-[3.6cqw] flex h-[10.2cqw] min-w-[23cqw] items-center justify-center gap-[1.6cqw] rounded-full bg-black/70 px-[2.6cqw] text-[3.4cqw] font-semibold text-white backdrop-blur">
            <span className="relative flex size-[2.2cqw]">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative size-full rounded-full bg-emerald-400" />
            </span>
            Online
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[0.72rem] font-extrabold tracking-[0.12em] text-brand uppercase">{t.focus}</p>
            <h3 className="mt-1.5 text-[1.9rem] leading-none font-extrabold tracking-tight text-white">{t.name}</h3>
            <p className="mt-2 text-sm text-white/60">IELTS Support Teacher</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 pt-5">
          <dl className="flex items-end justify-between gap-4">
            <div>
              <dt className="text-xs text-white/45">Experience</dt>
              <dd className="mt-1 text-lg font-bold text-white">{t.experience}</dd>
            </div>
            <div className="text-right">
              <dt className="text-xs text-white/45">IELTS score</dt>
              <dd className="mt-1 text-lg font-bold text-white">
                Band <span className="text-brand">{t.band}</span>
              </dd>
            </div>
          </dl>

          <motion.a
            {...action('telegram')}
            whileTap={{ scale: 0.97 }}
            className="group/btn mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white text-[0.95rem] font-bold text-ink transition-colors hover:bg-brand hover:text-white"
          >
            Contact teacher
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.a>
        </div>
      </motion.article>
    </motion.li>
  )
}

export default function TeachersSection() {
  const action = useSocialAction()
  return (
    <section id="teachers" aria-labelledby="teachers-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      {/* soft red sun glow behind the cards */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute top-24 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="container-page relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="flex max-w-2xl flex-col gap-5">
            <span className="eyebrow text-white/50">
              <span className="text-brand">03</span>
              <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
              Teachers
            </span>
            <h2 id="teachers-title" className="display text-[2.4rem] text-balance sm:text-5xl lg:text-[3.6rem]">
              Support teachers who <span className="serif-accent text-brand">follow</span> your progress.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-white/60 lg:pb-3">
              Each teacher focuses on specific skills, so your questions go to the right person.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {teachers.map((t, i) => (
            <TeacherCard key={t.id} t={t} index={i} />
          ))}
        </ul>

        {/* question bar */}
        <Reveal
          delay={0.1}
          className="mt-8 flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
              <MessageCircle aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-lg font-bold">Have a question?</p>
              <p className="mt-1 text-sm text-white/55">
                Message a support teacher about lessons or IELTS strategies.
              </p>
            </div>
          </div>
          <motion.a
            {...action('telegram')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-bold text-white shadow-[0_14px_30px_-12px_rgba(230,57,70,0.8)] transition-colors hover:bg-brand-deep"
          >
            <TelegramIcon className="size-[18px]" />
            Message support
          </motion.a>
        </Reveal>

        <p className="mt-6 text-xs text-white/35">
          Teacher details as listed on{' '}
          <a href={REFERENCE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">
            bezo.uz
          </a>
          .
        </p>
      </div>
    </section>
  )
}
