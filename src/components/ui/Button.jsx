import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap ' +
  'transition-[background-color,color,box-shadow,border-color] duration-200 ease-out ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50'

const variants = {
  primary:
    'bg-brand text-white shadow-[0_10px_24px_-10px_rgba(230,57,70,0.7)] hover:bg-brand-deep focus-visible:outline-brand',
  dark: 'bg-ink text-white hover:bg-black focus-visible:outline-ink',
  outline: 'border border-ink/15 bg-white text-ink hover:border-ink/40 focus-visible:outline-brand',
  light: 'bg-white text-brand-deep hover:bg-blush focus-visible:outline-white',
  ghost: 'text-ink hover:text-brand focus-visible:outline-brand',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
}

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * `arrow` adds an animated trailing arrow.
 */
export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  ...props
}) {
  const Comp = href ? motion.a : motion.button
  const typeProps = href ? { href } : { type: props.type ?? 'button' }

  return (
    <Comp
      {...typeProps}
      {...props}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
        />
      )}
    </Comp>
  )
}
