import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const isLeftImage = index % 2 === 0

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({ x: ((y - centerY) / centerY) * -4, y: ((x - centerX) / centerX) * 4 })
    setGlow({ x, y })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

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
            style={{
              transform: `rotateX(${tilt.x * 0.8}deg) rotateY(${tilt.y * 0.8}deg) translateZ(20px)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(10,15,46,0.8)',
              border: '1px solid rgba(99,102,241,0.1)',
              boxShadow: (tilt.x !== 0 || tilt.y !== 0)
                ? `${-tilt.y * 2}px ${tilt.x * 2}px 40px rgba(99,102,241,0.1), 0 0 80px rgba(139,92,246,0.05)`
                : 'none',
            }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
                <span className="w-2.5 h-2.5 bg-white/15" />
                <span className="w-2.5 h-2.5 bg-white/15" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1.5 bg-black/40 text-xs text-white/55 text-center truncate font-mono"
                style={{ border: '1px solid rgba(99,102,241,0.06)' }}>
                {project.liveUrl?.replace('https://', '') || 'localhost:5173'}
              </div>
            </div>
            <div className="aspect-video flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #050816, #0a0f2e, #050816)',
                boxShadow: isHovered ? 'inset 0 0 60px rgba(99,102,241,0.05)' : 'none',
                transition: 'box-shadow 0.3s ease',
              }}>
              <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
              <div 
                className="text-center relative z-10"
                style={{ transform: `translateZ(40px) scale(0.95)`, transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <div className="flex justify-center text-white/55 mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">{icons[project.title] || <div className="w-16 h-16" />}</div>
                <p className="text-white/55 text-[10px] font-mono uppercase tracking-[0.2em]">{project.type}</p>
                <p className="text-[11px] mt-2 font-mono drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  style={{ color: 'rgba(129,140,248,0.8)' }}>{project.tags[0]}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(99,102,241,0.18), transparent 40%)`, mixBlendMode: 'screen' }} />
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/15 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                style={{ borderColor: 'rgba(99,102,241,0.5)', transform: 'translateZ(20px)' }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/15 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                style={{ borderColor: 'rgba(99,102,241,0.5)', transform: 'translateZ(20px)' }} />
            </div>
          </div>
        </div>
      </div>
      <div className={`order-2 ${isLeftImage ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-medium font-mono text-white/60"
              style={{ border: '1px solid rgba(99,102,241,0.12)' }}>{project.badge}</span>
            <span className="text-xs text-white/55 font-mono uppercase">{project.type}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white/90">{project.title}</h3>
          <p className="text-white/55 leading-relaxed">{project.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 card-hover"
              style={{ background: 'rgba(99,102,241,0.03)', border: '1px solid rgba(99,102,241,0.08)' }}>
              <span className="text-[10px] uppercase tracking-wider font-medium font-mono"
                style={{ color: 'rgba(129,140,248,0.7)' }}>Problem</span>
              <p className="text-xs text-white/55 leading-relaxed">{project.problem}</p>
            </div>
            <div className="space-y-1 p-3 card-hover"
              style={{ background: 'rgba(99,102,241,0.03)', border: '1px solid rgba(99,102,241,0.08)' }}>
              <span className="text-[10px] uppercase tracking-wider font-medium font-mono"
                style={{ color: 'rgba(129,140,248,0.7)' }}>Solution</span>
              <p className="text-xs text-white/55 leading-relaxed">{project.solution}</p>
            </div>
            <div className="space-y-1 p-3 card-hover"
              style={{ background: 'rgba(99,102,241,0.03)', border: '1px solid rgba(99,102,241,0.08)' }}>
              <span className="text-[10px] uppercase tracking-wider font-medium font-mono"
                style={{ color: 'rgba(129,140,248,0.7)' }}>Tech</span>
              <p className="text-xs text-white/55">{project.tech.join(' / ')}</p>
            </div>
            <div className="space-y-1 p-3 card-hover"
              style={{ background: 'rgba(99,102,241,0.03)', border: '1px solid rgba(99,102,241,0.08)' }}>
              <span className="text-[10px] uppercase tracking-wider font-medium font-mono"
                style={{ color: 'rgba(129,140,248,0.7)' }}>Result</span>
              <p className="text-xs text-white/55 leading-relaxed">{project.result}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-white/55 font-mono transition-all duration-400 hover:bg-white/10 hover:border-white/20"
                style={{
                  background: 'rgba(99,102,241,0.05)',
                  border: '1px solid rgba(99,102,241,0.08)',
                }}>{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton as="a" href={project.liveUrl} className="px-6 py-2.5 text-sm font-semibold text-bone transition-all duration-400 font-mono"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.12))',
                border: '1px solid rgba(99,102,241,0.35)',
                boxShadow: '0 0 15px rgba(99,102,241,0.1)',
              }}>
              <span className="relative z-10">Live Preview</span>
            </MagneticButton>
            {project.githubUrl && (
              <MagneticButton as="a" href={project.githubUrl} className="px-6 py-2.5 text-sm font-semibold glass hover:bg-white/5 transition-all duration-400 font-mono"
                style={{ border: '1px solid rgba(99,102,241,0.12)' }}>View Code</MagneticButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const cardsContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: [0.16, 1, 0.3, 1],
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } }
      )

      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: [0.16, 1, 0.3, 1], stagger: 0.2,
            scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 85%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20" ref={headerRef}>
          <span className="section-label" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>Projects</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>Featured <span className="gradient-text">Case Studies</span></h2>
          <p className="text-white/55 mt-4 max-w-xl mx-auto" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>Each project is a story of problem-solving, technical execution, and measurable impact.</p>
        </div>
        <div className="space-y-32" ref={cardsContainerRef}>
          {projects.map((project, i) => (<ProjectCard key={project.id} project={project} index={i} />))}
        </div>
      </div>
    </section>
  )
}
