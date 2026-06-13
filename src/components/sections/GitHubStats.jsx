import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GitHubStats() {
  const sectionRef = useRef(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/mukherjeeanshuman122-commits')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.stats-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.stats-grid'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.stats-grid'), start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const statItems = stats ? [
    { label: 'Public Repos', value: stats.public_repos || 0, icon: '📁' },
    { label: 'Followers', value: stats.followers || 0, icon: '👥' },
    { label: 'Following', value: stats.following || 0, icon: '🔗' },
    { label: 'Gists', value: stats.public_gists || 0, icon: '📝' },
  ] : []

  return (
    <section ref={sectionRef} className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 stats-header">
          <span className="section-label">Live Data</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4">GitHub <span className="gradient-text">Stats</span></h2>
          <p className="text-white/35 mt-3 text-sm font-mono">Fetched live from GitHub API</p>
        </div>

        <div className="stats-grid glass rounded-2xl p-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="text-center space-y-2 animate-pulse">
                  <div className="w-10 h-10 mx-auto bg-white/5 rounded-xl" />
                  <div className="h-6 w-12 mx-auto bg-white/5 rounded" />
                  <div className="h-3 w-16 mx-auto bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <img src={stats.avatar_url} alt={stats.login} className="w-14 h-14 rounded-xl" style={{ border: '2px solid rgba(139,32,32,0.2)' }} />
                <div>
                  <p className="text-white/80 font-semibold">{stats.name || stats.login}</p>
                  <p className="text-white/35 text-xs font-mono">@{stats.login}</p>
                  {stats.bio && <p className="text-white/45 text-xs mt-1">{stats.bio}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {statItems.map((item) => (
                  <div key={item.label} className="text-center group">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-2xl font-bold text-white/80 group-hover:text-bone transition-colors">{item.value}</div>
                    <div className="text-[10px] text-white/35 font-mono uppercase tracking-wider mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-white/30 text-sm font-mono">Unable to fetch GitHub stats</div>
          )}
        </div>
      </div>
    </section>
  )
}
