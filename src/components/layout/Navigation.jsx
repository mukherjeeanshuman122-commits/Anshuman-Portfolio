import { useState, useEffect, useCallback } from 'react'
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          scrolled ? 'py-1.5' : 'py-2.5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`transition-all duration-700 rounded-none ${
            scrolled ? 'px-5 shadow-glow-sm' : 'px-6'
          }`}
          style={{
            background: 'rgba(15,20,50,0.55)',
            backdropFilter: 'blur(12px) saturate(150%)',
            WebkitBackdropFilter: 'blur(12px) saturate(150%)',
            border: '1px solid rgba(99,102,241,0.08)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(99,102,241,0.08), 0 0 20px rgba(99,102,241,0.05)'
              : '0 8px 32px rgba(0,0,0,0.25)',
          }}
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
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-400 font-mono ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-bone'
                      : 'text-white/50 hover:text-white/75'
                  }`}
                >
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))',
                        border: '1px solid rgba(99,102,241,0.2)',
                        boxShadow: '0 0 15px rgba(99,102,241,0.1)',
                      }}
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
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-bone/70 hover:border-indigo-mid/40 transition-all duration-400 font-mono"
                style={{
                  border: '1px solid rgba(99,102,241,0.25)',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))',
                }}
              >
                Hire Me
              </a>

              <button
                className="md:hidden p-2 text-white/55 hover:text-white transition-colors duration-300"
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
          <div className="w-full h-full" style={{ background: 'rgba(99,102,241,0.08)' }}>
            <motion.div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #2563eb, #6366f1, #8b5cf6, #a855f7)',
                boxShadow: '0 0 10px rgba(99,102,241,0.4), 0 0 20px rgba(139,92,246,0.2)',
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
              className="absolute top-20 left-4 right-4 p-6"
              style={{
                background: 'rgba(15,20,50,0.6)',
                backdropFilter: 'blur(12px) saturate(150%)',
                WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                border: '1px solid rgba(99,102,241,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08)',
              }}
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
                        ? 'text-bone'
                        : 'text-white/50 hover:bg-white/5 hover:text-white'
                    }`}
                    style={{
                      background: activeSection === link.href.replace('#', '')
                        ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.06))'
                        : undefined,
                      border: activeSection === link.href.replace('#', '')
                        ? '1px solid rgba(99,102,241,0.2)'
                        : '1px solid transparent',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="mailto:mukherjeeanshuman122@gmail.com"
                  className="mt-4 px-4 py-3 text-sm font-medium text-bone text-center font-mono"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }}
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
