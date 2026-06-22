import { useState, useEffect, useRef } from 'react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [phase, setPhase] = useState('loading')
  const canvasRef = useRef(null)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 18 + 6
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => setPhase('complete'), 300)
        setTimeout(() => setHidden(true), 800)
        setTimeout(() => onComplete?.(), 1000)
      } else {
        setProgress(Math.floor(current))
      }
    }, 45)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (phase !== 'complete') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 3 + 1,
        color: ['#6366f1', '#8b5cf6', '#3b82f6', '#818cf8'][Math.floor(Math.random() * 4)],
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
      })
    }

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particles) {
        if (p.life <= 0) continue
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life -= p.decay
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      if (alive) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{
        background: '#050816',
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        opacity: phase === 'complete' ? 0 : 1,
        pointerEvents: phase === 'complete' ? 'none' : 'auto',
      }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="text-center space-y-8 relative z-10">
        {/* Logo animation */}
        <div className="relative">
          <div className="text-5xl sm:text-7xl font-bold tracking-tight"
            style={{
              opacity: phase === 'complete' ? 0 : 1,
              transform: phase === 'complete' ? 'translateY(-20px) scale(0.95)' : 'translateY(0) scale(1)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}>
            <span className="text-white/90">{'<'}</span>
            <span className="gradient-text">Anshuman</span>
            <span className="text-white/90">{' />'}</span>
          </div>

          {/* Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)',
              filter: 'blur(30px)',
            }} />
        </div>

        {/* Progress section */}
        <div className="space-y-4">
          <div className="w-56 mx-auto relative">
            {/* Background track */}
            <div className="h-[2px] bg-white/5 overflow-hidden rounded-full">
              {/* Animated fill */}
              <div className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #a855f7)',
                  boxShadow: '0 0 15px rgba(99,102,241,0.5), 0 0 30px rgba(139,92,246,0.3)',
                  transition: 'width 0.15s ease-out',
                }} />
            </div>

            {/* Shimmer effect on bar */}
            <div className="absolute inset-0 h-[2px] overflow-hidden rounded-full">
              <div className="h-full w-20"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                  transform: `translateX(${progress * 2}px)`,
                }} />
            </div>
          </div>

          {/* Status text */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/30 tracking-wider">
              {progress < 20 ? 'Initializing...' :
               progress < 45 ? 'Loading assets...' :
               progress < 70 ? 'Building interface...' :
               progress < 90 ? 'Almost there...' :
               'Welcome'}
            </span>
            <span className="tabular-nums" style={{ color: 'rgba(129,140,248,0.7)' }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
