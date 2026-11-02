import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './ui/Button'
import { useComingSoon } from './ui/ComingSoon'

const words = ['Listening', 'Reading', 'Writing', 'Speaking']

export default function CallToAction() {
  const { notify } = useComingSoon()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.86, 1])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140])
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative overflow-hidden bg-brand text-white">
      {/* slow rotating rings */}
      <motion.div aria-hidden="true" style={{ rotate: ringRotate }} className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full border-[56px] border-dashed border-white/[0.09]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -left-24 size-[420px] rounded-full bg-brand-deep" />

      <div className="container-page relative py-24 sm:py-32">
        <motion.h2
          id="cta-title"
          style={{ scale, transformOrigin: 'left bottom' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-4xl text-[2.9rem] text-balance sm:text-7xl lg:text-[5.6rem]"
        >
          Your next achievement starts <span className="serif-accent">today.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
        >
          <Button size="lg" variant="light" arrow onClick={() => notify('Sign-up')}>
            Start Practicing
          </Button>
          <p className="max-w-xs text-sm leading-relaxed text-white/80">
            Pick one skill and practise for fifteen minutes. Small sessions add up.
          </p>
        </motion.div>
      </div>

      {/* marquee band */}
      <motion.div aria-hidden="true" style={{ x: marqueeX }} className="relative border-t border-white/20 py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[...words, ...words].map((w, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-8 pr-8 text-2xl font-bold tracking-tight sm:text-3xl">
                  {i % 2 ? <span className="serif-accent font-normal">{w}</span> : w}
                  <span className="size-2 rounded-full bg-white/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
