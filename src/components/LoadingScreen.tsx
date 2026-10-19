import { useEffect, useState, useMemo } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [tip, setTip] = useState('')

  const tips = useMemo(() => [
    'Loading terrain...',
    'Building data pipelines...',
    'Crafting cloud architecture...',
    'Mining data insights...',
    'Enchanting skills...',
    'Preparing inventory...',
    'Connecting to Azure...',
    'Optimizing queries...',
  ], [])

  const blocks = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: ['#4AEDD9', '#FCDB05', '#17DD62', '#B02E26'][i % 4],
      size: 20 + (i * 7) % 40,
      top: (i * 13) % 100,
      left: (i * 17) % 100,
      duration: 3 + (i % 4),
      delay: i % 3,
    })), []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    const tipInterval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)])
    }, 800)

    setTip(tips[0])

    return () => {
      clearInterval(interval)
      clearInterval(tipInterval)
    }
  }, [tips])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1a1a2e] flex flex-col items-center justify-center">
      {/* Background blocks */}
      <div className="absolute inset-0 overflow-hidden">
        {blocks.map((b) => (
          <div
            key={b.id}
            className="absolute opacity-10"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              backgroundColor: b.color,
              top: `${b.top}%`,
              left: `${b.left}%`,
              animation: `float ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative mb-8">
        <div className="flex gap-2 mb-4 justify-center">
          <div className="w-10 h-10 bg-[#5D8C3E] border-2 border-[#3B5E2B] animate-float" style={{ animationDelay: '0s' }} />
          <div className="w-10 h-10 bg-[#8B6914] border-2 border-[#6B4F12] animate-float" style={{ animationDelay: '0.2s' }} />
          <div className="w-10 h-10 bg-[#7F7F7F] border-2 border-[#5A5A5A] animate-float" style={{ animationDelay: '0.4s' }} />
          <div className="w-10 h-10 bg-[#4AEDD9] border-2 border-[#2ABCA9] animate-float" style={{ animationDelay: '0.6s' }} />
        </div>
        <h1 className="pixel-font text-lg sm:text-xl text-[#FCDB05] text-center drop-shadow-[2px_2px_0px_#3C3C3C]">
          PROMOSON POUDEL
        </h1>
      </div>

      {/* Loading bar */}
      <div className="w-64 sm:w-80 mb-4">
        <div className="bg-[#003300] border-2 border-[#001A00] h-6 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#80FF20] via-[#40C000] to-[#208000] transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="pixel-font text-[8px] text-white drop-shadow-[1px_1px_0px_#000]">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Tip text */}
      <p className="pixel-font text-[8px] sm:text-[10px] text-gray-400 text-center px-4 h-4">
        {tip}
      </p>

      {/* Decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-8 grass-top" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(0,0,0,0.1) 31px, rgba(0,0,0,0.1) 32px)'
        }} />
        <div className="h-12 dirt-bg" />
      </div>
    </div>
  )
}
