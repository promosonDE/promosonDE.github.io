import { useEffect, useState, useRef } from 'react'
import { useMouseParallax } from '../hooks/useScrollAnimation'
import DownloadCVButton from './DownloadCVButton'
import { heroStats, profile } from '../data/resume'

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
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center px-4 py-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Name plate */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 border-2 border-[#6BAF4A] bg-[#1a1a2e]/80 backdrop-blur-sm px-3 py-2 mb-6 shadow-lg shadow-black/30">
            <span className="w-2 h-2 bg-[#17DD62] animate-pulse" aria-hidden="true" />
            <span className="pixel-font text-[8px] sm:text-[10px] text-[#17DD62]">
              {profile.availability}
            </span>
          </div>

          <h1 className="pixel-font text-2xl sm:text-4xl md:text-5xl text-[#FCDB05] mb-4 drop-shadow-[3px_3px_0px_#3C3C3C] animate-glow-pulse">
            {profile.name.toUpperCase()}
          </h1>

          <p className="pixel-font text-sm sm:text-base text-[#4AEDD9] mb-3">
            ⛏️ {profile.role} ⛏️
          </p>

          <p className="text-gray-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {profile.tagline}
          </p>

          <p className="pixel-font text-[8px] sm:text-[10px] text-gray-400 mt-4 leading-relaxed">
            LAKEHOUSE • STREAMING • GOVERNANCE • GENAI-READY DATA
          </p>
        </div>

        {/* XP Bar */}
        <div className="max-w-md mx-auto mb-8 transition-all duration-700 delay-1000">
          <div className="xp-bar rounded-none">
            <div className="xp-bar-fill animated" style={{ '--xp-width': '100%' } as React.CSSProperties} />
          </div>
          <p className="pixel-font text-[8px] text-[#80FF20] mt-1">{profile.level} Data Engineer</p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto mb-8">
          {heroStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="mc-panel px-2 py-3 transition-transform duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <div className="pixel-font text-sm sm:text-lg" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
          <a href={`mailto:${profile.email}`} className="mc-btn bg-[#4A7A2E] hover:bg-[#5D8C3E] text-xs w-full sm:w-auto">
            📧 Contact Me
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mc-btn text-xs w-full sm:w-auto">
            🔗 LinkedIn
          </a>
          <button
            type="button"
            onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mc-btn text-xs w-full sm:w-auto"
          >
            ⚡ View Impact
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="mc-btn text-xs w-full sm:w-auto"
          >
            🎒 View Inventory
          </button>
          <DownloadCVButton className="text-xs w-full sm:w-auto" />
        </div>

        {/* Contact info */}
        <div className="mt-8 mc-panel inline-block max-w-full px-3 sm:px-6">
          <p className="text-sm sm:text-base text-gray-300 break-words">
            <a href={`mailto:${profile.email}`} className="hover:text-[#4AEDD9] underline decoration-dotted underline-offset-2 transition-colors">
              📧 {profile.email}
            </a>
            <span className="text-gray-500 mx-2">|</span>
            <a href={`tel:${profile.phoneHref}`} className="hover:text-[#4AEDD9] underline decoration-dotted underline-offset-2 transition-colors">
              📱 {profile.phone}
            </a>
          </p>
        </div>

        {/* Scroll cue — kept in the normal flow so it never covers the content */}
        <div className="mt-10 animate-bounce" style={{ animationDuration: '2s' }} aria-hidden="true">
          <span className="pixel-font text-[9px] sm:text-xs text-gray-400">▼ Scroll Down ▼</span>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
