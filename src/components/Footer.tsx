import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { downloadCV } from '../utils/generateCV'

export default function Footer() {
  const footerAnim = useScrollAnimation()

  return (
    <footer className="relative py-12 px-4 border-t-4 border-[#5D8C3E]">
      {/* Dirt background */}
      <div className="absolute inset-0 dirt-bg opacity-30" />
      <div className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-[1px]" />
      
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
          <div className="flex justify-center gap-2 mb-6">
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

          {/* Contact links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <a 
              href="mailto:Promosonpoudel440@gmail.com" 
              className="mc-btn text-[8px] sm:text-xs flex items-center gap-2"
            >
              📧 Email
            </a>
            <a 
              href="tel:469-587-9546" 
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
            <button 
              onClick={downloadCV}
              className="mc-btn text-[8px] sm:text-xs flex items-center gap-2 bg-[#4A7A2E] hover:bg-[#5D8C3E]"
            >
              📄 Download CV
            </button>
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
              © 2024 Promoson Poudel | Built with ❤️ and ⛏️
            </p>
            <p className="pixel-font text-[6px] sm:text-[7px] text-gray-500 mt-1">
              Minecraft Style Portfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
