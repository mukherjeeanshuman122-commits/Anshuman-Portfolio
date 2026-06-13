export default function CrimeSceneTape() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9996] overflow-hidden opacity-[0.03]">
      <div
        className="absolute w-[200%] h-6 -rotate-12"
        style={{
          top: '20%', left: '-50%',
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(139,32,32,0.4) 40px, rgba(139,32,32,0.4) 42px, transparent 42px, transparent 80px)',
        }}
      />
      <div
        className="absolute w-[200%] h-6 rotate-6"
        style={{
          top: '55%', left: '-50%',
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(139,32,32,0.3) 40px, rgba(139,32,32,0.3) 42px, transparent 42px, transparent 80px)',
        }}
      />
      <div
        className="absolute w-[200%] h-6 rotate-[2deg]"
        style={{
          top: '85%', left: '-50%',
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(139,32,32,0.25) 30px, rgba(139,32,32,0.25) 32px, transparent 32px, transparent 60px)',
        }}
      />
    </div>
  )
}
