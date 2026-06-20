import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { activeSection, progress } = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          scrolled ? 'py-1.5' : 'py-2.5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className={`glass rounded-none transition-all duration-700 ${
            scrolled ? 'px-5 shadow-glow-sm' : 'px-6'
          }`}
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-8">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
              className="text-sm font-bold text-bone relative whitespace-nowrap tracking-wider"
            >
              {'<'}Anshuman{' />'}
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 font-mono ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-bone'
                      : 'text-white/30 hover:text-white/55'
                  }`}
                >
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0"
                      style={{ background: 'rgba(78,38,226,0.1)', border: '1px solid rgba(78,38,226,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:mukherjeeanshuman122@gmail.com"
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium border text-bone/70 hover:bg-blood/15 hover:border-blood/30 transition-all duration-300 font-mono"
                style={{ border: '1px solid rgba(78,38,226,0.2)' }}
              >
                Hire Me
              </a>

              <button
                className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {mobileOpen ? (
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  ) : (
                    <>
                      <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-white/5">
            <motion.div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #2A1AD8, #4E26E2, #7231EC)',
                boxShadow: '0 0 10px rgba(78,38,226,0.3)',
              }}
            />
          </div>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-20 left-4 right-4 glass p-6"
              style={{ border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className={`px-4 py-3 text-sm font-medium transition-all font-mono ${
                      activeSection === link.href.replace('#', '')
                        ? 'bg-blood/12 text-bone border border-blood/20'
                        : 'text-white/40 hover:bg-white/4 hover:text-white'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="mailto:mukherjeeanshuman122@gmail.com"
                  className="mt-4 px-4 py-3 text-sm font-medium bg-blood/15 text-bone text-center border border-blood/20 font-mono"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
