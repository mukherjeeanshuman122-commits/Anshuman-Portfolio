import { useMemo } from 'react'

function ForensicGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, black, transparent 70%)',
      }} />
    </div>
  )
}

function EvidenceGlow() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute" style={{
        top: '-30%', left: '10%', width: '50%', height: '50%',
        background: 'radial-gradient(ellipse at center, rgba(139,32,32,0.06), transparent 60%)',
        filter: 'blur(120px)',
      }} />
      <div className="absolute" style={{
        bottom: '-20%', right: '5%', width: '40%', height: '40%',
        background: 'radial-gradient(ellipse at center, rgba(139,32,32,0.04), transparent 60%)',
        filter: 'blur(100px)',
      }} />
    </div>
  )
}

function EvidenceParticles() {
  const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.08 + 0.02,
  })), [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full" style={{
          width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity,
          background: p.id % 4 === 0
            ? 'rgba(179,48,48,0.5)'
            : 'rgba(255,255,255,0.12)',
        }} />
      ))}
    </div>
  )
}

function CRTVignette() {
  return (
    <div className="fixed inset-0 z-[9995] pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)',
    }} />
  )
}

export default function BackgroundSystem() {
  return (
    <>
      <ForensicGrid />
      <EvidenceGlow />
      <EvidenceParticles />
      <CRTVignette />
      <div className="crt-overlay" />
    </>
  )
}
