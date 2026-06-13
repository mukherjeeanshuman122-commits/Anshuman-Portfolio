import { useTilt } from '../../hooks/useTilt'

export default function TiltCard({ children, className = '', maxTilt = 12, ...props }) {
  const { ref, style, handlers } = useTilt(maxTilt)

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      {...handlers}
      {...props}
    >
      {children}
    </div>
  )
}
