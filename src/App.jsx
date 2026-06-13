import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundSystem from './components/layout/Background'
import Navigation from './components/layout/Navigation'
import CustomCursor from './components/layout/CustomCursor'
import TerminalIntro from './components/layout/TerminalIntro'
import FloatingEvidence from './components/ui/FloatingEvidence'
import CrimeSceneTape from './components/ui/CrimeSceneTape'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import TechOrbit from './components/sections/TechOrbit'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'
import GitHubSection from './components/sections/GitHubSection'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import KnifeEffect from './components/ui/KnifeEffect'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <TerminalIntro onComplete={() => setIntroDone(true)} />}

      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative min-h-screen bg-bg text-white overflow-hidden">
              <BackgroundSystem />
              <CustomCursor />
              <KnifeEffect />
              <FloatingEvidence />
              <CrimeSceneTape />
              <Navigation />

              <main className="relative z-10">
                <Hero />
                <About />
                <TechOrbit />
                <Skills />
                <Projects />
                <Experience />
                <Achievements />
                <GitHubSection />
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
