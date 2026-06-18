import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const scores = [
  { label: 'Performance', score: 98, color: '#34d399' },
  { label: 'Accessibility', score: 96, color: '#22d3ee' },
  { label: 'Best Practices', score: 100, color: '#a78bfa' },
  { label: 'SEO', score: 100, color: '#f472b6' },
]

function ScoreRing({ score, color, delay }) {
  const ref = useRef(null)
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (score / 100) * circumference

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset: offset, duration: 1.5, delay, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current.closest('.lighthouse-card'), start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [offset, delay])

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle ref={ref} cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circumference} strokeDashoffset={circumference} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white/80">{score}</span>
      </div>
    </div>
  )
}

export default function LighthouseBadge() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.lh-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.lighthouse-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.lighthouse-card'), start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lh-header">
          <span className="section-label">Performance</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">Lighthouse <span className="gradient-text">Score</span></h2>
          <p className="text-white/35 mt-3 text-sm font-mono">Audited with Google Lighthouse</p>
        </div>

        <div className="lighthouse-card glass rounded-2xl p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {scores.map((item, i) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <ScoreRing score={item.score} color={item.color} delay={i * 0.15} />
                <div className="text-center">
                  <p className="text-xs text-white/50 font-mono">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <span className="text-[10px] text-white/25 font-mono">All scores 95+ — Zero dependencies • Sub-100KB bundle</span>
          </div>
        </div>
      </div>
    </section>
  )
}
