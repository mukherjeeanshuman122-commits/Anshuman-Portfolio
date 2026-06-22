import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  { title: 'Building Performant React Apps', date: '2025-03-15', tag: 'React', excerpt: 'Techniques for optimizing React renders, lazy loading, and reducing bundle size for lightning-fast applications.', readTime: '5 min' },
  { title: 'The Future of CSS', date: '2025-02-20', tag: 'CSS', excerpt: 'Exploring container queries, scroll-driven animations, and the new CSS features shipping in 2025.', readTime: '4 min' },
  { title: 'Three.js for Web Devs', date: '2025-01-10', tag: '3D', excerpt: 'A practical guide to adding 3D experiences to your websites using Three.js and React Three Fiber.', readTime: '7 min' },
]

function TerminalDate({ date }) { const d = new Date(date); return <span className="font-mono text-[10px] text-white/50">{d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</span> }

export default function Blog() {
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
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="blog" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Blog</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Latest <span className="gradient-text">Articles</span></h2>
          <p className="text-white/55 mt-4 max-w-xl mx-auto">Thoughts on development, design, and technology.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article key={post.title} className="group overflow-hidden card-hover"
              style={{ background: 'rgba(10,15,46,0.6)', border: '1px solid rgba(99,102,241,0.08)' }}
              ref={el => cardsRef.current[i] = el}>
              <div className="px-4 py-2.5 flex items-center gap-2"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.08)', background: 'rgba(5,8,22,0.95)' }}>
                <span className="w-2.5 h-2.5" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} /><span className="w-2.5 h-2.5 bg-white/15" /><span className="w-2.5 h-2.5 bg-white/15" />
                <span className="ml-2 text-[10px] font-mono text-white/50">post.md</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-mono text-white/55 bg-indigo-500/10">#{post.tag}</span>
                  <TerminalDate date={post.date} />
                </div>
                <h3 className="text-lg font-semibold text-white/85 group-hover:text-white/95 transition-colors">{post.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                  <span className="text-[10px] text-white/50 font-mono">{post.readTime} read</span>
                  <span className="text-xs text-white/55 group-hover:text-white/75 transition-colors flex items-center gap-1 font-mono">Read more<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
