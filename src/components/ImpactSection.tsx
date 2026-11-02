import SectionHeading from './SectionHeading'
import {
  architectureGuardrails,
  architectureLayers,
  capabilities,
  featuredWork,
  impactMetrics,
} from '../data/resume'

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/75 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="▸ MEASURABLE OUTCOMES"
          title="⚡ Impact & Blueprint"
          subtitle="How the platforms are built — and the results they delivered across healthcare, insurance, and retail."
        />

        {/* Impact metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {impactMetrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="mc-panel scroll-animate-scale group transition-transform duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 flex items-center justify-center border-2 text-xl shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                  style={{ borderColor: metric.color, backgroundColor: `${metric.color}14` }}
                  aria-hidden="true"
                >
                  {metric.icon}
                </div>
                <div className="min-w-0">
                  <div
                    className="pixel-font text-lg sm:text-xl leading-tight"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm sm:text-base text-white font-bold">{metric.label}</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platform blueprint */}
        <div className="mc-panel mb-16 scroll-animate-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b-2 border-[#5A5A5A]">
            <div>
              <h3 className="pixel-font text-xs sm:text-sm text-[#4AEDD9] mb-2">
                🏗️ Platform Blueprint
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                End-to-end medallion lakehouse: from raw sources to governed analytics and AI.
              </p>
            </div>
            <span className="pixel-font text-[8px] text-[#FCDB05] border-2 border-[#FCDB05]/40 bg-[#FCDB05]/10 px-3 py-2 self-start sm:self-auto">
              BRONZE → SILVER → GOLD
            </span>
          </div>

          <ol className="flex flex-col xl:flex-row items-stretch gap-3 xl:gap-2">
            {architectureLayers.map((layer, idx) => (
              <li key={layer.name} className="flex-1 min-w-0 flex flex-col xl:flex-row xl:items-stretch gap-2">
                <div
                  className="flex-1 min-w-0 border-2 bg-[#2C2C2C]/70 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-[#353535]"
                  style={{ borderColor: `${layer.color}66` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-7 h-7 flex items-center justify-center border text-sm shrink-0"
                      style={{ borderColor: layer.color, backgroundColor: `${layer.color}14` }}
                      aria-hidden="true"
                    >
                      {layer.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="pixel-font text-[9px]" style={{ color: layer.color }}>
                        {idx + 1}. {layer.name}
                      </div>
                      <div className="text-[11px] text-gray-400 leading-tight">{layer.subtitle}</div>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {layer.technologies.map((tech) => (
                      <li key={tech} className="text-xs sm:text-sm text-gray-300 flex gap-1.5">
                        <span style={{ color: layer.color }} aria-hidden="true">▸</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {idx < architectureLayers.length - 1 && (
                  <div
                    className="hidden xl:flex items-center justify-center pixel-font text-[10px] text-gray-500 shrink-0"
                    aria-hidden="true"
                  >
                    ▶
                  </div>
                )}
              </li>
            ))}
          </ol>

          {/* Guardrails */}
          <div className="mt-6 pt-5 border-t-2 border-[#5A5A5A]">
            <h4 className="pixel-font text-[9px] text-[#FCDB05] mb-3">
              🛡️ Cross-Cutting Guardrails
            </h4>
            <div className="flex flex-wrap gap-2">
              {architectureGuardrails.map((guardrail) => (
                <span
                  key={guardrail}
                  className="text-xs sm:text-sm px-2.5 py-1 border border-[#5A5A5A] bg-[#2C2C2C] text-gray-300"
                >
                  ✓ {guardrail}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured missions */}
        <div className="mb-16">
          <div className="text-center mb-8 scroll-animate-up">
            <h3 className="pixel-font text-xs sm:text-sm text-[#FCDB05] mb-2">
              🗺️ Featured Missions
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Problem, approach, and measured outcome for each platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredWork.map((item, idx) => (
              <article
                key={item.title}
                className="mc-panel scroll-animate-up flex flex-col transition-transform duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 text-xl shrink-0"
                    style={{ borderColor: item.color, backgroundColor: `${item.color}14` }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg text-white font-bold leading-tight">
                      {item.title}
                    </h4>
                    <p className="pixel-font text-[8px] mt-1" style={{ color: item.color }}>
                      {item.company}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm sm:text-base flex-1">
                  <div>
                    <p className="pixel-font text-[8px] text-[#FF7B72] mb-1">▸ CHALLENGE</p>
                    <p className="text-gray-400 leading-relaxed">{item.problem}</p>
                  </div>
                  <div>
                    <p className="pixel-font text-[8px] text-[#4AEDD9] mb-1">▸ APPROACH</p>
                    <p className="text-gray-400 leading-relaxed">{item.solution}</p>
                  </div>
                  <div>
                    <p className="pixel-font text-[8px] text-[#17DD62] mb-1">▸ OUTCOME</p>
                    <ul className="space-y-1">
                      {item.results.map((result) => (
                        <li key={result} className="flex gap-1.5 text-gray-300">
                          <span className="text-[#17DD62]" aria-hidden="true">✦</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Core capabilities */}
        <div>
          <div className="text-center mb-8 scroll-animate-up">
            <h3 className="pixel-font text-xs sm:text-sm text-[#4AEDD9] mb-2">
              🧰 Core Capabilities
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">
              The repeatable engineering patterns used to ship each platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {capabilities.map((capability, idx) => (
              <div
                key={capability.title}
                className="mc-panel scroll-animate-up"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 text-xl shrink-0"
                    style={{
                      borderColor: capability.color,
                      backgroundColor: `${capability.color}14`,
                    }}
                    aria-hidden="true"
                  >
                    {capability.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg text-white font-bold mb-1">
                      {capability.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#5A5A5A]">
                  {capability.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2 py-0.5 border"
                      style={{
                        borderColor: `${capability.color}44`,
                        backgroundColor: `${capability.color}10`,
                        color: capability.color,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
