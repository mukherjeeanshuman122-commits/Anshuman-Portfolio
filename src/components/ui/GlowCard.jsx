import { useRef, useState, useCallback } from 'react'

export default function GlowCard({ children, className = '', as: Component = 'div', tilt = false, liquid = false, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [tiltStyle, setTiltStyle] = useState({})

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
    setOpacity(1)
    if (tilt) {
      const cx = rect.width / 2
      const cy = rect.height / 2
      setTiltStyle({
        transform: `perspective(800px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) scale(1.005)`,
      })
    }
  }, [tilt])

  const handleMouseLeave = useCallback(() => {
    setOpacity(0)
    if (tilt) setTiltStyle({})
  }, [tilt])

  const glassClass = liquid ? 'liquid-glass' : 'glass'

  return (
    <Component
      ref={ref}
      className={`relative overflow-hidden ${glassClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: tilt ? 'preserve-3d' : undefined,
      }}
      {...props}
    >
      {/* Primary glow - blue */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-10 mix-blend-screen"
        style={{
          opacity: opacity * 0.8,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.12), rgba(139,92,246,0.08), transparent 40%)`,
        }}
      />

      {/* Secondary glow - purple */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 z-0"
        style={{
          opacity: opacity * 0.5,
          background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.05), rgba(139,92,246,0.03), transparent 50%)`,
        }}
      />

      {/* Liquid glass inner glow */}
      {liquid && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 mix-blend-overlay"
          style={{
            opacity: opacity * 0.5,
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(96,165,250,0.1), rgba(192,132,252,0.06), transparent 60%)`,
          }}
        />
      )}

      {/* Premium border highlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 z-20"
        style={{
          opacity: opacity * 0.6,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.15), transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {children}
    </Component>
  )
}
