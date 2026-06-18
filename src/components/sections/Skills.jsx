import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories, technologies } from '../../data/portfolio'
import { toolLogos } from '../../data/toolLogos'
import GlowCard from '../ui/GlowCard'

gsap.registerPlugin(ScrollTrigger)

const categoryIcons = {
  frontend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  backend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  learning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
}

function TypingTerminal({ text, speed = 50 }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  useEffect(() => {
    setDisplayText(''); let i = 0
    const interval = setInterval(() => { if (i < text.length) { setDisplayText(text.slice(0, i + 1)); i++ } else { clearInterval(interval) } }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  useEffect(() => { const ci = setInterval(() => setShowCursor(p => !p), 530); return () => clearInterval(ci) }, [])
  return <span>{displayText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-blood/80`}>|</span></span>
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0])
  const [terminalText, setTerminalText] = useState('')
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => { setTerminalText(`cat skills/${activeCategory.id}.json`) }, [activeCategory])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={headerRef}>
          <span className="section-label">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Interactive <span className="gradient-text">Command Center</span></h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Explore my capabilities through this interactive dashboard.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            {skillCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat)}
                className="w-full text-left p-4 transition-all duration-200 font-mono"
                style={{
                  background: activeCategory.id === cat.id ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.02)',
                  border: activeCategory.id === cat.id ? '1px solid rgba(78,38,226,0.2)' : '1px solid rgba(255,255,255,0.05)',
                  borderLeft: activeCategory.id === cat.id ? '2px solid rgba(78,38,226,0.5)' : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-white/50">
                    {categoryIcons[cat.id]}
                  </div>
                  <div><p className="text-sm font-medium text-white/75">{cat.name}</p><p className="text-xs text-white/40">{cat.tools.length} tools</p></div>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2">
            <GlowCard tilt className="p-8"
              style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 bg-blood/70 animate-pulse" />
                <div><h3 className="text-lg font-semibold text-white/85">{activeCategory.name}</h3><p className="text-sm text-white/45">{activeCategory.description}</p></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activeCategory.tools.map((tool, i) => {
                  const techData = technologies.find(t => t.name === tool)
                  const proficiency = techData?.proficiency || 75
                  const data = toolLogos[tool]
                  return (
                    <div key={tool} className="p-4 transition-all duration-200 group card-hover"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/5 group-hover:bg-white/8 transition-all duration-200 rounded-lg overflow-hidden"
                          style={{ color: data?.color || 'rgba(255,255,255,0.55)' }}>
                          {data?.svg || <span className="text-xs font-bold">{tool.charAt(0)}</span>}
                        </div>
                        <span className="text-[11px] font-medium text-white/65 leading-tight">{tool}</span>
                      </div>
                      <div className="relative w-14 h-14 mx-auto">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                          <circle cx="28" cy="28" r="24" fill="none" stroke="#4E26E2" strokeWidth="2.5"
                            strokeDasharray={`${2 * Math.PI * 24}`}
                            strokeDashoffset={`${2 * Math.PI * 24 * (1 - proficiency / 100)}`}
                            strokeLinecap="butt" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold font-mono text-blood/90">{proficiency}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-2 px-4 py-2" style={{ background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="w-2.5 h-2.5 bg-blood/60" /><span className="w-2.5 h-2.5 bg-white/15" /><span className="w-2.5 h-2.5 bg-white/15" />
                  <span className="ml-2 text-[10px] text-white/35 font-mono">terminal / {activeCategory.tag}</span>
                </div>
                <div className="p-4 font-mono text-[11px] space-y-1" style={{ background: 'rgba(6,6,6,0.98)' }}>
                  <div className="flex items-center gap-2"><span className="text-white/40">$</span><span className="text-white/60"><TypingTerminal text={terminalText} speed={30} /></span></div>
                  <div className="text-white/40 mt-2 pl-4">
                    {'{'}<br />&nbsp;&nbsp;"category": "<span className="text-white/60">{activeCategory.name}</span>",<br />&nbsp;&nbsp;"tools": [{activeCategory.tools.map(t => `"${t}"`).join(', ')}],<br />&nbsp;&nbsp;"proficiency": "<span className="text-white/60">advanced</span>",<br />&nbsp;&nbsp;"status": "<span className="text-white/60">active</span>"<br />{'}'}
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}
