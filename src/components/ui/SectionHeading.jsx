import Reveal from './Reveal'

/** Consistent eyebrow + headline + intro used across sections. */
export default function SectionHeading({ index, eyebrow, title, intro, align = 'left', className = '', id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : ''
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-5 ${alignCls} ${className}`}>
      <span className="eyebrow">
        {index && <span className="text-brand">{index}</span>}
        <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
        {eyebrow}
      </span>
      <h2 id={id} className="display text-[2.4rem] text-balance sm:text-5xl lg:text-[3.6rem]">
        {title}
      </h2>
      {intro && <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
    </Reveal>
  )
}
