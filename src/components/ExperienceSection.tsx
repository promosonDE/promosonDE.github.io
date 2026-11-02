import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import SectionHeading from './SectionHeading'
import { experiences } from '../data/resume'

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<number[]>([0])

  const allExpanded = expanded.length === experiences.length

  const toggle = (index: number) => {
    setExpanded((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    )
  }

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/75 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="▸ 2019 — PRESENT"
          title="⚔️ Quest Log"
          subtitle="Three roles, one through-line: reliable data platforms at enterprise scale."
        />

        {/* Quest controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 scroll-animate-up">
          <p className="text-center sm:text-left text-sm sm:text-base text-gray-400">
            <span className="text-[#FCDB05] font-bold">{experiences.length} roles</span>
            {' • '}
            {experiences.reduce((total, role) => total + role.achievements.length, 0)} documented
            achievements
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => setExpanded(allExpanded ? [] : experiences.map((_, index) => index))}
              className="mc-btn text-[9px] sm:text-xs"
              aria-label={allExpanded ? 'Collapse all quests' : 'Expand all quests'}
            >
              {allExpanded ? '▲ Collapse All' : '▼ Expand All'}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 timeline-line transform md:-translate-x-1/2" />

          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={`${exp.company}-${exp.title}`}
              exp={exp}
              idx={idx}
              isExpanded={expanded.includes(idx)}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}

interface ExperienceCardProps {
  exp: (typeof experiences)[0]
  idx: number
  isExpanded: boolean
  onToggle: () => void
}

function ExperienceCard({ exp, idx, isExpanded, onToggle }: ExperienceCardProps) {
  const cardAnim = useScrollAnimation({ threshold: 0.1 })

  return (
    <div
      ref={cardAnim.ref}
      className={`relative mb-12 md:mb-16 ${idx % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'} ${idx % 2 === 0 ? 'scroll-animate-left' : 'scroll-animate-right'}`}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[14px] md:left-1/2 w-5 h-5 border-2 transform md:-translate-x-1/2 z-10 transition-all duration-500"
        style={{
          backgroundColor: isExpanded ? exp.color : 'transparent',
          borderColor: exp.color,
          boxShadow: isExpanded ? `0 0 15px ${exp.color}, 0 0 30px ${exp.color}` : `0 0 5px ${exp.color}`,
        }}
        aria-hidden="true"
      />

      <div
        className={`ml-12 md:ml-0 mc-panel mc-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCDB05] ${idx % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`quest-details-${idx}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} quest details for ${exp.title} at ${exp.company}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
      >
        {/* Quest header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 text-xl sm:text-2xl shrink-0 transition-all duration-300"
            style={{
              backgroundColor: isExpanded ? `${exp.color}30` : `${exp.color}10`,
              borderColor: exp.color,
              transform: isExpanded ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
            }}
            aria-hidden="true"
          >
            {exp.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="pixel-font text-[10px] sm:text-xs" style={{ color: exp.color }}>
              {exp.title}
            </h3>
            <p className="text-white text-base sm:text-lg font-bold truncate">{exp.company}</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              {exp.location} • {exp.period}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="pixel-font text-[8px] sm:text-[10px]" style={{ color: exp.color }}>
              {exp.level}
            </span>
            <div className="w-12 sm:w-16 xp-bar mt-1">
              <div className="xp-bar-fill" style={{ width: exp.xp }} />
            </div>
          </div>
        </div>

        {/* Outcome + summary */}
        <p
          className="text-xs sm:text-sm font-bold mb-2 flex items-start gap-1.5"
          style={{ color: exp.color }}
        >
          <span aria-hidden="true">✦</span>
          <span>{exp.headline}</span>
        </p>
        <p className="text-gray-300 text-sm sm:text-base mb-3">{exp.summary}</p>

        {/* Expanded content */}
        <div
          id={`quest-details-${idx}`}
          className={`grid transition-all duration-500 ease-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-4 border-t border-[#5A5A5A]">
              <h4 className="pixel-font text-[10px] text-[#FCDB05] mb-3">
                📋 Quest Objectives ({exp.achievements.length})
              </h4>
              <ul className="space-y-2.5 mb-4">
                {exp.achievements.map((achievement, aidx) => (
                  <li
                    key={aidx}
                    className="flex items-start gap-2 text-gray-300 text-sm sm:text-base transition-all duration-300"
                    style={{
                      transitionDelay: isExpanded ? `${Math.min(aidx * 0.03, 0.4)}s` : '0s',
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded ? 'translateX(0)' : 'translateX(-10px)',
                    }}
                  >
                    <span className="text-[#17DD62] mt-0.5 shrink-0" aria-hidden="true">✦</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mt-4 pt-3 border-t border-[#5A5A5A]">
                <h4 className="pixel-font text-[10px] text-gray-400 mb-2">
                  🔧 Key Technologies ({exp.tech.length})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {exp.tech.map((tech, tidx) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 border transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: `${exp.color}15`,
                        borderColor: `${exp.color}40`,
                        color: exp.color,
                        transitionDelay: isExpanded ? `${Math.min(tidx * 0.02, 0.3)}s` : '0s',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Click indicator */}
        <div className="text-center mt-2">
          <span className="pixel-font text-[8px] text-gray-400 transition-all duration-300">
            {isExpanded ? '▲ Click to collapse ▲' : '▼ Click to expand ▼'}
          </span>
        </div>
      </div>
    </div>
  )
}
