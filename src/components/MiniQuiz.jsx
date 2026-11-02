import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, RotateCcw, X } from 'lucide-react'
import { quiz } from '../data/site'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function MiniQuiz() {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  const isCorrect = selected === quiz.correctId
  const chosen = quiz.options.find((o) => o.id === selected)

  return (
    <section id="try" aria-labelledby="quiz-title" className="py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="quiz-title"
            index="06"
            eyebrow="Try it now"
            title={
              <>
                One question. <span className="serif-accent text-brand">Thirty</span> seconds.
              </>
            }
            intro="Read the short passage and choose the best answer — the same skill you will use in IELTS Reading."
          />
          <Reveal delay={0.1} className="mt-8 border-l-2 border-brand pl-4 text-sm leading-relaxed text-muted">
            A small demo for this page only. It is not scored and nothing is saved.
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="paper overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <span className="text-xs font-bold tracking-[0.16em] text-brand uppercase">{quiz.label}</span>
              <span className="text-xs font-medium text-muted">Demo · 1 of 1</span>
            </div>

            <div className="px-6 py-7 sm:px-8 sm:py-9">
              <p className="font-serif text-[1.2rem] leading-relaxed text-ink/85 sm:text-[1.3rem]">{quiz.passage}</p>

              <fieldset className="mt-8">
                <legend className="text-lg font-bold tracking-tight">{quiz.question}</legend>
                <div className="mt-4 grid gap-2.5">
                  {quiz.options.map((o) => {
                    const isThis = selected === o.id
                    const isAnswer = o.id === quiz.correctId
                    let state = 'idle'
                    if (answered && isAnswer && (isThis || isCorrect === false)) state = 'correct'
                    if (answered && isThis && !isAnswer) state = 'wrong'

                    const styles = {
                      idle: 'border-line bg-white hover:border-ink/40 hover:bg-blush/50',
                      correct: 'border-ink bg-ink text-white',
                      wrong: 'border-brand bg-blush text-brand-deep',
                    }
                    const dim = answered && state === 'idle' ? 'opacity-50' : ''

                    return (
                      <motion.button
                        key={o.id}
                        type="button"
                        disabled={answered}
                        aria-pressed={isThis}
                        onClick={() => setSelected(o.id)}
                        whileTap={answered ? undefined : { scale: 0.99 }}
                        className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-[background-color,border-color,color,opacity] duration-200 disabled:cursor-default ${styles[state]} ${dim}`}
                      >
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                            state === 'correct'
                              ? 'bg-brand text-white'
                              : state === 'wrong'
                                ? 'bg-brand text-white'
                                : 'bg-blush text-brand-deep'
                          }`}
                        >
                          {state === 'correct' ? (
                            <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                          ) : state === 'wrong' ? (
                            <X aria-hidden="true" className="size-4" strokeWidth={3} />
                          ) : (
                            o.id
                          )}
                        </span>
                        <span className="text-[0.98rem] leading-snug">{o.text}</span>
                        {state === 'correct' && <span className="sr-only">(correct answer)</span>}
                        {state === 'wrong' && <span className="sr-only">(your answer, incorrect)</span>}
                      </motion.button>
                    )
                  })}
                </div>
              </fieldset>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {answered && (
                    <motion.div
                      key={selected}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-6 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between ${
                        isCorrect ? 'bg-blush' : 'bg-ink/[0.04]'
                      }`}
                    >
                      <div>
                        <p className="font-bold">{isCorrect ? 'Well done — that’s right.' : `Not quite. The answer is ${quiz.correctId}.`}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{chosen.feedback}</p>
                        {!isCorrect && (
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {quiz.options.find((o) => o.id === quiz.correctId).feedback}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand sm:self-center"
                      >
                        <RotateCcw aria-hidden="true" className="size-4" />
                        Try again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
