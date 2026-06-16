import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = {
  frontend: [
    {
      name: 'Starter',
      price: '2,999',
      tagline: 'Perfect for personal portfolios and small businesses.',
      popular: false,
      features: [
        'Up to 3 Pages',
        'Modern Responsive Design',
        'Mobile Friendly',
        'Contact Section',
        'Basic Animations',
        'Basic SEO Setup',
        'Social Media Links',
        '1 Revision',
        'Delivery: 2–4 Days',
      ],
    },
    {
      name: 'Professional',
      price: '5,999',
      tagline: 'Perfect for businesses looking for a premium online presence.',
      popular: true,
      features: [
        'Up to 6 Pages',
        'Premium UI/UX Design',
        'Responsive Design',
        'Contact Form',
        'Google Maps Integration',
        'Advanced Animations',
        'Social Media Integration',
        'Gallery Section',
        'Basic Blog Section',
        'Advanced SEO Setup',
        '3 Revisions',
        'Delivery: 4–7 Days',
      ],
    },
    {
      name: 'Premium',
      price: '11,999',
      tagline: 'Perfect for professional brands and companies.',
      popular: false,
      features: [
        'Up to 12 Pages',
        'Fully Custom Design',
        'Premium UI/UX',
        'Advanced Animations',
        'Glassmorphism Design',
        'Blog System',
        'Gallery System',
        'Testimonials Section',
        'Contact Forms',
        'Advanced SEO',
        'Speed Optimization',
        'Social Media Integration',
        'Unlimited Minor Revisions',
        'Priority Support',
        'Delivery: 7–12 Days',
      ],
    },
  ],
  fullstack: [
    {
      name: 'Starter',
      price: '3,999',
      tagline: 'Perfect for businesses needing basic data storage.',
      popular: false,
      features: [
        'Everything from Frontend Starter',
        'Admin Dashboard',
        'Database Integration',
        'Contact Form Storage',
        'Dynamic Content',
        'Basic Data Management',
        '1 Revision',
        'Delivery: 3–5 Days',
      ],
    },
    {
      name: 'Professional',
      price: '7,999',
      tagline: 'Perfect for growing businesses.',
      popular: true,
      features: [
        'Everything from Frontend Professional',
        'Secure Admin Panel',
        'User Login System',
        'Database Management',
        'Dashboard Analytics',
        'Dynamic Website Content',
        'Form Management',
        'User Data Management',
        'Up to 500 Records',
        '3 Revisions',
        'Delivery: 5–10 Days',
      ],
    },
    {
      name: 'Premium',
      price: '14,999',
      tagline: 'Perfect for advanced business websites.',
      popular: false,
      features: [
        'Everything from Frontend Premium',
        'Advanced Admin Dashboard',
        'User Authentication',
        'Content Management System',
        'Analytics Dashboard',
        'Role Based Access',
        'Unlimited Database Records',
        'Advanced Security',
        'Cloud Ready Architecture',
        'Premium Support',
        'Unlimited Minor Revisions',
        'Delivery: 7–15 Days',
      ],
    },
  ],
  builder: [
    {
      name: 'Starter',
      price: '1,499',
      tagline: 'Perfect for simple websites.',
      popular: false,
      features: [
        'Up to 3 Pages',
        'Theme Setup',
        'Mobile Friendly',
        'Contact Information Setup',
        'Basic Design',
        'Delivery: 1–2 Days',
      ],
    },
    {
      name: 'Professional',
      price: '2,599',
      tagline: 'Perfect for business showcase websites.',
      popular: true,
      features: [
        'Up to 5 Pages',
        'Premium Theme Setup',
        'Contact Form',
        'Gallery Section',
        'Social Media Integration',
        'Mobile Optimization',
        'Basic SEO',
        'Delivery: 2–4 Days',
      ],
    },
    {
      name: 'Premium',
      price: '4,999',
      tagline: 'Perfect for businesses wanting a professional website at a lower budget.',
      popular: false,
      features: [
        'Up to 10 Pages',
        'Premium Theme Customization',
        'Gallery',
        'Testimonials',
        'Contact Forms',
        'Business Information Setup',
        'Social Media Integration',
        'Mobile Optimization',
        'Basic SEO Setup',
        'Delivery: 3–5 Days',
      ],
    },
  ],
}

const categories = [
  { id: 'frontend', label: 'Frontend Development', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { id: 'fullstack', label: 'Frontend + Backend', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
  { id: 'builder', label: 'Website Builder Solutions', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg> },
]

function PricingCard({ plan, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

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
      className={`pricing-card relative flex flex-col rounded-2xl transition-all duration-500 ${
        plan.popular ? 'pricing-popular' : ''
      }`}
      style={{
        background: plan.popular
          ? 'linear-gradient(135deg, rgba(139,32,32,0.12), rgba(139,32,32,0.04))'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${plan.popular ? 'rgba(139,32,32,0.25)' : hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
        boxShadow: plan.popular ? '0 0 40px rgba(139,32,32,0.08)' : 'none',
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-full"
            style={{ background: 'linear-gradient(135deg, #8B2020, #B33030)', color: '#E8E4D9', boxShadow: '0 0 20px rgba(139,32,32,0.3)' }}>
            Most Popular ⭐
          </div>
        </div>
      )}

      <div className="p-6 pb-4 flex-1">
        <h4 className="text-sm font-mono font-semibold text-white/70 uppercase tracking-wider">{plan.name}</h4>
        <div className="mt-3 mb-2 flex items-baseline gap-1">
          <span className="text-[10px] font-mono text-white/30">₹</span>
          <span className="text-3xl sm:text-4xl font-bold text-white/90">{plan.price}</span>
        </div>
        <p className="text-[11px] font-mono text-white/35 leading-relaxed mb-5">{plan.tagline}</p>

        <div className="space-y-2.5">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? '#B33030' : 'rgba(255,255,255,0.2)'} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-[11px] font-mono leading-relaxed ${plan.popular ? 'text-white/60' : 'text-white/45'}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-4">
        <button
          onClick={handleBuy}
          className="pricing-btn w-full py-3 rounded-xl text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300"
          style={{
            background: plan.popular
              ? 'linear-gradient(135deg, rgba(139,32,32,0.35), rgba(179,48,48,0.25))'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${plan.popular ? 'rgba(139,32,32,0.4)' : 'rgba(255,255,255,0.08)'}`,
            color: plan.popular ? '#E8E4D9' : 'rgba(255,255,255,0.55)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            Get Started
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
    )
  }, [activeTab])

  const currentPlans = plans[activeTab]

  return (
    <section id="pricing" className="relative py-32" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 pricing-header">
          <span className="section-label">Pricing</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
            Website Development <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto text-sm">
            Transparent pricing for every budget. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="flex justify-center mb-12 pricing-tabs">
          <div className="inline-flex liquid-glass rounded-xl p-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all duration-300"
                style={{
                  background: activeTab === cat.id ? 'rgba(139,32,32,0.2)' : 'transparent',
                  border: `1px solid ${activeTab === cat.id ? 'rgba(139,32,32,0.3)' : 'transparent'}`,
                  color: activeTab === cat.id ? '#E8E4D9' : 'rgba(255,255,255,0.4)',
                }}
              >
                <span className={activeTab === cat.id ? 'text-blood' : 'text-white/25'}>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentPlans.map((plan, i) => (
            <PricingCard key={`${activeTab}-${plan.name}`} plan={plan} index={i} />
          ))}
        </div>

        <div className="mt-12 liquid-glass rounded-2xl p-6 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blood/50 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-xs font-mono font-semibold text-white/60 mb-2">Additional Charges</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
                {[
                  'Domain Registration: Extra',
                  'Hosting Charges: Extra',
                  'Google Workspace Email: Extra',
                  'E-Commerce Functionality: Custom Quote',
                  'Mobile Application Development: Custom Quote',
                  'Advanced AI Features: Custom Quote',
                ].map((item, i) => (
                  <p key={i} className="text-[10px] font-mono text-white/30">{item}</p>
                ))}
              </div>
              <p className="text-[10px] font-mono text-white/25 mt-3 leading-relaxed">
                Note: For scalability, custom functionality, admin panels, databases, login systems, and future upgrades, we strongly recommend choosing Frontend + Backend Development packages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
