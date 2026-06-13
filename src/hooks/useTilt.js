import { useState, useRef, useCallback } from 'react'

export function useTilt(maxTilt = 15) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 })
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({
      x: ((y - centerY) / centerY) * -maxTilt,
      y: ((x - centerX) / centerX) * maxTilt,
      scale: 1.02,
    })
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, scale: 1 })
  }, [])

  const style = {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
    transition: 'transform 0.15s ease-out',
    transformStyle: 'preserve-3d',
  }

  return { ref, style, handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave } }
}
