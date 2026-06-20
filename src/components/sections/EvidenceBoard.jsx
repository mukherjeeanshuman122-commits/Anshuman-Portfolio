import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const pinnedProjects = projects.map((p, i) => ({
  ...p,
  rotation: (Math.random() * 6 - 3),
  x: Math.random() * 20 - 10,
  y: Math.random() * 10 - 5,
}))

export default function EvidenceBoard() {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.eb-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      const cards = sectionRef.current.querySelectorAll('.evidence-item')
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.8, rotation: pinnedProjects[i].rotation + 5 },
          { opacity: 1, scale: 1, rotation: pinnedProjects[i].rotation, duration: 0.5, delay: i * 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: sectionRef.current.querySelector('.eb-board'), start: 'top 75%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 eb-header">
          <span className="section-label">Evidence</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">Case <span className="gradient-text">Board</span></h2>
          <p className="text-white/35 mt-3 text-sm font-mono">Project files pinned as evidence</p>
        </div>

        <div className="eb-board relative grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl"
          style={{ background: 'rgba(12,12,12,0.9)', border: '1px solid rgba(255,255,255,0.04)' }}>
          {pinnedProjects.map((project) => (
            <div key={project.id}
              className="evidence-item relative p-4 rounded-lg cursor-pointer group"
              style={{
                background: 'rgba(18,18,18,0.95)',
                border: '1px solid rgba(255,255,255,0.05)',
                transform: `rotate(${project.rotation}deg)`,
              }}
              onClick={() => setSelected(selected === project.id ? null : project.id)}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blood/40 border border-blood/20" />

              <div className="text-[10px] font-mono text-white/25 mb-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-blood/40" />
                EVIDENCE #{project.id.toString().padStart(3, '0')}
              </div>

              <h3 className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors mb-1">{project.title}</h3>
              <p className="text-[10px] text-white/30 font-mono">{project.type}</p>

              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-white/4 text-white/35 font-mono">{tag}</span>
                ))}
              </div>

              {selected === project.id && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] text-white/40 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[9px] text-blood/60 hover:text-blood/80 font-mono" onClick={e => e.stopPropagation()}>
                        [LIVE]
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[9px] text-white/30 hover:text-white/50 font-mono" onClick={e => e.stopPropagation()}>
                        [SOURCE]
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(78,38,226,0.02) 40px, rgba(78,38,226,0.02) 41px)',
          }} />
        </div>
      </div>
    </section>
  )
}
