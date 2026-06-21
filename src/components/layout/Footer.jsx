import { personalInfo } from '../../data/portfolio'

function SocialIcon({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="p-2 text-white/45 transition-all duration-300 hover:text-white/65 hover:-translate-y-0.5 active:scale-95"
      style={{
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.1)',
        borderRadius: '3px',
      }}>
      {children}
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(99,102,241,0.06)' }}>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-bone/90">{'<'}Anshuman{' />'}</h3>
            <p className="text-xs text-white/45 leading-relaxed max-w-xs">
              {personalInfo.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] text-white/40 font-mono">{personalInfo.availability}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/35 font-mono">Navigation</h4>
            <div className="flex flex-col gap-1.5">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="text-xs text-white/45 hover:text-white/65 transition-colors duration-300 w-fit font-mono">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/35 font-mono">Contact</h4>
            <div className="space-y-1.5">
              <a href={`mailto:${personalInfo.email}`}
                className="block text-xs text-white/50 hover:text-white/70 transition-colors duration-300 font-mono">
                {personalInfo.email}
              </a>
              <p className="text-xs text-white/40 font-mono">{personalInfo.location}</p>
            </div>
            <div className="flex gap-2 pt-1">
              <SocialIcon href={personalInfo.github}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${personalInfo.email}`}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(99,102,241,0.06)' }}>
          <p className="text-[10px] text-white/25 font-mono">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-3 text-[10px] text-white/25">
            <button onClick={() => { const el = document.getElementById('home'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }}
              className="hover:text-white/50 transition-colors flex items-center gap-1 font-mono">
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
