import { useRef, useEffect, useState } from 'react'

export default function TextReveal({ text, className = '', as: Tag = 'span', delay = 0, speed = 0.03 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const chars = text.split('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer?.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) rotateX(0)' : 'translateY(40%) rotateX(90deg)',
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * speed}s`,
            transformOrigin: 'bottom center',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  )
}
