import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { technologies } from '../../data/portfolio'
import { toolLogos } from '../../data/toolLogos'

gsap.registerPlugin(ScrollTrigger)

const orbitTechs = technologies.slice(0, 12)

export default function TechOrbit() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.orbit-container'),
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.orbit-container'), start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-32 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Tech Stack</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Technologies <span className="gradient-text">I Use</span></h2>
        </div>
        <div className="relative h-[400px] flex items-center justify-center orbit-container">
          <div className="absolute z-10 text-center">
            <div className="text-5xl font-bold text-white">Anshuman</div>
            <p className="text-white/30 text-sm mt-1 font-mono">Full Stack Developer</p>
          </div>
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.05]" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-white/[0.04]" />
          <div className="absolute w-[300px] h-[300px] animate-[spin_30s_linear_infinite]">
            {orbitTechs.slice(0, 8).map((tech, i) => {
              const angle = (i / 8) * Math.PI * 2; const radius = 150; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius
              const logo = toolLogos[tech.name]
              return (
                <div key={tech.name} className="absolute w-12 h-12 -ml-6 -mt-6 rounded-xl glass flex items-center justify-center group cursor-pointer hover:scale-130 transition-transform duration-200"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, animation: 'spin 30s linear infinite reverse' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{ color: logo?.color || 'rgba(255,255,255,0.4)' }}>
                    {logo?.svg || <span className="text-xs font-bold">{tech.name.charAt(0)}</span>}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono text-white/35 bg-black/85 px-2 py-1 rounded border border-white/8">{tech.name}</div>
                </div>
              )
            })}
          </div>
          <div className="absolute w-[450px] h-[450px] animate-[spin_45s_linear_infinite_reverse]">
            {orbitTechs.slice(8).map((tech, i) => {
              const angle = (i / Math.max(orbitTechs.slice(8).length, 1)) * Math.PI * 2; const radius = 225; const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius
              const logo = toolLogos[tech.name]
              return (
                <div key={tech.name} className="absolute w-10 h-10 -ml-5 -mt-5 rounded-lg bg-white/[0.025] border border-white/6 flex items-center justify-center group cursor-pointer hover:scale-130 transition-transform duration-200"
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, animation: 'spin 45s linear infinite reverse' }}>
                  <div className="flex items-center justify-center transition-all"
                    style={{ color: logo?.color || 'rgba(255,255,255,0.35)' }}>
                    {logo?.svg || <span className="text-[10px] font-bold">{tech.name.substring(0, 2)}</span>}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono text-white/35 bg-black/85 px-2 py-1 rounded border border-white/8">{tech.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
