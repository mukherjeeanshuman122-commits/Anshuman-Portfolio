import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 30,
      x = 0,
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      stagger = 0,
      children = false,
    } = options

    const targets = children ? el.children : el

    gsap.fromTo(targets,
      { opacity: 0, y, x },
      {
        opacity: 1, y: 0, x: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return ref
}

export function useScrollRevealMultiple(refs, options = {}) {
  useEffect(() => {
    const { y = 30, duration = 0.8, stagger = 0.1, start = 'top 85%' } = options

    refs.forEach((ref, i) => {
      const el = ref.current
      if (!el) return

      gsap.fromTo(el,
        { opacity: 0, y },
        {
          opacity: 1, y: 0,
          duration,
          delay: i * stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
}
