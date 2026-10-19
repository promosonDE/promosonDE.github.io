import { useEffect, useState, useRef } from 'react'
import { useMouseParallax } from '../hooks/useScrollAnimation'
import DownloadCVButton from './DownloadCVButton'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const mousePos = useMouseParallax(0.015)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Transparent background - village shows through */}
      <div className="absolute inset-0 bg-transparent" />
      
      {/* Floating blocks with mouse parallax */}
      <div 
        className="absolute top-[20%] left-[10%] animate-float z-[1]"
        style={{ 
          animationDelay: '0s',
          transform: reducedMotion.current ? undefined : `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`
        }}
      >
        <div className="w-12 h-12 bg-[#4AEDD9] border-2 border-[#2ABCA9] opacity-70 shadow-lg shadow-[#4AEDD9]/30" />
      </div>
      <div 
        className="absolute top-[30%] right-[15%] animate-float z-[1]"
        style={{ 
          animationDelay: '1s',
          transform: reducedMotion.current ? undefined : `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`
        }}
      >
        <div className="w-10 h-10 bg-[#FCDB05] border-2 border-[#C4A804] opacity-70 shadow-lg shadow-[#FCDB05]/30" />
      </div>
      <div 
        className="absolute top-[15%] right-[30%] animate-float z-[1]"
        style={{ 
          animationDelay: '2s',
          transform: reducedMotion.current ? undefined : `translate(${mousePos.x * 1}px, ${mousePos.y * 1}px)`
        }}
      >
        <div className="w-8 h-8 bg-[#17DD62] border-2 border-[#10A848] opacity-70 shadow-lg shadow-[#17DD62]/30" />
      </div>
      <div 
        className="absolute top-[40%] left-[25%] animate-float z-[1]"
        style={{ 
          animationDelay: '1.5s',
          transform: reducedMotion.current ? undefined : `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`
        }}
      >
        <div className="w-6 h-6 bg-[#B02E26] border-2 border-[#7A1F1A] opacity-70 shadow-lg shadow-[#B02E26]/30" />
      </div>
      <div 
        className="absolute top-[50%] right-[10%] animate-float-slow z-[1]"
        style={{ 
          animationDelay: '3s',
          transform: reducedMotion.current ? undefined : `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`
        }}
      >
        <div className="w-14 h-14 bg-[#7BA4D4] border-2 border-[#4A7AB5] opacity-50 shadow-lg shadow-[#7BA4D4]/20" />
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Minecraft title style */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-4 drop-shadow-[3px_3px_0px_#3C3C3C] animate-glow-pulse">
              PROMOSON POUDEL
            </h1>
          </div>
          <div className={`pixel-font text-sm sm:text-base text-[#4AEDD9] mb-2 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            ⛏️ Senior Data Engineer ⛏️
          </div>
          <div className={`pixel-font text-xs sm:text-sm text-gray-400 transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            6+ Years of Crafting Data Solutions
          </div>
        </div>

        {/* XP Bar */}
        <div className={`max-w-md mx-auto mb-8 transition-all duration-700 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="xp-bar rounded-none">
            <div className="xp-bar-fill animated" style={{ '--xp-width': '85%' } as React.CSSProperties} />
          </div>
          <p className="pixel-font text-[8px] text-[#80FF20] mt-1">LVL 6+ Data Engineer</p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center transition-all duration-700 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="mailto:Promosonpoudel440@gmail.com" className="mc-btn text-xs w-full sm:w-auto">
            📧 Contact Me
          </a>
          <a href="https://www.linkedin.com/in/promoson-poudel-5358ba1b5" target="_blank" rel="noopener noreferrer" className="mc-btn text-xs w-full sm:w-auto">
            🔗 LinkedIn
          </a>
          <button type="button" onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="mc-btn text-xs w-full sm:w-auto">
            🎒 View Inventory
          </button>
          <DownloadCVButton className="text-xs w-full sm:w-auto" />
        </div>

        {/* Contact info */}
        <div className={`mt-8 mc-panel inline-block max-w-xs sm:max-w-full mx-auto px-3 sm:px-6 transition-all duration-700 delay-[1400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm text-gray-300 break-words">
            <a href="mailto:Promosonpoudel440@gmail.com" className="hover:text-[#4AEDD9] underline decoration-dotted underline-offset-2 transition-colors">
              📧 Promosonpoudel440@gmail.com
            </a>
            <span className="text-gray-500 mx-2">|</span>
            <a href="tel:+14695879546" className="hover:text-[#4AEDD9] underline decoration-dotted underline-offset-2 transition-colors">
              📱 469-587-9546
            </a>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }}>
        <div className="pixel-font text-xs text-gray-400">▼ Scroll Down ▼</div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
