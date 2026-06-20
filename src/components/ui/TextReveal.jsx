import { useEffect, useRef } from 'react'

export default function TextReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const spans = el.querySelectorAll('span[data-word]')
        spans.forEach((span, i) => {
          setTimeout(() => { span.style.opacity = '1'; span.style.transform = 'translateY(0)' }, (delay + i * 0.05) * 1000)
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer?.disconnect()
  }, [delay])

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span data-word className="inline-block"
            style={{ opacity: 0, transform: 'translateY(100%)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}
