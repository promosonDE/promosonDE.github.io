import { useState } from 'react'

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2C2C2C]/95 backdrop-blur-sm border-b-4 border-[#5A5A5A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5D8C3E] border-2 border-[#3B5E2B] flex items-center justify-center">
              <span className="text-white text-xs font-bold">PP</span>
            </div>
            <span className="pixel-font text-xs text-[#FCDB05] hidden sm:block">PP</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 pixel-font text-[10px] border-2 transition-all ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white'
                    : 'bg-[#5A5A5A] border-[#7F7F7F] text-gray-300 hover:bg-[#6A6A6A]'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden mc-btn text-xs px-3 py-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰ Menu
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2 pixel-font text-[10px] border-2 ${
                  activeSection === item.id
                    ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white'
                    : 'bg-[#5A5A5A] border-[#7F7F7F] text-gray-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
