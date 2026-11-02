import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading'
import { certifications, education } from '../data/resume'

export default function EducationSection() {
  const educationAnim = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/75 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="▸ EDUCATION & CREDENTIALS"
          title="🏆 Achievements"
          subtitle="Formal foundation plus vendor certifications across the modern data stack."
        />

        {/* Education Card */}
        <div
          ref={educationAnim.ref}
          className="mc-panel max-w-3xl mx-auto mb-12 scroll-animate-scale"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1B1028] border-2 border-[#4AEDD9] flex items-center justify-center shrink-0 animate-pulse-glow">
              <span className="text-2xl sm:text-3xl" aria-hidden="true">{education.icon}</span>
            </div>
            <div>
              <h3 className="pixel-font text-[10px] sm:text-xs text-[#4AEDD9] mb-2">Education</h3>
              <h4 className="text-base sm:text-xl text-white font-bold mb-1">{education.degree}</h4>
              <p className="text-[#FCDB05] text-base sm:text-lg">{education.school}</p>
              <p className="text-gray-400 text-sm">{education.location}</p>
              <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
                {education.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-8 scroll-animate-up">
          <h3 className="pixel-font text-xs sm:text-sm text-[#FCDB05] mb-2">
            📜 Certification Achievements
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            {certifications.length} vendor certifications across Databricks, Microsoft, and Snowflake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <CertCard key={cert.name} cert={cert} idx={idx} />
          ))}
        </div>

        {/* Achievement summary */}
        <div className="mt-12 mc-panel max-w-3xl mx-auto scroll-animate-up">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {[
              { value: `${certifications.length}`, label: 'Certifications', color: '#FCDB05', stars: 3 },
              { value: 'BS', label: 'Degree', color: '#4AEDD9', stars: 4 },
              { value: 'UTA', label: 'University', color: '#17DD62', stars: 5 },
            ].map((item, idx) => (
              <div key={item.label} className="scroll-animate-scale" style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="pixel-font text-lg sm:text-2xl" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{item.label}</div>
                <div className="flex justify-center gap-0.5 mt-1" aria-hidden="true">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i} style={{ color: item.color }}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface CertCardProps {
  cert: (typeof certifications)[0]
  idx: number
}

function CertCard({ cert, idx }: CertCardProps) {
  const anim = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={anim.ref}
      className="mc-panel mc-block text-center scroll-animate-rotate flex flex-col"
      style={{ transitionDelay: `${idx * 0.05}s` }}
    >
      <div className="relative flex-1">
        {/* Rarity badge */}
        <div
          className="absolute -top-2 -right-2 pixel-font text-[8px] px-2 py-1 border animate-pulse"
          style={{
            backgroundColor: `${cert.rarityColor}20`,
            borderColor: cert.rarityColor,
            color: cert.rarityColor,
            animationDuration: '3s',
          }}
        >
          {cert.rarity}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 border-2 flex items-center justify-center transition-all duration-500 hover:rotate-12"
          style={{
            backgroundColor: `${cert.color}15`,
            borderColor: cert.color,
            boxShadow: `0 0 15px ${cert.color}30`,
          }}
        >
          <span className="text-3xl sm:text-4xl" aria-hidden="true">{cert.icon}</span>
        </div>

        {/* Name */}
        <h4 className="text-xs sm:text-sm text-white font-bold mb-1 leading-tight">
          {cert.name}
        </h4>
        <p className="pixel-font text-[8px] mb-2" style={{ color: cert.color }}>
          {cert.issuer}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">{cert.description}</p>

        {/* Focus */}
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {cert.focus.map((focus) => (
            <span
              key={focus}
              className="text-[11px] px-2 py-0.5 border"
              style={{
                borderColor: `${cert.color}44`,
                backgroundColor: `${cert.color}10`,
                color: cert.color,
              }}
            >
              {focus}
            </span>
          ))}
        </div>

        {/* Status */}
        <div
          className="mt-4 inline-block px-3 py-1 border transition-all duration-300 hover:scale-110"
          style={{
            borderColor: cert.color,
            backgroundColor: `${cert.color}10`,
          }}
        >
          <span className="pixel-font text-[8px]" style={{ color: cert.color }}>
            ✓ CERTIFIED
          </span>
        </div>
      </div>
    </div>
  )
}
