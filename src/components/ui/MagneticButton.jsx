import { useRef } from 'react'

export default function MagneticButton({ children, className = '', onClick, as = 'button', href, style, ...props }) {
  const ref = useRef(null)
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`
  }
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px) scale(1)'
  }

  const sharedProps = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transition: 'transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94)', ...style },
    ...props,
  }

  if (as === 'a' && href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>{children}</a>
  }
  return <button onClick={onClick} {...sharedProps}>{children}</button>
}
