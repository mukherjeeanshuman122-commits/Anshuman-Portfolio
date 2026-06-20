import { useState, useEffect, Suspense, lazy, useRef } from 'react'

import { personalInfo } from '../../data/portfolio'
import AnimatedCounter from '../ui/AnimatedCounter'
import MagneticButton from '../ui/MagneticButton'
import ScrambleText from '../ui/ScrambleText'

import GlitchText from '../ui/GlitchText'

const HeroScene = lazy(() => import('../three/HeroScene'))

const rotatingWords = ['Developer', 'Designer', 'Builder', 'Problem Solver', 'Creator']

const stats = [
  { label: 'Projects Completed', target: personalInfo.stats.projects, suffix: '+' },
  { label: 'Technologies Learned', target: personalInfo.stats.technologies, suffix: '+' },
  { label: 'Years Learning', target: personalInfo.stats.yearsLearning, suffix: '+' },
  { label: 'GitHub Contributions', target: personalInfo.stats.githubContributions, suffix: '+' },
]

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Decorative rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-blood/10 rounded-full animate-[spin_60s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.04] animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-white/[0.03] animate-[spin_55s_linear_infinite_reverse]" />
      </div>

      <div ref={heroRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-bone/80 mb-8 font-mono"
              style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)' }} />
              </span>
              {personalInfo.availability}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight">
                <span className="block text-white">Building</span>
                <GlitchText text="Digital" as="span" className="block gradient-text drop-shadow-[0_0_20px_rgba(78,38,226,0.3)]" intensity="high" />
                <span className="block text-white">Experiences</span>
              </h1>

              <div className="h-12 sm:h-14 overflow-hidden">
                <span className="text-xl sm:text-2xl text-white/50 font-light">That feel alive — </span>
                <span className="relative inline-block w-40 sm:w-48 h-10 sm:h-12 align-bottom overflow-hidden">
                  {rotatingWords.map((word, i) => (
                    <span
                      key={word}
                      className="absolute inset-0 flex items-center text-xl sm:text-2xl font-medium gradient-text"
                      style={{
                        transform: `translateY(${(i - wordIndex) * 100}%)`,
                        opacity: i === wordIndex ? 1 : 0,
                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <p className="text-lg sm:text-xl text-white/55 leading-relaxed max-w-xl">
              {personalInfo.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                as="a"
                href={`mailto:${personalInfo.email}`}
                className="px-8 py-3.5 text-sm font-semibold text-bone transition-all duration-300 font-mono relative overflow-hidden group"
                style={{
                  background: 'rgba(78,38,226,0.2)',
                  border: '1px solid rgba(78,38,226,0.35)',
                  boxShadow: '0 0 20px rgba(78,38,226,0.1)',
                }}
              >
                <span className="relative z-10">Get In Touch</span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href={personalInfo.github}
                className="px-8 py-3.5 text-sm font-semibold glass hover:bg-white/5 transition-all duration-300 font-mono"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                View GitHub
              </MagneticButton>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1 group">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    className="text-2xl sm:text-3xl font-bold text-white/85 group-hover:text-bone transition-colors duration-300"
                  />
                  <ScrambleText text={stat.label} className="text-xs text-white/50 font-mono" />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-[600px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 border border-white/20 border-t-blood animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>

            <div
              className="absolute top-10 left-0 px-4 py-2 text-xs font-medium font-mono"
              style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-white/60">React</span>
              <span className="text-white/30 mx-1">/</span>
              <span className="text-white/60">Three.js</span>
            </div>

            <div
              className="absolute bottom-20 right-0 px-4 py-2 text-xs font-medium font-mono"
              style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(78,38,226,0.2)' }}
            >
              <span className="text-blood/80">#</span>
              <span className="text-white/60 ml-1">Open to Work</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/40 font-mono tracking-[0.3em]">SCROLL</span>
        <div
          className="px-[0.5px] h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
        />
      </div>
    </section>
  )
}
