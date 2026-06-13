import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'React', icon: '⚛️', color: '#61dafb', category: 'Framework' },
  { name: 'Three.js', icon: '🎲', color: '#ffffff', category: '3D' },
  { name: 'GSAP', icon: '🎬', color: '#88ce02', category: 'Animation' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#38bdf8', category: 'Styling' },
  { name: 'Vite', icon: '⚡', color: '#bd34fe', category: 'Build Tool' },
  { name: 'JavaScript', icon: '📜', color: '#f7df1e', category: 'Language' },
  { name: 'Firebase', icon: '🔥', color: '#ffca28', category: 'Backend' },
  { name: 'Figma', icon: '🎯', color: '#f24e1e', category: 'Design' },
  { name: 'Vercel', icon: '▲', color: '#ffffff', category: 'Deploy' },
  { name: 'Git', icon: '📦', color: '#f05032', category: 'Version Control' },
]

export default function BuiltWith() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.bw-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      const items = sectionRef.current.querySelectorAll('.tech-item')
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: i * 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 90%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 bw-header">
          <span className="section-label">Stack</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">Built <span className="gradient-text">With</span></h2>
          <p className="text-white/35 mt-3 text-sm font-mono">Technologies powering this portfolio</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-item glass rounded-xl p-4 text-center group cursor-default card-hover">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{tech.icon}</div>
              <p className="text-xs font-semibold text-white/70 group-hover:text-white/90 transition-colors">{tech.name}</p>
              <p className="text-[9px] text-white/30 font-mono mt-1">{tech.category}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-xl text-[10px] font-mono text-white/30">
            <span className="w-1.5 h-1.5 bg-blood/40" />
            Zero bloat • Performance first • Clean code
          </div>
        </div>
      </div>
    </section>
  )
}
