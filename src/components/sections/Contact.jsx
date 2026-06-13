import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../../data/portfolio'
import GlowCard from '../ui/GlowCard'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const EMAILJS_SERVICE_ID = 'service_tf0o23b'
const EMAILJS_TEMPLATE_ID = 'template_a23ltft'
const EMAILJS_PUBLIC_KEY = 'DMmlvkuW3SBBJVFt6'

function FormField({ label, name, type = 'text', value, onChange, placeholder, required = true, rows }) {
  const [focused, setFocused] = useState(false)
  const inputClasses = `w-full px-4 py-3 bg-black/40 text-white text-sm placeholder-white/30 focus:outline-none transition-all duration-200 font-mono resize-none`
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-medium uppercase tracking-wider transition-colors duration-200 font-mono" style={{ color: focused ? 'rgba(139,32,32,0.8)' : 'rgba(255,255,255,0.45)' }}>{label}</label>
      {rows ? (
        <textarea name={name} value={value} onChange={(e) => { onChange(e) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} rows={rows} className={inputClasses} placeholder={placeholder}
          style={{ border: `1px solid ${focused ? 'rgba(139,32,32,0.3)' : 'rgba(255,255,255,0.07)'}` }} />
      ) : (
        <input type={type} name={name} value={value} onChange={(e) => { onChange(e) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} className={inputClasses} placeholder={placeholder}
          style={{ border: `1px solid ${focused ? 'rgba(139,32,32,0.3)' : 'rgba(255,255,255,0.07)'}` }} />
      )}
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const handleCopyEmail = () => { navigator.clipboard.writeText(personalInfo.email); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
      setFormState({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
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
      gsap.fromTo(sectionRef.current.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.contact-left'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.contact-left'), start: 'top 85%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.contact-right'),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.contact-right'), start: 'top 85%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 section-header">
          <span className="section-label">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4">Let's <span className="gradient-text">Work Together</span></h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">Have a project in mind? Let's build something amazing.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4 contact-left">
            <GlowCard className="p-6 space-y-6" style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="relative"><div className="w-2.5 h-2.5 bg-bone/40" /><div className="absolute -inset-1 border border-bone/15 animate-pulse" /></div>
                <div><p className="text-sm font-medium text-white/75">{personalInfo.availability}</p><p className="text-xs text-white/45">{personalInfo.responseTime}</p></div>
              </div>
              <div className="space-y-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/45 font-medium uppercase tracking-wider font-mono">Email</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/60 truncate font-mono">{personalInfo.email}</span>
                    <button onClick={handleCopyEmail} className="shrink-0 px-3 py-1 text-xs font-medium bg-white/5 text-white/70 transition-all duration-200 font-mono" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                      {copied ? <span className="text-bone/70">Copied!</span> : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="space-y-1"><span className="text-[10px] text-white/45 font-medium uppercase tracking-wider font-mono">Location</span><p className="text-sm text-white/60 font-mono">{personalInfo.location}</p></div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/45 font-medium uppercase tracking-wider font-mono">Social</span>
                  <div className="flex gap-2">
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 text-white/50 transition-all duration-200 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
          <div className="lg:col-span-3 contact-right">
            <GlowCard className="p-6" style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Name" name="name" value={formState.name} onChange={handleChange} placeholder="John Doe" />
                  <FormField label="Email" name="email" type="email" value={formState.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <FormField label="Subject" name="subject" value={formState.subject} onChange={handleChange} placeholder="Project Inquiry" />
                <FormField label="Message" name="message" value={formState.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} />
                <MagneticButton type="submit" className="w-full px-6 py-3.5 text-sm font-semibold text-bone transition-all duration-200 font-mono"
                  style={{ background: 'rgba(139,32,32,0.2)', border: '1px solid rgba(139,32,32,0.3)', boxShadow: '0 0 20px rgba(139,32,32,0.08)' }}>
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>Message Sent!
                    </span>
                  ) : sending ? (
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      <span className="w-4 h-4 border-2 border-bone/30 border-t-bone rounded-full animate-spin" />Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      Send Message<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </span>
                  )}
                </MagneticButton>
              </form>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  )
}
