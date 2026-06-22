import { useState, useEffect, useRef, useCallback } from 'react'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'

export default function CustomCursor() {
  const { showCursor } = useDevicePerformance()
  const outerRef = useRef(null)
  const glowRef = useRef(null)
  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [isMobile, setIsMobile] = useState(true)
  const isPressedRef = useRef(false)
  const isHoveringRef = useRef(false)
  const labelStateRef = useRef('')
  const pos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const glowPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const createBurst = useCallback((x, y) => {
    const container = trailRef.current
    if (!container) return
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div')
      const angle = (i / 8) * Math.PI * 2
      const distance = 20 + Math.random() * 30
      const size = 2 + Math.random() * 3
      particle.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%; pointer-events: none; z-index: 99999;
        background: ${i % 2 === 0 ? '#6366f1' : '#8b5cf6'};
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      `
      container.appendChild(particle)
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`
        particle.style.opacity = '0'
      })
      setTimeout(() => particle.remove(), 700)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return
    let raf

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const ease = 0.15
      const glowEase = 0.08

      outerPos.current.x += (pos.current.x - outerPos.current.x) * ease
      outerPos.current.y += (pos.current.y - outerPos.current.y) * ease

      glowPos.current.x += (pos.current.x - glowPos.current.x) * glowEase
      glowPos.current.y += (pos.current.y - glowPos.current.y) * glowEase

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }

      if (outerRef.current) {
        const scale = isPressedRef.current ? 0.8 : isHoveringRef.current ? 1.5 : 1
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%) scale(${scale})`
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%)`
      }

      if (labelRef.current && labelStateRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y + 32}px) translate(-50%, 0)`
      }

      raf = requestAnimationFrame(animate)
    }

    const handleMouseDown = (e) => {
      isPressedRef.current = true
      createBurst(e.clientX, e.clientY)
    }

    const handleMouseUp = () => { isPressedRef.current = false }

    const handleHoverStart = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor]')
      if (target) {
        const type = target.closest('input, textarea') ? 'Type'
          : target.closest('button, [data-cursor="pointer"]') ? 'Interact'
          : 'View'
        labelStateRef.current = type
        isHoveringRef.current = true
        setLabel(type)
      }
    }

    const handleHoverEnd = () => {
      labelStateRef.current = ''
      isHoveringRef.current = false
      setLabel('')
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseover', handleHoverStart, { passive: true })
    document.addEventListener('mouseout', handleHoverEnd, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      cancelAnimationFrame(raf)
    }
  }, [isMobile, createBurst])

  if (isMobile || !showCursor) return null

  return (
    <div style={{ cursor: 'none' }}>
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Outer glow halo */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          width: 80, height: 80,
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />

      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 44, height: 44,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 4, height: 4,
          background: '#6366f1',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(99,102,241,0.5)',
          willChange: 'transform',
        }}
      />

      {/* Burst particle container */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-[99999]" />

      {/* Label */}
      {label && (
        <div
          ref={labelRef}
          className="fixed pointer-events-none z-[99999]"
          style={{
            transform: `translate(${pos.current.x}px, ${pos.current.y + 32}px) translate(-50%, 0)`,
          }}
        >
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{
              color: 'rgba(129,140,248,0.8)',
              background: 'rgba(5,8,22,0.9)',
              border: '1px solid rgba(99,102,241,0.15)',
            }}>
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
