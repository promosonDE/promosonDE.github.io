import { useScrollAnimation } from '../hooks/useScrollAnimation'
import DownloadCVButton from './DownloadCVButton'

const footerNav = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'Player Stats', icon: '📜' },
  { id: 'skills', label: 'Inventory', icon: '🎒' },
  { id: 'experience', label: 'Quest Log', icon: '⚔️' },
  { id: 'education', label: 'Achievements', icon: '🏆' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const footerAnim = useScrollAnimation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 px-4 border-t-4 border-[#5D8C3E]">
      {/* Dirt background */}
      <div className="absolute inset-0 dirt-bg opacity-30" />
      <div className="absolute inset-0 bg-[#1a1a2e]/70 backdrop-blur-[0.5px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Grass top border */}
        <div className="absolute -top-4 left-0 right-0 h-4 grass-top" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)'
        }} />

        <div 
          ref={footerAnim.ref}
          className="text-center scroll-animate-up"
        >
          {/* Minecraft style logo */}
          <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
            {['#5D8C3E', '#8B6914', '#7F7F7F', '#4AEDD9'].map((color, idx) => (
              <div 
                key={idx}
                className="w-6 h-6 sm:w-8 sm:h-8 border-2 animate-float"
                style={{ 
                  backgroundColor: color, 
                  borderColor: `${color}88`,
                  animationDelay: `${idx * 0.2}s`
                }} 
              />
            ))}
          </div>

          <h3 className="pixel-font text-xs sm:text-sm text-[#FCDB05] mb-4">
            Promoson Poudel
          </h3>
          
          <p className="text-gray-400 mb-6 text-base sm:text-lg">
            Senior Data Engineer | Cloud Architecture | Data Platforms
          </p>

          {/* Section navigation */}
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {footerNav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="mc-btn text-[8px] sm:text-xs px-3 py-2"
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <a 
              href="mailto:Promosonpoudel440@gmail.com" 
              className="mc-btn text-[8px] sm:text-xs flex items-center gap-2"
            >
              📧 Email
            </a>
            <a 
              href="tel:+14695879546" 
              className="mc-btn text-[8px] sm:text-xs flex items-center gap-2"
            >
              📱 Phone
            </a>
            <a 
              href="https://www.linkedin.com/in/promoson-poudel-5358ba1b5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mc-btn text-[8px] sm:text-xs flex items-center gap-2"
            >
              🔗 LinkedIn
            </a>
            <DownloadCVButton className="text-[8px] sm:text-xs flex items-center gap-2" />
          </div>

          {/* XP bar */}
          <div className="max-w-sm mx-auto mb-6">
            <div className="xp-bar">
              <div className="xp-bar-fill" style={{ width: '100%' }} />
            </div>
            <p className="pixel-font text-[8px] text-[#80FF20] mt-1 animate-pulse">
              Thanks for visiting! 🎮
            </p>
          </div>

          {/* Copyright */}
          <div className="mc-panel inline-block">
            <p className="pixel-font text-[7px] sm:text-[8px] text-gray-400">
              © {currentYear} Promoson Poudel | Built with ❤️ and ⛏️
            </p>
            <p className="pixel-font text-[6px] sm:text-[7px] text-gray-500 mt-1">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
