import { motion } from 'framer-motion'
import { socials } from '../../data/site'
import { useComingSoon } from './ComingSoon'

export function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.9 4.3 18.6 19.8c-.25 1.1-.9 1.37-1.82.85l-5.03-3.71-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.83 13.3l-4.96-1.55c-1.08-.34-1.1-1.08.22-1.6L20.5 2.66c.9-.33 1.69.21 1.4 1.64Z" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const socialItems = [
  { id: 'telegram', label: 'Telegram', Icon: TelegramIcon },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon },
]

/**
 * Opens a social link from site.js, or shows a "coming soon" notice when the
 * link is still empty. Works as a link or as a plain wrapper.
 */
export function useSocialAction() {
  const { notify } = useComingSoon()
  return (id) => {
    const url = socials[id]
    const label = socialItems.find((s) => s.id === id)?.label ?? id
    return url
      ? { href: url, target: '_blank', rel: 'noreferrer' }
      : { role: 'button', href: '#', onClick: (e) => { e.preventDefault(); notify(`Our ${label} link`) } }
  }
}

/** Round icon buttons for Telegram + Instagram. */
export default function Socials({ dark = false, size = 'md', className = '' }) {
  const action = useSocialAction()
  const dims = size === 'sm' ? 'size-9' : 'size-12'
  const icon = size === 'sm' ? 'size-4' : 'size-5'
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socialItems.map(({ id, label, Icon }, i) => (
        <motion.li
          key={id}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 + i * 0.08 }}
        >
          <motion.a
            {...action(id)}
            aria-label={label}
            title={label}
            whileHover={{ y: -3, rotate: i ? 8 : -8 }}
            whileTap={{ scale: 0.92 }}
            className={`grid ${dims} place-items-center rounded-full border transition-colors duration-200 ${
              dark
                ? 'border-white/15 text-white hover:border-brand hover:bg-brand'
                : 'border-ink/10 text-ink hover:border-brand hover:bg-brand hover:text-white'
            }`}
          >
            <Icon className={icon} />
          </motion.a>
        </motion.li>
      ))}
    </ul>
  )
}
