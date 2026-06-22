import { useRef, useState, useCallback } from 'react'

export default function AnimatedGradientBorder({ children, className = '', as: Component = 'div', ...props }) {
  const ref = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
      {...props}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
        style={{
          padding: '1px',
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.4), rgba(139,92,246,0.2), rgba(59,130,246,0.15), transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.8,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Corner glow spots */}
      <div className="absolute -top-px -left-px w-16 h-16 pointer-events-none z-0 rounded-tl-[inherit]"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15), transparent 60%)',
          opacity: mousePos.x < 30 && mousePos.y < 30 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />
      <div className="absolute -top-px -right-px w-16 h-16 pointer-events-none z-0 rounded-tr-[inherit]"
        style={{
          background: 'radial-gradient(circle at 100% 0%, rgba(139,92,246,0.15), transparent 60%)',
          opacity: mousePos.x > 70 && mousePos.y < 30 ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}
