import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo } from '../../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

function ContributionHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null)
  const weeks = 7; const days = 5; const cells = []
  for (let w = 0; w < weeks; w++) { for (let d = 0; d < days; d++) { const level = Math.floor(Math.random() * 5); const contributions = level === 0 ? 0 : Math.floor(Math.random() * level * 3) + 1; cells.push({ w, d, level, contributions }) } }
  const colors = ['rgba(255,255,255,0.02)', 'rgba(114,49,236,0.1)', 'rgba(114,49,236,0.2)', 'rgba(114,49,236,0.3)', 'rgba(114,49,236,0.45)']
  return (
    <div className="pl-4 pt-2">
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => (
          <div key={i} className="aspect-square rounded-sm cursor-pointer relative" style={{ backgroundColor: colors[cell.level] }}
            onMouseEnter={() => setHoveredCell(cell)} onMouseLeave={() => setHoveredCell(null)}>
            {hoveredCell === cell && (<div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/85 text-[8px] text-white/50 whitespace-nowrap z-20 border border-white/8">{cell.contributions} contributions</div>)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1 mt-2"><span className="text-[8px] text-white/15">Less</span>{colors.map((c, i) => (<div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />))}<span className="text-[8px] text-white/15">More</span></div>
    </div>
  )
}

export default function GitHubSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.terminal-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.terminal-card'), start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="github" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Open Source</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">GitHub <span className="gradient-text">Activity</span></h2>
          <p className="text-white/35 mt-4 max-w-xl mx-auto">Live development activity and open source contributions.</p>
        </div>
        <div className="glass rounded-2xl overflow-hidden max-w-3xl mx-auto terminal-card">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blood/60" /><span className="w-2.5 h-2.5 rounded-full bg-white/12" /><span className="w-2.5 h-2.5 rounded-full bg-white/12" /></div>
            <div className="flex items-center gap-2 ml-3"><svg className="w-4 h-4 text-white/25" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg><span className="text-xs text-white/30 font-mono">github.com/mukherjeeanshuman122 — bash</span></div>
          </div>
          <div className="p-6 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2"><span className="text-white/30">$</span><span className="text-white/40">gh user --status</span></div>
            <div className="pl-4 space-y-1 text-white/30">
              <p>User: <span className="text-white/50">@mukherjeeanshuman122-commits</span></p>
              <p>Status: <span className="text-white/50">Active</span></p>
              <p>Contributions: <span className="text-white/50">200+</span></p>
              <p>Repositories: <span className="text-white/50">12</span></p>
            </div>
            <div className="pt-3 flex items-center gap-2"><span className="text-white/30">$</span><span className="text-white/40">gh repo list --limit 4</span></div>
            <div className="pl-4 space-y-2 pt-1">
              {[{ name: 'Basic-Calculater-', stars: 2, lang: 'JavaScript' }, { name: 'portfolio-3d', stars: 1, lang: 'TypeScript' }, { name: 'passport-photo-maker', stars: 3, lang: 'JavaScript' }, { name: 'afits-quick', stars: 1, lang: 'JavaScript' }].map((repo) => (
                <div key={repo.name} className="flex items-center justify-between text-white/30 py-0.5 hover:text-white/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/10" /><span className="text-white/40">{repo.name}</span></div>
                  <div className="flex items-center gap-4"><span className="flex items-center gap-1"><span className="text-white/30">★</span> {repo.stars}</span><span className="text-white/20">{repo.lang}</span></div>
                </div>
              ))}
            </div>
            <div className="pt-3 flex items-center gap-2"><span className="text-white/30">$</span><span className="text-white/40">gh contribution-graph --year 2026</span></div>
            <ContributionHeatmap />
          </div>
        </div>
        <div className="text-center mt-8">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium glass hover:bg-white/3 transition-all duration-200 font-mono">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>View Full Profile
          </a>
        </div>
      </div>
    </section>
  )
}
