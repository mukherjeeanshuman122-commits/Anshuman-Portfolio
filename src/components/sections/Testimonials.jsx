import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: 'Alex Rivera', role: 'CTO, TechStartup', avatar: 'AR', content: 'Exceptional frontend work. The attention to detail and performance optimization is exactly what we needed. Highly recommend.', rating: 5 },
  { name: 'Sarah Chen', role: 'Product Manager, WebAgency', avatar: 'SC', content: 'Delivered ahead of schedule with clean, maintainable code. The UX improvements led to a 40% increase in user engagement.', rating: 5 },
  { name: 'James Wilson', role: 'Founder, DevStudio', avatar: 'JW', content: "One of the most talented developers I've worked with. Deep understanding of both design and engineering principles.", rating: 5 },
]

function StarRating({ rating }) {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="rgba(255,255,255,0.2)">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => { const i = setInterval(() => goTo((p => (p + 1) % testimonials.length)), 5000); return () => clearInterval(i) }, [])

  const goTo = (nextFn) => {
    if (isAnimating || !cardRef.current) return
    setIsAnimating(true)
    const el = cardRef.current
    gsap.to(el, { opacity: 0, y: -20, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setCurrent(nextFn)
      gsap.fromTo(el, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', onComplete: () => setIsAnimating(false) })
    }})
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Client <span className="gradient-text">Feedback</span></h2>
          <p className="text-white/25 mt-4 max-w-xl mx-auto">What people say about working with me.</p>
        </div>
        <div className="relative max-w-2xl mx-auto min-h-[280px]">
          <div ref={cardRef} className="glass rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-4 bg-white/4 text-white/40">{testimonials[current].avatar}</div>
            <StarRating rating={testimonials[current].rating} />
            <p className="text-white/40 leading-relaxed mb-6 italic text-sm sm:text-base">"{testimonials[current].content}"</p>
            <div><p className="text-sm font-semibold text-white/70">{testimonials[current].name}</p><p className="text-xs text-white/25 font-mono">{testimonials[current].role}</p></div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(() => i)} className="relative group">
                <div className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white/20' : 'w-2 bg-white/6 hover:bg-white/12'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
