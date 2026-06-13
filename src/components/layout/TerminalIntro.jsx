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
  { label: 'Evidence integrity check', percent: 5 },
  { label: 'Forensic module calibration', percent: 12 },
  { label: 'Dossier tree validation', percent: 20 },
  { label: 'Analysis engine spin-up', percent: 28 },
  { label: 'Surveillance grid activation', percent: 36 },
  { label: 'Case state synchronization', percent: 44 },
  { label: 'Route handler lockdown', percent: 52 },
  { label: 'Dark profile construction', percent: 60 },
  { label: 'Threat assessment scan', percent: 68 },
  { label: 'Cross-reference analysis', percent: 76 },
  { label: 'Fingerprint verification', percent: 84 },
  { label: 'DNA match confirmation', percent: 90 },
  { label: 'Final clearance protocol', percent: 95 },
  { label: 'ACCESS AUTHORIZED', percent: 100 },
]

function TypingLine({ text, speed = 30, onComplete, prefix = '$' }) {
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

function AudioVisualizer() {
  const bars = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    height: Math.random() * 20 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 0.8 + 0.4,
  })), [])

  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-blood/40"
          animate={{ height: [bar.height, Math.random() * 18 + 2, bar.height] }}
          transition={{ duration: bar.duration, repeat: Infinity, delay: bar.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function VHSOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(transparent 0%, rgba(92,26,26,0.02) 50%, transparent 100%)',
            'linear-gradient(transparent 0%, rgba(92,26,26,0.04) 50%, transparent 100%)',
            'linear-gradient(transparent 0%, rgba(92,26,26,0.01) 50%, transparent 100%)',
          ],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
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
      setTimeout(() => setShowAccess(true), 400)
      setTimeout(() => onComplete?.(), 2200)
      return
    }
    const check = safetyChecks[currentCheck]
    const targetPercent = check.percent
    const startPercent = currentCheck === 0 ? 0 : safetyChecks[currentCheck - 1].percent
    let current = startPercent
    const step = () => {
      if (current < targetPercent) {
        current += 1
        setPercent(current)
        requestAnimationFrame(step)
      } else {
        setLogs(prev => [...prev, { text: check.label, time: Date.now() }])
        setTimeout(() => setCurrentCheck(prev => prev + 1), 80)
      }
    }
    requestAnimationFrame(step)
  }, [currentCheck, phase, onComplete])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div className="w-2 h-2 bg-blood" animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.15em]">
            {phase === 'checking' ? 'Clearance Protocol' : 'CLEARED'}
          </span>
        </div>
        <span className="text-sm font-mono font-bold text-blood">{percent}%</span>
      </div>

      <div className="relative h-[2px] bg-white/10 overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0" style={{ background: 'linear-gradient(90deg, #2D0A0A, #5C1A1A)', width: `${percent}%` }} />
      </div>

      <div className="space-y-0.5 font-mono text-[10px] max-h-32 overflow-y-auto">
        {logs.map((log, i) => (
          <motion.div key={i} className="flex items-center gap-2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}>
            <span className="text-white/30">&#10003;</span>
            <span className="text-white/40">{log.text}</span>
            <span className="text-white/20 ml-auto">ok</span>
          </motion.div>
        ))}
        {phase === 'checking' && currentCheck < safetyChecks.length && (
          <div className="flex items-center gap-2">
            <motion.span className="text-blood" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.6, repeat: Infinity }}>&#9679;</motion.span>
            <span className="text-white/50">{safetyChecks[currentCheck]?.label}...</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAccess && (
          <motion.div className="text-center pt-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/4" style={{ border: '1px solid rgba(92,26,26,0.15)' }}>
              <svg className="w-4 h-4 text-bone/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              <span className="text-xs font-mono text-bone/60 tracking-wider">ACCESS GRANTED — LOADING DOSSIER</span>
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
      setTimeout(() => setPhase('safety'), 500)
    }
  }, [currentIndex, phase])

  const handleSafetyComplete = () => {
    setShowIntro(false)
    setTimeout(() => onComplete?.(), 600)
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
      const delay = nextLine.type === 'system' ? 200 : nextLine.type === 'output' ? 80 : 150
      setTimeout(() => setCurrentIndex(prev => prev + 1), delay)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

          <motion.div className="w-full max-w-2xl mx-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="overflow-hidden" style={{ border: '1px solid rgba(92,26,26,0.1)', boxShadow: '0 20px 80px rgba(0,0,0,0.8), 0 0 40px rgba(92,26,26,0.05)' }}>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a]" style={{ borderBottom: '1px solid rgba(92,26,26,0.08)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blood/60" />
                  <span className="w-2.5 h-2.5 bg-white/15" />
                  <span className="w-2.5 h-2.5 bg-white/15" />
                </div>
                <div className="flex items-center gap-3">
                  <AudioVisualizer />
                  <span className="text-[10px] text-white/40 font-mono tracking-wider">case-file@forensic ~ $</span>
                </div>
                <div className="w-[52px]" />
              </div>

              <div ref={containerRef} className="bg-[#080808] p-6 font-mono text-[12px] leading-relaxed max-h-[450px] overflow-y-auto relative">
                <VHSOverlay />
                {visibleLines.map((line) => {
                  if (line.type === 'system') {
                    return (
                      <div key={line.id} className="text-blood/60 my-0.5 text-[10px] tracking-[0.1em]">
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
                    speed={commands[currentIndex].type === 'system' ? 12 : 22}
                    prefix={commands[currentIndex].type === 'cmd' ? '$' : ' '}
                    onComplete={handleLineComplete}
                  />
                )}

                {phase === 'safety' && (
                  <motion.div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(92,26,26,0.08)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
