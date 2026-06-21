const markers = [
  { id: 1, label: 'EVIDENCE A-01', x: '8%', y: '15%', rotation: 12 },
  { id: 2, label: 'EVIDENCE B-02', x: '85%', y: '25%', rotation: -8 },
  { id: 3, label: 'EVIDENCE C-03', x: '12%', y: '70%', rotation: 5 },
  { id: 4, label: 'EVIDENCE D-04', x: '88%', y: '80%', rotation: -15 },
  { id: 5, label: 'EVIDENCE E-05', x: '50%', y: '5%', rotation: 3 },
]

export default function FloatingEvidence() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 hidden lg:block">
      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{ left: m.x, top: m.y, transform: `rotate(${m.rotation}deg)` }}
        >
          <div
            className="px-3 py-1.5 text-[7px] font-mono tracking-[0.2em] text-blood/40"
            style={{
              border: '1px solid rgba(78,38,226,0.12)',
              background: 'rgba(10,10,10,0.8)',
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  )
}
