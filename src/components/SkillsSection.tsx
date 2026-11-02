import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { allSkills, skillGroups } from '../data/resume'

const COLOR_CYCLE = ['#4AEDD9', '#FCDB05', '#17DD62', '#B02E26']

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [query, setQuery] = useState('')
  const [showMatrix, setShowMatrix] = useState(false)

  const trimmedQuery = query.trim()
  const isSearching = trimmedQuery.length > 0

  const totalSkillEntries = useMemo(
    () => skillGroups.reduce((total, group) => total + group.skills.length, 0),
    []
  )

  const searchResults = useMemo(() => {
    if (!trimmedQuery) return []
    const needle = trimmedQuery.toLowerCase()

    return skillGroups
      .map((group) => {
        const groupMatches = group.name.toLowerCase().includes(needle) || group.shortName.toLowerCase().includes(needle)
        const matchingSkills = groupMatches
          ? group.skills
          : group.skills.filter((skill) => skill.toLowerCase().includes(needle))

        return { group, skills: matchingSkills }
      })
      .filter((result) => result.skills.length > 0)
  }, [trimmedQuery])

  const matchCount = searchResults.reduce((total, result) => total + result.skills.length, 0)
  const active = skillGroups[activeCategory]
  const activeColor = active.color || COLOR_CYCLE[activeCategory % COLOR_CYCLE.length]

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/75 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="▸ TOOLS OF THE TRADE"
          title="🎒 Inventory"
          subtitle={`${skillGroups.length} categories • ${totalSkillEntries} skill entries across Azure, AWS, GCP, and modern data tooling.`}
        />

        {/* Inventory panel */}
        <div className="mc-panel scroll-animate-up">
          {/* Search */}
          <div className="mb-6">
            <label
              htmlFor="skill-search"
              className="pixel-font text-[9px] sm:text-[10px] text-[#4AEDD9] block mb-2"
            >
              ▸ SEARCH INVENTORY
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
                aria-hidden="true"
              >
                🔍
              </span>
              <input
                id="skill-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Snowflake, Airflow, PySpark, RAG, Terraform…"
                className="mc-input pl-10 pr-10"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear skill search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center border-2 border-[#5A5A5A] bg-[#3C3C3C] text-gray-300 hover:text-white hover:border-[#7F7F7F] transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2" aria-live="polite">
              {isSearching
                ? `${matchCount} matching skill${matchCount === 1 ? '' : 's'} in ${searchResults.length} categor${searchResults.length === 1 ? 'y' : 'ies'}`
                : `${allSkills.length} unique skills indexed`}
            </p>
          </div>

          {isSearching ? (
            /* Search results */
            <div>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map(({ group, skills }) => (
                    <div
                      key={group.id}
                      className="bg-[#2C2C2C] border border-[#5A5A5A] p-3"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-lg" aria-hidden="true">{group.icon}</span>
                        <span className="text-xs sm:text-sm font-bold" style={{ color: group.color }}>
                          {group.shortName}
                        </span>
                        <span className="ml-auto pixel-font text-[8px] text-gray-500">
                          {skills.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs sm:text-sm bg-[#3C3C3C] px-2 py-1 text-gray-200 border border-[#5A5A5A]"
                          >
                            {highlight(skill, trimmedQuery)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-[#5A5A5A]">
                  <p className="text-3xl mb-3" aria-hidden="true">🧭</p>
                  <p className="text-gray-300 text-lg mb-1">No skills matched “{trimmedQuery}”.</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Try a shorter term like “Azure”, “dbt”, “Kafka”, or “governance”.
                  </p>
                  <button type="button" onClick={() => setQuery('')} className="mc-btn text-xs">
                    Reset search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
                {skillGroups.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(idx)}
                    aria-pressed={activeCategory === idx}
                    aria-label={`Show ${cat.shortName} skills`}
                    title={`${cat.shortName} (${cat.skills.length})`}
                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm border-2 transition-all duration-300 ${
                      activeCategory === idx
                        ? 'bg-[#4A7A2E] border-[#6BAF4A] text-white scale-105 shadow-lg shadow-[#4A7A2E]/30'
                        : 'bg-[#3C3C3C] border-[#5A5A5A] text-gray-400 hover:bg-[#4A4A4A] hover:border-[#7F7F7F]'
                    }`}
                  >
                    <span className="mr-1" aria-hidden="true">{cat.icon}</span>
                    <span>{cat.shortName}</span>
                    <span className="ml-1 text-[9px] opacity-60">{cat.skills.length}</span>
                  </button>
                ))}
              </div>

              {/* Active category content */}
              <div className="min-h-[220px]">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <h3
                    className="pixel-font text-xs sm:text-sm transition-all duration-300"
                    style={{ color: activeColor }}
                  >
                    {active.name}
                  </h3>
                  <p className="text-sm text-gray-400">{active.summary}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                  {active.skills.map((skill, idx) => (
                    <div
                      key={`${active.id}-${skill}`}
                      className="mc-slot mc-block group inventory-slot"
                      title={skill}
                      style={{ '--slot-delay': `${Math.min(idx * 0.03, 0.4)}s` } as React.CSSProperties}
                    >
                      <span className="text-xs sm:text-sm text-center text-gray-200 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotbar - category overview */}
              <div className="mt-8 pt-4 border-t-2 border-[#5A5A5A]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="pixel-font text-[10px] text-gray-400">All Categories:</p>
                  <p className="pixel-font text-[8px] text-gray-400">
                    {skillGroups.length} CATEGORIES
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {skillGroups.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        const index = skillGroups.findIndex((group) => group.id === cat.id)
                        setActiveCategory(index)
                        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="flex items-center gap-1.5 group"
                      aria-label={`Jump to ${cat.shortName}`}
                    >
                      <span
                        className="w-3 h-3 transition-transform group-hover:scale-150"
                        style={{ backgroundColor: cat.color }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-gray-400 group-hover:text-gray-100 transition-colors">
                        {cat.shortName}
                      </span>
                      <span className="text-[10px] text-gray-600">{cat.skills.length}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Complete skill matrix (collapsible) */}
        <div className="mt-8 mc-panel scroll-animate-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="pixel-font text-xs text-[#FCDB05] mb-1">📋 Complete Skill Matrix</h3>
              <p className="text-sm text-gray-400">
                Every category from the résumé, in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowMatrix((value) => !value)}
              aria-expanded={showMatrix}
              aria-controls="skill-matrix"
              className="mc-btn text-[9px] sm:text-xs self-start sm:self-auto"
            >
              {showMatrix ? '▲ Hide Matrix' : '▼ Show Matrix'}
            </button>
          </div>

          <div
            id="skill-matrix"
            className={`grid transition-all duration-500 ease-out ${
              showMatrix ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {skillGroups.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-[#2C2C2C] border border-[#5A5A5A] p-3 transition-all duration-300 hover:border-[#7F7F7F] hover:bg-[#353535]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg" aria-hidden="true">{cat.icon}</span>
                      <span className="text-xs sm:text-sm font-bold" style={{ color: cat.color }}>
                        {cat.name}
                      </span>
                      <span className="ml-auto pixel-font text-[8px] text-gray-600">
                        {cat.skills.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill) => (
                        <span
                          key={`${cat.id}-matrix-${skill}`}
                          className="text-xs bg-[#3C3C3C] px-2 py-0.5 text-gray-300 border border-[#5A5A5A] transition-all hover:bg-[#4A4A4A] hover:border-[#7F7F7F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}

/** Wraps the matched part of a skill name so search hits are easy to spot. */
function highlight(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-[#FCDB05] text-black px-0.5">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  )
}
