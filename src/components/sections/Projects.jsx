import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const isLeftImage = index % 2 === 0

  useEffect(() => {
    if (!cardRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({ x: ((y - centerY) / centerY) * -4, y: ((x - centerX) / centerX) * 4 })
    setGlow({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const icons = {
    'Basic Calculator': (<svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /></svg>),
    'Automatic Passport Photo Maker': (<svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>),
    'AFITS Quick': (<svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    'Terminal Portfolio': (<svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>),
  }

  return (
    <div ref={cardRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className={`order-1 ${isLeftImage ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative group cursor-pointer" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: '1000px' }}>
          <div className="relative overflow-hidden"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.1s ease-out', background: 'rgba(16,16,16,0.97)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-blood/60" />
                <span className="w-2.5 h-2.5 bg-white/20" />
                <span className="w-2.5 h-2.5 bg-white/20" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1.5 bg-black/40 text-xs text-white/35 text-center truncate font-mono"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                {project.liveUrl?.replace('https://', '') || 'localhost:5173'}
              </div>
            </div>
            <div className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0A0A0A, #111111, #0A0A0A)' }}>
              <div className="absolute inset-0 grid-lines opacity-30" />
              <div className="text-center relative z-10">
                <div className="text-white/30 mb-3">{icons[project.title] || <div className="w-16 h-16" />}</div>
                <p className="text-white/35 text-xs font-mono uppercase tracking-wider">{project.type}</p>
                <p className="text-white/25 text-xs mt-1 font-mono">{project.tags[0]}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: `radial-gradient(400px circle at ${glow.x}px ${glow.y}px, rgba(139,32,32,0.06), transparent 25%)` }} />
              <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/10" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/10" />
            </div>
          </div>
        </div>
      </div>
      <div className={`order-2 ${isLeftImage ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-medium font-mono text-white/60" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>{project.badge}</span>
            <span className="text-xs text-white/40 font-mono uppercase">{project.type}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white/90">{project.title}</h3>
          <p className="text-white/55 leading-relaxed">{project.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 card-hover" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] uppercase tracking-wider text-blood/60 font-medium font-mono">Problem</span>
              <p className="text-xs text-white/50 leading-relaxed">{project.problem}</p>
            </div>
            <div className="space-y-1 p-3 card-hover" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] uppercase tracking-wider text-blood/60 font-medium font-mono">Solution</span>
              <p className="text-xs text-white/50 leading-relaxed">{project.solution}</p>
            </div>
            <div className="space-y-1 p-3 card-hover" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] uppercase tracking-wider text-blood/60 font-medium font-mono">Tech</span>
              <p className="text-xs text-white/50">{project.tech.join(' / ')}</p>
            </div>
            <div className="space-y-1 p-3 card-hover" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-[10px] uppercase tracking-wider text-blood/60 font-medium font-mono">Result</span>
              <p className="text-xs text-white/50 leading-relaxed">{project.result}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/4 text-white/55 font-mono"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton as="a" href={project.liveUrl} className="px-6 py-2.5 text-sm font-semibold text-bone transition-all duration-200 font-mono"
              style={{ background: 'rgba(139,32,32,0.18)', border: '1px solid rgba(139,32,32,0.3)' }}>
              <span className="relative z-10">Live Preview</span>
            </MagneticButton>
            {project.githubUrl && (
              <MagneticButton as="a" href={project.githubUrl} className="px-6 py-2.5 text-sm font-semibold glass hover:bg-white/5 transition-all duration-200 font-mono"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>View Code</MagneticButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20" ref={headerRef}>
          <span className="section-label">Projects</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Featured <span className="gradient-text">Case Studies</span></h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Each project is a story of problem-solving, technical execution, and measurable impact.</p>
        </div>
        <div className="space-y-32">
          {projects.map((project, i) => (<ProjectCard key={project.id} project={project} index={i} />))}
        </div>
      </div>
    </section>
  )
}
