export default function EducationSection() {
  const certifications = [
    {
      name: 'Databricks Certified Data Engineer Associate',
      icon: '🔷',
      color: '#4AEDD9',
      rarity: 'Legendary',
      rarityColor: '#FCDB05',
    },
    {
      name: 'Microsoft Certified: Azure Data Engineer Associate (DP-203)',
      icon: '☁️',
      color: '#4AEDD9',
      rarity: 'Epic',
      rarityColor: '#B02E26',
    },
    {
      name: 'Snowflake SnowPro Core Certification',
      icon: '❄️',
      color: '#7BA4D4',
      rarity: 'Rare',
      rarityColor: '#4AEDD9',
    },
  ]

  return (
    <section id="education" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#1a2a2e] to-[#1a1a2e]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="pixel-font text-xl sm:text-2xl text-[#FCDB05] mb-4 drop-shadow-[2px_2px_0px_#3C3C3C]">
            🏆 Achievements
          </h2>
          <p className="text-gray-400 text-lg">Education & Certifications</p>
          <div className="w-32 h-1 bg-[#FCDB05] mx-auto mt-4" />
        </div>

        {/* Education Card */}
        <div className="mc-panel max-w-3xl mx-auto mb-12">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#1B1028] border-2 border-[#4AEDD9] flex items-center justify-center shrink-0 animate-pulse-glow">
              <span className="text-3xl">🎓</span>
            </div>
            <div>
              <h3 className="pixel-font text-xs text-[#4AEDD9] mb-2">Education</h3>
              <h4 className="text-xl text-white font-bold mb-1">Bachelor of Science in Information Systems</h4>
              <p className="text-[#FCDB05] text-lg">University of Texas at Arlington</p>
              <p className="text-gray-400">Arlington, TX</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="pixel-font text-sm text-[#FCDB05] mb-2">📜 Certification Achievements</h3>
          <p className="text-gray-400 text-sm">Unlocked special abilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <div key={idx} className="mc-panel mc-block text-center">
              {/* Certification card */}
              <div className="relative">
                {/* Rarity badge */}
                <div 
                  className="absolute -top-2 -right-2 pixel-font text-[8px] px-2 py-1 border"
                  style={{ 
                    backgroundColor: `${cert.rarityColor}20`,
                    borderColor: cert.rarityColor,
                    color: cert.rarityColor
                  }}
                >
                  {cert.rarity}
                </div>

                {/* Icon */}
                <div 
                  className="w-20 h-20 mx-auto mb-4 border-2 flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${cert.color}15`,
                    borderColor: cert.color,
                    boxShadow: `0 0 15px ${cert.color}30`
                  }}
                >
                  <span className="text-4xl">{cert.icon}</span>
                </div>

                {/* Name */}
                <h4 className="text-sm text-white font-bold mb-2 leading-tight">
                  {cert.name}
                </h4>

                {/* Status */}
                <div className="mt-3 inline-block px-3 py-1 border" style={{
                  borderColor: cert.color,
                  backgroundColor: `${cert.color}10`,
                }}>
                  <span className="pixel-font text-[8px]" style={{ color: cert.color }}>
                    ✓ UNLOCKED
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement summary */}
        <div className="mt-12 mc-panel max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="pixel-font text-2xl text-[#FCDB05]">3</div>
              <div className="text-sm text-gray-400">Certifications</div>
              <div className="flex justify-center gap-0.5 mt-1">
                {[1,2,3].map(i => <span key={i} className="text-[#FCDB05]">⭐</span>)}
              </div>
            </div>
            <div>
              <div className="pixel-font text-2xl text-[#4AEDD9]">BS</div>
              <div className="text-sm text-gray-400">Degree</div>
              <div className="flex justify-center gap-0.5 mt-1">
                {[1,2,3,4].map(i => <span key={i} className="text-[#4AEDD9]">⭐</span>)}
              </div>
            </div>
            <div>
              <div className="pixel-font text-2xl text-[#17DD62]">UTA</div>
              <div className="text-sm text-gray-400">University</div>
              <div className="flex justify-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-[#17DD62]">⭐</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
