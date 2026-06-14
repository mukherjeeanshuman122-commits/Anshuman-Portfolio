import { useMemo } from 'react'

function GradientMesh() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute blob-1" style={{
        top: '-10%', left: '-5%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(139,32,32,0.12) 0%, transparent 65%)',
        filter: 'blur(80px)', animation: 'blobFloat1 20s ease-in-out infinite',
      }} />
      <div className="absolute blob-2" style={{
        bottom: '-15%', right: '-10%', width: '45vw', height: '45vw',
        background: 'radial-gradient(circle, rgba(74,16,16,0.1) 0%, transparent 65%)',
        filter: 'blur(90px)', animation: 'blobFloat2 25s ease-in-out infinite',
      }} />
      <div className="absolute blob-3" style={{
        top: '40%', left: '50%', width: '35vw', height: '35vw',
        background: 'radial-gradient(circle, rgba(179,48,48,0.06) 0%, transparent 60%)',
        filter: 'blur(100px)', animation: 'blobFloat3 30s ease-in-out infinite',
      }} />
    </div>
  )
}

function AnimatedGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        animation: 'gridPulse 8s ease-in-out infinite',
      }} />
    </div>
  )
}

function FloatingOrbs() {
  const orbs = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.15 + 0.03,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 10,
  })), [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((o) => (
        <div key={o.id} className="absolute rounded-full" style={{
          width: o.size, height: o.size,
          left: `${o.x}%`, top: `${o.y}%`,
          opacity: o.opacity,
          background: o.id % 3 === 0
            ? 'rgba(179,48,48,0.6)'
            : o.id % 3 === 1
            ? 'rgba(232,228,217,0.15)'
            : 'rgba(139,32,32,0.4)',
          animation: `orbFloat ${o.duration}s ease-in-out ${o.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

function Vignette() {
  return (
    <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
    }} />
  )
}

export default function BackgroundSystem() {
  return (
    <>
      <GradientMesh />
      <AnimatedGrid />
      <FloatingOrbs />
      <Vignette />
    </>
  )
}
