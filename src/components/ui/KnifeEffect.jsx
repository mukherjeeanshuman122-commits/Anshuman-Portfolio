import { useEffect, useRef, useCallback } from 'react'

const SLASH_LIFETIME = 600

export default function KnifeEffect() {
  const containerRef = useRef(null)
  const lastScrollY = useRef(0)
  const activeSlashes = useRef(0)
  const maxSlash = 3

  const createSlash = useCallback((clientX, clientY) => {
    if (activeSlashes.current >= maxSlash) return
    activeSlashes.current++

    const container = containerRef.current
    if (!container) return

    const angle = -30 + Math.random() * 15
    const slashLength = 220

    // Create slash element
    const slash = document.createElement('div')
    slash.className = 'knife-slash-container'
    slash.style.cssText = `left:${clientX}px;top:${clientY}px;transform:translate(-50%,-50%) rotate(${angle}deg) scale(0.3);opacity:0;`
    slash.innerHTML = `
      <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
        <defs>
          <linearGradient id="bg-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(200,200,210,0.9)"/>
            <stop offset="40%" stop-color="rgba(230,230,240,1)"/>
            <stop offset="70%" stop-color="rgba(180,180,195,0.95)"/>
            <stop offset="100%" stop-color="rgba(140,140,155,0.8)"/>
          </linearGradient>
        </defs>
        <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(78,38,226,0.5)" stroke-width="1.5" stroke-dasharray="200" stroke-dashoffset="200"/>
        <path d="M 10 28 L 170 22 C 180 21 190 25 195 28 C 190 31 180 35 170 34 L 10 32 Z" fill="url(#bg-${Date.now()})"/>
        <path d="M 10 30 L 170 27" stroke="rgba(255,255,255,0.4)" stroke-width="0.5" stroke-dasharray="160" stroke-dashoffset="160"/>
        <path d="M 50 31 L 160 28" stroke="rgba(78,38,226,0.4)" stroke-width="1" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"/>
        <rect x="2" y="22" width="12" height="16" rx="1" fill="rgba(60,50,40,0.9)" stroke="rgba(78,38,226,0.3)" stroke-width="0.5"/>
        <rect x="12" y="20" width="2" height="20" rx="0.5" fill="rgba(100,90,80,0.8)"/>
      </svg>
    `
    container.appendChild(slash)

    // Create trail
    const rad = (angle * Math.PI) / 180
    const endX = clientX + Math.cos(rad) * slashLength
    const endY = clientY + Math.sin(rad) * slashLength
    const trail = document.createElement('div')
    trail.className = 'knife-trail'
    trail.style.cssText = `inset:0;`
    trail.innerHTML = `
      <svg class="fixed inset-0 w-full h-full" style="pointer-events:none">
        <defs>
          <linearGradient id="tg-${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(78,38,226,0.5)"/>
            <stop offset="100%" stop-color="rgba(78,38,226,0)"/>
          </linearGradient>
        </defs>
        <line x1="${clientX}" y1="${clientY}" x2="${endX}" y2="${endY}" stroke="url(#tg-${Date.now()})" stroke-width="2" stroke-linecap="round" stroke-dasharray="${slashLength}" stroke-dashoffset="${slashLength}"/>
        <line x1="${clientX}" y1="${clientY}" x2="${endX}" y2="${endY}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" stroke-dasharray="${slashLength}" stroke-dashoffset="${slashLength}"/>
      </svg>
    `
    container.appendChild(trail)

    // Create flash
    const flash = document.createElement('div')
    flash.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:9996;background:radial-gradient(ellipse at center, rgba(78,38,226,0.08), transparent 70%);opacity:0.15;`
    container.appendChild(flash)

    // Animate with GSAP-style manual animation
    const start = performance.now()
    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / SLASH_LIFETIME, 1)

      // Knife appear and scale
      const scaleProgress = Math.min(elapsed / 150, 1)
      const easeOut = 1 - Math.pow(1 - scaleProgress, 3)
      slash.style.transform = `translate(-50%,-50%) rotate(${angle}deg) scale(${0.3 + easeOut * 0.7})`
      slash.style.opacity = scaleProgress < 0.5 ? scaleProgress * 2 : 1 - (scaleProgress - 0.5) * 2 * 0.3

      // Trail animate
      const trailEl = trail.querySelector('line')
      if (trailEl) {
        trailEl.style.strokeDashoffset = slashLength * (1 - easeOut)
      }
      const lines = trail.querySelectorAll('line')
      lines.forEach(l => {
        l.style.strokeDashoffset = String(slashLength * (1 - easeOut))
      })
      trail.style.opacity = String(1 - progress)

      // Flash fade
      flash.style.opacity = String(0.15 * (1 - progress))

      // Fade out at end
      if (progress > 0.6) {
        slash.style.opacity = String((1 - progress) / 0.4)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        slash.remove()
        trail.remove()
        flash.remove()
        activeSlashes.current--
      }
    }
    requestAnimationFrame(animate)
  }, [])

  // Click trigger
  useEffect(() => {
    const handleClick = (e) => createSlash(e.clientX, e.clientY)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [createSlash])

  // Scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - lastScrollY.current) > 120) {
        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200
        const y = window.innerHeight / 2 + (Math.random() - 0.5) * 150
        createSlash(x, y)
        lastScrollY.current = currentY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [createSlash])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
}
