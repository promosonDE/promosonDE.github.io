import { useState, useEffect } from 'react'

interface NavbarProps {
  activeSection: string
}

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '📜' },
  { id: 'impact', label: 'Impact', icon: '⚡' },
  { id: 'skills', label: 'Inventory', icon: '🎒' },
  { id: 'experience', label: 'Quests', icon: '⚔️' },
  { id: 'education', label: 'Achievements', icon: '🏆' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          const scrollable = document.documentElement.scrollHeight - window.innerHeight
          setProgress(scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close the mobile drawer with Escape
  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a1a2e]/70 backdrop-blur-sm' : 'bg-transparent'
      } border-b-4 border-[#5D8C3E]`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollTo('home')
              }
            }}
            aria-label="Scroll to home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#5D8C3E] border-2 border-[#3B5E2B] flex items-center justify-center transition-transform hover:scale-110 hover:rotate-6 shadow-lg shadow-black/30">
              <span className="text-white text-[8px] sm:text-xs font-bold pixel-font">PP</span>
            </div>
            <span className="pixel-font text-[8px] sm:text-xs text-[#FCDB05] hidden sm:block transition-all hover:text-[#4AEDD9] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">
              Promoson
            </span>
          </div>

          {/* Desktop Nav - visible on lg (1024px) and above */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 xl:px-3 py-2 pixel-font text-[9px] border-2 transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E]/80 border-[#6BAF4A] text-white scale-105 shadow-lg shadow-[#4A7A2E]/30 backdrop-blur-sm'
                    : 'bg-black/30 border-[#7F7F7F]/50 text-gray-300 hover:bg-black/50 hover:border-[#9F9F9F] hover:scale-105 backdrop-blur-sm'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="mr-1" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button - visible only below lg (1024px) */}
          {/* Wrapper div is required: .mc-btn sets display:inline-block in
              unlayered CSS, which would override the lg:hidden utility. */}
          <div className="lg:hidden">
            <button
              className="mc-btn text-[8px] px-3 py-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? '✕ Close' : '☰ Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Nav - only visible below lg (1024px) */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileOpen
              ? 'max-h-[560px] opacity-100 pb-4 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
          id="mobile-nav"
          aria-hidden={!mobileOpen}
        >
          <div className="space-y-1 bg-[#1a1a2e]/90 backdrop-blur-sm rounded-b-lg p-2">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-3 pixel-font text-[10px] border-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white'
                    : 'bg-[#5A5A5A]/50 border-[#7F7F7F] text-gray-300 hover:bg-[#6A6A6A]'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${idx * 0.04}s` : '0s',
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: mobileOpen ? 1 : 0,
                }}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="mr-2 text-base" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reading progress */}
      <div className="h-1 bg-black/40" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#4AEDD9] via-[#17DD62] to-[#FCDB05] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  )
}
