import { useMemo } from 'react'
import { useDevicePerformance, getReducedMotion } from '../../hooks/useDevicePerformance'

function GradientMesh({ blobCount, blurAmount }) {
  const reduced = getReducedMotion()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary blue blob - top left */}
      <div className="absolute" style={{
        top: '-15%', left: '-10%', width: '55vw', height: '55vw',
        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.08) 40%, transparent 65%)',
        filter: `blur(${blurAmount}px)`,
        animation: reduced ? 'none' : 'blobFloat1 25s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* Primary purple blob - bottom right */}
      {blobCount >= 2 && (
        <div className="absolute" style={{
          bottom: '-20%', right: '-15%', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 40%, transparent 65%)',
          filter: `blur(${blurAmount * 1.1}px)`,
          animation: reduced ? 'none' : 'blobFloat2 30s ease-in-out infinite',
          willChange: 'transform',
        }} />
      )}

      {blobCount >= 3 && (
        <>
          <div className="absolute" style={{
            top: '30%', left: '40%', width: '40vw', height: '40vw',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(79,70,229,0.04) 40%, transparent 60%)',
            filter: `blur(${blurAmount * 1.2}px)`,
            animation: reduced ? 'none' : 'blobFloat3 35s ease-in-out infinite',
            willChange: 'transform',
          }} />
          <div className="absolute" style={{
            top: '60%', left: '10%', width: '30vw', height: '30vw',
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 55%)',
            filter: `blur(${blurAmount * 0.9}px)`,
            animation: reduced ? 'none' : 'blobFloat1 40s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />
        </>
      )}

      {blobCount >= 5 && (
        <>
          <div className="absolute" style={{
            top: '10%', right: '20%', width: '25vw', height: '25vw',
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 55%)',
            filter: `blur(${blurAmount * 0.8}px)`,
            animation: reduced ? 'none' : 'blobFloat2 32s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />
          <div className="absolute" style={{
            bottom: '20%', left: '30%', width: '35vw', height: '35vw',
            background: 'radial-gradient(circle, rgba(30,58,138,0.1) 0%, transparent 50%)',
            filter: `blur(${blurAmount}px)`,
            animation: reduced ? 'none' : 'blobFloat3 38s ease-in-out infinite',
            willChange: 'transform',
          }} />
        </>
      )}
    </div>
  )
}

function AnimatedGrid() {
  const reduced = getReducedMotion()
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent 70%)',
        animation: reduced ? 'none' : 'gridPulse 10s ease-in-out infinite',
      }} />
    </div>
  )
}

function FloatingOrbs({ count }) {
  const reduced = getReducedMotion()

  const orbs = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.15 + 0.03,
    duration: Math.random() * 18 + 20,
    delay: Math.random() * 12,
    type: i % 4,
  })), [count])

  if (count === 0) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((o) => (
        <div key={o.id} className="absolute rounded-full" style={{
          width: o.size, height: o.size,
          left: `${o.x}%`, top: `${o.y}%`,
          opacity: o.opacity,
          background: o.type === 0
            ? 'rgba(59,130,246,0.6)'
            : o.type === 1
            ? 'rgba(139,92,246,0.5)'
            : o.type === 2
            ? 'rgba(99,102,241,0.4)'
            : 'rgba(168,85,247,0.35)',
          animation: reduced ? 'none' : `orbFloat ${o.duration}s ease-in-out ${o.delay}s infinite`,
          willChange: 'transform',
        }} />
      ))}
    </div>
  )
}

function ParticleField({ count }) {
  const reduced = getReducedMotion()

  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.2 + 0.05,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  })), [count])

  if (count === 0) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full" style={{
          width: p.size, height: p.size,
          left: `${p.x}%`, top: `${p.y}%`,
          opacity: p.opacity,
          background: 'rgba(96,165,250,0.6)',
          animation: reduced ? 'none' : `orbFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          willChange: 'transform',
        }} />
      ))}
    </div>
  )
}

function Vignette() {
  return (
    <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,8,22,0.5) 100%)',
    }} />
  )
}

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] mix-blend-overlay" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }} />
  )
}

function Scanlines() {
  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none opacity-[0.06]" style={{
      background: 'linear-gradient(rgba(5,8,22,0) 50%, rgba(0,0,0,0.15) 50%), linear-gradient(90deg, rgba(99,102,241,0.04), rgba(139,92,246,0.02), rgba(59,130,246,0.04))',
      backgroundSize: '100% 4px, 3px 100%',
    }} />
  )
}

function AuroraOverlay() {
  const reduced = getReducedMotion()
  return (
    <div className="fixed inset-0 z-[9996] pointer-events-none opacity-30" style={{
      background: 'linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(139,92,246,0.02) 25%, transparent 50%, rgba(99,102,241,0.03) 75%, rgba(139,92,246,0.02) 100%)',
      backgroundSize: '400% 400%',
      animation: reduced ? 'none' : 'aurora 20s ease infinite',
    }} />
  )
}

export default function BackgroundSystem() {
  const { orbCount, particleCount, blobCount, blurAmount, showGrid, showScanlines, showNoise } = useDevicePerformance()

  return (
    <>
      <GradientMesh blobCount={blobCount} blurAmount={blurAmount} />
      {showGrid && <AnimatedGrid />}
      <FloatingOrbs count={orbCount} />
      <ParticleField count={particleCount} />
      <AuroraOverlay />
      {showScanlines && <Scanlines />}
      {showNoise && <NoiseOverlay />}
      <Vignette />
    </>
  )
}
