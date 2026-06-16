import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => setHidden(true), 500)
        setTimeout(() => onComplete?.(), 1000)
      } else {
        setProgress(Math.floor(current))
      }
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[10001] bg-[#050505] flex items-center justify-center"
      style={{ transition: 'opacity 0.5s ease', opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}>
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <div className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="text-white">{'<'}</span>
            <span className="gradient-text">Anshuman</span>
            <span className="text-white">{' />'}</span>
          </div>
          <p className="text-white/25 text-xs font-mono tracking-[0.3em] uppercase">Forensic Analysis Suite v2.0</p>
        </div>

        <div className="w-64 mx-auto space-y-3">
          <div className="relative h-[2px] bg-white/5 overflow-hidden">
            <div className="absolute inset-y-0 left-0"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2D0A0A, #8B2020, #B33030)',
                boxShadow: '0 0 10px rgba(139,32,32,0.4)',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/30">
              {progress < 30 ? 'Initializing...' : progress < 60 ? 'Loading dossier...' : progress < 90 ? 'Calibrating...' : 'Access granted'}
            </span>
            <span className="text-blood/60">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
