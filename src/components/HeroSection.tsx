import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background - Minecraft sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a3e] via-[#2a2a5e] to-[#1a1a2e]">
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star absolute bg-white"
            style={{
              width: Math.random() > 0.5 ? '2px' : '3px',
              height: Math.random() > 0.5 ? '2px' : '3px',
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 3}s`,
            } as React.CSSProperties}
          />
        ))}
        
        {/* Ground blocks */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="absolute bottom-20 left-0 right-0 h-12 grass-top" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)'
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 dirt-bg" />
        </div>

        {/* Floating blocks decoration */}
        <div className="absolute top-[20%] left-[10%] animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-12 h-12 bg-[#4AEDD9] border-2 border-[#2ABCA9] opacity-60" />
        </div>
        <div className="absolute top-[30%] right-[15%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-8 h-8 bg-[#FCDB05] border-2 border-[#C4A804] opacity-60" />
        </div>
        <div className="absolute top-[15%] right-[30%] animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-10 bg-[#17DD62] border-2 border-[#10A848] opacity-60" />
        </div>
        <div className="absolute top-[40%] left-[25%] animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-6 h-6 bg-[#B02E26] border-2 border-[#7A1F1A] opacity-60" />
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Minecraft title style */}
        <div className="mb-8">
          <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-4 drop-shadow-[3px_3px_0px_#3C3C3C]">
            PROMASON
          </h1>
          <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-6 drop-shadow-[3px_3px_0px_#3C3C3C]">
            POUDEL
          </h1>
          <div className="pixel-font text-sm sm:text-base text-[#4AEDD9] mb-2">
            ⛏️ Senior Data Engineer ⛏️
          </div>
          <div className="pixel-font text-xs sm:text-sm text-gray-400">
            6+ Years of Crafting Data Solutions
          </div>
        </div>

        {/* XP Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="xp-bar rounded-none">
            <div className="xp-bar-fill" style={{ width: '85%' }} />
          </div>
          <p className="pixel-font text-[8px] text-[#80FF20] mt-1">LVL 6+ Data Engineer</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="mailto:Promosonpoudel440@gmail.com" className="mc-btn text-xs">
            📧 Contact Me
          </a>
          <a href="https://www.linkedin.com/in/promoson-poudel-5358ba1b5" target="_blank" rel="noopener noreferrer" className="mc-btn text-xs">
            🔗 LinkedIn
          </a>
          <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="mc-btn text-xs">
            🎒 View Inventory
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-8 mc-panel inline-block">
          <p className="text-sm text-gray-300">
            📧 Promosonpoudel440@gmail.com | 📱 469-587-9546
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="pixel-font text-xs text-gray-400">▼ Scroll Down ▼</div>
      </div>
    </section>
  )
}
