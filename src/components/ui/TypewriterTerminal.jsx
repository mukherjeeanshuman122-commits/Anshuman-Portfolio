import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lines = [
  { prefix: '$', text: 'whoami', delay: 0 },
  { prefix: '', text: 'Anshuman Mukherjee — Frontend Engineer', delay: 400 },
  { prefix: '$', text: 'cat skills.json | grep "expertise"', delay: 800 },
  { prefix: '', text: 'React • JavaScript • HTML5 • CSS3 • Firebase • Node.js', delay: 1200 },
  { prefix: '$', text: 'cat mission.txt', delay: 1600 },
  { prefix: '', text: 'Building scalable web apps with clean code and pixel-perfect design.', delay: 2000 },
  { prefix: '', text: 'Focused on responsive, accessible, and performant digital experiences.', delay: 2200 },
  { prefix: '$', text: 'status --availability', delay: 2600 },
  { prefix: '', text: '● Available for work — Open to collaborations', delay: 3000 },
]

export default function TypewriterTerminal() {
  const sectionRef = useRef(null)
  const [visibleLines, setVisibleLines] = useState([])
  const [currentLine, setCurrentLine] = useState(-1)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setStarted(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!started) return
    if (currentLine >= lines.length) return

    const timer = setTimeout(() => {
      setVisibleLines(prev => [...prev, lines[currentLine]])
      setCurrentLine(prev => prev + 1)
    }, currentLine === 0 ? 0 : lines[currentLine]?.delay - lines[currentLine - 1]?.delay || 400)

    return () => clearTimeout(timer)
  }, [started, currentLine])

  return (
    <section className="relative py-24" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blood/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/12" />
            </div>
            <span className="text-[10px] text-white/30 font-mono ml-2">anshuman@portfolio ~ bash</span>
          </div>

          <div className="p-6 font-mono text-xs space-y-1 min-h-[200px]">
            {visibleLines.map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                {line.prefix && <span className="text-white/30 select-none shrink-0">{line.prefix}</span>}
                <span className={line.prefix ? 'text-blood/70' : 'text-white/50'}>{line.text}</span>
              </div>
            ))}
            {started && currentLine <= lines.length && (
              <div className="flex items-center gap-2">
                <span className="text-white/30 select-none">$</span>
                <span className="w-[2px] h-4 bg-blood animate-blink inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
