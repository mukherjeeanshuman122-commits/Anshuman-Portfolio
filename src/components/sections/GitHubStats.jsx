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
    { label: 'Public Repos', value: stats.public_repos || 0, svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mx-auto"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg> },
    { label: 'Followers', value: stats.followers || 0, svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mx-auto"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg> },
    { label: 'Following', value: stats.following || 0, svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mx-auto"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg> },
    { label: 'Gists', value: stats.public_gists || 0, svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mx-auto"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
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
                    <div className="text-blood/60 group-hover:text-bone/60 mb-1 transition-colors">{item.svg}</div>
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
