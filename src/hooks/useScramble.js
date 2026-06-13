import { useState, useEffect, useCallback } from 'react'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function useScramble(text, triggerOnHover = true) {
  const [display, setDisplay] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  const scramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)
    const iterations = text.length * 2
    let count = 0

    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < count / 2) return text[i]
            if (char === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      count++
      if (count > iterations) {
        clearInterval(interval)
        setDisplay(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text, isScrambling])

  useEffect(() => {
    setDisplay(text)
  }, [text])

  return { display, scramble, isScrambling }
}
