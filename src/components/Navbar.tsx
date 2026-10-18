import { useState, useEffect } from 'react'

interface NavbarProps {
  activeSection: string
}

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '📜' },
  { id: 'skills', label: 'Inventory', icon: '🎒' },
  { id: 'experience', label: 'Quests', icon: '⚔️' },
  { id: 'education', label: 'Achievements', icon: '🏆' },
]

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#2C2C2C]/98 backdrop-blur-md shadow-lg shadow-black/30' 
        : 'bg-[#2C2C2C]/80 backdrop-blur-sm'
    } border-b-4 border-[#5D8C3E]`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#5D8C3E] border-2 border-[#3B5E2B] flex items-center justify-center transition-transform hover:scale-110 hover:rotate-6">
              <span className="text-white text-[8px] sm:text-xs font-bold pixel-font">PP</span>
            </div>
            <span className="pixel-font text-[8px] sm:text-xs text-[#FCDB05] hidden sm:block transition-all hover:text-[#4AEDD9]">
              Promoson
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 pixel-font text-[9px] border-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white scale-105 shadow-lg shadow-[#4A7A2E]/30'
                    : 'bg-[#5A5A5A] border-[#7F7F7F] text-gray-300 hover:bg-[#6A6A6A] hover:border-[#9F9F9F] hover:scale-105'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden mc-btn text-[8px] px-3 py-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕ Close' : '☰ Menu'}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-3 pixel-font text-[10px] border-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white'
                    : 'bg-[#5A5A5A] border-[#7F7F7F] text-gray-300 hover:bg-[#6A6A6A]'
                }`}
                style={{ 
                  transitionDelay: mobileOpen ? `${idx * 0.05}s` : '0s',
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                <span className="mr-2 text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
