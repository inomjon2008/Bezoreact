import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Lock, BookOpen } from 'lucide-react'
import { books, premiumPlan } from '../data/books'
import { brand, REFERENCE_URL } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import Reader from './ui/Reader'

const tabs = [
  { id: 'free', label: 'Free books' },
  { id: 'premium', label: 'Premium books' },
]

/** CSS-3D closed book. Styles in index.css under “3D closed books”. */
function Book3D({ book, rotate }) {
  const premium = book.access === 'premium'
  return (
    <div className="b3-wrap">
      <motion.div className="b3" style={{ rotateY: rotate }}>
        <div className="b3-hover">
          <div className="b3-front" style={{ background: book.color }}>
            <div className="flex items-center justify-between">
              <span className="text-[7cqw] font-bold tracking-[0.2em] text-white/70 uppercase">IELTS</span>
              {premium ? (
                <span className="grid size-[13cqw] place-items-center rounded-full bg-white/15">
                  <Lock aria-hidden="true" className="size-[7cqw] text-white" />
                </span>
              ) : (
                <span className="rounded-full bg-white px-[4cqw] py-[1.5cqw] text-[6cqw] font-bold text-brand-deep">FREE</span>
              )}
            </div>
            <div>
              <p className="font-sans text-[12.5cqw] leading-[0.95] font-extrabold tracking-tight text-white">{book.title}</p>
              <p className="mt-[4cqw] font-serif text-[8.5cqw] leading-tight text-white/75 italic">{book.subtitle}</p>
            </div>
            <span className="text-[6cqw] font-semibold text-white/60">{brand.name}</span>
          </div>
          <div className="b3-spine" style={{ background: book.color }} />
          <div className="b3-pages" />
          <div className="b3-top" />
          <div className="b3-back" style={{ background: book.color }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function BooksSection() {
  const [tab, setTab] = useState('free')
  const [openId, setOpenId] = useState(null)
  const shelfRef = useRef(null)

  // books turn toward the reader as the shelf scrolls into view
  const { scrollYProgress } = useScroll({ target: shelfRef, offset: ['start end', 'center center'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const rotate = useTransform(p, [0, 1], [-62, -22])

  const list = books.filter((b) => b.access === tab)
  const open = books.find((b) => b.id === openId)
  const freeList = books.filter((b) => b.access === 'free')
  const idx = open ? freeList.findIndex((b) => b.id === open.id) : -1
  const close = useCallback(() => setOpenId(null), [])

  const premiumBody = [
    { p: 'This book is part of the premium library and opens once paid access is available on this platform.' },
    { tip: `On ${new URL(REFERENCE_URL).host}, all books are included in the ${premiumPlan.name} plan (${premiumPlan.price} ${premiumPlan.currency} per ${premiumPlan.period}).` },
    { p: 'Until then, the free books on this page are open to everyone.' },
  ]

  return (
    <section id="books" aria-labelledby="books-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="books-title"
            index="04"
            eyebrow="Books"
            title={
              <>
                A library you can <span className="serif-accent text-brand">open</span> now.
              </>
            }
            intro="Free books are open to everyone. Premium books are part of paid access."
          />
          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Book type" className="inline-flex rounded-full border border-line bg-white p-1">
              {tabs.map((t) => {
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    aria-controls="book-shelf"
                    onClick={() => setTab(t.id)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      active ? 'text-white' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="book-tab"
                        className="absolute inset-0 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <div ref={shelfRef} id="book-shelf" role="tabpanel" className="mt-16">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-x-6 gap-y-14 sm:gap-x-10 lg:grid-cols-4"
            >
              {list.map((book, i) => (
                <motion.li
                  key={book.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(book.id)}
                    className="group block w-full text-left"
                    aria-label={`${book.access === 'free' ? 'Read' : 'View'} ${book.title}`}
                  >
                    <Book3D book={book} rotate={rotate} />
                    <div className="mt-6">
                      <p className="text-lg leading-tight font-bold tracking-tight">{book.title}</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-brand">
                        {book.access === 'free' ? (
                          <>
                            <BookOpen aria-hidden="true" className="size-4" /> Read free
                          </>
                        ) : (
                          <>
                            <Lock aria-hidden="true" className="size-4" /> {premiumPlan.name} plan
                          </>
                        )}
                      </p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {tab === 'premium' && (
            <p className="mt-12 max-w-2xl text-sm text-muted">
              On bezo.uz, all books are included in the {premiumPlan.name} plan ({premiumPlan.price} {premiumPlan.currency} /{' '}
              {premiumPlan.period}). Premium titles shown here are examples; the final list will be published with paid access.
            </p>
          )}
        </div>
      </div>

      <Reader
        item={
          open && {
            kicker: open.access === 'free' ? 'Free book' : `Premium book · ${premiumPlan.name}`,
            meta: open.subtitle,
            title: open.title,
            body: open.access === 'free' ? open.body : premiumBody,
          }
        }
        onClose={close}
        onPrev={idx > 0 ? () => setOpenId(freeList[idx - 1].id) : undefined}
        onNext={idx >= 0 && idx < freeList.length - 1 ? () => setOpenId(freeList[idx + 1].id) : undefined}
      />
    </section>
  )
}
