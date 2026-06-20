import { useMemo } from 'react'

function getIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

function getReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function GradientMesh() {
  const isMobile = getIsMobile()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute" style={{
        top: '-10%', left: '-5%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(78,38,226,0.1) 0%, transparent 65%)',
        filter: `blur(${isMobile ? 60 : 80}px)`,
        animation: getReducedMotion() ? 'none' : 'blobFloat1 25s ease-in-out infinite',
      }} />
      <div className="absolute" style={{
        bottom: '-15%', right: '-10%', width: '45vw', height: '45vw',
        background: 'radial-gradient(circle, rgba(42,26,216,0.08) 0%, transparent 65%)',
        filter: `blur(${isMobile ? 70 : 90}px)`,
        animation: getReducedMotion() ? 'none' : 'blobFloat2 30s ease-in-out infinite',
      }} />
      {!isMobile && (
        <div className="absolute" style={{
          top: '40%', left: '50%', width: '35vw', height: '35vw',
          background: 'radial-gradient(circle, rgba(114,49,236,0.04) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: getReducedMotion() ? 'none' : 'blobFloat3 35s ease-in-out infinite',
        }} />
      )}
    </div>
  )
}

function AnimatedGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        animation: getReducedMotion() ? 'none' : 'gridPulse 10s ease-in-out infinite',
      }} />
    </div>
  )
}

function FloatingOrbs() {
  const isMobile = getIsMobile()
  const count = isMobile ? 6 : 15

  const orbs = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.12 + 0.03,
    duration: Math.random() * 15 + 20,
    delay: Math.random() * 10,
  })), [count])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((o) => (
        <div key={o.id} className="absolute rounded-full" style={{
          width: o.size, height: o.size,
          left: `${o.x}%`, top: `${o.y}%`,
          opacity: o.opacity,
          background: o.id % 3 === 0
            ? 'rgba(114,49,236,0.5)'
            : o.id % 3 === 1
            ? 'rgba(232,228,217,0.12)'
            : 'rgba(78,38,226,0.35)',
          animation: getReducedMotion() ? 'none' : `orbFloat ${o.duration}s ease-in-out ${o.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

function Vignette() {
  return (
    <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
    }} />
  )
}

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.035] mix-blend-overlay" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }} />
  )
}

function Scanlines() {
  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none opacity-10" style={{
      background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
      backgroundSize: '100% 4px, 3px 100%',
    }} />
  )
}

export default function BackgroundSystem() {
  return (
    <>
      <GradientMesh />
      <AnimatedGrid />
      <FloatingOrbs />
      <Scanlines />
      <NoiseOverlay />
      <Vignette />
    </>
  )
}
