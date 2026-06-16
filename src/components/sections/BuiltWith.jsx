import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  {
    name: 'React', color: '#61dafb', category: 'Framework',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.2" /><g><ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1" /><ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" /><ellipse rx="11" ry="4.2" cx="12" cy="12" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" /></g></svg>,
  },
  {
    name: 'Three.js', color: '#ffffff', category: '3D',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  },
  {
    name: 'GSAP', color: '#88ce02', category: 'Animation',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v4H4V4zm0 6h8v4H4v-4zm0 6h16v4H4v-4z" opacity="0.8" /></svg>,
  },
  {
    name: 'Tailwind CSS', color: '#38bdf8', category: 'Styling',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.02 7.15 13.87 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.02 13.15 8.87 12 7 12z" /></svg>,
  },
  {
    name: 'Vite', color: '#bd34fe', category: 'Build Tool',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.805 3.958L12.352 21.24c-.182.336-.67.337-.853.002L2.196 3.958c-.2-.364.146-.782.555-.682l8.754 2.164c.05.013.102.013.152 0l8.948-2.164c.408-.1.755.318.555.682z" /></svg>,
  },
  {
    name: 'JavaScript', color: '#f7df1e', category: 'Language',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" /></svg>,
  },
  {
    name: 'Firebase', color: '#ffca28', category: 'Backend',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.584 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" /></svg>,
  },
  {
    name: 'Figma', color: '#f24e1e', category: 'Design',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zm0-20C5.8 4 4 5.8 4 8s1.8 4 4 4h4V4H8zm0-4C5.8 0 4 1.8 4 4s1.8 4 4 4h4V0H8zm8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-8 8c-2.2 0-4 1.8-4 4v4h8c2.2 0 4-1.8 4-4s-1.8-4-4-4z" /></svg>,
  },
  {
    name: 'Vercel', color: '#ffffff', category: 'Deploy',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L24 22H0z" /></svg>,
  },
  {
    name: 'Git', color: '#f05032', category: 'Version Control',
    svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.886.719-2.604 0-.546-.545-.688-1.337-.468-2.002l-2.49-2.49v6.53c.175.087.338.203.483.347.72.72.72 1.884 0 2.604-.72.72-1.884.72-2.604 0-.72-.72-.72-1.884 0-2.604.18-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.686-1.337-.47-1.997L7.576 3.75.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" /></svg>,
  },
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
            <div key={tech.name} className="tech-item liquid-glass rounded-xl p-4 text-center group cursor-default card-hover">
              <div className="w-10 h-10 mx-auto mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: tech.color }}>
                {tech.svg}
              </div>
              <p className="text-xs font-semibold text-white/70 group-hover:text-white/90 transition-colors">{tech.name}</p>
              <p className="text-[9px] text-white/30 font-mono mt-1">{tech.category}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 liquid-glass rounded-xl text-[10px] font-mono text-white/30">
            <span className="w-1.5 h-1.5 bg-blood/40" />
            Zero bloat • Performance first • Clean code
          </div>
        </div>
      </div>
    </section>
  )
}
