import { useEffect, useState } from 'react'
import { useParallax, useMouseParallax } from '../hooks/useScrollAnimation'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const scrollY = useParallax()
  const mousePos = useMouseParallax(0.015)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background - Minecraft sky with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a2e] via-[#1a1a4e] to-[#1a1a2e]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white rounded-none"
            style={{
              width: Math.random() > 0.5 ? '2px' : '3px',
              height: Math.random() > 0.5 ? '2px' : '3px',
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Clouds */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="cloud"
            style={{
              width: `${100 + Math.random() * 150}px`,
              height: `${20 + Math.random() * 20}px`,
              top: `${10 + i * 15}%`,
              '--cloud-speed': `${40 + i * 15}s`,
              '--cloud-delay': `${i * 10}s`,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Ground blocks with parallax */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <div className="absolute bottom-20 left-0 right-0 h-12 grass-top" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)'
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 dirt-bg" />
        </div>

        {/* Floating blocks with mouse parallax */}
        <div 
          className="absolute top-[20%] left-[10%] animate-float"
          style={{ 
            animationDelay: '0s',
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`
          }}
        >
          <div className="w-12 h-12 bg-[#4AEDD9] border-2 border-[#2ABCA9] opacity-70 shadow-lg shadow-[#4AEDD9]/30" />
        </div>
        <div 
          className="absolute top-[30%] right-[15%] animate-float"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`
          }}
        >
          <div className="w-10 h-10 bg-[#FCDB05] border-2 border-[#C4A804] opacity-70 shadow-lg shadow-[#FCDB05]/30" />
        </div>
        <div 
          className="absolute top-[15%] right-[30%] animate-float"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${mousePos.x * 1}px, ${mousePos.y * 1}px)`
          }}
        >
          <div className="w-8 h-8 bg-[#17DD62] border-2 border-[#10A848] opacity-70 shadow-lg shadow-[#17DD62]/30" />
        </div>
        <div 
          className="absolute top-[40%] left-[25%] animate-float"
          style={{ 
            animationDelay: '1.5s',
            transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`
          }}
        >
          <div className="w-6 h-6 bg-[#B02E26] border-2 border-[#7A1F1A] opacity-70 shadow-lg shadow-[#B02E26]/30" />
        </div>
        <div 
          className="absolute top-[50%] right-[10%] animate-float-slow"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`
          }}
        >
          <div className="w-14 h-14 bg-[#7BA4D4] border-2 border-[#4A7AB5] opacity-50 shadow-lg shadow-[#7BA4D4]/20" />
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Minecraft title style */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-4 drop-shadow-[3px_3px_0px_#3C3C3C] animate-glow-pulse" style={{ color: '#FCDB05' }}>
              PROMASON
            </h1>
            <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-6 drop-shadow-[3px_3px_0px_#3C3C3C] animate-glow-pulse" style={{ color: '#FCDB05', animationDelay: '0.5s' }}>
              POUDEL
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
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="mailto:Promosonpoudel440@gmail.com" className="mc-btn text-xs w-full sm:w-auto">
            📧 Contact Me
          </a>
          <a href="https://www.linkedin.com/in/promoson-poudel-5358ba1b5" target="_blank" rel="noopener noreferrer" className="mc-btn text-xs w-full sm:w-auto">
            🔗 LinkedIn
          </a>
          <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="mc-btn text-xs w-full sm:w-auto">
            🎒 View Inventory
          </button>
        </div>

        {/* Contact info */}
        <div className={`mt-8 mc-panel inline-block transition-all duration-700 delay-[1400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm text-gray-300">
            📧 Promosonpoudel440@gmail.com | 📱 469-587-9546
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: '2s' }}>
        <div className="pixel-font text-xs text-gray-400">▼ Scroll Down ▼</div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
