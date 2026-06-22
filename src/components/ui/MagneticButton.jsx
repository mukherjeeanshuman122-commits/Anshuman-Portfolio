import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', onClick, as = 'button', href, style, ...props }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.35, y: y * 0.35 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])

  const MotionComponent = as === 'a' ? motion.a : motion.button

  const sharedProps = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.8 },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    style: {
      ...style,
      position: 'relative',
    },
    ...props,
  }

  if (as === 'a' && href) {
    return (
      <MotionComponent href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
        {children}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12), transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
        )}
      </MotionComponent>
    )
  }
  return (
    <MotionComponent onClick={onClick} {...sharedProps}>
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12), transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      )}
    </MotionComponent>
  )
}
