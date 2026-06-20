import { useState, useEffect, useRef } from 'react'


export default function GlitchText({ text, className = '', as: Tag = 'span', intensity = 'medium' }) {
  const [glitching, setGlitching] = useState(false)
  const intervalRef = useRef(null)

  const configs = {
    low: { interval: 8000, duration: 150 },
    medium: { interval: 4000, duration: 200 },
    high: { interval: 2000, duration: 300 },
  }
  const config = configs[intensity]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), config.duration)
    }, config.interval)
    return () => clearInterval(intervalRef.current)
  }, [config.interval, config.duration])

  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={text}
      style={glitching ? {
        textShadow: `-3px 0 rgba(92,26,26,0.6), 3px 0 rgba(194,194,180,0.3)`,
        transform: `skewX(${Math.random() * 2 - 1}deg)`,
      } : {}}
    >
      {text}
    </Tag>
  )
}
