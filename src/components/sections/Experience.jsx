import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2025', title: 'Full-Stack Development', description: 'Expanding expertise into full-stack development with Firebase, Node.js, and real-time applications.', marker: '01', color: '#3b82f6', tech: ['Firebase', 'Node.js', 'React'] },
  { year: '2024', title: 'Advanced Frontend', description: 'Mastered React, TypeScript, and modern CSS frameworks. Built complex, interactive web applications.', marker: '02', color: '#6366f1', tech: ['React', 'TypeScript', 'Tailwind'] },
  { year: '2023', title: 'Web Development Journey', description: 'Started professional web development. Built responsive websites and learned modern JavaScript.', marker: '03', color: '#8b5cf6', tech: ['JavaScript', 'HTML/CSS', 'Git'] },
  { year: '2022', title: 'Programming Foundations', description: 'Learned HTML, CSS, JavaScript fundamentals. Built first projects and explored web technologies.', marker: '04', color: '#4338ca', tech: ['HTML5', 'CSS3', 'JavaScript'] },
  { year: '2021', title: 'Started Learning', description: 'Began programming journey with Python and web basics. Discovered passion for building digital experiences.', marker: '05', color: '#7c3aed', tech: ['Python', 'Web Basics'] },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )

      gsap.fromTo(sectionRef.current.querySelector('.timeline-line'),
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.timeline-line'), start: 'top 80%', once: true } }
      )

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 section-header">
          <span className="section-label">Timeline</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Experience <span className="gradient-text">Journey</span></h2>
          <p className="text-white/55 mt-4 max-w-xl mx-auto">The evolution of my skills and career in web development.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 px-[0.5px] timeline-line origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), rgba(255,255,255,0.06), transparent)' }}
          />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-20" ref={el => itemsRef.current[i] = el}>
                <div className="absolute left-6 w-5 h-5 flex items-center justify-center -translate-x-1/2 z-10"
                  style={{ border: `1px solid ${item.color}`, background: `${item.color}20`, boxShadow: `0 0 12px ${item.color}40` }}
                >
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: item.color }} />
                </div>
                <div className="p-6 transition-all duration-200 group card-hover"
                  style={{ background: 'rgba(10,15,46,0.6)', border: '1px solid rgba(99,102,241,0.08)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-bold tracking-[0.15em]" style={{ color: item.color }}>{item.marker}</span>
                    <div>
                      <span className="text-xs font-mono text-white/55">{item.year}</span>
                      <h3 className="text-lg font-semibold text-white/85">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 text-[10px] font-mono text-white/50 bg-indigo-500/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
