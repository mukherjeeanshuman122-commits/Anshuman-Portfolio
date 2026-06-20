import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const commands = [
  { type: 'system', text: '██████████████████████████████████████' },
  { type: 'system', text: '█  CLASSIFIED DOSSIER — CASE #2024-AX  █' },
  { type: 'system', text: '██████████████████████████████████████' },
  { type: 'system', text: '' },
  { type: 'system', text: 'Initializing forensic analysis suite...' },
  { type: 'system', text: 'Loading subject profile...' },
  { type: 'cmd', text: 'identify --subject --verbose' },
  { type: 'output', text: 'SUBJECT: Anshuman Mukherjee' },
  { type: 'cmd', text: 'cat classification.txt' },
  { type: 'output', text: 'CLEARANCE: Frontend Engineer & Web Developer' },
  { type: 'cmd', text: 'trace location --origin' },
  { type: 'output', text: 'ORIGIN: India' },
  { type: 'cmd', text: 'inventory --skills --all' },
  { type: 'output', text: 'ARSENAL: React.js/ Next.js/ TypeScript/ Node.js/ Tailwind/' },
  { type: 'cmd', text: 'read status.json' },
  { type: 'output', text: '{ "threat_level": "available", "capability": "building", "status": "active" }' },
  { type: 'cmd', text: 'transmit "Enter at your own risk..."' },
  { type: 'output', text: 'Enter at your own risk...' },
]

const safetyChecks = [
  { label: 'Evidence integrity check', percent: 10 },
  { label: 'Forensic module calibration', percent: 22 },
  { label: 'Dossier tree validation', percent: 35 },
  { label: 'Analysis engine spin-up', percent: 48 },
  { label: 'Surveillance grid activation', percent: 60 },
  { label: 'Case state synchronization', percent: 72 },
  { label: 'Route handler lockdown', percent: 82 },
  { label: 'Threat assessment scan', percent: 90 },
  { label: 'Final clearance protocol', percent: 100 },
]

function TypingLine({ text, speed = 6, onComplete, prefix = '$' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <div className="flex items-center gap-2">
      {!prefix ? null : (
        <span className="text-white/50 select-none">{prefix}</span>
      )}
      <span className="text-white/70">{displayed}</span>
      {!done && <span className="w-[2px] h-4 bg-blood animate-blink inline-block" />}
    </div>
  )
}

function SafetyCheck({ onComplete }) {
  const [phase, setPhase] = useState('checking')
  const [currentCheck, setCurrentCheck] = useState(0)
  const [percent, setPercent] = useState(0)
  const [logs, setLogs] = useState([])
  const [showAccess, setShowAccess] = useState(false)

  useEffect(() => {
    if (phase !== 'checking') return
    if (currentCheck >= safetyChecks.length) {
      setPhase('done')
      setTimeout(() => setShowAccess(true), 150)
      setTimeout(() => onComplete?.(), 600)
      return
    }
    const check = safetyChecks[currentCheck]
    const targetPercent = check.percent
    const startPercent = currentCheck === 0 ? 0 : safetyChecks[currentCheck - 1].percent
    let current = startPercent
    const step = () => {
      if (current < targetPercent) {
        current += 2
        if (current > targetPercent) current = targetPercent
        setPercent(current)
        requestAnimationFrame(step)
      } else {
        setLogs(prev => [...prev, { text: check.label, time: Date.now() }])
        setTimeout(() => setCurrentCheck(prev => prev + 1), 20)
      }
    }
    requestAnimationFrame(step)
  }, [currentCheck, phase, onComplete])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div className="w-2 h-2 bg-blood" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.15em]">
            {phase === 'checking' ? 'Clearance Protocol' : 'CLEARED'}
          </span>
        </div>
        <span className="text-sm font-mono font-bold text-blood">{percent}%</span>
      </div>

      <div className="relative h-[2px] bg-white/10 overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0" style={{ background: 'linear-gradient(90deg, #1a0f6e, #3a1fb8)', width: `${percent}%` }} />
      </div>

      <div className="space-y-0.5 font-mono text-[10px] max-h-28 overflow-y-auto">
        {logs.map((log, i) => (
          <motion.div key={i} className="flex items-center gap-2" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.08 }}>
            <span className="text-white/30">&#10003;</span>
            <span className="text-white/40">{log.text}</span>
            <span className="text-white/20 ml-auto">ok</span>
          </motion.div>
        ))}
        {phase === 'checking' && currentCheck < safetyChecks.length && (
          <div className="flex items-center gap-2">
            <motion.span className="text-blood" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.4, repeat: Infinity }}>&#9679;</motion.span>
            <span className="text-white/50">{safetyChecks[currentCheck]?.label}...</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAccess && (
          <motion.div className="text-center pt-1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/4" style={{ border: '1px solid rgba(92,26,26,0.15)' }}>
              <svg className="w-3.5 h-3.5 text-bone/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              <span className="text-[10px] font-mono text-bone/60 tracking-wider">ACCESS GRANTED — LOADING DOSSIER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TerminalIntro({ onComplete }) {
  const [phase, setPhase] = useState('commands')
  const [visibleLines, setVisibleLines] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    if (phase === 'commands' && currentIndex >= commands.length) {
      setTimeout(() => setPhase('safety'), 100)
    }
  }, [currentIndex, phase])

  const handleSafetyComplete = () => {
    setShowIntro(false)
    setTimeout(() => onComplete?.(), 200)
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  const handleLineComplete = () => {
    const line = commands[currentIndex]
    setVisibleLines(prev => [...prev, { ...line, id: currentIndex }])
    if (currentIndex < commands.length - 1) {
      const nextLine = commands[currentIndex + 1]
      const delay = nextLine.type === 'system' ? 40 : nextLine.type === 'output' ? 20 : 35
      setTimeout(() => setCurrentIndex(prev => prev + 1), delay)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

          <button 
            onClick={handleSafetyComplete}
            className="absolute bottom-6 right-6 px-4 py-2 text-xs font-mono text-white/40 hover:text-white/80 transition-colors z-50 border border-white/10 hover:border-white/30 rounded backdrop-blur-md"
          >
            [ Skip Initialization ]
          </button>

          <motion.div className="w-full max-w-2xl mx-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="overflow-hidden ide-window">
              <div className="flex items-center justify-between px-3 py-2" style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(92,26,26,0.08)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blood/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 font-mono tracking-wider">case-file@forensic ~ $</span>
                </div>
                <div className="w-[52px]" />
              </div>

              <div ref={containerRef} className="bg-[#0a0a0a] p-5 font-mono text-[11px] leading-relaxed max-h-[350px] overflow-y-auto relative">
                {visibleLines.map((line) => {
                  if (line.type === 'system') {
                    return (
                      <div key={line.id} className="text-blood/60 my-0.5 text-[9px] tracking-[0.1em]">
                        {line.text ? `[${line.text}]` : ''}
                      </div>
                    )
                  }
                  if (line.type === 'output') {
                    return (
                      <div key={line.id} className="text-white/55 my-0.5 pl-0">
                        {line.text}
                      </div>
                    )
                  }
                  return null
                })}

                {phase === 'commands' && currentIndex < commands.length && (
                  <TypingLine
                    key={currentIndex}
                    text={commands[currentIndex].text}
                    speed={commands[currentIndex].type === 'system' ? 3 : 6}
                    prefix={commands[currentIndex].type === 'cmd' ? '$' : ' '}
                    onComplete={handleLineComplete}
                  />
                )}

                {phase === 'safety' && (
                  <motion.div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(92,26,26,0.08)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                    <SafetyCheck onComplete={handleSafetyComplete} />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
