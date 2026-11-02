import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

function Item({ q, a, open, onToggle, index }) {
  const uid = useId()
  const btnId = `${uid}-btn`
  const panelId = `${uid}-panel`

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-5 py-6 text-left"
        >
          <span className="w-7 shrink-0 text-xs font-semibold text-muted tabular-nums">0{index + 1}</span>
          <span className="flex-1 text-lg font-semibold tracking-tight transition-colors group-hover:text-brand sm:text-xl">
            {q}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ${
              open ? 'rotate-45 border-brand bg-brand text-white' : 'border-ink/15 text-ink'
            }`}
          >
            <Plus aria-hidden="true" className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pr-14 pb-7 pl-12 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            index="08"
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="serif-accent text-brand">answered.</span>
              </>
            }
            intro="Straight answers about practising for IELTS here."
          />
        </div>
        <Reveal className="border-t border-line lg:col-span-8">
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              {...f}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
