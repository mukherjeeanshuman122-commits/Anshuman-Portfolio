import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const dotRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const pos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let raf

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }

    const handleHoverStart = (e) => {
      for (const [selector, lbl] of Object.entries({ a: 'View', button: 'Click', input: 'Type', textarea: 'Type' })) {
        if (e.target.closest(selector)) {
          setLabel(lbl)
          if (outerRef.current) outerRef.current.style.borderColor = 'rgba(139,32,32,0.35)'
          return
        }
      }
    }

    const handleHoverEnd = () => {
      setLabel('')
      if (outerRef.current) outerRef.current.style.borderColor = 'rgba(255,255,255,0.06)'
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <div className="hidden lg:block" style={{ cursor: 'none' }}>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 36, height: 36,
          border: '1px solid rgba(255,255,255,0.06)',
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />

      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 3, height: 3,
          background: 'rgba(232,228,217,0.3)',
          willChange: 'transform',
        }}
      />

      {label && (
        <div
          ref={labelRef}
          className="fixed pointer-events-none z-[99999]"
          style={{
            transform: `translate(${pos.current.x}px, ${pos.current.y + 28}px) translate(-50%, 0)`,
          }}
        >
          <span className="text-[8px] font-mono text-blood/60 tracking-[0.2em] uppercase bg-black/80 px-2 py-0.5"
            style={{ border: '1px solid rgba(139,32,32,0.1)' }}>
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
