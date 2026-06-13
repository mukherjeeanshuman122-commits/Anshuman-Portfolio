import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '../../data/portfolio'
import AnimatedCounter from '../ui/AnimatedCounter'
import GlowCard from '../ui/GlowCard'

gsap.registerPlugin(ScrollTrigger)

const achievementList = [
  { label: 'Projects Completed', target: achievements.projects, suffix: '+', icon: '🎯' },
  { label: 'Technologies Mastered', target: achievements.technologies, suffix: '+', icon: '⚡' },
  { label: 'Learning Hours', target: achievements.learningHours, suffix: '+', icon: '📚' },
  { label: 'GitHub Contributions', target: achievements.githubActivity, suffix: '+', icon: '💻' },
  { label: 'Client Projects', target: achievements.clientWork, suffix: '+', icon: '🤝' },
  { label: 'Certifications', target: achievements.certifications, suffix: '+', icon: '🏆' },
]

function CircularProgress({ value, max, size = 100, strokeWidth = 3 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (value / max) * circumference
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#B33030" strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Sparkline() {
  const points = Array.from({ length: 12 }, (_, i) => ({ x: (i / 11) * 100, y: 20 + Math.sin(i * 0.8) * 15 + Math.random() * 10 }))
  const pathD = points.reduce((acc, point, i) => { if (i === 0) return `M ${point.x} ${point.y}`; const prev = points[i - 1]; const cp1x = prev.x + (point.x - prev.x) / 3; const cp2x = point.x - (point.x - prev.x) / 3; return `${acc} C ${cp1x} ${prev.y} ${cp2x} ${point.y} ${point.x} ${point.y}` }, '')
  return (
    <svg className="w-full h-8 mt-2" viewBox="0 0 100 50" preserveAspectRatio="none">
      <defs><linearGradient id="spark-danger" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#B33030" stopOpacity="0.2" /><stop offset="100%" stopColor="#B33030" stopOpacity="0" /></linearGradient></defs>
      <path d={pathD} fill="none" stroke="#B33030" strokeWidth="1.5" />
      <path d={`${pathD} L 100 50 L 0 50 Z`} fill="url(#spark-danger)" />
    </svg>
  )
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Metrics</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Achievement <span className="gradient-text">Dashboard</span></h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Quantified impact across my development journey.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievementList.map((item, i) => (
            <div key={item.label} ref={el => cardsRef.current[i] = el}>
              <GlowCard tilt className="glass rounded-2xl p-6 text-center group card-hover">
                <div className="relative inline-flex items-center justify-center mb-4">
                  <CircularProgress value={item.target} max={item.target * 1.2} size={80} strokeWidth={3} />
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl">{item.icon}</span></div>
                </div>
                <AnimatedCounter target={item.target} suffix={item.suffix} className="text-3xl sm:text-4xl font-bold font-mono text-white/80" />
                <p className="text-xs text-white/35 mt-2 font-mono">{item.label}</p>
                <Sparkline />
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
