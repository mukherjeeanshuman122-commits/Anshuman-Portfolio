import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FingerprintScan() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => setVisible(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-16" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M100 20 C55 20 20 55 20 100 C20 145 55 180 100 180" fill="none" stroke="rgba(139,32,32,0.25)" strokeWidth="1.5" strokeDasharray="240" strokeDashoffset={visible ? 0 : 240} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
              <path d="M100 35 C63 35 35 63 35 100 C35 137 63 165 100 165" fill="none" stroke="rgba(139,32,32,0.2)" strokeWidth="1.5" strokeDasharray="220" strokeDashoffset={visible ? 0 : 220} style={{ transition: 'stroke-dashoffset 1.5s ease 0.2s' }} />
              <path d="M100 50 C72 50 50 72 50 100 C50 128 72 150 100 150" fill="none" stroke="rgba(139,32,32,0.15)" strokeWidth="1.5" strokeDasharray="200" strokeDashoffset={visible ? 0 : 200} style={{ transition: 'stroke-dashoffset 1.5s ease 0.4s' }} />
              <path d="M100 65 C80 65 65 80 65 100 C65 120 80 135 100 135" fill="none" stroke="rgba(139,32,32,0.12)" strokeWidth="1.5" strokeDasharray="180" strokeDashoffset={visible ? 0 : 180} style={{ transition: 'stroke-dashoffset 1.5s ease 0.6s' }} />
              <path d="M100 80 C89 80 80 89 80 100 C80 111 89 120 100 120" fill="none" stroke="rgba(139,32,32,0.1)" strokeWidth="1.5" strokeDasharray="160" strokeDashoffset={visible ? 0 : 160} style={{ transition: 'stroke-dashoffset 1.5s ease 0.8s' }} />
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(139,32,32,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
            {visible && (
              <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blood/40 to-transparent"
                style={{ animation: 'fingerprintScan 2s ease-in-out infinite', top: 0 }} />
            )}
          </div>
          <p className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase">
            {visible ? 'Identity Verified' : 'Awaiting scan...'}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fingerprintScan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
      `}</style>
    </section>
  )
}
