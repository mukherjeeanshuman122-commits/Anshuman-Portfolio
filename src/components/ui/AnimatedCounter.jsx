import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ target, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(element) }
    }, { threshold: 0.3 })
    observer.observe(element)
    return () => observer?.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !ref.current) return
    const el = ref.current
    let start = 0
    const increment = target / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { el.textContent = target + suffix; clearInterval(timer) }
      else { el.textContent = Math.floor(start) + suffix }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [visible, target, suffix, duration])

  return (
    <span ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
      0{suffix}
    </span>
  )
}
