import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = {
  frontend: [
    {
      name: 'Starter',
      price: '2,999',
      period: 'one-time',
      tagline: 'Perfect for personal portfolios and small businesses.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
      features: [
        { text: 'Up to 3 Pages', highlight: true },
        { text: 'Modern Responsive Design' },
        { text: 'Mobile Friendly' },
        { text: 'Contact Section' },
        { text: 'Basic Animations' },
        { text: 'Basic SEO Setup' },
        { text: 'Social Media Links' },
        { text: '1 Revision' },
        { text: 'Delivery: 2–4 Days', highlight: true },
      ],
    },
    {
      name: 'Professional',
      price: '5,999',
      period: 'one-time',
      tagline: 'Perfect for businesses looking for a premium online presence.',
      popular: true,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      features: [
        { text: 'Up to 6 Pages', highlight: true },
        { text: 'Premium UI/UX Design' },
        { text: 'Responsive Design' },
        { text: 'Contact Form' },
        { text: 'Google Maps Integration' },
        { text: 'Advanced Animations' },
        { text: 'Social Media Integration' },
        { text: 'Gallery Section' },
        { text: 'Basic Blog Section' },
        { text: 'Advanced SEO Setup' },
        { text: '3 Revisions' },
        { text: 'Delivery: 4–7 Days', highlight: true },
      ],
    },
    {
      name: 'Premium',
      price: '11,999',
      period: 'one-time',
      tagline: 'Perfect for professional brands and companies.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
      features: [
        { text: 'Up to 12 Pages', highlight: true },
        { text: 'Fully Custom Design' },
        { text: 'Premium UI/UX' },
        { text: 'Advanced Animations' },
        { text: 'Glassmorphism Design' },
        { text: 'Blog System' },
        { text: 'Gallery System' },
        { text: 'Testimonials Section' },
        { text: 'Contact Forms' },
        { text: 'Advanced SEO' },
        { text: 'Speed Optimization' },
        { text: 'Social Media Integration' },
        { text: 'Unlimited Minor Revisions', highlight: true },
        { text: 'Priority Support', highlight: true },
        { text: 'Delivery: 7–12 Days', highlight: true },
      ],
    },
  ],
  fullstack: [
    {
      name: 'Starter',
      price: '3,999',
      period: 'one-time',
      tagline: 'Perfect for businesses needing basic data storage.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
      features: [
        { text: 'Everything from Frontend Starter', highlight: true },
        { text: 'Admin Dashboard' },
        { text: 'Database Integration' },
        { text: 'Contact Form Storage' },
        { text: 'Dynamic Content' },
        { text: 'Basic Data Management' },
        { text: '1 Revision' },
        { text: 'Delivery: 3–5 Days', highlight: true },
      ],
    },
    {
      name: 'Professional',
      price: '7,999',
      period: 'one-time',
      tagline: 'Perfect for growing businesses.',
      popular: true,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      features: [
        { text: 'Everything from Frontend Professional', highlight: true },
        { text: 'Secure Admin Panel' },
        { text: 'User Login System' },
        { text: 'Database Management' },
        { text: 'Dashboard Analytics' },
        { text: 'Dynamic Website Content' },
        { text: 'Form Management' },
        { text: 'User Data Management' },
        { text: 'Up to 500 Records' },
        { text: '3 Revisions' },
        { text: 'Delivery: 5–10 Days', highlight: true },
      ],
    },
    {
      name: 'Premium',
      price: '14,999',
      period: 'one-time',
      tagline: 'Perfect for advanced business websites.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
      features: [
        { text: 'Everything from Frontend Premium', highlight: true },
        { text: 'Advanced Admin Dashboard' },
        { text: 'User Authentication' },
        { text: 'Content Management System' },
        { text: 'Analytics Dashboard' },
        { text: 'Role Based Access' },
        { text: 'Unlimited Database Records', highlight: true },
        { text: 'Advanced Security' },
        { text: 'Cloud Ready Architecture' },
        { text: 'Premium Support' },
        { text: 'Unlimited Minor Revisions', highlight: true },
        { text: 'Delivery: 7–15 Days', highlight: true },
      ],
    },
  ],
  builder: [
    {
      name: 'Starter',
      price: '1,499',
      period: 'one-time',
      tagline: 'Perfect for simple websites.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
      features: [
        { text: 'Up to 3 Pages', highlight: true },
        { text: 'Theme Setup' },
        { text: 'Mobile Friendly' },
        { text: 'Contact Information Setup' },
        { text: 'Basic Design' },
        { text: 'Delivery: 1–2 Days', highlight: true },
      ],
    },
    {
      name: 'Professional',
      price: '2,599',
      period: 'one-time',
      tagline: 'Perfect for business showcase websites.',
      popular: true,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
      features: [
        { text: 'Up to 5 Pages', highlight: true },
        { text: 'Premium Theme Setup' },
        { text: 'Contact Form' },
        { text: 'Gallery Section' },
        { text: 'Social Media Integration' },
        { text: 'Mobile Optimization' },
        { text: 'Basic SEO' },
        { text: 'Delivery: 2–4 Days', highlight: true },
      ],
    },
    {
      name: 'Premium',
      price: '4,999',
      period: 'one-time',
      tagline: 'Perfect for businesses wanting a professional website.',
      popular: false,
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
      features: [
        { text: 'Up to 10 Pages', highlight: true },
        { text: 'Premium Theme Customization' },
        { text: 'Gallery' },
        { text: 'Testimonials' },
        { text: 'Contact Forms' },
        { text: 'Business Information Setup' },
        { text: 'Social Media Integration' },
        { text: 'Mobile Optimization' },
        { text: 'Basic SEO Setup' },
        { text: 'Delivery: 3–5 Days', highlight: true },
      ],
    },
  ],
}

const categories = [
  { id: 'frontend', label: 'Frontend Development', shortLabel: 'Frontend', desc: 'HTML, CSS, JS, React', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { id: 'fullstack', label: 'Frontend + Backend', shortLabel: 'Full Stack', desc: 'React + Node/Firebase', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
  { id: 'builder', label: 'Website Builder', shortLabel: 'Builder', desc: 'Wix, Shopify, Odoo', icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg> },
]

function PricingCard({ plan, index }) {
  const cardRef = useRef(null)
  const btnRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    btn.style.setProperty('--mouse-x', x + '%')
    btn.style.setProperty('--mouse-y', y + '%')
  }, [])

  const handleBuy = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`pricing-card relative flex flex-col rounded-2xl transition-all duration-500 ${plan.popular ? 'pricing-popular scale-[1.02]' : ''}`}
      style={{
        background: plan.popular
          ? 'linear-gradient(180deg, rgba(78,38,226,0.1) 0%, rgba(78,38,226,0.03) 100%)'
          : hovered
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.015)',
        border: `1px solid ${plan.popular ? 'rgba(78,38,226,0.2)' : hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
      }}
    >
      {plan.popular && (
        <div className="absolute -top-px left-0 right-0 h-[2px] rounded-t-2xl overflow-hidden">
          <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, transparent, #4E26E2, #7231EC, #4E26E2, transparent)' }} />
        </div>
      )}

      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5"
            style={{ background: 'linear-gradient(135deg, #4E26E2, #7231EC)', color: '#E8E4D9', boxShadow: '0 0 20px rgba(78,38,226,0.4), 0 0 40px rgba(78,38,226,0.15)' }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6 pb-4 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: plan.popular ? 'rgba(78,38,226,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${plan.popular ? 'rgba(78,38,226,0.25)' : 'rgba(255,255,255,0.06)'}`,
              color: plan.popular ? '#7231EC' : 'rgba(255,255,255,0.35)',
            }}>
            {plan.icon}
          </div>
          <div>
            <h4 className="text-sm font-mono font-semibold text-white/80">{plan.name}</h4>
            <p className="text-[10px] font-mono text-white/30">{plan.period}</p>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-mono text-white/30 self-start mt-1">₹</span>
            <span className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: plan.popular ? '#E8E4D9' : 'rgba(255,255,255,0.85)' }}>
              {plan.price}
            </span>
          </div>
          <p className="text-[11px] font-mono text-white/30 mt-1.5 leading-relaxed">{plan.tagline}</p>
        </div>

        <div className="my-4 h-[1px]" style={{ background: plan.popular ? 'linear-gradient(90deg, transparent, rgba(78,38,226,0.2), transparent)' : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <div className="space-y-2">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 group/feat">
              {feature.highlight ? (
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: plan.popular ? 'rgba(78,38,226,0.2)' : 'rgba(255,255,255,0.06)' }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? '#7231EC' : 'rgba(255,255,255,0.3)'} strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : (
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? 'rgba(114,49,236,0.5)' : 'rgba(255,255,255,0.15)'} strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span className={`text-[11px] font-mono leading-relaxed ${feature.highlight ? (plan.popular ? 'text-white/70 font-medium' : 'text-white/55') : 'text-white/38'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-4">
        <button
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onClick={handleBuy}
          className="pricing-btn relative w-full py-3.5 rounded-xl text-xs font-mono font-semibold tracking-wider uppercase overflow-hidden transition-all duration-300 group/btn"
        >
          <div className="absolute inset-0 rounded-xl transition-all duration-300"
            style={{
              background: plan.popular
                ? 'linear-gradient(135deg, rgba(78,38,226,0.3), rgba(114,49,236,0.2))'
                : hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${plan.popular ? 'rgba(78,38,226,0.35)' : 'rgba(255,255,255,0.08)'}`,
            }} />
          <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-xl"
            style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(78,38,226,0.15), transparent 60%)' }} />
          <span className="relative z-10 flex items-center justify-center gap-2" style={{ color: plan.popular ? '#E8E4D9' : 'rgba(255,255,255,0.5)' }}>
            <span>Get Started</span>
            <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('frontend')
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.pricing-header'),
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.pricing-tabs'),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.pricing-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
    )
  }, [activeTab])

  const currentPlans = plans[activeTab]

  return (
    <section id="pricing" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 pricing-header">
          <span className="section-label">Pricing</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
            Website Development <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm">
            Transparent pricing for every budget. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="flex justify-center mb-14 pricing-tabs">
          <div className="inline-flex liquid-glass rounded-2xl p-1.5 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="relative flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-xs font-mono font-medium transition-all duration-300"
                style={{
                  color: activeTab === cat.id ? '#E8E4D9' : 'rgba(255,255,255,0.35)',
                }}
              >
                {activeTab === cat.id && (
                  <div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(78,38,226,0.15)', border: '1px solid rgba(78,38,226,0.2)' }} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={activeTab === cat.id ? 'text-blood' : 'text-white/20'}>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.shortLabel}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {currentPlans.map((plan, i) => (
            <PricingCard key={`${activeTab}-${plan.name}`} plan={plan} index={i} />
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'Secure & Reliable', desc: 'All projects delivered with clean, maintainable code' },
            { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, title: 'Fast Delivery', desc: 'Projects completed on time, every time' },
            { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>, title: 'Satisfaction Guaranteed', desc: 'Revisions included until you\'re happy' },
          ].map((item, i) => (
            <div key={i} className="liquid-glass rounded-xl p-5 text-center group hover:border-blood/15 transition-all duration-300">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center text-blood/50 group-hover:text-blood/70 transition-colors"
                style={{ background: 'rgba(78,38,226,0.08)', border: '1px solid rgba(78,38,226,0.1)' }}>
                {item.icon}
              </div>
              <p className="text-xs font-mono font-semibold text-white/65 mb-1">{item.title}</p>
              <p className="text-[10px] font-mono text-white/30">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 liquid-glass rounded-2xl p-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(78,38,226,0.1)', border: '1px solid rgba(78,38,226,0.15)' }}>
              <svg className="w-4 h-4 text-blood/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-white/60 mb-2">Additional Charges</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
                {[
                  'Domain Registration: Extra',
                  'Hosting Charges: Extra',
                  'Google Workspace Email: Extra',
                  'E-Commerce: Custom Quote',
                  'Mobile App Development: Custom Quote',
                  'Advanced AI Features: Custom Quote',
                ].map((item, i) => (
                  <p key={i} className="text-[10px] font-mono text-white/30">{item}</p>
                ))}
              </div>
              <p className="text-[10px] font-mono text-white/25 mt-3 leading-relaxed">
                Note: For scalability, custom functionality, admin panels, databases, login systems, and future upgrades, we strongly recommend Frontend + Backend packages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
