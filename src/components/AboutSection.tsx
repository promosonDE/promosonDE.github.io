import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading'
import playerAvatar from '../assets/player-avatar.jpg'
import { heroStats, profile } from '../data/resume'

export default function AboutSection() {
  const photoAnim = useScrollAnimation({ threshold: 0.2 })
  const contentAnim = useScrollAnimation({ threshold: 0.05 })
  const factsAnim = useScrollAnimation({ threshold: 0.1 })
  const statsAnim = useScrollAnimation({ threshold: 0.2 })

  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-[#1a1a2e]/70 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          title="📜 Player Stats"
          subtitle="Profile, focus areas, and the numbers behind the platform work."
        />

        {/* Player photo card */}
        <div
          ref={photoAnim.ref}
          className="mc-panel max-w-4xl mx-auto mb-6 scroll-animate-up"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Portrait in an item slot */}
            <div className="mc-slot w-32 h-32 sm:w-40 sm:h-40 shrink-0 border-4 border-[#FCDB05] shadow-[0_0_20px_rgba(252,219,5,0.35)] p-1">
              <img
                src={playerAvatar}
                alt="Portrait of Promoson Poudel"
                width={160}
                height={160}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name plate */}
            <div className="text-center sm:text-left min-w-0">
              <p className="pixel-font text-[8px] text-gray-500 mb-2">
                ▸ PLAYER PORTRAIT
              </p>
              <h3 className="pixel-font text-xs sm:text-sm text-[#FCDB05] mb-2 drop-shadow-[2px_2px_0px_#3C3C3C]">
                {profile.name}
              </h3>
              <p className="text-base sm:text-lg text-[#4AEDD9] mb-1">
                {profile.role} • {profile.level}
              </p>
              <p className="text-sm text-gray-400">
                {profile.clouds.join(' • ')} | {profile.years} Years | {profile.domains.join(', ')}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                {profile.domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs px-2 py-1 border border-[#5A5A5A] bg-[#2C2C2C] text-gray-300"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Content - Book style */}
        <div
          ref={contentAnim.ref}
          className="mc-panel max-w-4xl mx-auto scroll-animate-up"
        >
          {/* Book header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
            <div className="w-10 h-10 bg-[#8B6914] border-2 border-[#6B4F12] flex items-center justify-center animate-wiggle shrink-0">
              <span className="text-xl">📖</span>
            </div>
            <div>
              <h3 className="pixel-font text-xs text-[#FCDB05]">Professional Summary</h3>
              <p className="text-gray-400 text-sm">Class: {profile.role}</p>
            </div>
          </div>

          {/* Summary text */}
          <div className="space-y-4 text-lg leading-relaxed text-gray-200">
            {profile.summary.map((paragraph, index) => (
              <p key={index} className={`scroll-animate-up stagger-${Math.min(index + 1, 8)}`}>
                <span className="text-[#4AEDD9] inline-block animate-pulse">⚡</span>{' '}
                {paragraph}
              </p>
            ))}
          </div>

          {/* Focus areas */}
          <div className="mt-6 pt-5 border-t-2 border-[#5A5A5A]">
            <h4 className="pixel-font text-[9px] text-[#FCDB05] mb-3">🎯 Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {profile.focusAreas.map((area, idx) => (
                <span
                  key={area}
                  className="text-xs sm:text-sm px-3 py-1.5 border-2 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `${['#4AEDD9', '#FCDB05', '#17DD62', '#B02E26'][idx % 4]}55`,
                    backgroundColor: `${['#4AEDD9', '#FCDB05', '#17DD62', '#B02E26'][idx % 4]}12`,
                    color: ['#4AEDD9', '#FCDB05', '#17DD62', '#FF7B72'][idx % 4],
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            ref={statsAnim.ref}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-[#5A5A5A]"
          >
            {heroStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`text-center scroll-animate-scale stagger-${idx + 1}`}
              >
                <div className="pixel-font text-xl sm:text-2xl" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <div
          ref={factsAnim.ref}
          className="mc-panel max-w-4xl mx-auto mt-6 scroll-animate-up"
        >
          <h3 className="pixel-font text-xs text-[#4AEDD9] mb-4">🗂️ Quick Facts</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-l-4 border-[#4A7A2E] bg-[#2C2C2C]/60 px-3 py-2"
              >
                <dt className="pixel-font text-[8px] text-gray-400 shrink-0 sm:w-28 uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm sm:text-base text-gray-200">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hearts / Health bar */}
        <div className="flex justify-center gap-1 mt-6" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="heart text-lg animate-heartbeat"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
