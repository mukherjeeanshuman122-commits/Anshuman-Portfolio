import { useState, useEffect } from 'react'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 20 + 8
      if (current >= 100) {
        current = 100
        setProgress(100)
        clearInterval(interval)
        setTimeout(() => setHidden(true), 200)
        setTimeout(() => onComplete?.(), 400)
      } else {
        setProgress(Math.floor(current))
      }
    }, 40)
    return () => clearInterval(interval)
  }, [onComplete])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[10001] bg-[#050505] flex items-center justify-center"
      style={{ transition: 'opacity 0.3s ease', opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}>
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-4xl sm:text-6xl font-bold tracking-tight">
            <span className="text-white">{'<'}</span>
            <span className="gradient-text">Anshuman</span>
            <span className="text-white">{' />'}</span>
          </div>
          <p className="text-white/25 text-[10px] font-mono tracking-[0.3em] uppercase">Forensic Analysis Suite v2.0</p>
        </div>

        <div className="w-48 mx-auto space-y-2">
          <div className="relative h-[2px] bg-white/5 overflow-hidden">
            <div className="absolute inset-y-0 left-0"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #1a0f6e, #4E26E2, #7231EC)',
                boxShadow: '0 0 10px rgba(78,38,226,0.4)',
                transition: 'width 0.1s ease',
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono">
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
