import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const EMAILJS_SERVICE_ID = 'service_tf0o23b'
const EMAILJS_TEMPLATE_ID = 'template_a23ltft'
const EMAILJS_PUBLIC_KEY = 'DMmlvkuW3SBBJVFt6'

const MAX_MESSAGE_LENGTH = 500

function FloatingInput({ label, name, type = 'text', value, onChange, placeholder, required = true, icon }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative group">
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(78,38,226,0.15), transparent 40%, rgba(78,38,226,0.08))' }} />
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
          style={{ color: focused ? 'rgba(114,49,236,0.8)' : 'rgba(255,255,255,0.2)', transform: isActive ? 'translateY(-24px) scale(0.7)' : 'translateY(-50%) scale(1)', left: '16px', transformOrigin: 'left center' }}>
          {icon}
        </div>
        <input
          type={type} name={name} value={value} onChange={onChange} required={required}
          placeholder={focused ? placeholder : ''}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="contact-input w-full pl-11 pr-4 pt-5 pb-2 text-sm font-mono rounded-xl transition-all duration-300"
        />
        <label className="absolute left-11 transition-all duration-300 pointer-events-none font-mono"
          style={{
            top: isActive ? '10px' : '50%',
            transform: isActive ? 'translateY(0) scale(0.75)' : 'translateY(-50%) scale(1)',
            color: focused ? 'rgba(114,49,236,0.9)' : 'rgba(255,255,255,0.35)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            left: '44px',
            transformOrigin: 'left center',
          }}>
          {label}
        </label>
        <div className="absolute bottom-0 left-4 right-4 h-[1px] overflow-hidden rounded-full">
          <div className="h-full transition-all duration-500 ease-out"
            style={{
              width: focused ? '100%' : '0%',
              background: 'linear-gradient(90deg, rgba(78,38,226,0.6), rgba(114,49,236,0.4), rgba(78,38,226,0.6))',
            }} />
        </div>
      </div>
    </div>
  )
}

function FloatingTextarea({ label, name, value, onChange, placeholder, required = true, maxLength = MAX_MESSAGE_LENGTH }) {
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef(null)
  const isActive = focused || value.length > 0
  const charCount = value.length
  const charPercent = (charCount / maxLength) * 100

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [value])

  return (
    <div className="relative group">
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(78,38,226,0.15), transparent 40%, rgba(78,38,226,0.08))' }} />
      <div className="relative">
        <div className="absolute left-4 top-5 transition-all duration-300 pointer-events-none"
          style={{ color: focused ? 'rgba(114,49,236,0.8)' : 'rgba(255,255,255,0.2)' }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <textarea
          ref={textareaRef} name={name} value={value} onChange={onChange} required={required}
          placeholder={focused ? placeholder : ''}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={4}
          maxLength={maxLength}
          className="contact-input w-full pl-11 pr-4 pt-5 pb-2 text-sm font-mono rounded-xl transition-all duration-300 resize-none"
        />
        <label className="absolute left-11 transition-all duration-300 pointer-events-none font-mono"
          style={{
            top: isActive ? '10px' : '20px',
            transform: isActive ? 'scale(0.75)' : 'scale(1)',
            color: focused ? 'rgba(114,49,236,0.9)' : 'rgba(255,255,255,0.35)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            left: '44px',
            transformOrigin: 'left center',
          }}>
          {label}
        </label>
        <div className="absolute bottom-0 left-4 right-4 h-[1px] overflow-hidden rounded-full">
          <div className="h-full transition-all duration-500 ease-out"
            style={{
              width: focused ? '100%' : '0%',
              background: 'linear-gradient(90deg, rgba(78,38,226,0.6), rgba(114,49,236,0.4), rgba(78,38,226,0.6))',
            }} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 px-1">
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-wider">
          {focused ? 'Typing...' : `${maxLength} chars max`}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(charPercent, 100)}%`,
                background: charPercent > 90 ? 'rgba(239,68,68,0.7)' : charPercent > 70 ? 'rgba(234,179,8,0.6)' : 'rgba(78,38,226,0.5)',
              }} />
          </div>
          <span className="text-[9px] font-mono" style={{ color: charPercent > 90 ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.2)' }}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  )
}

function SubmitButton({ sending, submitted }) {
  const btnRef = useRef(null)

  return (
    <button ref={btnRef} type="submit" disabled={sending || submitted}
      className="submit-btn relative w-full py-4 rounded-xl font-mono text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300 disabled:cursor-not-allowed group">
      <div className="absolute inset-0 rounded-xl" style={{
        background: submitted
          ? 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))'
          : 'linear-gradient(135deg, rgba(78,38,226,0.25), rgba(114,49,236,0.15), rgba(78,38,226,0.25))',
        border: `1px solid ${submitted ? 'rgba(34,197,94,0.2)' : 'rgba(78,38,226,0.3)'}`,
      }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(114,49,236,0.15), transparent 60%)' }} />
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'conic-gradient(from 0deg, transparent, rgba(78,38,226,0.1), transparent 30%)', animation: 'spin 4s linear infinite' }} />
      </div>
      <span className="relative z-10 flex items-center justify-center gap-3">
        {submitted ? (
          <>
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-green-400">Message Sent Successfully</span>
          </>
        ) : sending ? (
          <>
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-2 border-transparent border-t-blood rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
            </div>
            <span className="text-white/70">Sending Evidence...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span>Transmit Message</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </span>
    </button>
  )
}

function ContactCard({ icon, label, value, href, onClick, delay = 0 }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={cardRef}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="contact-card group relative p-4 rounded-xl cursor-pointer transition-all duration-300"
      style={{
        background: hovered ? 'rgba(78,38,226,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(78,38,226,0.2)' : 'rgba(255,255,255,0.04)'}`,
      }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? 'rgba(78,38,226,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hovered ? 'rgba(78,38,226,0.25)' : 'rgba(255,255,255,0.06)'}`,
          }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-mono uppercase tracking-wider text-white/30 mb-0.5">{label}</p>
          <p className="text-xs font-mono text-white/65 truncate group-hover:text-white/85 transition-colors">{value}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
          {onClick ? (
            <svg className="w-3.5 h-3.5 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

function SuccessOverlay({ onDone }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setTimeout(onDone, 2000) })
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      tl.fromTo('.success-check', { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.1')
      tl.fromTo('.success-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      tl.fromTo('.success-particle', { scale: 0, opacity: 1 }, {
        scale: 1, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out'
      }, '-=0.3')
    })
    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={overlayRef} className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl overflow-hidden"
      style={{ background: 'rgba(5,5,5,0.95)' }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} className="success-particle absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? '#4E26E2' : i % 3 === 1 ? '#E8E4D9' : '#7231EC',
            top: '50%', left: '50%',
            transform: `translate(-50%, -50%) translate(${Math.cos(i * 30 * Math.PI / 180) * 80}px, ${Math.sin(i * 30 * Math.PI / 180) * 80}px)`,
          }} />
      ))}
      <div className="text-center relative z-10">
        <div className="success-check w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ border: '2px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)' }}>
          <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="success-text text-sm font-mono text-white/70">Evidence transmitted successfully</p>
        <p className="success-text text-[10px] font-mono text-white/30 mt-1">Response incoming within 24hrs</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const btnRef = useRef(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    btn.style.setProperty('--mouse-x', x + '%')
    btn.style.setProperty('--mouse-y', y + '%')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
      setShowSuccess(true)
      setFormState({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Email send failed:', err)
      alert('Failed to send message. Please try again or email directly.')
    } finally {
      setSending(false)
    }
  }

  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.contact-header'),
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.contact-info-panel'),
        { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.contact-info-panel'), start: 'top 85%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.contact-form-panel'),
        { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.contact-form-panel'), start: 'top 85%', once: true } }
      )
      const cards = sectionRef.current.querySelectorAll('.contact-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 + i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 contact-header">
          <span className="section-label">Contact</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-6 contact-info-panel">
            <div className="liquid-glass rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)', animation: 'glowPulse 2s ease-in-out infinite' }} />
                  <div className="absolute -inset-1.5 border border-green-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/75">{personalInfo.availability}</p>
                  <p className="text-[10px] text-white/35 font-mono">{personalInfo.responseTime}</p>
                </div>
              </div>

              <div className="space-y-3">
                <ContactCard
                  icon={<svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                  label="Email" value={personalInfo.email} onClick={handleCopyEmail}
                />
                <ContactCard
                  icon={<svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                  label="Location" value={personalInfo.location}
                />
                <ContactCard
                  icon={<svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>}
                  label="GitHub" value="@anshuman" href={personalInfo.github}
                />
              </div>
            </div>

            <div className="liquid-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3.5 h-3.5 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/30">Quick Info</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Avg. Response', value: '< 24 hours' },
                  { label: 'Preferred', value: 'Email' },
                  { label: 'Timezone', value: 'IST (GMT+5:30)' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <span className="text-[9px] font-mono text-white/25 uppercase tracking-wider">{item.label}</span>
                    <span className="text-[10px] font-mono text-white/50">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-8 contact-form-panel">
            <div className="liquid-glass rounded-2xl p-8 relative overflow-hidden">
              {showSuccess && <SuccessOverlay onDone={() => setShowSuccess(false)} />}

              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(78,38,226,0.08), transparent 70%)' }} />

              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(78,38,226,0.1)', border: '1px solid rgba(78,38,226,0.15)' }}>
                  <svg className="w-4 h-4 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-mono font-semibold text-white/70">New Message</h3>
                  <p className="text-[9px] font-mono text-white/25">Fill in the evidence log</p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" onMouseMove={handleMouseMove}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput label="Your Name" name="name" value={formState.name} onChange={handleChange}
                    placeholder="John Doe" icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} />
                  <FloatingInput label="Email Address" name="email" type="email" value={formState.email} onChange={handleChange}
                    placeholder="john@example.com" icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>} />
                </div>
                <FloatingInput label="Subject" name="subject" value={formState.subject} onChange={handleChange}
                  placeholder="Project Inquiry" icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>} />
                <FloatingTextarea label="Your Message" name="message" value={formState.message} onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..." />

                <div ref={btnRef}>
                  <SubmitButton sending={sending} submitted={submitted} />
                </div>
              </form>

              <div className="mt-6 pt-5 flex items-center justify-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <svg className="w-3 h-3 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="text-[9px] font-mono text-white/20">End-to-end encrypted • Your data stays private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
