import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundSystem from './components/layout/Background'
import Navigation from './components/layout/Navigation'
import CustomCursor from './components/layout/CustomCursor'
import SmoothScroll from './components/layout/SmoothScroll'
import TerminalIntro from './components/layout/TerminalIntro'
import BloodSplatterTrail from './components/ui/BloodSplatterTrail'
import Preloader from './components/ui/Preloader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import TechOrbit from './components/sections/TechOrbit'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'
import GitHubSection from './components/sections/GitHubSection'
import GitHubStats from './components/sections/GitHubStats'
import Blog from './components/sections/Blog'
import Pricing from './components/sections/Pricing'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import TypewriterTerminal from './components/ui/TypewriterTerminal'
import FingerprintScan from './components/ui/FingerprintScan'
import LighthouseBadge from './components/sections/LighthouseBadge'
import BuiltWith from './components/sections/BuiltWith'
import EvidenceBoard from './components/sections/EvidenceBoard'

function Divider() {
  return (
    <div className="relative h-20 flex items-center justify-center">
      <div className="w-56 h-[1px] bg-gradient-to-r from-transparent via-indigo-mid/25 to-transparent" />
      <div className="absolute w-1.5 h-1.5 rounded-full" style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.6), rgba(139,92,246,0.6))',
        boxShadow: '0 0 8px rgba(99,102,241,0.3), 0 0 16px rgba(139,92,246,0.15)',
      }} />
    </div>
  )
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [introDone, setIntroDone] = useState(false)

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      {preloaderDone && !introDone && <TerminalIntro onComplete={handleIntroComplete} />}

      <AnimatePresence>
        {preloaderDone && introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SmoothScroll>
              <div className="relative min-h-screen text-white">
                <BackgroundSystem />
                <CustomCursor />
                <BloodSplatterTrail />
                <Navigation />

                <main className="relative z-10">
                  <Hero />
                  <Divider />
                  <About />
                  <Divider />
                  <TypewriterTerminal />
                  <FingerprintScan />
                  <Divider />
                  <TechOrbit />
                  <Divider />
                  <Skills />
                  <Divider />
                  <Projects />
                  <Divider />
                  <EvidenceBoard />
                  <Divider />
                  <Experience />
                  <Divider />
                  <Achievements />
                  <Divider />
                  <GitHubSection />
                  <Divider />
                  <GitHubStats />
                  <Divider />
                  <LighthouseBadge />
                  <Divider />
                  <BuiltWith />
                  <Divider />
                  <Blog />
                  <Divider />
                  <Pricing />
                  <Divider />
                  <Contact />
                </main>

                <Footer />
              </div>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
