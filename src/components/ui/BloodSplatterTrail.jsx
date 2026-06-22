import { useEffect, useRef } from 'react'

export default function BloodSplatterTrail() {
  const containerRef = useRef(null)
  const pools = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e) => {
      const count = Math.floor(Math.random() * 3) + 2

      const pool = document.createElement('div')
      Object.assign(pool.style, {
        position: 'fixed',
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        background: 'rgba(139, 32, 32, 0.15)',
        pointerEvents: 'none',
        zIndex: '9998',
        transform: 'translate(-50%, -50%)',
      })
      container.appendChild(pool)
      pools.current.push(pool)

      pool.animate([
        { width: '2px', height: '2px', opacity: 0.3 },
        { width: `${count * 8}px`, height: `${count * 8}px`, opacity: 0.08 },
      ], { duration: 600, fill: 'forwards', easing: 'ease-out' })

      for (let i = 0; i < count; i++) {
        const dot = document.createElement('div')
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const dist = Math.random() * 30 + 8
        const x = Math.cos(angle) * dist
        const y = Math.sin(angle) * dist
        const size = Math.random() * 3 + 1

        Object.assign(dot.style, {
          position: 'fixed',
          left: `${e.clientX + x}px`,
          top: `${e.clientY + y}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: `rgba(139, 32, 32, ${Math.random() * 0.3 + 0.1})`,
          pointerEvents: 'none',
          zIndex: '9998',
          transform: 'translate(-50%, -50%)',
        })
        container.appendChild(dot)
        pools.current.push(dot)

        dot.animate([
          { opacity: 0.3, transform: 'translate(-50%, -50%) scale(0)' },
          { opacity: 0.1, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        ], { duration: 800, fill: 'forwards', easing: 'ease-out' })

        setTimeout(() => { dot.remove() }, 900)
      }

      setTimeout(() => { pool.remove() }, 700)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      pools.current.forEach(p => p.remove())
      pools.current = []
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
}
