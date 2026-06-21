import { useRef, useState } from 'react'

export default function GlowCard({ children, className = '', as: Component = 'div', tilt = false, liquid = false, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [tiltStyle, setTiltStyle] = useState({})

  const handleMouseMove = (e) => {
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
  }

  const handleMouseLeave = () => {
    setOpacity(0)
    if (tilt) setTiltStyle({})
  }

  const glassClass = liquid ? 'liquid-glass' : 'glass'

  return (
    <Component
      ref={ref}
      className={`relative overflow-hidden ${glassClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transition: 'transform 0.2s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        transformStyle: tilt ? 'preserve-3d' : undefined,
      }}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-10 mix-blend-screen"
        style={{
          opacity: opacity * 0.8,
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.12), rgba(139,92,246,0.08), transparent 40%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 z-0"
        style={{
          opacity: opacity * 0.5,
          background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.05), rgba(139,92,246,0.03), transparent 50%)`,
        }}
      />
      {liquid && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 mix-blend-overlay"
          style={{
            opacity: opacity * 0.5,
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(96,165,250,0.1), rgba(192,132,252,0.06), transparent 60%)`,
          }}
        />
      )}
      {children}
    </Component>
  )
}
