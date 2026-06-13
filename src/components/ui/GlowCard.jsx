import { useRef, useState } from 'react'
export default function GlowCard({ children, className = '', as: Component = 'div', tilt = false, ...props }) {
  const ref = useRef(null); const [position, setPosition] = useState({ x: 0, y: 0 }); const [opacity, setOpacity] = useState(0); const [tiltStyle, setTiltStyle] = useState({})
  const handleMouseMove = (e) => { if (!ref.current) return; const rect = ref.current.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; setPosition({ x, y }); setOpacity(1)
    if (tilt) { const cx = rect.width / 2; const cy = rect.height / 2; setTiltStyle({ transform: `perspective(1000px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) scale(1.008)` }) }
  }
  const handleMouseLeave = () => { setOpacity(0); if (tilt) setTiltStyle({}) }
  return (
    <Component ref={ref} className={`relative overflow-hidden ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transition: tilt ? 'transform 0.15s ease-out' : undefined, transformStyle: tilt ? 'preserve-3d' : undefined }} {...props}>
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500" style={{ opacity, background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(139,32,32,0.1), transparent 25%)` }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700" style={{ opacity: opacity * 0.6, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(232,228,217,0.02), transparent 30%)` }} />
      <div className="forensic-scan" style={{ opacity: opacity * 0.4 }} />
      {children}
    </Component>
  )
}
