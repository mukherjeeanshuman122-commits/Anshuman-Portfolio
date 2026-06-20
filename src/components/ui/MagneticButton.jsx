import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', onClick, as = 'button', href, style, ...props }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const MotionComponent = as === 'a' ? motion.a : motion.button

  const sharedProps = {
    ref,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring', stiffness: 350, damping: 25, mass: 1 },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    style,
    ...props,
  }

  if (as === 'a' && href) {
    return <MotionComponent href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>{children}</MotionComponent>
  }
  return <MotionComponent onClick={onClick} {...sharedProps}>{children}</MotionComponent>
}
