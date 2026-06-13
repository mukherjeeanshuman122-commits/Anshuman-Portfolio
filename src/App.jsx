import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundSystem from './components/layout/Background'
import Navigation from './components/layout/Navigation'
import CustomCursor from './components/layout/CustomCursor'
import TerminalIntro from './components/layout/TerminalIntro'
import FloatingEvidence from './components/ui/FloatingEvidence'
import CrimeSceneTape from './components/ui/CrimeSceneTape'
import KnifeEffect from './components/ui/KnifeEffect'
import Preloader from './components/ui/Preloader'
import BloodSplatterTrail from './components/ui/BloodSplatterTrail'
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
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import TypewriterTerminal from './components/ui/TypewriterTerminal'
import FingerprintScan from './components/ui/FingerprintScan'
import LighthouseBadge from './components/sections/LighthouseBadge'
import BuiltWith from './components/sections/BuiltWith'
import EvidenceBoard from './components/sections/EvidenceBoard'

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
            transition={{ duration: 0.5 }}
          >
            <div className="relative min-h-screen bg-bg text-white">
              <BackgroundSystem />
              <CustomCursor />
              <KnifeEffect />
              <BloodSplatterTrail />
              <FloatingEvidence />
              <CrimeSceneTape />
              <Navigation />

              <main className="relative z-10">
                <Hero />
                <About />
                <TypewriterTerminal />
                <FingerprintScan />
                <TechOrbit />
                <Skills />
                <Projects />
                <EvidenceBoard />
                <Experience />
                <Achievements />
                <GitHubSection />
                <GitHubStats />
                <LighthouseBadge />
                <BuiltWith />
                <Blog />
                <Contact />
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
