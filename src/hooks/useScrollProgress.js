import { useState, useEffect, useRef, useCallback } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const rafRef = useRef(null)
  const sectionsRef = useRef([])

  const update = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0)

    const scrollPos = scrollTop + 100
    for (let i = 0; i < sectionsRef.current.length; i++) {
      const s = sectionsRef.current[i]
      if (scrollPos >= s.top && scrollPos < s.top + s.height) {
        setActiveSection(s.id)
        break
      }
    }
  }, [])

  useEffect(() => {
    const cacheSections = () => {
      sectionsRef.current = Array.from(document.querySelectorAll('section[id]')).map(s => ({
        id: s.id,
        top: s.offsetTop,
        height: s.offsetHeight,
      }))
    }
    cacheSections()
    window.addEventListener('resize', cacheSections, { passive: true })

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        update()
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', cacheSections)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [update])

  return { progress, activeSection }
}
