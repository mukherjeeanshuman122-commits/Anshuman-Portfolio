import { useState, useEffect, useRef } from 'react'

const lines = [
  { prefix: '$', text: 'whoami' },
  { prefix: '', text: 'Anshuman Mukherjee — Frontend Engineer' },
  { prefix: '$', text: 'cat skills.json | grep "expertise"' },
  { prefix: '', text: 'React • JavaScript • HTML5 • CSS3 • Firebase • Node.js' },
  { prefix: '$', text: 'cat mission.txt' },
  { prefix: '', text: 'Building scalable web apps with clean code and pixel-perfect design.' },
  { prefix: '', text: 'Focused on responsive, accessible, and performant digital experiences.' },
  { prefix: '$', text: 'status --availability' },
  { prefix: '', text: '● Available for work — Open to collaborations' },
]

export default function TypewriterTerminal() {
  const sectionRef = useRef(null)
  const [visibleLines, setVisibleLines] = useState([])
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
    }, { threshold: 0.3 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || currentIdx >= lines.length) return
    const delay = currentIdx === 0 ? 200 : 400
    const timer = setTimeout(() => {
      setVisibleLines(prev => [...prev, lines[currentIdx]])
      setCurrentIdx(prev => prev + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [started, currentIdx])

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
            {started && currentIdx < lines.length && (
              <div className="flex items-center gap-2">
                <span className="text-white/30 select-none">$</span>
                <span className="w-[2px] h-4 bg-blood animate-pulse inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
