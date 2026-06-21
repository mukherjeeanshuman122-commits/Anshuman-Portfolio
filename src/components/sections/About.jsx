import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutContent, technologies } from '../../data/portfolio'
import { toolLogos } from '../../data/toolLogos'
import GlowCard from '../ui/GlowCard'

gsap.registerPlugin(ScrollTrigger)

const bentoItems = [
  {
    id: 'about', title: 'About Me', size: 'md',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    content: (
      <div className="space-y-4">
        <p className="text-white/60 leading-relaxed text-sm">{aboutContent.bio}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 6).map((tech) => (
            <span key={tech.name} className="px-3 py-1 text-xs font-medium text-white/60 hover:text-bone transition-all duration-200"
              style={{ border: '1px solid rgba(99,102,241,0.12)' }}
            >{tech.name}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'experience', title: 'Experience', size: 'md',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>),
    content: (
      <div className="space-y-4">
        {aboutContent.experience.map((exp, i) => (
          <div key={i} className="space-y-1 pl-4 transition-colors duration-300"
            style={{ borderLeft: '1px solid rgba(99,102,241,0.25)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">{exp.role}</span>
              <span className="text-xs text-white/45 font-mono">{exp.period}</span>
            </div>
            <p className="text-xs text-white/50">{exp.company}</p>
            <p className="text-xs text-white/45 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'education', title: 'Education', size: 'sm',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" /></svg>),
    content: (
      <div className="space-y-3">
        {aboutContent.education.map((edu, i) => (
          <div key={i} className="space-y-1">
            <span className="text-sm font-medium text-white/80">{edu.degree}</span>
            <p className="text-xs text-white/50">{edu.school}</p>
            <p className="text-xs text-white/40 font-mono">{edu.period}</p>
            <p className="text-xs text-white/45">{edu.description}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'techstack', title: 'Tech Stack', size: 'lg',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {technologies.map((tech) => {
            const logo = toolLogos[tech.name]
            return (
              <div key={tech.name} className="flex flex-col items-center gap-1.5 p-2.5 transition-all duration-200 group hover:scale-105"
                style={{
                  background: 'rgba(99,102,241,0.04)',
                  border: '1px solid rgba(99,102,241,0.08)',
                }}>
                <div className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ color: logo?.color || 'rgba(226,232,240,0.55)' }}>
                  {logo?.svg || <span className="text-xs font-bold">{tech.name.charAt(0)}</span>}
                </div>
                <span className="text-[10px] text-white/50 text-center leading-tight">{tech.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    ),
  },
  {
    id: 'achievements', title: 'Achievements', size: 'sm',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>),
    content: (
      <div className="space-y-3">
        {[
          { label: 'Projects Delivered', value: '12+' },
          { label: 'Technologies Mastered', value: '15+' },
          { label: 'Certifications', value: '3+' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between group">
            <span className="text-xs text-white/55">{item.label}</span>
            <span className="text-sm font-bold text-white/70 group-hover:text-bone transition-colors duration-200 font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'goals', title: 'Current Goals', size: 'sm',
    icon: (<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
    content: (
      <div className="space-y-2">
        {['Master Next.js & TypeScript', 'Build AI-powered web apps', 'Contribute to open source', 'Learn Rust & WebAssembly'].map((goal, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 group-hover:shadow-neon-blue transition-all duration-200"
              style={{
                background: 'rgba(99,102,241,0.35)',
                boxShadow: '0 0 4px rgba(99,102,241,0.2)',
              }} />
            <span className="text-xs text-white/55 group-hover:text-white/75 transition-colors duration-200">{goal}</span>
          </div>
        ))}
      </div>
    ),
  },
]

const sizeClasses = {
  sm: 'col-span-1 row-span-1',
  md: 'col-span-1 sm:col-span-2 row-span-1',
  lg: 'col-span-1 sm:col-span-2 row-span-2',
}

export default function About() {
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
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">About</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Developer <span className="gradient-text">Profile</span></h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Everything you need to know about my journey, skills, and what drives me.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {bentoItems.map((item, i) => (
            <div key={item.id} className={sizeClasses[item.size]}
              ref={el => cardsRef.current[i] = el}>
              <GlowCard tilt className="h-full p-6 group card-hover"
                style={{
                  background: 'rgba(10,15,46,0.6)',
                  border: '1px solid rgba(99,102,241,0.08)',
                }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-white/45 group-hover:text-indigo-mid/80 transition-colors duration-200">{item.icon}</div>
                  <h3 className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-200 font-mono">{item.title}</h3>
                </div>
                {item.content}
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
