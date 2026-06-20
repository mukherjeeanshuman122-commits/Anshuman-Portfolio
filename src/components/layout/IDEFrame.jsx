import { useState, useEffect, useRef } from 'react'
import { personalInfo } from '../../data/portfolio'

const fileTabs = [
  { name: 'home.tsx', section: 'home', icon: 'tsx' },
  { name: 'about.tsx', section: 'about', icon: 'tsx' },
  { name: 'skills.tsx', section: 'skills', icon: 'tsx' },
  { name: 'projects.tsx', section: 'projects', icon: 'tsx' },
  { name: 'experience.tsx', section: 'experience', icon: 'tsx' },
  { name: 'pricing.tsx', section: 'pricing', icon: 'tsx' },
  { name: 'contact.tsx', section: 'contact', icon: 'tsx' },
]

const activityBarItems = [
  { icon: <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>, section: 'home', label: 'Explorer' },
  { icon: <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>, section: 'search', label: 'Search' },
  { icon: <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>, section: 'projects', label: 'Files' },
  { icon: <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>, section: 'contact', label: 'Editor' },
]

export default function IDEFrame({ children }) {
  const [activeSection, setActiveSection] = useState('home')
  const [activeTab, setActiveTab] = useState('home.tsx')
  const [time, setTime] = useState('')
  const [lineCol, setLineCol] = useState('Ln 1, Col 1')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = fileTabs.map(t => document.getElementById(t.section)).filter(Boolean)
      const scrollY = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          const section = fileTabs[i].section
          setActiveSection(section)
          setActiveTab(fileTabs[i].name)
          const lines = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 500) + 1
          setLineCol(`Ln ${lines}, Col 1`)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabClick = (tab) => {
    setActiveTab(tab.name)
    const el = document.getElementById(tab.section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="ide-container">
      {/* Title Bar */}
      <div className="ide-titlebar">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 ml-1">
            <span className="w-3 h-3 rounded-full bg-blood/70 hover:bg-blood transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer" />
          </div>
          <span className="text-[10px] text-white/25 font-mono ml-2 hidden sm:inline">portfolio — Visual Studio Code</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-white/20 font-mono hidden md:inline">{personalInfo.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-white/20 font-mono">{time}</span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="ide-tabbar">
        <div className="flex overflow-x-auto no-scrollbar">
          {fileTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab)}
              className={`ide-tab flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.name ? 'ide-tab-active' : 'text-white/30 hover:text-white/50'
              }`}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={activeTab === tab.name ? '#569cd6' : 'currentColor'} strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ide-main">
        {/* Activity Bar */}
        <div className="ide-activitybar">
          {activityBarItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                const el = document.getElementById(item.section)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-full py-3 flex items-center justify-center transition-all duration-150 ${
                activeSection === item.section
                  ? 'text-white/70 border-l-2 border-blood'
                  : 'text-white/25 hover:text-white/45 border-l-2 border-transparent'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="ide-content">
          {children}
        </div>
      </div>

      {/* Status Bar */}
      <div className="ide-statusbar">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blood/20">
            <svg className="w-3 h-3 text-bone/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className="text-[9px] font-mono text-bone/50">TSX</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500/70" />
            <span className="text-[9px] font-mono text-white/30">main</span>
          </div>
          <span className="text-[9px] font-mono text-white/20 hidden sm:inline">UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-white/25 hidden sm:inline">{lineCol}</span>
          <span className="text-[9px] font-mono text-white/25 hidden md:inline">Spaces: 2</span>
          <span className="text-[9px] font-mono text-white/25 hidden md:inline">LF</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5" style={{ background: 'rgba(78,38,226,0.15)' }}>
            <svg className="w-3 h-3 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[9px] font-mono text-blood/50">Secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
