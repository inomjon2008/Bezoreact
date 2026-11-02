import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin red reading-progress bar pinned to the top of the window. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-brand"
    />
  )
}
