import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)
  const { isLowEnd } = useDevicePerformance()

  useEffect(() => {
    if (isLowEnd) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [isLowEnd])

  return <>{children}</>
}
