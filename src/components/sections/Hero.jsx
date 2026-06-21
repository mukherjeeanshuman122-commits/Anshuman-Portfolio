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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full animate-[spin_60s_linear_infinite]"
          style={{
            border: '1px solid rgba(99,102,241,0.08)',
            borderStyle: 'dashed',
          }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-[spin_40s_linear_infinite]"
          style={{ border: '1px solid rgba(99,102,241,0.05)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full animate-[spin_55s_linear_infinite_reverse]"
          style={{ border: '1px solid rgba(139,92,246,0.04)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full animate-[spin_80s_linear_infinite]"
          style={{ border: '1px solid rgba(59,130,246,0.03)' }} />
      </div>

      <div ref={heroRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium mb-8 font-mono"
              style={{
                color: 'rgba(52,211,153,0.9)',
                background: 'rgba(5,8,22,0.8)',
                border: '1px solid rgba(52,211,153,0.2)',
                boxShadow: '0 0 15px rgba(52,211,153,0.08)',
              }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6), 0 0 20px rgba(52,211,153,0.3)' }} />
              </span>
              {personalInfo.availability}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight">
                <span className="block text-white/90">Building</span>
                <GlitchText text="Digital" as="span" className="block gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]" intensity="high" />
                <span className="block text-white/90">Experiences</span>
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
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(99,102,241,0.4)',
                  boxShadow: '0 0 20px rgba(99,102,241,0.15), 0 0 40px rgba(139,92,246,0.08)',
                }}
              >
                <span className="relative z-10">Get In Touch</span>
              </MagneticButton>
              <MagneticButton
                as="a"
                href={personalInfo.github}
                className="px-8 py-3.5 text-sm font-semibold glass hover:bg-white/5 transition-all duration-300 font-mono"
                style={{ border: '1px solid rgba(99,102,241,0.12)' }}
              >
                View GitHub
              </MagneticButton>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
              style={{ borderTop: '1px solid rgba(99,102,241,0.1)' }}
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
                <div className="w-12 h-12 rounded-full animate-spin"
                  style={{
                    border: '2px solid rgba(99,102,241,0.15)',
                    borderTopColor: 'rgba(99,102,241,0.6)',
                  }} />
              </div>
            }>
              <HeroScene />
            </Suspense>

            <div
              className="absolute top-10 left-0 px-4 py-2 text-xs font-medium font-mono"
              style={{
                background: 'rgba(5,8,22,0.85)',
                border: '1px solid rgba(99,102,241,0.1)',
                boxShadow: '0 0 10px rgba(99,102,241,0.05)',
              }}
            >
              <span className="text-white/60">React</span>
              <span className="text-white/30 mx-1">/</span>
              <span className="text-white/60">Three.js</span>
            </div>

            <div
              className="absolute bottom-20 right-0 px-4 py-2 text-xs font-medium font-mono"
              style={{
                background: 'rgba(5,8,22,0.85)',
                border: '1px solid rgba(99,102,241,0.15)',
                boxShadow: '0 0 12px rgba(99,102,241,0.06)',
              }}
            >
              <span className="text-indigo-mid/80">#</span>
              <span className="text-white/60 ml-1">Open to Work</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/40 font-mono tracking-[0.3em]">SCROLL</span>
        <div
          className="px-[0.5px] h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), transparent)' }}
        />
      </div>
    </section>
  )
}
